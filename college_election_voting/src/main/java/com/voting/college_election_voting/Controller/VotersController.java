package com.voting.college_election_voting.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.voting.college_election_voting.DTO.CandidateDto;
import com.voting.college_election_voting.DTO.CandidateRegisterDto;
import com.voting.college_election_voting.DTO.OTPDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.RegisteredVoterResponse;
import com.voting.college_election_voting.DTO.VoterLoginDto;
import com.voting.college_election_voting.DTO.VoterRegisterDto;
import com.voting.college_election_voting.Service.VotersService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/voter")
public class VotersController {

    private VotersService votersService;

    public VotersController(VotersService votersService) {
        this.votersService = votersService;
    }

   @PostMapping("/sendOtp")
   public ResponseEntity<VoterRegisterDto> sendOtp(@RequestBody @Valid OTPDto voter) throws Exception{
         votersService.sendOTP(voter);
         return new ResponseEntity<>(HttpStatus.OK);
   } 

   @PostMapping("/register")
   public ResponseEntity<RegisteredVoterResponse> register(@RequestPart @Valid VoterRegisterDto voter, @RequestPart(required = false) MultipartFile file) throws Exception{
          RegisteredVoterResponse response=votersService.register(voter, file);
          return new ResponseEntity<>(response,HttpStatus.OK);
   }

   @PostMapping("/login")
   public ResponseEntity<?> login(@RequestBody @Valid VoterLoginDto loginDto) throws Exception{
        RegisteredVoterResponse voter=votersService.login(loginDto);
        return new ResponseEntity<>(voter,HttpStatus.OK);
   }

   @PostMapping("/profile")
    public ResponseEntity<?> profile(@RequestBody VoterRegisterDto registerDto) throws Exception{
        String email=registerDto.getEmail();
        RegisteredVoterResponse details=votersService.getDetails(email);
        return new ResponseEntity<>(details,HttpStatus.OK);
    }

    @GetMapping("/candidates")
    public ResponseEntity<?> getCandidates(@RequestParam(required = false,defaultValue = "0") Integer pageNo,@RequestParam(required = false,defaultValue = "10") Integer pageSize,@RequestParam(required = false,defaultValue = "registerNumber") String sortBy){
        List<CandidateDto> candidates=votersService.getAllCandidates(pageNo,pageSize,sortBy);
        return new ResponseEntity<>(candidates,HttpStatus.OK);
    }

    @GetMapping("/positions")
    public ResponseEntity<?> getPositions(){
       List<PositionsDto> positions=votersService.getAllPositions();
       return new ResponseEntity<>(positions,HttpStatus.OK);
    }

    @PostMapping("/candidate")
    public ResponseEntity<?> registerCandidate(@RequestBody CandidateRegisterDto candidate) throws Exception{
        CandidateDto candidateDto=votersService.registerAsCandidate(candidate);
        return new ResponseEntity<>(candidateDto,HttpStatus.OK);
    }

    // @PostMapping("/vote")
    // public ResponseEntity<?> voteToCandidate(@RequestBody CandidateRegisterDto candidate) throws Exception{
    //     votersService.voteToCandidate(candidate);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }
    
}
