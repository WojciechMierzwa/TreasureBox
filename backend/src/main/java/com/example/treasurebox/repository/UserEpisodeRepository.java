package com.example.treasurebox.repository;

import com.example.treasurebox.model.UserEpisode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserEpisodeRepository extends JpaRepository<UserEpisode, Long> {
    List<UserEpisode> findByAppUserId(Long userId);


}
