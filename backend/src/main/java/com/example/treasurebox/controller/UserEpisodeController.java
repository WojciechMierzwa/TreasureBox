package com.example.treasurebox.controller;

import com.example.treasurebox.model.User;
import com.example.treasurebox.model.UserEpisode;
import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.UserEpisodeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user-episodes")
@CrossOrigin(origins = "http://localhost:3000")
public class UserEpisodeController {

    private final UserEpisodeRepository userEpisodeRepository;

    public UserEpisodeController(UserEpisodeRepository userEpisodeRepository) {
        this.userEpisodeRepository = userEpisodeRepository;
    }

    @GetMapping
    public List<UserEpisode> getAllUsers() {

        return userEpisodeRepository.findAll();
    }
    @PostMapping
    public ResponseEntity<?> createUserEpisode(@RequestBody UserEpisode userEpisode) {
        try {
            // Validate required fields
            if (userEpisode.getAppUser() == null || userEpisode.getAppUser().getId() == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("success", false, "message", "User ID is required"));
            }

            if (userEpisode.getEpisode() == null || userEpisode.getEpisode().getId() == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("success", false, "message", "Episode ID is required"));
            }

            // Set default timeWatched if not provided
            if (userEpisode.getTimeWatched() == null) {
                userEpisode.setTimeWatched(0);
            }

            // Save the record
            UserEpisode savedEntity = userEpisodeRepository.save(userEpisode);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("success", true,
                            "message", "User-Episode record created",
                            "id", savedEntity.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false,
                            "message", "Failed to create User-Episode record",
                            "error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserEpisodeById(@PathVariable Long id) {
        Optional<UserEpisode> optional = userEpisodeRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Episode not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserEpisode(@PathVariable Long id, @RequestBody UserEpisode update) {
        Optional<UserEpisode> optional = userEpisodeRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User-Episode record not found"));
        }

        UserEpisode userEpisode = optional.get();
        if (update.getTimeWatched() != null) {
            userEpisode.setTimeWatched(update.getTimeWatched());
        }

        UserEpisode saved = userEpisodeRepository.save(userEpisode);
        return ResponseEntity.ok(Map.of("success", true, "message", "User-Episode updated", "id", saved.getId()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserEpisodesByUserId(@PathVariable Long userId) {
        List<UserEpisode> userEpisodes = userEpisodeRepository.findByAppUserId(userId);
        if (userEpisodes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "No episodes found for this user"));
        }
        return ResponseEntity.ok(userEpisodes);
    }

}
