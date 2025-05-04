package com.example.treasurebox.repository;

import com.example.treasurebox.dto.EpisodeListItem;
import com.example.treasurebox.model.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    List<Episode> findBySeasonId(Long seasonId);

    @Query("SELECT new com.example.treasurebox.dto.EpisodeListItem(e.id, e.episodeNumber, s.name, t.name, e.name) " +
            "FROM Episode e " +
            "LEFT JOIN e.season s " +
            "LEFT JOIN s.series t")
    List<EpisodeListItem> findAllEpisodeListItems();


}
