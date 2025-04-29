package com.example.treasurebox.model;

import com.example.treasurebox.repository.TVShowRepository;
import jakarta.persistence.*;

@Entity
@Table(name = "episode")
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "season_number", nullable = false)
    private int seasonNumber;

    @Column(name = "episode_number", nullable = false)
    private int episodeNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int duration;

    @Column(name = "episode_location", nullable = false)
    private String episodeLocation;

    @Column(name = "has_captions", nullable = false)
    private boolean hasCaptions;

    @Column(name = "captions_location")
    private String captionsLocation;

    @ManyToOne
    @JoinColumn(name = "tvshow_id", referencedColumnName = "id", nullable = false)
    private TVShow tvShow;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TVShow getTvShow() {
        return tvShow;
    }

    public void setTvShow(TVShow tvShow) {
        this.tvShow = tvShow;
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

    public String getEpisodeLocation() {
        return episodeLocation;
    }

    public void setEpisodeLocation(String episodeLocation) {
        this.episodeLocation = episodeLocation;
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

    public int getEpisodeNumber() {
        return episodeNumber;
    }

    public void setEpisodeNumber(int episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(int seasonNumber) {
        this.seasonNumber = seasonNumber;
    }
}
