package com.example.treasurebox.controller;


import com.example.treasurebox.dto.film.FilmCreateRequest;
import com.example.treasurebox.model.Film;
import com.example.treasurebox.model.Series;
import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.FilmRepository;
import com.example.treasurebox.repository.UserFilmRepository;
import com.example.treasurebox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Konstruktor
    public FilmController(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    // Pobieranie wszystkich filmów
    @GetMapping
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    @GetMapping("/count")
    public long getFilmCount() {
        return filmRepository.count();
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getSeriesById(@PathVariable Long id) {
        Optional<Film> film = filmRepository.findById(id);
        if (film.isPresent()) {
            return ResponseEntity.ok(film.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Film not found"));
        }
    }

    // Usuwanie filmu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilmById(@PathVariable Long id) {
        if (!filmRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        filmRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Dodawanie filmu
    @PostMapping
    public ResponseEntity<?> createFilm(@RequestBody FilmCreateRequest request) {
        Film film = new Film();
        film.setName(request.getName());
        film.setFilmLocation(request.getFilmLocation());
        film.setHasCaptions(request.isHasCaptions());
        film.setCaptionsLocation(request.getCaptionsLocation());
        film.setGenre(request.getGenre());

        // Zapisanie nowego filmu
        Film savedFilm = filmRepository.save(film);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "filmId", savedFilm.getId(),
                "message", "Film created successfully"
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFilm(@PathVariable Long id, @RequestBody Film request) {
        Optional<Film> optionalFilm = filmRepository.findById(id);
        if (optionalFilm.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Film not found"));
        }

        Film film = optionalFilm.get();
        if (request.getName() != null && !request.getName().isEmpty()) {
            film.setName(request.getName());
        }
        if (request.getFilmLocation() != null && !request.getFilmLocation().isEmpty()) {
            film.setFilmLocation(request.getFilmLocation());
        }
        if (request.isHasCaptions() != film.isHasCaptions()) {
            film.setHasCaptions(request.isHasCaptions());
        }
        if (request.getCaptionsLocation() != null && !request.getCaptionsLocation().isEmpty()) {
            film.setCaptionsLocation(request.getCaptionsLocation());
        }
        if (request.getGenre() != null && !request.getGenre().isEmpty()) {
            film.setGenre(request.getGenre());
        }
        Film updatedFilm = filmRepository.save(film);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "filmId", updatedFilm.getId(),
                "message", "Film updated successfully"
        ));
    }
}
