package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "episode")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "season_number", nullable = false)
    private Integer seasonNumber;

    @Column(name = "episode_number", nullable = false)
    private Integer episodeNumber;

    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "episode_location", nullable = false)
    private String episodeLocation;

    @Column(name = "has_captions", nullable = false)
    private Boolean hasCaptions;

    @Column(name = "captions_location")
    private String captionsLocation;

    @ManyToOne
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(Integer seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public Integer getEpisodeNumber() {
        return episodeNumber;
    }

    public void setEpisodeNumber(Integer episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getEpisodeLocation() {
        return episodeLocation;
    }

    public void setEpisodeLocation(String episodeLocation) {
        this.episodeLocation = episodeLocation;
    }

    public Boolean getHasCaptions() {
        return hasCaptions;
    }

    public void setHasCaptions(Boolean hasCaptions) {
        this.hasCaptions = hasCaptions;
    }

    public String getCaptionsLocation() {
        return captionsLocation;
    }

    public void setCaptionsLocation(String captionsLocation) {
        this.captionsLocation = captionsLocation;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }
}
