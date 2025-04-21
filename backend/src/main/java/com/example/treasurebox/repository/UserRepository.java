package com.example.treasurebox.repository;

import com.example.treasurebox.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
