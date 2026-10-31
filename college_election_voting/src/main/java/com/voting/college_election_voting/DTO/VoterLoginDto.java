package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoterLoginDto {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Enter valid email")
    private String identity;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
