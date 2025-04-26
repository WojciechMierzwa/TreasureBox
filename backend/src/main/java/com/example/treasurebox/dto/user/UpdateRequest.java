package com.example.treasurebox.dto.user;

public class UpdateRequest {
    private int id;
    private String name;
    private String password;
    private String requireCredentials;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRequireCredentials() {
        return requireCredentials;
    }

    public void setRequireCredentials(String requireCredentials) {
        this.requireCredentials = requireCredentials;
    }
}
