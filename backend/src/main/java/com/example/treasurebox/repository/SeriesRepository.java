package com.example.treasurebox.repository;

import com.example.treasurebox.model.Series;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
    boolean existsByName(String name);

}
