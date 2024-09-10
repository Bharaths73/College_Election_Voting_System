package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisteredVoterResponse {
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String email;
    private String Department;
    private String registerNumber;
    private String profilePicUrl;
    private String proficePicId;
    private String role;
    private String token;
    private boolean isVoted;
}
