package com.example.treasurebox.controller;


import com.example.treasurebox.dto.film.FilmCreateRequest;
import com.example.treasurebox.model.Film;
import com.example.treasurebox.repository.FilmRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


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

    @PostMapping
    public ResponseEntity<Film> createFilm(@RequestBody FilmCreateRequest request) {
        Film film = new Film();
        film.setName(request.getName());
        film.setFilmLocation(request.getFilmLocation());
        film.setMediaType("Movie");
        film.setDuration(0);
        film.setGenre(request.getGenre());
        film.setCaptionsLocation(request.getCaptionsLocation());
        film.setHasCaptions(request.isHasCaptions());
        Film savedFilm = filmRepository.save(film);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFilm);
    }

    @PutMapping
    public ResponseEntity<Film> updateFilm(@RequestBody Film request) {
        Optional<Film> optionalFilm = filmRepository.findById(request.getId());
        if (optionalFilm.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Film film = optionalFilm.get();
        film.setName(request.getName());
        film.setFilmLocation(request.getFilmLocation());
        film.setGenre(request.getGenre());
        film.setCaptionsLocation(request.getCaptionsLocation());
        film.setHasCaptions(request.isHasCaptions());

        Film savedFilm = filmRepository.save(film);
        return ResponseEntity.ok(savedFilm);
    }








}
