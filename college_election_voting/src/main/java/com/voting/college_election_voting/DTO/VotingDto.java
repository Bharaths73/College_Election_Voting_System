package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VotingDto{
    private String candidate;
    private PositionsDto position;
    private String voter;
}