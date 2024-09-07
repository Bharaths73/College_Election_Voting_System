package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoterRegisterDto {

    @NotBlank(message = "Register Number cannot be Blank")
    private String registerNumber;

    @NotBlank(message = "First Name cannot be Blank")
    private String firstName;

    @NotBlank(message = "Last Name cannot be Blank")
    private String lastName;

    @Positive(message = "Mobile number cannot be negative")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number should contain exactly 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Should satisfy email format")
    private String email;

    @NotBlank(message = "Password cannot be Blank")
    // @Pattern(regexp = "^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&#])[A-Za-z\\d@$!%?&#]{8,20}$", 
    //      message = "Password must be between 8 and 20 characters long, and include at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    private String password;

    @NotBlank(message = "Department cannot be blank")
    private String Department;

    @NotBlank(message = "OTP cannot be blank")
    private String otp;
}
