package com.voting.college_election_voting.DTO;

import com.voting.college_election_voting.Model.Candidates;
import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.Voters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VotesDto {
    private Candidates candidate;
    private Positions position;
    private Voters voter;
    private Integer pageNo;
    private Integer pageSize;
    private Integer totalPages;
    private boolean isLastPage;
    private boolean isFirstPage;
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private Long totalNoOfVotes;
}
