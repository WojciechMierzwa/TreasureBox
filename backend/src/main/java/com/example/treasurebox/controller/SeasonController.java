package com.example.treasurebox.controller;

import com.example.treasurebox.model.Season;
import com.example.treasurebox.repository.SeasonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/seasons")
@CrossOrigin(origins = "http://localhost:3000")
public class SeasonController {

    private final SeasonRepository seasonRepository;

    public SeasonController(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    // Get all seasons
    @GetMapping
    public ResponseEntity<?> getAllSeasons() {
        return ResponseEntity.ok(seasonRepository.findAll());
    }

    // Get a specific season by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSeasonById(@PathVariable Long id) {
        Optional<Season> season = seasonRepository.findById(id);
        if (season.isPresent()) {
            return ResponseEntity.ok(season.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Season not found"));
        }
    }

    // Create a new season
    @PostMapping
    public ResponseEntity<?> createSeason(@RequestBody Season season) {
        Season savedSeason = seasonRepository.save(season);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "id", savedSeason.getId(), "message", "Season created"));
    }

    // Update an existing season
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeason(@PathVariable Long id, @RequestBody Season updatedSeason) {
        Optional<Season> existingSeason = seasonRepository.findById(id);
        if (existingSeason.isPresent()) {
            Season season = existingSeason.get();
            if (updatedSeason.getName() != null) season.setName(updatedSeason.getName());
            if (updatedSeason.getSeries() != null) season.setSeries(updatedSeason.getSeries());
            Season savedSeason = seasonRepository.save(season);
            return ResponseEntity.ok(Map.of("success", true, "message", "Season updated", "id", savedSeason.getId()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Season not found"));
        }
    }

    // Delete a season by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeason(@PathVariable Long id) {
        if (!seasonRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Season not found"));
        }
        seasonRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-series/{seriesId}")
    public ResponseEntity<?> getSeasonsBySeriesId(@PathVariable Long seriesId) {
        List<Season> seasons = seasonRepository.findBySeriesId(seriesId);
        return ResponseEntity.ok(seasons);
    }
}
