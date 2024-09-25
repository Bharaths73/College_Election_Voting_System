package com.voting.college_election_voting.Service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.nio.file.attribute.UserPrincipal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

import com.voting.college_election_voting.DTO.AdminOtpDto;
import com.voting.college_election_voting.DTO.CandidateDto;
import com.voting.college_election_voting.DTO.CandidateRegisterDto;
import com.voting.college_election_voting.DTO.GetVotersDto;
import com.voting.college_election_voting.DTO.OTPDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.RegisteredVoterResponse;
import com.voting.college_election_voting.DTO.UpdateUserDto;
import com.voting.college_election_voting.DTO.VoterLoginDto;
import com.voting.college_election_voting.DTO.VoterRegisterDto;
import com.voting.college_election_voting.DTO.VotingDto;
import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Model.OTP;
import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.Profile;
import com.voting.college_election_voting.Model.Role;
import com.voting.college_election_voting.Model.Students;
import com.voting.college_election_voting.Model.Voters;
import com.voting.college_election_voting.Model.Votes;
import com.voting.college_election_voting.Repository.CandidatesRepo;
import com.voting.college_election_voting.Repository.OTPRepo;
import com.voting.college_election_voting.Repository.PositionsRepo;
import com.voting.college_election_voting.Repository.ProfileRepo;
import com.voting.college_election_voting.Repository.StudentRepo;
import com.voting.college_election_voting.Repository.VotersRepo;
import com.voting.college_election_voting.Repository.VotesRepo;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class VotersService {

    private VotersRepo votersRepo;
    private StudentRepo studentRepo;
    private EmailService emailService;
    private OTPRepo otpRepo;
    private JWTService jwtService;
    private ModelMapper modelMapper;
    private CloudinaryImageService cloudinaryImageService;
    private AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private CandidatesRepo candidatesRepo;
    private PositionsRepo positionsRepo;
    private VotesRepo votesRepo;

    @Autowired
    private ProfileRepo profileRepo;

    public VotersService(VotersRepo votersRepo,StudentRepo studentRepo,EmailService emailService,OTPRepo otpRepo,ModelMapper modelMapper,CloudinaryImageService cloudinaryImageService, AuthenticationManager authenticationManager,JWTService jwtService,CandidatesRepo candidatesRepo,PositionsRepo positionsRepo,VotesRepo votesRepo) {
        this.votersRepo = votersRepo;
        this.studentRepo=studentRepo;
        this.emailService=emailService;
        this.otpRepo=otpRepo;
        this.modelMapper=modelMapper;
        this.cloudinaryImageService=cloudinaryImageService;
        this.authenticationManager=authenticationManager;
        this.jwtService=jwtService;
        this.candidatesRepo=candidatesRepo;
        this.positionsRepo=positionsRepo;
        this.bCryptPasswordEncoder=new BCryptPasswordEncoder(12);
        this.votesRepo=votesRepo;
    }



    @Transactional
    public RegisteredVoterResponse register(VoterRegisterDto voter) throws Exception{
        System.out.println("Profile Success");
        Optional<Voters> DbVoter=votersRepo.findByRegisterNumber(voter.getProfile().getRegisterNumber());
        Optional<OTP> otp=otpRepo.findByEmail(voter.getEmail());
        if(DbVoter.isPresent()){
            throw new Exception("User already Registered");
        }
        if(!otp.isPresent()){
            throw new Exception("Please register first to get otp");
        }
        if(!otp.get().getOtp().equals(voter.getOtp().trim())){
            throw new Exception("OTP is inValid "+otp.get().getOtp()+""+voter.getOtp());
        }
        if(otp.get().getExpiresAt().isBefore(LocalDateTime.now())){
            removeOtp(otp.get());
            throw new Exception("OTP has expired request for new OTP");
        }
        
        Voters Voter=modelMapper.map(voter, Voters.class);
        String password=Voter.getPassword();
        Voter.setPassword(bCryptPasswordEncoder.encode(password));
        // Map data=cloudinaryImageService.upload(file);
        // Voter.setProfilePicUrl((String)data.get("url"));
        // Voter.setProficePicId((String)data.get("public_id"));
        Voter.setRole(Role.valueOf(voter.getRole()));
        Voters registeredVoter=votersRepo.save(Voter);
        removeOtp(otp.get());
        RegisteredVoterResponse voterRegisterDto=modelMapper.map(registeredVoter,RegisteredVoterResponse.class);
        return voterRegisterDto;
    }

    private void removeOtp(OTP otp){
        otpRepo.delete(otp);
    }

    public void sendOTP(OTPDto voter) throws Exception{

        Optional<Voters> DbVoter=votersRepo.findByRegisterNumber(voter.getRegisterNumber());
        Optional<Students> students=studentRepo.findByRegisterNumber(voter.getRegisterNumber());

        if(DbVoter.isPresent()){
            throw new Exception("Register number is already Registered");
        }
        if(!students.isPresent()){
            throw new Exception("Register Number is Not Valid");
        }
        if(!students.get().getEmail().equals(voter.getEmail())){
            throw new Exception("Email is not registered in college database");
        }
        else{
            String email=voter.getEmail();
            checkInDb(email);
        }
    }

    public void sendOTPToAdmin(AdminOtpDto admin) throws Exception{

        Optional<Voters> DbVoter=votersRepo.findByEmail(admin.getEmail());

        if(DbVoter.isPresent()){
            throw new Exception("Email is already Registered");
        }

        else{
            String email=admin.getEmail();
            checkInDb(email);
        }
    }

    private void checkInDb(String email) throws Exception{
            String otp=generateOTP();
            Optional<OTP> existingOtp=otpRepo.findByEmail(email);
            if(existingOtp.isPresent()){
                OTP updatedOtp=existingOtp.get();
                updatedOtp.setOtp(otp);
                otpRepo.save(updatedOtp);
            }
            else{
                OTP newOtp=new OTP();
                newOtp.setEmail(email);
                newOtp.setOtp(otp);
                newOtp.setCreatedAt(LocalDateTime.now());
                newOtp.setExpiresAt(LocalDateTime.now().plusMinutes(30));
                otpRepo.save(newOtp);
            }
            sendMail(email,otp);
    }

    private void sendMail(String to,String otp) throws Exception{
        String subject="Verification Mail";
        String body="<!DOCTYPE HTML>"
                    +"<html>"
                    +"<head></head>"
                    +"<body>"
                    +"<h1>Verification OTP</h1>"
                    +"<P>Your OTP code for verification is "+otp+"</P>" 
                    +"</body>" 
                    +"</html>";
        emailService.sendEmail(to, subject, body);
    }

    private String generateOTP(){
        Random random=new Random();
        int generatedOtp=100000+random.nextInt(900000);
        return String.valueOf(generatedOtp);
    }



    public RegisteredVoterResponse login(VoterLoginDto loginDto) throws Exception {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getIdentity(),loginDto.getPassword()));

        if(!authentication.isAuthenticated()){
            throw new Exception("Failed to Authenticate User");
        }

        VoterUserPrinciples voter=(VoterUserPrinciples) authentication.getPrincipal();
        String email=voter.getEmail();
        // String otp=generateOTP();
        // checkInDb(email);
        String token=jwtService.generateToken(voter,voter.getEmail());
        RegisteredVoterResponse registeredVoterResponse=RegisteredVoterResponse
                                                        .builder()
                                                        .token(token)
                                                        .email(email)
                                                        .firstName(voter.getFirstName())
                                                        .lastName(voter.getLastName())
                                                        .mobileNumber(voter.getMobileNo())
                                                        .profilePicUrl(voter.getProfilePic())
                                                        .proficePicId(voter.getProfilePicId())
                                                        .role(voter.getAuthorities().toString())
                                                        .registerNumber(voter.getRegNo())
                                                        .department(voter.getDepartment())
                                                        .build();

        return registeredVoterResponse;
    }



    public RegisteredVoterResponse getDetails(String email) throws Exception {
        Optional<Voters> voter=votersRepo.findByEmail(email);
        if(!voter.isPresent()){
            throw new Exception("User Not Found");
        }
        Voters details=voter.get();
        RegisteredVoterResponse response=RegisteredVoterResponse.builder()
                                                        .email(details.getEmail())
                                                        .firstName(details.getFirstName())
                                                        .lastName(details.getLastName())
                                                        .department(details.getProfile().getDepartment())
                                                        .mobileNumber(details.getMobileNumber())
                                                        .profilePicUrl(details.getProfilePicUrl())
                                                        .registerNumber(details.getProfile().getRegisterNumber())
                                                        .build();
        return response;
    }


     public List<CandidateDto> getAllCandidates(Integer pageNo,Integer pageSize,String sortBy) 
     {
        Pageable pages=PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Candidates> candidates=candidatesRepo.findAll(pages);
        
        List<CandidateDto> candidateDtos=candidates.getContent()
                                        .stream()
                                        .map(candidate->
                                            CandidateDto.builder()
                                            .firstName(candidate.getFirstname())
                                            .lastName(candidate.getLastName())
                                            .department(candidate.getDepartment())
                                            .position(candidate.getPosition())
                                            .profilePic(candidate.getProfilePicUrl())
                                            .registerNumber(candidate.getRegisterNumber())
                                            .votes(candidate.getVotes().size())
                                            .isFirstPage(candidates.isFirst())
                                            .isLastPage(candidates.isLast())
                                            .hasNextPage(candidates.hasNext())
                                            .hasPreviousPage(candidates.hasPrevious())
                                            .pageNo(candidates.getNumber())
                                            .pageSize(candidates.getSize())
                                            .totalNoOfCandidates(candidates.getTotalElements())
                                            .totalPages(candidates.getTotalPages()).build())
                                            .collect(Collectors.toList());

        return candidateDtos;
    }

    public List<CandidateDto> getAllCandidates() 
     {
        List<Candidates> candidates=candidatesRepo.findAll();
        
        List<CandidateDto> candidateDtos=candidates.stream()
                                        .map(candidate->
                                            CandidateDto.builder()
                                            .firstName(candidate.getFirstname())
                                            .lastName(candidate.getLastName())
                                            .department(candidate.getDepartment())
                                            .position(candidate.getPosition())
                                            .profilePic(candidate.getProfilePicUrl())
                                            .registerNumber(candidate.getRegisterNumber())
                                            .votes(candidate.getVotes().size())
                                            .build()).collect(Collectors.toList());

        return candidateDtos;
    }

    public List<PositionsDto> getAllPositions(){
        List<Positions> positions=positionsRepo.findAll();

        List<PositionsDto> positionsDtos=positions.stream().map(pos->PositionsDto.builder().positionName(pos.getPositionName()).id(pos.getId()).build()).collect(Collectors.toList());

        return positionsDtos;
    }



    public CandidateDto registerAsCandidate(CandidateRegisterDto candidate) throws Exception {
        Optional<Students> student=studentRepo.findByRegisterNumber(candidate.getRegisterNumber());
        Optional<Candidates> candi=candidatesRepo.findByRegisterNumber(candidate.getRegisterNumber());

        if(!student.isPresent()){
            throw new UsernameNotFoundException("Register Number not Found in college databse");
        }

        if(candi.isPresent()){
            throw new UsernameNotFoundException("Candidate already Registered");
        }
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(candidate.getEmail(), candidate.getPassword()));

        if(!authentication.isAuthenticated()){
            throw new Exception("Failed to Authenticate User");
        }



        Optional<Voters> authCandidate=votersRepo.findByRegisterNumber(candidate.getRegisterNumber());
        if (!authCandidate.isPresent()) {
            throw new Exception("Voter not found");
        }

        if(candidate.getPosition().getId()==null){
            throw new Exception("Position is required");
        }

        Optional<Positions> position=positionsRepo.findById(candidate.getPosition().getId());

        if(!position.isPresent()){
            throw new Exception("Position Not Found");
        }
        Positions positions=position.get();
        Voters voter=authCandidate.get();
        Candidates candidates=modelMapper.map(voter, Candidates.class);
        candidates.setDepartment(voter.getProfile().getDepartment());
        candidates.setRegisterNumber(voter.getProfile().getRegisterNumber());
        candidates.setPosition(positions);
        List<Candidates> posCandidates=positions.getCandidates();
        // if(posCandidates==null){
        //     posCandidates=new ArrayList<>();
        // }
        posCandidates.add(candidates);
        positions.setCandidates(posCandidates);
        Candidates savedCandidates=candidatesRepo.save(candidates);
        CandidateDto candidateDto=CandidateDto.builder().department(savedCandidates.getDepartment()).firstName(savedCandidates.getFirstname()).lastName(savedCandidates.getLastName()).position(savedCandidates.getPosition()).profilePic(savedCandidates.getProfilePicUrl()).registerNumber(savedCandidates.getRegisterNumber()).build();
        return candidateDto;
    }



    public CandidateDto confirmCandidate(CandidateRegisterDto candidate) throws Exception {
        Optional<Candidates> candi=candidatesRepo.findByRegisterNumber(candidate.getRegisterNumber());

        if(candi.isPresent()){
            Candidates savedCandidates=candi.get();
            CandidateDto candidateDto=CandidateDto.builder().department(savedCandidates.getDepartment()).firstName(savedCandidates.getFirstname()).lastName(savedCandidates.getLastName()).position(savedCandidates.getPosition()).profilePic(savedCandidates.getProfilePicUrl()).registerNumber(savedCandidates.getRegisterNumber()).isCandidate(true).build();
            return candidateDto;
        }
        return CandidateDto.builder().isCandidate(false).build();
    }



    public List<VotingDto> voteToCandidate(List<VotingDto> votes) throws Exception{
        if(votes.isEmpty()){
            throw new Exception("You should vote all positions");
        }
        List<Votes> savedVotes=new ArrayList<>();

        for(VotingDto vote:votes){
            if(vote.getCandidate().isBlank() || vote.getPosition().getPositionName().isBlank() || vote.getVoter().isBlank()){
                throw new Exception("All fields (candidate, position, voter) must be filled.");
            }
            Optional<Voters> voter=votersRepo.findByRegisterNumber(vote.getVoter());
            if(!voter.isPresent()){
                throw new Exception("Voter with register number " + vote.getVoter() + " not found.");
            }
            Optional<Candidates> candidate=candidatesRepo.findByRegisterNumber(vote.getCandidate());
            if(!candidate.isPresent()){
                throw new Exception("Candidate with register number " + vote.getCandidate() + " not found.");
            }
            Optional<Positions> position=positionsRepo.findById(vote.getPosition().getId());
            if(!candidate.isPresent()){
                throw new Exception("Position " + vote.getPosition().getPositionName() + " not found.");
            }
            Votes dbVotes=new Votes();
            dbVotes.setCandidate(candidate.get());
            dbVotes.setPosition(position.get());
            dbVotes.setVoter(voter.get());
            savedVotes.add(dbVotes);
        };
        List<Votes> persistentVotes=votesRepo.saveAll(savedVotes);
        
        Optional<Voters> voter=votersRepo.findByRegisterNumber(votes.get(0).getVoter());

        if(voter.isPresent()){
            voter.get().getProfile().setVoted(true);
            votersRepo.save(voter.get());
        }
        List<VotingDto> votingDtos=persistentVotes.stream().map(vote->
            VotingDto.builder().candidate(vote.getCandidate().getFirstname()+" "+vote.getCandidate().getLastName()).position(modelMapper.map(vote.getPosition(), PositionsDto.class)).build()).collect(Collectors.toList());

     return votingDtos;
    }   

    public List<VotingDto> isVoted(RegisteredVoterResponse voter) throws Exception{
        Optional<Voters> dbVoter=votersRepo.findByRegisterNumber(voter.getRegisterNumber());
        if(!dbVoter.isPresent()){
            throw new Exception("Voter not found");
        }
        List<Votes> votes=votesRepo.findByVoterId(dbVoter.get().getId());

        return votes.stream().map(vote->VotingDto.builder().candidate(vote.getCandidate().getFirstname()+" "+vote.getCandidate().getLastName()).position(modelMapper.map(vote.getPosition(), PositionsDto.class)).build()).collect(Collectors.toList());
    }

    public void deleteCandidate(String id) throws Exception{
        Candidates candidate=candidatesRepo.findByRegisterNumber(id).orElseThrow(()->new Exception("Candidate not found to delete"));
        candidatesRepo.deleteByRegisterNumber(id);
    }



    public CandidateDto searchCandidate(String query) throws Exception {
        Optional<Candidates> dbCandidate=candidatesRepo.findByRegisterNumber(query.trim());
        if(!dbCandidate.isPresent()){
            throw new Exception("Candidate with register number not present");
        }
        Candidates candidate=dbCandidate.get();
        CandidateDto candidateDto=CandidateDto.builder()
            .firstName(candidate.getFirstname())
            .lastName(candidate.getLastName())
            .department(candidate.getDepartment())
            .position(candidate.getPosition())
            .profilePic(candidate.getProfilePicUrl())
            .registerNumber(candidate.getRegisterNumber())
            .votes(candidate.getVotes().size())
            .build();
        // votersDto.setDepartment(voter.get().getProfile().getDepartment());
        // votersDto.setRegisterNumber(voter.get().getProfile().getRegisterNumber());
        return candidateDto;
    }



    public PositionsDto searchPosition(String query) throws Exception {
        List<Positions> positions=positionsRepo.findAll();
        List<Positions> position=positions.stream().filter((pos)->pos.getPositionName().equalsIgnoreCase(query.trim())).collect(Collectors.toList());
        if(position.size()!=0){
            return modelMapper.map(position.get(0), PositionsDto.class);
        }
        else{
            throw new Exception("Position not found");
        }
    }



    public RegisteredVoterResponse updateProfilePic(MultipartFile file,String pic_id) throws Exception {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null){
            throw new AuthenticationException("Unauthenticated");
        }
        VoterUserPrinciples principal=(VoterUserPrinciples)authentication.getPrincipal();
        String email=principal.getEmail();
        Optional<Voters> voter=votersRepo.findByEmail(email);
        if(!voter.isPresent()){
            throw new UsernameNotFoundException("User not found");
        }
        Optional<Candidates> candidate=candidatesRepo.findByRegisterNumber(voter.get().getProfile().getRegisterNumber());

        if(!pic_id.isBlank()){
            Map data=cloudinaryImageService.deleteFile(pic_id);
        }
        Map data=cloudinaryImageService.upload(file);
        voter.get().setProfilePicUrl((String)data.get("url"));
        voter.get().setProficePicId((String)data.get("public_id"));
        Voters savedVoter=votersRepo.save(voter.get());
        if(candidate.isPresent()){
            candidate.get().setProfilePicUrl(voter.get().getProfilePicUrl());
            Candidates savedCandidate=candidatesRepo.save(candidate.get());
        }
        RegisteredVoterResponse registeredVoterResponse=RegisteredVoterResponse
        .builder()
        .email(email)
        .firstName(savedVoter.getFirstName())
        .lastName(savedVoter.getLastName())
        .mobileNumber(savedVoter.getMobileNumber())
        .profilePicUrl(savedVoter.getProfilePicUrl())
        .proficePicId(savedVoter.getProficePicId())
        .role(savedVoter.getRole().toString())
        .registerNumber(savedVoter.getProfile().getRegisterNumber())
        .department(savedVoter.getProfile().getDepartment())
        .build();
        return registeredVoterResponse;
    }


    @Transactional
    public RegisteredVoterResponse updateProfile(UpdateUserDto profile) throws AuthenticationException, IllegalArgumentException, IllegalAccessException {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null){
            throw new AuthenticationException("Unauthenticated");
        }
        VoterUserPrinciples principal=(VoterUserPrinciples)authentication.getPrincipal();
        String email=principal.getEmail();
        Optional<Voters> voterOpt=votersRepo.findByEmail(email);
        if(!voterOpt.isPresent()){
            throw new UsernameNotFoundException("User not found");
        }
        Voters voter = voterOpt.get(); // Get the actual voter entity
        String regNo = voter.getProfile().getRegisterNumber() != null ? voter.getProfile().getRegisterNumber() : null;

// Only attempt to find a candidate if the registration number is not null
        Optional<Candidates> candidate = Optional.empty();
        if (regNo != null) {
            candidate = candidatesRepo.findByRegisterNumber(regNo);
        }
    // Only update fields if they have changed
    if (profile.getFirstName() != null && !profile.getFirstName().equals(voter.getFirstName())) {
        voter.setFirstName(profile.getFirstName());
        if(candidate.isPresent()){
            candidate.get().setFirstname(profile.getFirstName());
        }
    }
    if (profile.getLastName() != null && !profile.getLastName().equals(voter.getLastName())) {
        voter.setLastName(profile.getLastName());
        if(candidate.isPresent()){
            candidate.get().setLastName(profile.getLastName());
        }
    }
    if (profile.getMobileNumber() != null && !profile.getMobileNumber().equals(voter.getMobileNumber())) {
        voter.setMobileNumber(profile.getMobileNumber());
    }
    if (profile.getDepartment() != null && !profile.getDepartment().equals(voter.getProfile().getDepartment())) {
        voter.getProfile().setDepartment(profile.getDepartment());
        if(candidate.isPresent()){
            candidate.get().setDepartment(profile.getDepartment());
        }
    }
        Voters savedVoter=votersRepo.save(voterOpt.get());
        candidate.ifPresent(candidatesRepo::save);
        RegisteredVoterResponse registeredVoterResponse=RegisteredVoterResponse
        .builder()
        .email(email)
        .firstName(savedVoter.getFirstName())
        .lastName(savedVoter.getLastName())
        .mobileNumber(savedVoter.getMobileNumber())
        .profilePicUrl(savedVoter.getProfilePicUrl())
        .proficePicId(savedVoter.getProficePicId())
        .role(savedVoter.getRole().toString())
        .registerNumber(savedVoter.getProfile().getRegisterNumber())
        .department(savedVoter.getProfile().getDepartment())
        .build();
        return registeredVoterResponse;
    }



    public RegisteredVoterResponse updatePassword(String oldPassword, String newPassword) throws AuthenticationException {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null){
            throw new AuthenticationException("Unauthenticated");
        }
        VoterUserPrinciples principal=(VoterUserPrinciples)authentication.getPrincipal();
        String email=principal.getEmail();
        Optional<Voters> voterOpt=votersRepo.findByEmail(email);
        if(!voterOpt.isPresent()){
            throw new UsernameNotFoundException("User not found");
        }
        Voters voter = voterOpt.get(); 
        Authentication authentication2=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(principal, oldPassword));
        if(authentication2==null){
            throw new AuthenticationException("Incorrect Password");
        }
        String updatingPassword=bCryptPasswordEncoder.encode(newPassword);
        voter.setPassword(updatingPassword);
        Voters updatedPassword=votersRepo.save(voter);
        return modelMapper.map(updatedPassword, RegisteredVoterResponse.class);
    }
}
