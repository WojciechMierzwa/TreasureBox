package com.example.treasurebox.repository;
import com.example.treasurebox.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {
    boolean existsByName(String name);

    Optional<Film> findByName(String name);

    Optional<Film> findById(long id);


}