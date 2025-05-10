package com.example.treasurebox.controller;

import com.example.treasurebox.model.Series;
import com.example.treasurebox.repository.SeriesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/series")
@CrossOrigin(origins = "http://localhost:3000")
public class SeriesController {

    private final SeriesRepository seriesRepository;

    public SeriesController(SeriesRepository seriesRepository) {
        this.seriesRepository = seriesRepository;
    }

    @GetMapping
    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    @GetMapping("/count")
    public long getSeriesCount() {
        return seriesRepository.count();
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getSeriesById(@PathVariable Long id) {
        Optional<Series> series = seriesRepository.findById(id);
        if (series.isPresent()) {
            return ResponseEntity.ok(series.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Series not found"));
        }
    }






    @PostMapping
    public ResponseEntity<?> createSeries(@RequestBody Series series) {
        if (seriesRepository.existsByName(series.getName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", "Series with that name already exists"));
        }
        Series saved = seriesRepository.save(series);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "id", saved.getId(), "message", "Series created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeries(@PathVariable Long id, @RequestBody Series update) {
        Optional<Series> optional = seriesRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Series not found"));
        }

        Series series = optional.get();
        if (update.getName() != null) series.setName(update.getName());
        if (update.getGenre() != null) series.setGenre(update.getGenre());
        if (update.getPicture() != null) series.setPicture(update.getPicture());
        if (update.getSeasonCount() != null) series.setSeasonCount(update.getSeasonCount());
        if (update.getEpisodesCount() != null) series.setEpisodesCount(update.getEpisodesCount());

        Series saved = seriesRepository.save(series);
        return ResponseEntity.ok(Map.of("success", true, "message", "Series updated", "id", saved.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeries(@PathVariable Long id) {
        if (!seriesRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Series not found"));
        }
        seriesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
