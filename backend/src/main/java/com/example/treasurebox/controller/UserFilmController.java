package com.example.treasurebox.controller;

import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.UserFilmRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-films")
@CrossOrigin(origins = "http://localhost:3000")
public class UserFilmController {

    private final UserFilmRepository userFilmRepository;

    public UserFilmController(UserFilmRepository userFilmRepository) {
        this.userFilmRepository = userFilmRepository;
    }


    @GetMapping
    public ResponseEntity<?> getAllUserFilms() {
        return ResponseEntity.ok(userFilmRepository.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserFilmById(@PathVariable Long id) {
        Optional<UserFilm> userFilm = userFilmRepository.findById(id);
        if (userFilm.isPresent()) {
            return ResponseEntity.ok(userFilm.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User-Film relationship not found"));
        }
    }

    // Update the 'time_watched' for a specific user-film relationship
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserFilm(@PathVariable Long id, @RequestBody UserFilm updatedUserFilm) {
        Optional<UserFilm> optionalUserFilm = userFilmRepository.findById(id);
        if (optionalUserFilm.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User-Film relationship not found"));
        }

        UserFilm userFilm = optionalUserFilm.get();
        if (updatedUserFilm.getTimeWatched() != null) {
            userFilm.setTimeWatched(updatedUserFilm.getTimeWatched());
        }
        UserFilm savedUserFilm = userFilmRepository.save(userFilm);
        return ResponseEntity.ok(Map.of("success", true, "message", "User-Film relationship updated", "id", savedUserFilm.getId()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFilmsByUserId(@PathVariable Long userId) {
        List<UserFilm> userFilms = userFilmRepository.findByAppUserId(userId);
        if (userFilms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "No films found for this user"));
        }
        return ResponseEntity.ok(userFilms);
    }
}
