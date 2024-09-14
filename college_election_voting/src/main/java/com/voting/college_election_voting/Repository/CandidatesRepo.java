package com.voting.college_election_voting.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.voting.college_election_voting.Model.Candidates;


@Repository
public interface CandidatesRepo extends JpaRepository<Candidates,Integer>{

    Optional<Candidates> findByRegisterNumber(String registerNumber);

    @Transactional
    void deleteByRegisterNumber(String id);
    
}
