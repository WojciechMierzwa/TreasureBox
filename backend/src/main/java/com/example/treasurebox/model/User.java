// com.example.treasurebox.model.User.java
package com.example.treasurebox.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "profile_picture")
    private int profilePicture;
    @Transient
    private boolean requireCredentials;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getProfilePicture() { return profilePicture; }
    public void setProfilePicture(int profilePicture) { this.profilePicture = profilePicture; }


}
