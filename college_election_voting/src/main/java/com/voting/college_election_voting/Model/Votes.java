package com.voting.college_election_voting.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.aspectj.asm.internal.Relationship;

//🧠 But Conceptually Votes tables Represents:
//Voter ↔ Candidate (Many-to-Many)
//Because:
//One voter can vote for many candidates (across different positions)
//One candidate can receive votes from many voters
//That many-to-many relationship is resolved using the votes table.

//🏗 Full Relationship Overview
//Position (1) ---- (Many) Candidates
//Voter (1) ---- (Many) Votes
//Candidate (1) ---- (Many) Votes
//Position (1) ---- (Many) Votes
//And logically:
//Voter ----< Votes >---- Candidate
//              |
//              |
//           Position


@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Votes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    One candidate can receive many votes
//    Each vote is for exactly one candidate
//    Relationship:
//    Candidate (1) -------- (Many) Votes
    @ManyToOne
    @JsonManagedReference
    private Candidates candidate;


//    One position can have many votes
//    Each vote belongs to exactly one position
//    Relationship:
//    Position (1) -------- (Many) Votes
// should make position_id unique in votes table to prevent multiple votes for same position by same voter
    @ManyToOne
    @JsonManagedReference
    private Positions position;

//    One voter can cast many votes
//    Each vote belongs to exactly one voter
//    Relationship:
//    Voter (1) -------- (Many) Votes
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(unique = true)
    private Voters voter;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Candidates getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidates candidate) {
        this.candidate = candidate;
    }

    public Positions getPosition() {
        return position;
    }

    public void setPosition(Positions position) {
        this.position = position;
    }

    public Voters getVoter() {
        return voter;
    }

    public void setVoter(Voters voter) {
        this.voter = voter;
    }

    
}

//🎯 Why UNIQUE (voter_id, position_id)?
//This constraint enforces:
//One voter → one vote per position
//So:
//A voter can vote for President once
//A voter can vote for Secretary once
//But cannot vote twice for President


//🎯 What Happens During Insert?
//Case 1️⃣ First Vote (Valid)
//INSERT INTO votes (voter_id, candidate_id, position_id)
//VALUES (10, 3, 1);
//If no existing row with:
//        (voter_id = 10 AND position_id = 1)
//        ✅ Insert succeeds.
//

//Case 2️⃣ Duplicate Vote for Same Position
//If you try again:
//INSERT INTO votes (voter_id, candidate_id, position_id)
//VALUES (10, 5, 1);
//Now database checks:
//Is there already (10,1)?
//Yes → constraint violation.
//Database throws error:
//Duplicate entry '10-1' for key 'unique_vote_per_position'
//Insert fails.

//🔥 Important: What If voter_id Is Same But position_id Is Different?
//Example:
//INSERT INTO votes (voter_id, candidate_id, position_id)
//VALUES (10, 8, 2);
//This is allowed because:
//        (10,2) ≠ (10,1)
//So:
//✔ Same voter
//✔ Different position
//✔ Insert succeeds


//🎯 If You Ask:
//        “Is UNIQUE on voter_id alone enough?”
//Example:
//UNIQUE (voter_id)
//What This Means
//A voter can vote only once in the entire election
//They cannot vote for multiple positions


//What Is a Many-to-Many Relationship?
//A many-to-many (M:N) relationship means:
//One record in Table A can relate to many records in Table B
//       AND
//One record in Table B can relate to many records in Table A
//It cannot be implemented directly using just a foreign key.
//You must use a junction (bridge) table.

//🎯 How This Relates to Your Voting System
//In your system:
//Voter ↔ Candidate
//One voter can vote for many candidates (different positions)
//One candidate receives votes from many voters
//That is logically many-to-many.
//But you implemented it using:
//votes table
//So:
//Voter (1) ---- (Many) Votes
//Candidate (1) ---- (Many) Votes
//That votes table is your junction table.