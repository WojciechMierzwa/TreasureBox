package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user_episode")
public class UserEpisode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_watched")
    private boolean isWatched;

    public boolean isWatched() {
        return isWatched;
    }

    public void setWatched(boolean watched) {
        isWatched = watched;
    }

    @Column(name = "time_watched")
    private Integer timeWatched;

    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false)
    private User appUser;


    @ManyToOne
    @JoinColumn(name = "episode_id", nullable = false)
    private Episode episode;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Integer getTimeWatched() {
        return timeWatched;
    }

    public void setTimeWatched(Integer timeWatched) {
        this.timeWatched = timeWatched;
    }

    public User getAppUser() {
        return appUser;
    }

    public void setAppUser(User appUser) {
        this.appUser = appUser;
    }

    public Episode getEpisode() {
        return episode;
    }

    public void setEpisode(Episode episode) {
        this.episode = episode;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
