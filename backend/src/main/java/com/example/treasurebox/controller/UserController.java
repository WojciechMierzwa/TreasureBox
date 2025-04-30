package com.example.treasurebox.controller;

import com.example.treasurebox.dto.user.UpdateRequest;
import com.example.treasurebox.dto.user.UserCreationRequest;
import com.example.treasurebox.dto.user.LoginRequest;
import com.example.treasurebox.dto.user.UserUpdateRequest;
import com.example.treasurebox.model.Film;
import com.example.treasurebox.model.User;
import com.example.treasurebox.model.UserFilm;
import com.example.treasurebox.repository.UserRepository;
import com.example.treasurebox.repository.UserFilmRepository;
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
    public UserController(UserRepository userRepository, UserFilmRepository userFilmRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeriesById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User not found"));
        }
    }
    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody UserCreationRequest request) {
        if (userRepository.existsByName(request.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("success", false, "message", "Username already exists"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setPassword(request.getPassword());
        user.setRequireCredentials(request.isRequireCredentials());
        user.setRole("user");
        user.setProfilePicture((int)(Math.random() * 4) + 1);

        User saved = userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "userId", saved.getId(),
                "message", "User created successfully"
        ));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User request) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            User user = optionalUser.get();

            if (request.getName() != null && !request.getName().isEmpty()) {
                user.setName(request.getName());
            }
            if (request.getPassword() != null && !request.getPassword().isEmpty()) {
                user.setPassword(request.getPassword());
            }
            user.setRequireCredentials(request.isRequireCredentials());
            User updatedUser = userRepository.save(user);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User updated successfully");
            response.put("userId", updatedUser.getId());
            response.put("username", updatedUser.getName());
            response.put("role", updatedUser.getRole());
            response.put("profilePicture", updatedUser.getProfilePicture());
            response.put("requireCredentials", updatedUser.isRequireCredentials());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error updating user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
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
        if (user.isRequireCredentials() && !request.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid password"));
        }
        String token = UUID.randomUUID().toString();

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "userId", user.getId(),
                "username", user.getName(),
                "role", user.getRole(),
                "profilePicture", user.getProfilePicture(),
                "requireCredentials", user.getRequireCredentials(),
                "token", token
        ));
    }
}





