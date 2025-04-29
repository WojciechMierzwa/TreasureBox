package com.example.treasurebox.controller;

import com.example.treasurebox.model.Episode;
import com.example.treasurebox.repository.EpisodeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/episodes")
@CrossOrigin(origins = "http://localhost:3000")
public class EpisodeController {

    private final EpisodeRepository episodeRepository;

    public EpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    // Pobierz wszystkie odcinki
    @GetMapping
    public ResponseEntity<List<Episode>> getAllEpisodes() {
        List<Episode> episodes = episodeRepository.findAll();
        return new ResponseEntity<>(episodes, HttpStatus.OK);
    }

    @GetMapping("/tvshow/{tvShowId}")
    public ResponseEntity<List<Episode>> getEpisodesByTvShowId(@PathVariable Long tvShowId) {
        List<Episode> episodes = episodeRepository.findByTvShowId(tvShowId);
        if (episodes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(episodes, HttpStatus.OK);
    }
    // Dodaj nowy odcinek
    @PostMapping
    public ResponseEntity<Episode> createEpisode(@RequestBody Episode episode) {
        Episode savedEpisode = episodeRepository.save(episode);
        return new ResponseEntity<>(savedEpisode, HttpStatus.CREATED);
    }

    // Usuń odcinek po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEpisode(@PathVariable Long id) {
        if (episodeRepository.existsById(id)) {
            episodeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
