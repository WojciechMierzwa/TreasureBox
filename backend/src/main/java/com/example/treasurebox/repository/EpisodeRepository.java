package com.example.treasurebox.repository;

import com.example.treasurebox.model.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    List<Episode> findBySeasonId(Long seasonId);
}
