package com.example.treasurebox.controller;

import com.example.treasurebox.dto.UserCreationRequest;
import com.example.treasurebox.dto.LoginRequest;
import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
        User user = userRepository.findByName(request.getName()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        if (!request.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid password"));
        }

        // ✅ Generate and store token
        String token = UUID.randomUUID().toString();
        sessionTokens.put(token, user.getId());

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Login successful",
                        "userId", user.getId(),
                        "username", user.getName(),
                        "token", token // ✅ Send token to frontend
                )
        );
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        Long userId = sessionTokens.get(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid or expired token"));
        }

        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(Map.of(
                        "success", true,
                        "userId", user.getId(),
                        "username", user.getName()
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "User not found")));
    }



}



