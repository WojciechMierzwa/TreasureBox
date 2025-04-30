package com.example.treasurebox.controller;

import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.UserFilmRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-films")
@CrossOrigin(origins = "http://localhost:3000")
public class UserFilmController {

    private final UserFilmRepository userFilmRepository;

    public UserFilmController(UserFilmRepository userFilmRepository) {
        this.userFilmRepository = userFilmRepository;
    }

    @PostMapping
    public UserFilm addUserFilm(@RequestBody UserFilm userFilm) {
        return userFilmRepository.save(userFilm);
    }

    @GetMapping
    public ResponseEntity<List<UserFilm>> getAllUserFilms() {
        List<UserFilm> userFilms = userFilmRepository.findAll();
        return ResponseEntity.ok(userFilms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserFilm> getUserFilmById(@PathVariable Long id) {
        return userFilmRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/films/{userId}")
    public ResponseEntity<List<UserFilm>> getFilmsByUser(@PathVariable Long userId) {
        List<UserFilm> userFilms = userFilmRepository.findByUserId(userId);
        return ResponseEntity.ok(userFilms);
    }

    // Updated endpoint to update the state of a user's film with the full UserFilm object
    @PutMapping("/{userFilmId}")
    public ResponseEntity<UserFilm> updateUserFilmState(
            @PathVariable Long userFilmId,
            @RequestBody UserFilm userFilm) {

        return userFilmRepository.findById(userFilmId)
                .map(existingUserFilm -> {
                    // Update the stateFilm with the new value from the request body
                    existingUserFilm.setFilmState(userFilm.getFilmState());

                    // You can add more fields here if needed (e.g., timeWatched, etc.)

                    userFilmRepository.save(existingUserFilm);
                    return ResponseEntity.ok(existingUserFilm);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
