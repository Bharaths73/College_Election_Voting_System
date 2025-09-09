package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.OTP;
import java.util.Optional;

@Repository
public interface OTPRepo extends JpaRepository<OTP,Integer>{
    Optional<OTP> findByEmail(String email);
}
