package com.voting.college_election_voting.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// @Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminLoginDto {

    @NotBlank(message = "Email cannot be blank")
    @Email
    private String identity;

    @NotBlank(message = "password cannot be blank")
    private String password;

    

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    
}
