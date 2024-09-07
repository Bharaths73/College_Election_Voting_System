package com.voting.college_election_voting.Service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.voting.college_election_voting.Model.Admin;
import java.util.Collections;


public class AdminUserPrinciple implements UserDetails{
    
    private Admin admin;

    public AdminUserPrinciple(Admin admin){
        System.out.println("Admin user principles");
        this.admin=admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority=new SimpleGrantedAuthority("ROLE_"+admin.getRole().name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
       return admin.getPassword();
    }

    @Override
    public String getUsername() {
       return admin.getEmail();
    }

    public String getEmail(){
        return admin.getEmail();
    }

    public String getProfilePic(){
        return admin.getProfilePicUrl();
    }

    public String getFirstName(){
        return admin.getFirstName();
    }
    
    public String getLastName(){
        return admin.getLastName();
    }
    
}
