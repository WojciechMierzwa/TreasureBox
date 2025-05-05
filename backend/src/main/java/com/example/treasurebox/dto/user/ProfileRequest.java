package com.example.treasurebox.dto.user;

public class ProfileRequest {
    private int id;
    private String name;
    private int profilePicture;
    private boolean requireCredentials;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(int profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean getRequireCredentials() {
        return requireCredentials;
    }

    public void setRequireCredentials(boolean requireCredentials) {
        this.requireCredentials = requireCredentials;
    }
}
