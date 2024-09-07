package com.voting.college_election_voting.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import java.util.Map;
import java.util.Arrays;
import java.util.List;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryImageService {
    
    private Cloudinary cloudinary;

    private final List<String> allowedMimeTypes = Arrays.asList("image/jpeg","image/jpg", "image/png", "image/gif");

    public CloudinaryImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    private boolean isImageFile(MultipartFile file) {
        String mimeType = file.getContentType();
        return allowedMimeTypes.contains(mimeType);
    }

    public Map upload(MultipartFile file) throws Exception{
        if(!isImageFile(file)){
            throw new Exception("Image file type is not supported");
        }

        Map data;
        Map params=ObjectUtils.asMap("folder", "voting_system");
        try {
            data = this.cloudinary.uploader().upload(file.getBytes(), params);
            return data;
        } catch (Exception e) {
            throw new Exception("Image uploading failed");
        }
    }

    public Map deleteFile(String publicId, String resourceType) throws Exception {
        Map options = ObjectUtils.asMap("resource_type", "image");
        return cloudinary.uploader().destroy(publicId, options);
    }
}
