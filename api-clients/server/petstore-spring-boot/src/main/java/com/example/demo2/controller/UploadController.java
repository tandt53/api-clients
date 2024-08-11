package com.example.demo2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v3")
public class UploadController {

    @PostMapping("/upload/multipart/form-data")
    public ResponseEntity<String> uploadFormData(@RequestParam("file") MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        String fileContent = new String(bytes);
        return ResponseEntity.status(HttpStatus.CREATED).body("ok");
    }

    @PostMapping("/upload/application/x-www-form-urlencoded")
    public ResponseEntity<String> uploadUrlEncoded(HttpServletRequest request) {
        String file = request.getParameter("file");
        return ResponseEntity.status(HttpStatus.CREATED).body(file);
    }

    @PostMapping("/upload/application/octet-stream")
    public ResponseEntity<String> uploadOctetStream(HttpServletRequest request) throws IOException {
        BufferedReader reader = request.getReader();
        String file = reader.lines().collect(Collectors.joining("\n"));
        return ResponseEntity.status(HttpStatus.CREATED).body(file);
    }
}
