package com.example.treasurebox.repository;

import com.example.treasurebox.model.UserEpisode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEpisodeRepository extends JpaRepository<UserEpisode, Long> {
}
