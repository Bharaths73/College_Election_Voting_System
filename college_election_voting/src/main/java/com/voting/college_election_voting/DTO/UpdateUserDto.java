package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String department;
}
