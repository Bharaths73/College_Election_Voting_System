package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile{
    @NotBlank(message = "Register Number cannot be Blank")
    private String registerNumber;

    @NotBlank(message = "Department cannot be blank")
    private String Department;
}
