package com.example.treasurebox.controller;

import com.example.treasurebox.model.TVShow;
import com.example.treasurebox.repository.TVShowRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/TVShow")
@CrossOrigin(origins = "http://localhost:3000")
public class TVShowController {
    private final TVShowRepository tvShowRepository;

    public TVShowController(TVShowRepository tvShowRepository) {
        this.tvShowRepository = tvShowRepository;
    }

    @GetMapping
    public List<TVShow> getAllTVShows() {
        return tvShowRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TVShow> getTVShowById(@PathVariable Long id) {
        Optional<TVShow> tvShow = tvShowRepository.findById(id);
        return tvShow.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTVShowById(@PathVariable Long id) {  
        if (!tvShowRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tvShowRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
