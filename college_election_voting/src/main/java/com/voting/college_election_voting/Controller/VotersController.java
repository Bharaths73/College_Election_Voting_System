package com.voting.college_election_voting.Controller;

import java.util.List;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.voting.college_election_voting.DTO.CandidateDto;
import com.voting.college_election_voting.DTO.CandidateRegisterDto;
import com.voting.college_election_voting.DTO.GetVotersDto;
import com.voting.college_election_voting.DTO.OTPDto;
import com.voting.college_election_voting.DTO.PositionsDto;
import com.voting.college_election_voting.DTO.RegisteredVoterResponse;
import com.voting.college_election_voting.DTO.StrartOrStopElectionDto;
import com.voting.college_election_voting.DTO.UpdateUserDto;
import com.voting.college_election_voting.DTO.VoterLoginDto;
import com.voting.college_election_voting.DTO.VoterRegisterDto;
import com.voting.college_election_voting.DTO.VotingDto;
import com.voting.college_election_voting.Service.VotersService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/voter")
@CrossOrigin
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
   public ResponseEntity<RegisteredVoterResponse> register(@RequestBody @Valid VoterRegisterDto voter) throws Exception{
          RegisteredVoterResponse response=votersService.register(voter);
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

    @GetMapping("/candid")
    public ResponseEntity<?> getAllCandidates(){
        List<CandidateDto> candidates=votersService.getAllCandidates();
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

    @PostMapping("/iscandidate")
    public ResponseEntity<?> confirmCandidate(@RequestBody CandidateRegisterDto candidate) throws Exception{
        CandidateDto candidateDto=votersService.confirmCandidate(candidate);
        return new ResponseEntity<>(candidateDto,HttpStatus.OK);
    }

    @PostMapping("/vote")
    public ResponseEntity<?> voteToCandidate(@RequestBody List<VotingDto> votes) throws Exception{
        List<VotingDto> resultVotes=votersService.voteToCandidate(votes);
        return new ResponseEntity<>(resultVotes,HttpStatus.OK);
    }

    @PostMapping("/isvoted")
    public ResponseEntity<?> isVoted(@RequestBody RegisteredVoterResponse voter) throws Exception{
        List<VotingDto> resultVotes=votersService.isVoted(voter);
        return new ResponseEntity<>(resultVotes,HttpStatus.OK);
    }

    @DeleteMapping("/candidate/{id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable String id) throws Exception{
        votersService.deleteCandidate(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search_candidate/{query}")
    public ResponseEntity<?> searchCandidate(@PathVariable String query) throws Exception{
        CandidateDto candidateDto=votersService.searchCandidate(query);
        return new ResponseEntity<>(candidateDto,HttpStatus.OK);
    }

    @GetMapping("/search_position/{query}")
    public ResponseEntity<?> searchPosition(@PathVariable String query) throws Exception{
        PositionsDto positionsDto=votersService.searchPosition(query);
        return new ResponseEntity<>(positionsDto,HttpStatus.OK);
    }
   
    @PostMapping("/profile_pic")
    public ResponseEntity<?> updateProfilePic(@RequestPart MultipartFile file,@RequestParam(required = false) String pic_id) throws Exception{
        RegisteredVoterResponse voterRegisterDto=votersService.updateProfilePic(file,pic_id);
        return new ResponseEntity<>(voterRegisterDto,HttpStatus.OK);
    }

    @PutMapping(value = "/update_profile")
    public ResponseEntity<?> updateProfile(@RequestPart UpdateUserDto profile) throws Exception{
        RegisteredVoterResponse voterRegisterDto=votersService.updateProfile(profile);
        return new ResponseEntity<>(voterRegisterDto,HttpStatus.OK);
    }

    @PutMapping(value = "/update_password")
    public ResponseEntity<?> updatePassword(@RequestPart String oldPassword,String newPassword) throws Exception{
        RegisteredVoterResponse voterRegisterDto=votersService.updatePassword(oldPassword,newPassword);
        return new ResponseEntity<>(voterRegisterDto,HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<StrartOrStopElectionDto> checkStatus() throws Exception{
        StrartOrStopElectionDto electionDto=votersService.checkStatus();
            return new ResponseEntity<>(electionDto,HttpStatus.OK);
    } 
    
    
}
