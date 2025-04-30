package com.example.treasurebox.repository;

import com.example.treasurebox.model.UserFilm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserFilmRepository extends JpaRepository<UserFilm, Long> {
    List<UserFilm> findByFilmId(Long filmId);
    List<UserFilm> findByUserId(Long userId);
    @Transactional
    @Modifying
    @Query("DELETE FROM UserFilm uf WHERE uf.film.id = :filmId")
    void deleteByFilmId(Long filmId);

    public List<UserFilm> findByUserIdAndFilmState(Long userId, int filmState);

}
