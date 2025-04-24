package com.example.treasurebox.controller;

import com.example.treasurebox.dto.UserCreationRequest;
import com.example.treasurebox.dto.LoginRequest;
import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "${Frontend_Address}")
public class UserController {

    private final UserRepository userRepository;
    private static final Map<String, Long> sessionTokens = new ConcurrentHashMap<>();
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserCreationRequest request) {
        try {
            if (userRepository.existsByName(request.getName())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Username already exists");
                return ResponseEntity.badRequest().body(response);
            }

            User user = new User();
            System.out.println(request.toString());

            user.setName(request.getName());
            user.setPassword(request.getPassword());
            user.setRequireCredentials(request.isRequireCredentials());
            user.setProfilePicture((int)(Math.random() * 4) + 1);

            User savedUser = userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("userId", savedUser.getId());
            response.put("success", true);
            response.put("message", "User created successfully");

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error creating user: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByName(request.getName());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        User user = optionalUser.get();

        // If the user requires a password, validate it
        if (user.isRequireCredentials() && !request.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid password"));
        }

        // Generate and store token
        String token = UUID.randomUUID().toString();

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "userId", user.getId(),
                "username", user.getName(),
                "token", token
        ));
    }
}





