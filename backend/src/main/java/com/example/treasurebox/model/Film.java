package com.example.treasurebox.model;

public class Film {
    private Long id;
    private String name;
    private int duration;
    private String filmLocation;
    private boolean hasCaptions;
    private String captionsLocation;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public boolean isHasCaptions(){
        return hasCaptions;
    }

    public String getFilmLocation() {
        return filmLocation;
    }
    public String getCaptionsLocation() {
        return captionsLocation;
    }

}
