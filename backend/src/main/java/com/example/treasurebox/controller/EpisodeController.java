package com.example.treasurebox.controller;

import com.example.treasurebox.dto.EpisodeListItem;
import com.example.treasurebox.model.Episode;
import com.example.treasurebox.repository.EpisodeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/episodes")
@CrossOrigin(origins = "http://localhost:3000")
public class EpisodeController {

    private final EpisodeRepository episodeRepository;
    public EpisodeController(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllEpisodes() {
        return ResponseEntity.ok(episodeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEpisodeById(@PathVariable Long id) {
        Optional<Episode> episode = episodeRepository.findById(id);
        if (episode.isPresent()) {
            return ResponseEntity.ok(episode.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Episode not found"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createEpisode(@RequestBody Episode episode) {
        Episode saved = episodeRepository.save(episode);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "id", saved.getId(), "message", "Episode created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEpisode(@PathVariable Long id, @RequestBody Episode updated) {
        Optional<Episode> optional = episodeRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Episode not found"));
        }

        Episode episode = optional.get();
        if (updated.getName() != null) episode.setName(updated.getName());
        if (updated.getEpisodeNumber() != null) episode.setEpisodeNumber(updated.getEpisodeNumber());
        if (updated.getEpisodeLocation() != null) episode.setEpisodeLocation(updated.getEpisodeLocation());
        if (updated.getHasCaptions() != null) episode.setHasCaptions(updated.getHasCaptions());
        if (updated.getCaptionsLocation() != null) episode.setCaptionsLocation(updated.getCaptionsLocation());
        if (updated.getSeason() != null) episode.setSeason(updated.getSeason());

        Episode saved = episodeRepository.save(episode);
        return ResponseEntity.ok(Map.of("success", true, "message", "Episode updated", "id", saved.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEpisode(@PathVariable Long id) {
        if (!episodeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Episode not found"));
        }
        episodeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-season/{seasonId}")
    public ResponseEntity<?> getEpisodesBySeasonId(@PathVariable Long seasonId) {
        List<Episode> episodes = episodeRepository.findBySeasonId(seasonId);
        return ResponseEntity.ok(episodes);
    }

    @GetMapping("/list")
    public List<EpisodeListItem> getEpisodeList() {
        return episodeRepository.findAllEpisodeListItems();
    }


}
