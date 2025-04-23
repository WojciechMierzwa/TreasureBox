package com.example.treasurebox.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/video")
public class VideoController {

    private final String VIDEO_PATH = "C:/Users/wojci/Videos/Nagrania ekranu/2.mp4";

    @GetMapping
    public ResponseEntity<Resource> getVideo(@RequestHeader HttpHeaders headers) {
        File videoFile = new File(VIDEO_PATH);

        // Enhanced error logging
        if (!videoFile.exists()) {
            System.out.println("File not found: " + VIDEO_PATH);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (!videoFile.canRead()) {
            System.out.println("Cannot read file (permission denied): " + VIDEO_PATH);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            long fileLength = videoFile.length();
            String range = headers.getFirst(HttpHeaders.RANGE);
            long start = 0;
            long end = fileLength - 1;

            // Process range header if present
            if (range != null && range.startsWith("bytes=")) {
                String[] ranges = range.substring(6).split("-");
                try {
                    start = Long.parseLong(ranges[0]);
                    if (ranges.length > 1 && !ranges[1].isEmpty()) {
                        end = Long.parseLong(ranges[1]);
                    }
                } catch (NumberFormatException ignored) {
                    System.out.println("Invalid range header: " + range);
                }
            }

            if (start >= fileLength) {
                System.out.println("Range start beyond file length");
                return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                        .header(HttpHeaders.CONTENT_RANGE, "bytes */" + fileLength)
                        .build();
            }

            if (end >= fileLength) {
                end = fileLength - 1;
            }

            long contentLength = end - start + 1;

            // Create response with appropriate headers
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(HttpHeaders.CONTENT_TYPE, "video/mp4");
            responseHeaders.set(HttpHeaders.ACCEPT_RANGES, "bytes");
            responseHeaders.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(contentLength));

            if (range != null) {
                responseHeaders.set(HttpHeaders.CONTENT_RANGE, String.format("bytes %d-%d/%d", start, end, fileLength));
                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                        .headers(responseHeaders)
                        .body(getResourceFromFile(videoFile, start, contentLength));
            } else {
                return ResponseEntity.status(HttpStatus.OK)
                        .headers(responseHeaders)
                        .body(getResourceFromFile(videoFile, 0, fileLength));
            }

        } catch (IOException e) {
            System.out.println("Error streaming video: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Helper method to create a resource from file with proper resource management
    private Resource getResourceFromFile(File file, long start, long length) throws IOException {
        InputStream inputStream = new FileInputStream(file);
        inputStream.skip(start);
        return new InputStreamResource(inputStream);
    }
}