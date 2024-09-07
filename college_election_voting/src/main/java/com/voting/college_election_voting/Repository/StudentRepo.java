package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.voting.college_election_voting.Model.Students;

@Repository
public interface StudentRepo extends JpaRepository<Students,Integer>{

    Optional<Students> findByRegisterNumber(String regNo);
    
}
