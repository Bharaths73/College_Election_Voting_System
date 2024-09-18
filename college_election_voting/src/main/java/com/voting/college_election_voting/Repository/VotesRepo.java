package com.voting.college_election_voting.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.Votes;
import java.util.Set;

@Repository
public interface VotesRepo extends JpaRepository<Votes,Integer>{

    List<Votes> findByVoterId(Integer id);
    
}
