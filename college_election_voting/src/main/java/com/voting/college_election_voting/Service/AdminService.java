package com.voting.college_election_voting.Service;

import java.util.Set;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.voting.college_election_voting.DTO.AdminDashBoardDto;
import com.voting.college_election_voting.DTO.AdminLoginDto;
import com.voting.college_election_voting.DTO.AdminOtpDto;
import com.voting.college_election_voting.DTO.AdminRegisteredDto;
import com.voting.college_election_voting.DTO.GetVotersDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.StrartOrStopElectionDto;
import com.voting.college_election_voting.DTO.VotesDto;
import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.StrartOrStopElection;
import com.voting.college_election_voting.Model.Voters;
import com.voting.college_election_voting.Model.Votes;
import com.voting.college_election_voting.Repository.CandidatesRepo;
import com.voting.college_election_voting.Repository.PositionsRepo;
import com.voting.college_election_voting.Repository.StrartOrStopElectionRepo;
import com.voting.college_election_voting.Repository.VotersRepo;
import com.voting.college_election_voting.Repository.VotesRepo;

import jakarta.validation.Valid;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private final AuthenticationManager authenticationManager;
    private JWTService jwtService;
    private CandidatesRepo candidatesRepo;
    private PositionsRepo positionsRepo;
    private VotersRepo votersRepo;
    private ModelMapper modelMapper;
    private VotesRepo votesRepo;
    private StrartOrStopElectionRepo strartOrStopElectionRepo;


    public AdminService(AuthenticationManager authenticationManager,JWTService jwtService,CandidatesRepo candidatesRepo,PositionsRepo positionsRepo,VotersRepo votersRepo,ModelMapper modelMapper,VotesRepo votesRepo,StrartOrStopElectionRepo strartOrStopElectionRepo) {
        this.authenticationManager = authenticationManager;
        this.jwtService=jwtService;
        this.candidatesRepo=candidatesRepo;
        this.positionsRepo=positionsRepo;
        this.votersRepo=votersRepo;
        this.modelMapper=modelMapper;
        this.votesRepo=votesRepo;
        this.strartOrStopElectionRepo=strartOrStopElectionRepo;
    }



    // public AdminRegisteredDto login(AdminLoginDto loginDto) throws Exception {
    //     System.out.println("Admin service");
    //     Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getIdentity(), loginDto.getPassword()));

    //     // if(!authentication.isAuthenticated()){
    //     //     throw new Exception("Failed to authenticate");
    //     // }
    //     //  // System.out.println("Admin authenticated");
    //     //  AdminUserPrinciple adminUserPrinciple=(AdminUserPrinciple) authentication.getPrincipal();

    //     //  String token=jwtService.generateToken(adminUserPrinciple, loginDto.getIdentity());

    //      AdminRegisteredDto response=AdminRegisteredDto.builder().build();
    //                                                 //    .build();
    //                                                 //    .token(token)
    //                                                 //    .firstName(adminUserPrinciple.getFirstName())
    //                                                 //    .lastName(adminUserPrinciple.getLastName())
    //                                                 //    .email(adminUserPrinciple.getEmail())
    //                                                 //    .profilePic(adminUserPrinciple.getProfilePic())
    //                                                 //    .role(adminUserPrinciple.getAuthorities().toString())
    //                                                 //    .build();
    //      return response;
    // }



    public AdminRegisteredDto getDetails(String email) throws Exception {
        Optional<Voters> admin=votersRepo.findByEmail(email);
        if(!admin.isPresent()){
            throw new Exception("User Not Found");
        }
        Voters details=admin.get();
        AdminRegisteredDto response=AdminRegisteredDto.builder()
                                                        .email(details.getEmail())
                                                        .firstName(details.getFirstName())
                                                        .lastName(details.getLastName())
                                                        .profilePic(details.getProfilePicUrl())
                                                        .build();
        return response;
    }



    public List<GetVotersDto> getAllVoters(Integer pageNo,Integer pageSize,String sortBy) {

        Pageable page=PageRequest.of(pageNo, pageSize,Sort.by(sortBy));

        Page<Voters> voters=votersRepo.findAll(page);
        List<GetVotersDto> voterRegisterDtos=voters.getContent().stream().filter(voter->"VOTER".equals(voter.getRole().name())).map(voter->
            GetVotersDto.builder().firstName(voter.getFirstName()).lastName(voter.getLastName()).mobileNumber(voter.getMobileNumber()).email(voter.getEmail()).profilePic(voter.getProfilePicUrl()).registerNumber(voter.getProfile().getRegisterNumber()).pageNo(voters.getNumber()).department(voter.getProfile().getDepartment()).
            totalPages(voters.getTotalPages()).
            pageSize(voters.getSize()).
           isFirstPage(voters.isFirst()).
            hasNextPage(voters.hasNext()).
            isLastPage(voters.isLast()).isVoted(voter.getProfile().isVoted()).
            totalNoOfVoters(voters.getTotalElements()).
            hasPreviousPage(voters.hasPrevious()).build()
        ).collect(Collectors.toList());

        List<Voters> dummy=voters.getContent();
        dummy.forEach(voter->System.out.println(voter.getRole()));
        System.out.println(voterRegisterDtos.toString());
        return voterRegisterDtos;
    }



    public PositionsDto addPosition(PositionsDto position) throws Exception {
        System.out.println("Request position is "+position.toString());
        if(position.getPositionName().isBlank()){
            throw new Exception("Position name cannot be blank");
        }
        List<Positions> isPosAvailabe=positionsRepo.findAll().stream().filter(pos->pos.getPositionName().equalsIgnoreCase(position.getPositionName().trim())).collect(Collectors.toList());

        if(!isPosAvailabe.isEmpty()){
            throw new Exception("Position already exists");
        }
        Positions positions=modelMapper.map(position, Positions.class);
        System.out.println(positions.toString());
        positions.setPositionName(positions.getPositionName().trim());
        Positions savedPosition=positionsRepo.save(positions);
        
        PositionsDto positionsDto=modelMapper.map(savedPosition, PositionsDto.class);
        return positionsDto;
    }


    public List<PositionsDto> deletePosition(Integer id) throws Exception{
        Positions position=positionsRepo.findById(id).orElseThrow(()->new Exception("Position not found to delete"));
        positionsRepo.deleteById(id);
        List<Positions> positions=positionsRepo.findAll();
        List<PositionsDto> positionsDtos=positions.stream().map(pos->modelMapper.map(pos, PositionsDto.class)).collect(Collectors.toList());
        return positionsDtos;
    }



    public AdminDashBoardDto getDashboardDetails() {
        Long NoOfCandidates=candidatesRepo.count();
        Long NoOfPositions=positionsRepo.count();
        List<Voters> voters=votersRepo.findAll().stream().filter((voter)->"VOTER".equals(voter.getRole().name())).collect(Collectors.toList());
        Set<Voters> votes=votesRepo.findAll().stream().map((vote)->vote.getVoter()).collect(Collectors.toSet());
        int NoOfVoters=voters.size();
        int NoOfVotes=votes.size();

        AdminDashBoardDto dashBoardDto=AdminDashBoardDto.builder().NoOfCandidates(NoOfCandidates).NoOfPositions(NoOfPositions).NoOfVoters(NoOfVoters).NoOfVotes(NoOfVotes).build();

        return dashBoardDto;

    }



    public List<VotesDto> getAllVotes(Integer pageNo,Integer pageSize,String sortBy) {

        Pageable pages=PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Votes> votes=votesRepo.findAll(pages);

        List<VotesDto> votesDtos=votes.getContent().stream().map(vote->VotesDto.builder().candidate(vote.getCandidate()).position(vote.getPosition()).voter(vote.getVoter()).isFirstPage(votes.isFirst()).isLastPage(votes.isLast()).hasNextPage(votes.hasNext()).hasPreviousPage(votes.hasPrevious()).pageNo(votes.getNumber()).pageSize(votes.getSize()).totalNoOfVotes(votes.getTotalElements()).totalPages(votes.getTotalPages()).build()).collect(Collectors.toList());

        return votesDtos;
    }



    @Transactional
    public void deleteVoter(String regNo) throws Exception {
        if(regNo.isBlank()){
            throw new Exception("Register number is empty");
        }
        Optional<Voters> voter=votersRepo.findByRegisterNumber(regNo);
        if(!voter.isPresent()){
            throw new Exception("Voter is not present in database");
        }
        // votesRepo.deleteAll(votesRepo.findByVoterId(voter.get().getId()));
        votersRepo.deleteVotesById(voter.get().getId());
        votersRepo.deleteVoterByRegisterNumber(regNo);
        votersRepo.deleteProfileByRegisterNumber(regNo);
        
    }



    @Transactional
    public void resetVotes() {
        votesRepo.deleteAll();
        List<Voters> voters=votersRepo.findAll();
        voters.forEach((voter)->voter.getProfile().setVoted(false));
        votersRepo.saveAll(voters);
    }

    public void resetVoters() {
        // votersRepo.deleteAll();
        List<Voters> voters=votersRepo.findAll();
        List<Voters> filteredVoter=voters.stream().filter((voter)->"VOTER".equals(voter.getRole().name())).collect(Collectors.toList());
        votersRepo.deleteAll(filteredVoter);
    }
    
    public void resetCandidates() {
        candidatesRepo.deleteAll();
    }
    
    public void resetPositions() {
        positionsRepo.deleteAll();
    }



    public PositionsDto editPosition(PositionsDto positionsDto) throws Exception {
        Optional<Positions> position=positionsRepo.findById(positionsDto.getId());

        if(!position.isPresent()){
            throw new Exception("Position Id is not present");
        }
        if(positionsDto.getPositionName().isBlank()){
            throw new Exception("Position name cannot be blank");
        }
        List<Positions> isPosAvailabe=positionsRepo.findAll().stream().filter(pos->pos.getPositionName().equalsIgnoreCase(positionsDto.getPositionName().trim())).collect(Collectors.toList());

        if(!isPosAvailabe.isEmpty()){
            throw new Exception("Position already exists");
        }
        Positions positions=modelMapper.map(positionsDto, Positions.class);
        Positions updatedPosition=positionsRepo.save(positions);
        return modelMapper.map(updatedPosition, PositionsDto.class);
    }


    public GetVotersDto searchVoter(String query) throws Exception {
        Optional<Voters> voter=votersRepo.findByRegisterNumber(query.trim());
        if(!voter.isPresent()){
            throw new Exception("Voter with register number not present");
        }

        GetVotersDto votersDto=modelMapper.map(voter.get(), GetVotersDto.class);
        votersDto.setDepartment(voter.get().getProfile().getDepartment());
        votersDto.setRegisterNumber(voter.get().getProfile().getRegisterNumber());
        return votersDto;
    }



    public StrartOrStopElectionDto startOrStopElection(StrartOrStopElectionDto electionDto) {
        List<StrartOrStopElection> isElectionActive=strartOrStopElectionRepo.findAll();
        if(isElectionActive.size()!=0){
            StrartOrStopElection strartOrStopElection=isElectionActive.get(0);
            strartOrStopElection.setStartOrStop(!isElectionActive.get(0).isStartOrStop());
            return modelMapper.map( strartOrStopElectionRepo.save(strartOrStopElection), StrartOrStopElectionDto.class);
        }
        return modelMapper.map(strartOrStopElectionRepo.save(modelMapper.map(electionDto, StrartOrStopElection.class)),StrartOrStopElectionDto.class);
        
    }

    public StrartOrStopElectionDto checkStatus() {
        List<StrartOrStopElection> isElectionActive=strartOrStopElectionRepo.findAll();
       if(isElectionActive.size()!=0){
        StrartOrStopElection strartOrStopElection=isElectionActive.get(0);
        return modelMapper.map(strartOrStopElection,StrartOrStopElectionDto.class);
       }
       return StrartOrStopElectionDto.builder().startOrStop(false).build();
    }
    
}
