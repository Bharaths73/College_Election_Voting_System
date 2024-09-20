package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.voting.college_election_voting.Model.StrartOrStopElection;

public interface StrartOrStopElectionRepo extends JpaRepository<StrartOrStopElection,Integer>{
    
}
