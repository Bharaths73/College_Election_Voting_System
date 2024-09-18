package com.voting.college_election_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import com.voting.college_election_voting.Model.Voters;


@Repository
public interface VotersRepo extends JpaRepository<Voters,Integer>{
    Optional<Voters> findByEmail(String email);

    @Query("SELECT v FROM Voters v JOIN v.profile p WHERE p.registerNumber = :regNo")
    Optional<Voters> findByRegisterNumber(@Param("regNo") String regNo);

    @Transactional
    @Query("DELETE FROM Voters v WHERE v.profile.registerNumber= :regNo")
    @Modifying
    void deleteVoterByRegisterNumber(@Param("regNo") String regNo);

    @Transactional
    @Query("DELETE FROM Profile v WHERE v.registerNumber= :regNo")
    @Modifying
    void deleteProfileByRegisterNumber(@Param("regNo") String regNo);

}
