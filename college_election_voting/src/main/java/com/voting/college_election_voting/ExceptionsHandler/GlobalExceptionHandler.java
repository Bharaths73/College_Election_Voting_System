package com.voting.college_election_voting.ExceptionsHandler;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.voting.college_election_voting.ExceptionsHandler.Exceptions.InvalidTokenException;
import com.voting.college_election_voting.Response.ApiResponse;
import com.voting.college_election_voting.Response.ErrorResponse;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
    });
    return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);   
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> exceptionHandler(Exception e){
        ErrorResponse errorResponse=ErrorResponse.builder().error("Internal Server Error").message(e.getMessage()).build();
  
        return new ResponseEntity<>(new ApiResponse<>(errorResponse), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> tokenException(InvalidTokenException e){
        ErrorResponse errorResponse=ErrorResponse.builder().error("Internal Server Error").message(e.getMessage()).build();
  
        return new ResponseEntity<>(new ApiResponse<>(errorResponse), HttpStatus.BAD_REQUEST);
    }
}
