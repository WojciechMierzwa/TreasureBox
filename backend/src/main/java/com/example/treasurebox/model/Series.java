package com.example.treasurebox.model;
import jakarta.persistence.*;

@Entity
@Table(name = "series")
public class Series {
    //CREATE TABLE series (
    //    id SERIAL PRIMARY KEY,
    //    name TEXT NOT NULL,
    //    genre TEXT NOT NULL,
    //    picture TEXT,
    //    season_count INTEGER,
    //    episodes_count INTEGER
    //);
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "genre", nullable = false)
    private String genre;
    @Column(name = "picture")
    private String picture;
    @Column(name = "season_count")
    private Integer seasonCount;
    @Column(name = "episodes_count")
    private Integer episodesCount;

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

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Integer getSeasonCount() {
        return seasonCount;
    }

    public void setSeasonCount(Integer seasonCount) {
        this.seasonCount = seasonCount;
    }

    public Integer getEpisodesCount() {
        return episodesCount;
    }

    public void setEpisodesCount(Integer episodesCount) {
        this.episodesCount = episodesCount;
    }
}
