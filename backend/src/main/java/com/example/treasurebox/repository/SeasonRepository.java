package com.example.treasurebox.repository;

import com.example.treasurebox.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRepository extends JpaRepository<Season, Long> {
}
