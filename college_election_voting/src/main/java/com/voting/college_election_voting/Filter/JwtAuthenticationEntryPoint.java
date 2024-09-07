package com.voting.college_election_voting.Filter;


import org.apache.http.HttpStatus;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties.Error;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.voting.college_election_voting.Response.ApiResponse;
import com.voting.college_election_voting.Response.ErrorResponse;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationEntryPoint extends Http403ForbiddenEntryPoint{
    
    @Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2)
			throws IOException, JsonProcessingException, java.io.IOException {
		ErrorResponse errorResponse=ErrorResponse.builder()
                                                 .error("authentication error")
                                                 .message(arg2.getMessage())
                                                 .build();
        ApiResponse<ErrorResponse> apiResponse=new ApiResponse<>(errorResponse);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        // Write the error response as JSON
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
	}
}
