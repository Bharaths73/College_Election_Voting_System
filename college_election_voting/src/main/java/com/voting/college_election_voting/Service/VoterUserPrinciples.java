package com.voting.college_election_voting.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.function.Supplier;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.voting.college_election_voting.Model.Profile;
import com.voting.college_election_voting.Model.Role;
import com.voting.college_election_voting.Model.Voters;

public class VoterUserPrinciples implements UserDetails{


    private Voters voter;

    public VoterUserPrinciples(Voters voter){
        this.voter=voter;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority=new SimpleGrantedAuthority("ROLE_"+voter.getRole());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return voter.getPassword();
    }

    @Override
    public String getUsername() {
        return voter.getEmail();
    }

    public String getEmail(){
        return voter.getEmail();
    }

    public String getProfilePic(){
        return voter.getProfilePicUrl();
    }

    public String getMobileNo(){
        return voter.getMobileNumber();
    }

    public String getFirstName(){
        return voter.getFirstName();
    }
    
    public String getLastName(){
        return voter.getLastName();
    }

    public Profile getProfile(){
        return voter.getProfile();
    }

    public String getRegNo(){
        return voter.getProfile().getRegisterNumber();
    }

    public String getDepartment(){
        return voter.getProfile().getDepartment();
    }

    public String getProfilePicId(){
        return voter.getProficePicId();
    }
}
