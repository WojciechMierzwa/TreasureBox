package com.example.treasurebox.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "appuserfilm")
public class UserFilm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "film_id", referencedColumnName = "id")
    private Film film;

    @ManyToOne
    @JoinColumn(name = "appuser_id", referencedColumnName = "id")
    private User user;

    //private int timeWatched;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    /*
    public int getTimeWatched() {
        return timeWatched;
    }

    public void setTimeWatched(int timeWatched) {
        this.timeWatched = timeWatched;
    }*/

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }
}