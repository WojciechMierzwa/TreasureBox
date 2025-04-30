package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profile_picture", nullable = false)
    private int profilePicture;

    @Column(name = "require_credentials", nullable = false)
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
