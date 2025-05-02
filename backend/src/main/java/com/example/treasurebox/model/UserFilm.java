package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user_film")
public class UserFilm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time_watched")
    private Integer timeWatched;

    @ManyToOne
    @JoinColumn(name = "app_user_id", referencedColumnName = "id", nullable = false)
    private User appUser;

    @ManyToOne
    @JoinColumn(name = "film_id", referencedColumnName = "id", nullable = false)
    private Film film;

    // Gettery i Settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}
