package com.example.treasurebox.controller;

import com.example.treasurebox.dto.user.*;
import com.example.treasurebox.model.User;
import com.example.treasurebox.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // BCrypt for hashing passwords
    }

    @GetMapping
    public List<ProfileRequest> getAllUsersForProfile() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            ProfileRequest dto = new ProfileRequest();
            dto.setId(user.getId().intValue());
            dto.setName(user.getName());
            dto.setProfilePicture(user.getProfilePicture());
            dto.setRequireCredentials(user.isRequireCredentials());
            return dto;
        }).toList();
    }

    @GetMapping("/count")
    public long getUserCount() {
        return userRepository.count();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
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
        // Check if username already exists
        if (userRepository.existsByName(request.getName())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Username already exists"));
        }

        // Create the new user
        User user = new User();
        user.setName(request.getName());

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        user.setRequireCredentials(request.isRequireCredentials());
        user.setRole("user");
        user.setProfilePicture((int)(Math.random() * 4) + 1);

        // Save the user to the repository
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
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "User not found"));
        }

        User user = optionalUser.get();

        if (request.getName() != null && !request.getName().isEmpty()) {
            user.setName(request.getName());
        }
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            // Hash the new password if updated
            String hashedPassword = passwordEncoder.encode(request.getPassword());
            user.setPassword(hashedPassword);
        }
        user.setRequireCredentials(request.isRequireCredentials());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User updated successfully",
                "userId", updatedUser.getId(),
                "username", updatedUser.getName(),
                "role", updatedUser.getRole(),
                "profilePicture", updatedUser.getProfilePicture(),
                "requireCredentials", updatedUser.isRequireCredentials()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByName(request.getName());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        User user = optionalUser.get();

        // Verify password using BCryptPasswordEncoder
        if (user.isRequireCredentials() && !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
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
