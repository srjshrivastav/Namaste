package com.myprojects.namaste.repository;

import com.myprojects.namaste.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Custom finder method
    Optional<User> findByPhoneno(String phone);
}

