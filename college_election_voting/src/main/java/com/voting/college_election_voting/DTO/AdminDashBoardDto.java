package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDashBoardDto {
    private Long NoOfCandidates;
    private Long NoOfPositions;
    private Long NoOfVoters;
    private Long NoOfVotes;
}
