package com.voting.college_election_voting.Config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.*;

import com.voting.college_election_voting.Filter.JWTFilter;
import com.voting.college_election_voting.Filter.JwtAuthenticationEntryPoint;
import com.voting.college_election_voting.Service.AdminUserDetailsService;
import com.voting.college_election_voting.Service.VoterDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    @Qualifier("voterDetailsService")
    private UserDetailsService voterDetailsService;

    @Autowired
    private JWTFilter jwtFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    @Qualifier("adminUserDetailsService")
    private UserDetailsService adminDetailsService;

    @Order(1)
    @Bean
    public SecurityFilterChain adminSecurityFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(customizor->customizor.disable())
                    .securityMatcher("/api/admin/**")
                    .authorizeHttpRequests(req->req.requestMatchers("/api/admin/login","/api/admin/register")
                    .permitAll()
                    .anyRequest()
                    .hasRole("ADMIN"))
                    .exceptionHandling(auth->auth.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                    // .httpBasic(Customizer.withDefaults())
                    .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                    .build();
    }
    
    @Order(2)
    @Bean
    public SecurityFilterChain voterSecurityFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(customizer->customizer.disable())
                    .securityMatcher("/api/voter/**")
                    .authorizeHttpRequests(req->req.requestMatchers("/api/voter/sendOtp","/api/voter/register","/api/voter/login")
                    .permitAll()
                    .anyRequest()
                    .hasRole("VOTER"))
                    .exceptionHandling(auth->auth.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                    .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                    .build();
                }

    
    @Bean
    public AuthenticationProvider voterAuthenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
        daoAuthenticationProvider.setUserDetailsService(voterDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationProvider adminAuthenticationProvider(){
        System.out.println("Admin auth provider");
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        provider.setUserDetailsService(adminDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        List<AuthenticationProvider> providers = new ArrayList<>();
        providers.add(adminAuthenticationProvider());
        providers.add(voterAuthenticationProvider());
        return new ProviderManager(providers);
    }

    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
    //     return config.getAuthenticationManager();
    // }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
