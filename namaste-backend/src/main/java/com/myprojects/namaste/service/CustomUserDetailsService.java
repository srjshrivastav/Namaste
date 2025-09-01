package com.myprojects.namaste.service;


import com.myprojects.namaste.model.User;
import com.myprojects.namaste.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String phoneno) throws UsernameNotFoundException {
        User user = userRepository.findByContactNo(phoneno)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                "",
                java.util.Collections.emptyList()
        );
    }
}

