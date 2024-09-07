package com.voting.college_election_voting.ExceptionsHandler.Exceptions;

public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException(String message){
        super(message);
    }
}
