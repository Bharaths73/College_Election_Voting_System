package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.StrartOrStopElection;

@Repository
public interface StrartOrStopElectionRepo extends JpaRepository<StrartOrStopElection,Integer>{
    
}
