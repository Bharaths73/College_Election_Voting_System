package com.voting.college_election_voting.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.voting.college_election_voting.Model.Voters;
import com.voting.college_election_voting.Repository.VotersRepo;

@Service
public class VoterDetailsService implements UserDetailsService{

    private VotersRepo votersRepo;

    

    public VoterDetailsService(VotersRepo votersRepo) {
        this.votersRepo = votersRepo;
    }



    @Override
    public UserDetails loadUserByUsername(String regNo) throws UsernameNotFoundException {
        Optional<Voters> voter=votersRepo.findByRegisterNumber(regNo);
        Voters user;
        if(voter.isPresent()){
            user=voter.get();
        }
        else{
            throw new UsernameNotFoundException("User Not Found");
        }
        return new VoterUserPrinciples(user);
    }
    
}
