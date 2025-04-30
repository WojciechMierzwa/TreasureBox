package com.example.treasurebox.repository;

import com.example.treasurebox.model.UserFilm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFilmRepository extends JpaRepository<UserFilm, Long> {

}
