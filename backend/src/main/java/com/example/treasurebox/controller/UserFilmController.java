package com.example.treasurebox.controller;

import com.example.treasurebox.model.Film;
import com.example.treasurebox.model.User;
import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.UserFilmRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    @GetMapping("/users/{filmId}")
    public ResponseEntity<List<UserFilm>> getUsersByFilm(@PathVariable Long filmId) {
        List<UserFilm> userFilms = userFilmRepository.findByFilmId(filmId);


        return ResponseEntity.ok(userFilms);
    }
}
