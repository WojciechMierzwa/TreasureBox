package com.example.treasurebox.dto.user;

public class UserUpdateRequest {
    private Long id;
    private String name;
    private String password;
    private boolean requireCredentials;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public boolean isRequireCredentials() {
        return requireCredentials;
    }

    public void setRequireCredentials(boolean requireCredentials) {
        this.requireCredentials = requireCredentials;
    }

    @Override
    public String toString() {
        return "UserUpdateRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", requireCredentials=" + requireCredentials +
                '}';
    }
}
