package com.example.treasurebox.dto.user;

public class UserCreationRequest {
    private String name;  // changed from username to name
    private String password;
    private int profilePicture;
    private boolean requireCredentials;

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

    public boolean isRequireCredentials() {
        return requireCredentials;
    }

    public void setRequireCredentials(boolean requireCredentials) {
        this.requireCredentials = requireCredentials;
    }

    @Override
    public String toString() {
        return "UserCreationRequest{" +
                "name='" + name + '\'' +
                ", password='***'" +  // Masked password
                ", requireCredentials=" + requireCredentials +
                '}';
    }
}
