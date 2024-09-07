package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.voting.college_election_voting.Model.OTP;
import java.util.Optional;

public interface OTPRepo extends JpaRepository<OTP,Integer>{
    Optional<OTP> findByEmail(String email);
}
