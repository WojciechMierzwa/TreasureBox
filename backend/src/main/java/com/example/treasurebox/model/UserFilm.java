package com.example.treasurebox.model;

import jakarta.persistence.*;

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

    @Column(name = "film_state")
    private int filmState;

    public int getFilmState() {
        return filmState;
    }

    public void setFilmState(int filmState) {
        this.filmState = filmState;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
