package com.example.treasurebox.controller;


import com.example.treasurebox.dto.user.UserUpdateRequest;
import com.example.treasurebox.model.Film;
import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.FilmRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "${Frontend_Address}")
public class FilmController {

    private final FilmRepository filmRepository;

    public FilmController(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    @GetMapping
    public List<Film> getAllFilms() {

        return filmRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        Optional<Film> film = filmRepository.findById(id);
        return film.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilmById(@PathVariable Long id) {
        if (!filmRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        filmRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }



}
