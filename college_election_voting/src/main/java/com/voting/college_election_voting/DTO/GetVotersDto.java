package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetVotersDto {
    private String registerNumber;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String email;
    private String Department;
    private String profilePicUrl;
    private Integer pageNo;
    private Integer pageSize;
    private Integer totalPages;
    private boolean isLastPage;
    private boolean isFirstPage;
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private Long totalNoOfVoters;
    private boolean isVoted;
}
