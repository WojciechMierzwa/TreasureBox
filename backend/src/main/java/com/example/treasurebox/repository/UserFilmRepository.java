package com.example.treasurebox.repository;

import com.example.treasurebox.model.UserFilm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFilmRepository extends JpaRepository<UserFilm, Long> {
    List<UserFilm> findByFilmId(Long filmId);
    List<UserFilm> findByUserId(Long userId);
}
