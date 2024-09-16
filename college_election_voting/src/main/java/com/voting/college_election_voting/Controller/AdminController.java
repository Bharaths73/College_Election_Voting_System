package com.voting.college_election_voting.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.voting.college_election_voting.DTO.AdminDashBoardDto;
import com.voting.college_election_voting.DTO.AdminLoginDto;
import com.voting.college_election_voting.DTO.AdminRegisteredDto;
import com.voting.college_election_voting.DTO.CandidateDto;
import com.voting.college_election_voting.DTO.GetVotersDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.RegisteredVoterResponse;
import com.voting.college_election_voting.DTO.VoterLoginDto;
import com.voting.college_election_voting.DTO.VoterRegisterDto;
import com.voting.college_election_voting.DTO.VotesDto;
import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Service.AdminService;
import com.voting.college_election_voting.Service.VotersService;

import jakarta.validation.Valid;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;
    private VotersService votersService;

    public AdminController(AdminService adminService,VotersService votersService) {
        this.adminService = adminService;
        this.votersService=votersService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid VoterLoginDto loginDto) throws Exception{
        System.out.println("Admin controller");
        RegisteredVoterResponse adminRegisteredDto=votersService.login(loginDto);
        return new ResponseEntity<>(adminRegisteredDto,HttpStatus.OK);
    }

    @PostMapping("/profile")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> profile(@RequestBody VoterRegisterDto registerDto) throws Exception{
        String email=registerDto.getEmail();
        AdminRegisteredDto details=adminService.getDetails(email);
        return new ResponseEntity<>(details,HttpStatus.OK);
    }

    @GetMapping("/voters")
    public ResponseEntity<?> getVoters(@RequestParam(required = false,defaultValue = "0") Integer pageNo,@RequestParam(required = false,defaultValue = "10") Integer pageSize,@RequestParam(required = false,defaultValue = "profile.registerNumber") String sortBy){
       List<GetVotersDto> voters=adminService.getAllVoters(pageNo,pageSize,sortBy);
       return new ResponseEntity<>(voters,HttpStatus.OK);
    }

    @PostMapping("/position")
    public ResponseEntity<?> addPosition(@RequestBody PositionsDto position) throws Exception{
        PositionsDto positionsDto=adminService.addPosition(position);
        return new ResponseEntity<>(positionsDto,HttpStatus.OK);
    }

    @DeleteMapping("/position/{id}")
    public ResponseEntity<?> deletePosition(@PathVariable Integer id) throws Exception{
        List<PositionsDto> positions=adminService.deletePosition(id);
        return new ResponseEntity<>(positions,HttpStatus.OK);
    }

    @DeleteMapping("/candidate/{id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable String id) throws Exception{
        adminService.deleteCandidate(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardDetails() throws Exception{
        AdminDashBoardDto dashboard=adminService.getDashboardDetails();
        return new ResponseEntity<>(dashboard,HttpStatus.OK);
    }

    @GetMapping("/votes")
    public ResponseEntity<?> getAllVotes(@RequestParam(required = false,defaultValue = "0") Integer pageNo,@RequestParam(required = false,defaultValue = "10") Integer pageSize,@RequestParam(required = false,defaultValue = "id") String sortBy) throws Exception{
        List<VotesDto> votes=adminService.getAllVotes(pageNo,pageSize,sortBy);
        return new ResponseEntity<>(votes,HttpStatus.OK);
    }

    @DeleteMapping("/voters/{regNo}")
    public ResponseEntity<?> deleteVoter(@PathVariable String regNo) throws Exception{
        adminService.deleteVoter(regNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
