package com.example.treasurebox.controller;
import com.example.treasurebox.model.Episode;
import com.example.treasurebox.model.Film;
import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.EpisodeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/episodes")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "${Frontend_Address}")
public class EpisodeController {

    private final EpisodeRepository episodeRepository;

    public EpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @GetMapping
    public List<Episode> getAllEpisodes() {

        return episodeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Episode> getEpisodeById(@PathVariable Long id) {
        Optional<Episode> episode = episodeRepository.findById(id);
        return episode.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEpisodeById(@PathVariable Long id) {
        if (!episodeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        episodeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<Episode> addEpisode(@RequestBody Episode episode) {
        Episode savedEpisode = episodeRepository.save(episode);
        return new ResponseEntity<>(savedEpisode, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Episode> updateEpisode(@PathVariable Long id, @RequestBody Episode episode) {
        if (!episodeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        episode.setId(id);
        Episode updated = episodeRepository.save(episode);
        return ResponseEntity.ok(updated);
    }


}