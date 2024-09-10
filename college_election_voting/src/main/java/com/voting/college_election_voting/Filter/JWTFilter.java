package com.voting.college_election_voting.Filter;

import java.io.IOException;

import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.voting.college_election_voting.ExceptionsHandler.Exceptions.InvalidTokenException;
import com.voting.college_election_voting.Service.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter{

    private JWTService jwtService;

    private UserDetailsService userDetailsService;

    

    public JWTFilter(JWTService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService=userDetailsService;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String authToken=request.getHeader("Authorization");
                String token=null;
                String username=null;

                if(authToken!=null && authToken.startsWith("Bearer")){
                    token=authToken.substring(7);
                    try {
                        username = jwtService.extractUserName(token);
                    } catch (Exception e) {
                        throw new InvalidTokenException("Token is invalid");
                    }
                }
                

                if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                    UserDetails userdetails;
                    String role = jwtService.extractUserRole(token); 
                    System.out.println(role);
                    userdetails=userDetailsService.loadUserByUsername(username);

                    if(jwtService.validateToken(token,userdetails)){
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userdetails, null,userdetails.getAuthorities());
                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    }
                    
                }

                filterChain.doFilter(request, response);
        
    }
    
}
