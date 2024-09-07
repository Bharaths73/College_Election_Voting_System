package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminRegisteredDto {
    private String email;
    private String firstName;
    private String lastName;
    private String profilePic;
    private String token;
    private String role;
}
