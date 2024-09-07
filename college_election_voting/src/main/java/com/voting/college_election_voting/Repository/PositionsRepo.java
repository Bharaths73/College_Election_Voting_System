package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voting.college_election_voting.Model.Positions;

@Repository
public interface PositionsRepo extends JpaRepository<Positions,Integer>{
    
}
