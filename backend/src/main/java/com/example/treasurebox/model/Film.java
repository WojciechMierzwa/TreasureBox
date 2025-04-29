package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int duration;
    private String filmLocation;
    private boolean hasCaptions;
    private String captionsLocation;
    private String mediaType;
    private String genre;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getCaptionsLocation() {
        return captionsLocation;
    }

    public void setCaptionsLocation(String captionsLocation) {
        this.captionsLocation = captionsLocation;
    }

    public boolean isHasCaptions() {
        return hasCaptions;
    }

    public void setHasCaptions(boolean hasCaptions) {
        this.hasCaptions = hasCaptions;
    }

    public String getFilmLocation() {
        return filmLocation;
    }

    public void setFilmLocation(String filmLocation) {
        this.filmLocation = filmLocation;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
