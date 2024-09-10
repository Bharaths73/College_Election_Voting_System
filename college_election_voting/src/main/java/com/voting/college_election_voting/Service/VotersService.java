package com.voting.college_election_voting.Service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import com.voting.college_election_voting.DTO.CandidateDto;
import com.voting.college_election_voting.DTO.CandidateRegisterDto;
import com.voting.college_election_voting.DTO.OTPDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.RegisteredVoterResponse;
import com.voting.college_election_voting.DTO.VoterLoginDto;
import com.voting.college_election_voting.DTO.VoterRegisterDto;
import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Model.OTP;
import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.Profile;
import com.voting.college_election_voting.Model.Role;
import com.voting.college_election_voting.Model.Students;
import com.voting.college_election_voting.Model.Voters;
import com.voting.college_election_voting.Repository.CandidatesRepo;
import com.voting.college_election_voting.Repository.OTPRepo;
import com.voting.college_election_voting.Repository.PositionsRepo;
import com.voting.college_election_voting.Repository.ProfileRepo;
import com.voting.college_election_voting.Repository.StudentRepo;
import com.voting.college_election_voting.Repository.VotersRepo;

import java.util.List;
import java.util.Map;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    @Autowired
    private ProfileRepo profileRepo;

    public VotersService(VotersRepo votersRepo,StudentRepo studentRepo,EmailService emailService,OTPRepo otpRepo,ModelMapper modelMapper,CloudinaryImageService cloudinaryImageService, AuthenticationManager authenticationManager,JWTService jwtService,CandidatesRepo candidatesRepo,PositionsRepo positionsRepo) {
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
    }



    @Transactional
    public RegisteredVoterResponse register(VoterRegisterDto voter, MultipartFile file) throws Exception{
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
        Map data=cloudinaryImageService.upload(file);
        Voter.setProfilePicUrl((String)data.get("url"));
        Voter.setProficePicId((String)data.get("public_id"));
        Voter.setRole(Role.VOTER);
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
        String token=jwtService.generateToken(voter,voter.getRegNo());
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
                                                        .Department(voter.getDepartment())
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
                                                        .Department(details.getProfile().getDepartment())
                                                        .mobileNumber(details.getMobileNumber())
                                                        .profilePicUrl(details.getProfilePicUrl())
                                                        .registerNumber(details.getProfile().getRegisterNumber())
                                                        .build();
        return response;
    }


     public List<CandidateDto> getAllCandidates(Integer pageNo,Integer pageSize,String sortBy) {

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
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(candidate.getRegisterNumber(), candidate.getPassword()));

        if(!authentication.isAuthenticated()){
            throw new Exception("Failed to Authenticate User");
        }



        Optional<Voters> authCandidate=votersRepo.findByRegisterNumber(candidate.getRegisterNumber());
        if (!authCandidate.isPresent()) {
            throw new Exception("Voter not found");
        }

        Optional<Positions> position=positionsRepo.findById(candidate.getPosition().getId());

        if(!position.isPresent()){
            throw new Exception("Position Not Found");
        }
        Positions positions=position.get();
        Voters voter=authCandidate.get();
        Candidates candidates=modelMapper.map(voter, Candidates.class);
        candidates.setPosition(positions);
        List<Candidates> posCandidates=positions.getCandidates();
        // if(posCandidates==null){
        //     posCandidates=new ArrayList<>();
        // }
        posCandidates.add(candidates);
        positions.setCandidates(posCandidates);
        Candidates savedCandidates=candidatesRepo.save(candidates);
        CandidateDto candidateDto=modelMapper.map(savedCandidates, CandidateDto.class);
        return candidateDto;
    }
    
    
}
