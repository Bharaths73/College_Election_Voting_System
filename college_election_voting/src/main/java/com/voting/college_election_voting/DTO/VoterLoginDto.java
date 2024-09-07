package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoterLoginDto {

    @NotBlank(message = "Register Number cannot be blank")
    private String registerNo;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
