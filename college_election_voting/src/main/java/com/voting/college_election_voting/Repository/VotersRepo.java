package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.voting.college_election_voting.Model.Voters;


@Repository
public interface VotersRepo extends JpaRepository<Voters,Integer>{
    Optional<Voters> findByEmail(String email);
    Optional<Voters> findByRegisterNumber(String regNo);
}
