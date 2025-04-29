package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appuser")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String name;
    private String password;
    private int profilePicture;
    private boolean requireCredentials;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }


    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getProfilePicture() { return profilePicture; }
    public void setProfilePicture(int profilePicture) { this.profilePicture = profilePicture; }

    public boolean getRequireCredentials() { return requireCredentials; }
    public void setRequireCredentials(boolean requireCredentials) { this.requireCredentials = requireCredentials; }

    public boolean isRequireCredentials() {
        return requireCredentials;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
