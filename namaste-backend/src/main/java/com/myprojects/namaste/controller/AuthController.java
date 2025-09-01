package com.myprojects.namaste.controller;

import com.myprojects.namaste.dto.LoginDto;
import com.myprojects.namaste.dto.UserDto;
import com.myprojects.namaste.model.User;
import com.myprojects.namaste.repository.UserRepository;
import com.myprojects.namaste.service.JwtService;

import io.micrometer.common.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

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
    @Operation(summary = "Login user", 
               description = "API to login into system")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Logged in successfully"),
        @ApiResponse(responseCode = "401", description = "Unautorized"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<?> loginUser(@RequestBody LoginDto login) {
        Optional<User> userOpt = userRepository.findByContactNo(login.getPhoneno());

        if (userOpt.isPresent() && StringUtils.isNotBlank(userOpt.get().getPassword()) && userOpt.get().getPassword().equals(login.getPassword())) {
            String token = jwtService.generateToken(userOpt.get().getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // POST /api/auth/signup
    @PostMapping("/signup")
    @Operation(summary = "Signup user", 
               description = "API to signup for system")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "SignedUp successfully"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<User> signUpUser(@RequestBody UserDto userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setUsername(userDto.getUsername());
        newUser.setContactNo(userDto.getPhoneno());
        newUser.setPassword(userDto.getPassword());
        try{
            User user = userRepository.save(newUser);
            return ResponseEntity.ok().body(user);
        } catch(ConstraintViolationException ex) {
            throw ex;
        }
    }

}

