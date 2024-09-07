package com.voting.college_election_voting.Response;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;


@RestControllerAdvice
public class GlobalResponseHandler<T> implements ResponseBodyAdvice<T>{

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter arg1, MediaType arg2, Class arg3, ServerHttpRequest arg4,
            ServerHttpResponse arg5) {
                if(body instanceof ApiResponse){
                    return body;
                }
                return new ApiResponse<>(body);
    }

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
       return true;
    }
    
}
