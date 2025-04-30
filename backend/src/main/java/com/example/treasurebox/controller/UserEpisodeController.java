package com.example.treasurebox.controller;

import com.example.treasurebox.model.User;
import com.example.treasurebox.model.UserEpisode;
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
}
