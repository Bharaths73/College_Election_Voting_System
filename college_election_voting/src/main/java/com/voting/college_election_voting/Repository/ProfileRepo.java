package com.voting.college_election_voting.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.Profile;
import com.voting.college_election_voting.Model.Voters;

@Repository
public interface ProfileRepo extends JpaRepository<Profile,Integer>{
    Optional<Profile> findByRegisterNumber(String regNo);
}
