package com.voting.college_election_voting.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.stream.Collectors;

@Service
public class JWTService {
    private final String SECRET="5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public String generateToken(UserDetails user,String identity){
        Map<String,Object> claims=new HashMap<>();
        List<String> roles=user.getAuthorities().stream().map(role->role.getAuthority()).collect(Collectors.toList());
        claims.put("role",roles.get(0));
        return createToken(claims,identity);
    }

    private String createToken(Map<String, Object> claims, String identity) {
       return Jwts.builder()
                  .claims()
                  .add(claims)
                  .subject(identity)
                  .issuedAt(new Date(System.currentTimeMillis()))
                  .expiration(new Date(System.currentTimeMillis()+60*60*30*1000L))
                  .and()
                  .signWith(getSignKey())
                  .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes=Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    public boolean validateToken(String token, UserDetails userdetails) {
        final String userName=extractUserName(token);
        return(userName.equals(userdetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
        
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
        .verifyWith(getSignKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    }
}
