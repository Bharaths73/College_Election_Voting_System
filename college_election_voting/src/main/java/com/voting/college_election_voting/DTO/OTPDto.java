package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OTPDto {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Should satisfy email format")
    private String email;

    @NotBlank(message = "Register Number cannot be Blank")
    private String registerNumber;

    private String role;
}
