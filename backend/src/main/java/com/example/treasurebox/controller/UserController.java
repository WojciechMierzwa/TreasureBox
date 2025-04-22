package com.example.treasurebox.controller;

import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${Frontend_Address}")
public class UserController {


    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserCreationRequest request) {

        try {

            if (userRepository.existsByName(request.getUsername())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Username already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Create new user
            User user = new User();
            System.out.println(request.toString());
            user.setName(request.getUsername());
            user.setProfilePicture((int)(Math.random() * 4) + 1);

            // Save to database
            User savedUser = userRepository.save(user);

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("userId", savedUser.getId());
            response.put("success", true);
            response.put("message", "User created successfully");

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public static class UserCreationRequest {
        private String username;
        private String password;
        private boolean requireCredentials;

        // Getters and setters
        public String getUsername() {
            return username;
        }
        @Override
        public String toString() {
            return "UserCreationRequest{" +
                    "username='" + username + '\'' +
                    ", password='***'" +  // or password if you really want to show it
                    ", requireCredentials=" + requireCredentials +
                    '}';
        }


        public void setUsername(String username) {
            this.username = username;
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
    }

}