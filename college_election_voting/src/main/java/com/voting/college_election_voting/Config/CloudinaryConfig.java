package com.voting.college_election_voting.Config;

import java.util.Map;
import java.util.HashMap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
    
    @Bean
    public Cloudinary getCloudinary(){
        Map<String,String> config=new HashMap<>();
        config.put("cloud_name", "dykarkvaa");
        config.put("api_key", "959817311662267");
        config.put("api_secret","v6Z6Chlt82FZZfg0w3qxJv2Sruk");
        Cloudinary cloudinary=new Cloudinary(config);
        cloudinary.config.secure=true;
        return cloudinary;
    }
}
