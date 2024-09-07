package com.voting.college_election_voting.DTO;

import com.voting.college_election_voting.Model.Positions;
import com.voting.college_election_voting.Model.Votes;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateDto {
    private String firstName;
    private String lastName;
    private String profilePic;
    private String department;
    private String registerNumber;
    private Positions position;
    private Integer votes;
    private Integer pageNo;
    private Integer pageSize;
    private Integer totalPages;
    private boolean isLastPage;
    private boolean isFirstPage;
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private Long totalNoOfCandidates;
}
