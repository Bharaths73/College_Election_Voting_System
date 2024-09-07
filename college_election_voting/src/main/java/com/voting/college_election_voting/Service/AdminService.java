package com.voting.college_election_voting.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
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
import com.voting.college_election_voting.DTO.AdminRegisteredDto;
import com.voting.college_election_voting.DTO.GetVotersDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.VotesDto;
import com.voting.college_election_voting.Model.Admin;
import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.Voters;
import com.voting.college_election_voting.Model.Votes;
import com.voting.college_election_voting.Repository.AdminRepo;
import com.voting.college_election_voting.Repository.CandidatesRepo;
import com.voting.college_election_voting.Repository.PositionsRepo;
import com.voting.college_election_voting.Repository.VotersRepo;
import com.voting.college_election_voting.Repository.VotesRepo;

@Service
public class AdminService {

    private AuthenticationManager authenticationManager;
    private JWTService jwtService;
    private AdminRepo adminRepo;
    private CandidatesRepo candidatesRepo;
    private PositionsRepo positionsRepo;
    private VotersRepo votersRepo;
    private ModelMapper modelMapper;
    private VotesRepo votesRepo;

    

    public AdminService(AuthenticationManager authenticationManager,JWTService jwtService,AdminRepo adminRepo,CandidatesRepo candidatesRepo,PositionsRepo positionsRepo,VotersRepo votersRepo,ModelMapper modelMapper,VotesRepo votesRepo) {
        this.authenticationManager = authenticationManager;
        this.jwtService=jwtService;
        this.adminRepo=adminRepo;
        this.candidatesRepo=candidatesRepo;
        this.positionsRepo=positionsRepo;
        this.votersRepo=votersRepo;
        this.modelMapper=modelMapper;
        this.votesRepo=votesRepo;
    }



    public AdminRegisteredDto login(AdminLoginDto loginDto) throws Exception {
        System.out.println("Admin service");
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        if(!authentication.isAuthenticated()){
            throw new Exception("Failed to authenticate");
        }
         // System.out.println("Admin authenticated");
         AdminUserPrinciple adminUserPrinciple=(AdminUserPrinciple) authentication.getPrincipal();

         String token=jwtService.generateToken(adminUserPrinciple, loginDto.getEmail());

         AdminRegisteredDto response=AdminRegisteredDto.builder()
                                                       .token(token)
                                                       .firstName(adminUserPrinciple.getFirstName())
                                                       .lastName(adminUserPrinciple.getLastName())
                                                       .email(adminUserPrinciple.getEmail())
                                                       .profilePic(adminUserPrinciple.getProfilePic())
                                                       .role(adminUserPrinciple.getAuthorities().toString())
                                                       .build();
         return response;
    }



    public AdminRegisteredDto getDetails(String email) throws Exception {
        Optional<Admin> admin=adminRepo.findByEmail(email);
        if(!admin.isPresent()){
            throw new Exception("User Not Found");
        }
        Admin details=admin.get();
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
        List<GetVotersDto> voterRegisterDtos=new ArrayList<>();
        voters.getContent().forEach(voter->{
            GetVotersDto response=modelMapper.map(voter, GetVotersDto.class);
            response.setPageNo(voters.getNumber());
            response.setTotalPages(voters.getTotalPages());
            response.setPageSize(voters.getSize());
            response.setFirstPage(voters.isFirst());
            response.setHasNextPage(voters.hasNext());
            response.setLastPage(voters.isLast());
            response.setTotalNoOfVoters(voters.getTotalElements());
            response.setHasPreviousPage(voters.hasPrevious());
            voterRegisterDtos.add(response);
        });

       

        return voterRegisterDtos;
    }



    public PositionsDto addPosition(PositionsDto position) throws Exception {
        System.out.println("Request position is "+position.toString());
        List<Positions> isPosAvailabe=positionsRepo.findAll().stream().filter(pos->pos.getPositionName().equalsIgnoreCase(position.getPositionName().trim())).collect(Collectors.toList());

        if(!isPosAvailabe.isEmpty()){
            throw new Exception("Position already exists");
        }
        Positions positions=modelMapper.map(position, Positions.class);
        System.out.println(positions.toString());
        Positions savedPosition=positionsRepo.save(positions);
        PositionsDto positionsDto=modelMapper.map(savedPosition, PositionsDto.class);
        return positionsDto;
    }


    public void deletePosition(Integer id) throws Exception{
        Positions position=positionsRepo.findById(id).orElseThrow(()->new Exception("Position not found to delete"));
        positionsRepo.deleteById(id);
    }

    public void deleteCandidate(Integer id) throws Exception{
        Candidates position=candidatesRepo.findById(id).orElseThrow(()->new Exception("Candidate not found to delete"));
        candidatesRepo.deleteById(id);
    }



    public AdminDashBoardDto getDashboardDetails() {
        Long NoOfCandidates=candidatesRepo.count();
        Long NoOfPositions=positionsRepo.count();
        Long NoOfVoters=votersRepo.count();
        Long NoOfVotes=votesRepo.count();

        AdminDashBoardDto dashBoardDto=AdminDashBoardDto.builder().NoOfCandidates(NoOfCandidates).NoOfPositions(NoOfPositions).NoOfVoters(NoOfVoters).NoOfVotes(NoOfVotes).build();

        return dashBoardDto;

    }



    public List<VotesDto> getAllVotes(Integer pageNo,Integer pageSize,String sortBy) {

        Pageable pages=PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Votes> votes=votesRepo.findAll(pages);

        List<VotesDto> votesDtos=votes.getContent().stream().map(vote->VotesDto.builder().candidate(vote.getCandidate()).position(vote.getPosition()).voter(vote.getVoter()).isFirstPage(votes.isFirst()).isLastPage(votes.isLast()).hasNextPage(votes.hasNext()).hasPreviousPage(votes.hasPrevious()).pageNo(votes.getNumber()).pageSize(votes.getSize()).totalNoOfVotes(votes.getTotalElements()).totalPages(votes.getTotalPages()).build()).collect(Collectors.toList());

        return votesDtos;
    }
    
    
}
