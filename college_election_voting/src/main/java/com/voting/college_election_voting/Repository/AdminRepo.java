package com.voting.college_election_voting.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.Admin;


@Repository
public interface AdminRepo extends JpaRepository<Admin,Integer>{
    Optional<Admin> findByEmail(String email);
}
