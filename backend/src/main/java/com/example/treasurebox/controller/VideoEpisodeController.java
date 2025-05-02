package com.example.treasurebox.controller;

import com.example.treasurebox.model.Episode;
import com.example.treasurebox.repository.EpisodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/watch")
public class VideoEpisodeController {

    private final EpisodeRepository episodeRepository;

    @Autowired
    public VideoEpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @GetMapping("/episode")
    public ResponseEntity<Resource> getEpisode(@RequestParam Long id, @RequestHeader HttpHeaders headers) {
        Optional<Episode> episodeOptional = episodeRepository.findById(id);

        if (episodeOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String decodedPath = java.net.URLDecoder.decode(episodeOptional.get().getEpisodeLocation(), StandardCharsets.UTF_8);
        System.out.println(decodedPath);
        File videoFile = new File(decodedPath);

        if (!videoFile.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (!videoFile.canRead()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            long fileLength = videoFile.length();
            String range = headers.getFirst(HttpHeaders.RANGE);
            long start = 0;
            long end = fileLength - 1;

            if (range != null && range.startsWith("bytes=")) {
                String[] ranges = range.substring(6).split("-");
                try {
                    start = Long.parseLong(ranges[0]);
                    if (ranges.length > 1 && !ranges[1].isEmpty()) {
                        end = Long.parseLong(ranges[1]);
                    }
                } catch (NumberFormatException ignored) {}
            }

            if (start >= fileLength) {
                return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                        .header(HttpHeaders.CONTENT_RANGE, "bytes */" + fileLength)
                        .build();
            }

            if (end >= fileLength) {
                end = fileLength - 1;
            }

            long contentLength = end - start + 1;

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(HttpHeaders.CONTENT_TYPE, "video/mp4");
            responseHeaders.set(HttpHeaders.ACCEPT_RANGES, "bytes");
            responseHeaders.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(contentLength));
            responseHeaders.set(HttpHeaders.CONTENT_RANGE, String.format("bytes %d-%d/%d", start, end, fileLength));

            InputStream inputStream = new FileInputStream(videoFile);
            inputStream.skip(start);

            return ResponseEntity.status(range != null ? HttpStatus.PARTIAL_CONTENT : HttpStatus.OK)
                    .headers(responseHeaders)
                    .body(new InputStreamResource(inputStream));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
