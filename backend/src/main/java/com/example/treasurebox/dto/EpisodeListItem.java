package com.example.treasurebox.dto;

public class EpisodeListItem {
    private Long episodeId;
    private int episodeNumber;
    private String seasonName;
    private String seriesName;

    public EpisodeListItem(Long episodeId, int episodeNumber, String seasonName, String seriesName) {
        this.episodeId = episodeId;
        this.episodeNumber = episodeNumber;
        this.seasonName = seasonName;
        this.seriesName = seriesName;
    }

    public Long getEpisodeId() {
        return episodeId;
    }

    public int getEpisodeNumber() {
        return episodeNumber;
    }

    public String getSeasonName() {
        return seasonName;
    }

    public String getSeriesName() {
        return seriesName;
    }
}
