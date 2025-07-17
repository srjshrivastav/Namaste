package com.myprojects.namaste.controller;

import com.myprojects.namaste.dto.UserDto;
import com.myprojects.namaste.model.User;
import com.myprojects.namaste.repository.UserRepository;
import com.myprojects.namaste.service.JwtService;

import io.micrometer.common.util.StringUtils;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
        Optional<User> userOpt = userRepository.findByPhoneno(userDto.getPhoneno());

        if (userOpt.isPresent() && StringUtils.isNotBlank(userOpt.get().getPasword()) && userOpt.get().getPasword().equals(userDto.getPassword())) {
            String token = jwtService.generateToken(null);
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // POST /api/auth/login
    @PostMapping("/signup")
    public ResponseEntity<User> signUpUser(@RequestBody UserDto userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setUsername(userDto.getUsername());
        newUser.setPhoneno(userDto.getPhoneno());
        newUser.setPasword(userDto.getPassword());
        try{
            User user = userRepository.save(newUser);
            return ResponseEntity.ok().body(user);
        } catch(ConstraintViolationException ex) {
            throw ex;
        }
    }

}

