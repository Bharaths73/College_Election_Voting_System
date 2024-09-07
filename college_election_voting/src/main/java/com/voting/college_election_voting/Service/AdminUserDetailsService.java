package com.voting.college_election_voting.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.voting.college_election_voting.Model.Admin;
import com.voting.college_election_voting.Repository.AdminRepo;
import java.util.Optional;

@Service
public class AdminUserDetailsService implements UserDetailsService{

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Admin> admin=adminRepo.findByEmail(email);
        Admin user;
        if(admin.isPresent()){
            System.out.println("Admin user details service");
            user=admin.get();
        }
        else{
            throw new UsernameNotFoundException("User is not present");
        }
        return new AdminUserPrinciple(user);
    }
    
}
