package com.voting.college_election_voting.DTO;

import com.voting.college_election_voting.Model.Positions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateRegisterDto {
    private String email;
    private String registerNumber;
    private String password;
    private PositionsDto position;
}
