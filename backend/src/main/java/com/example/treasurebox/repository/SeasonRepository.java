package com.example.treasurebox.repository;

import com.example.treasurebox.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findBySeriesId(Long seriesId);
}
