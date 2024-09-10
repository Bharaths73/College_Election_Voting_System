package com.voting.college_election_voting.Response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class ApiResponse<T> {

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING, timezone = "UTC")
    private LocalDateTime timeStamp;

    private T data;
    private ErrorResponse error;

    public ApiResponse(){
        this.timeStamp=LocalDateTime.now();
    }

    public ApiResponse(ErrorResponse error){
        this();
        this.error=error;
    }

    public ApiResponse(T data){
        this();
        this.data=data;
    }

    

}
