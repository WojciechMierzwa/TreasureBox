package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "film")
public class Film {
    //CREATE TABLE film (
    //    id SERIAL PRIMARY KEY,
    //    name TEXT NOT NULL,
    //    duration INTEGER NOT NULL,
    //    film_location TEXT NOT NULL,
    //    has_captions BOOLEAN NOT NULL,
    //    captions_location TEXT,
    //    genre TEXT
    //);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "film_location", nullable = false)
    private String filmLocation;
    @Column(name = "has_captions", nullable = false)
    private boolean hasCaptions;
    @Column(name = "captions_location")
    private String captionsLocation;
    @Column(name = "genre")
    private String genre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFilmLocation() {
        return filmLocation;
    }

    public void setFilmLocation(String filmLocation) {
        this.filmLocation = filmLocation;
    }

    public boolean isHasCaptions() {
        return hasCaptions;
    }

    public void setHasCaptions(boolean hasCaptions) {
        this.hasCaptions = hasCaptions;
    }

    public String getCaptionsLocation() {
        return captionsLocation;
    }

    public void setCaptionsLocation(String captionsLocation) {
        this.captionsLocation = captionsLocation;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
