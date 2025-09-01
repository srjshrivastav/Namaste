package com.myprojects.namaste.controller;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myprojects.namaste.model.Contact;
import com.myprojects.namaste.model.User;
import com.myprojects.namaste.repository.ContactRepository;
import com.myprojects.namaste.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/{id}")
    @Operation(description = "API to get User details by Id")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "User found successfully"),
        @ApiResponse(responseCode = "401", description = "Unautorized"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userRepository.getReferenceById(id);
        if(user != null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/contacts")
    @Operation(description = "API to get all the contacts of a user")
    public Set<Contact> getContacts(@PathVariable Long id) {
        User user = userRepository.getReferenceById(id);
        return user.getUserContacts();
    }


    @GetMapping
    @Operation(description = "API to get search usernames")
    public ResponseEntity<User> searchUser(@RequestParam String username, @RequestParam String contactNo) {
        Optional<User> user = userRepository.findByUsernameOrContactNo(username, contactNo);
        if(user.isPresent())
            return ResponseEntity.ok(user.get());
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-username")
    @Operation(description = "API to check username exists or not")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean userName = userRepository.existsByUsername(username);
        if(userName) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/contact/add")
    @Operation(description = "API to add contact")
    public ResponseEntity<?> addContact(
            @PathVariable Long id,
            @RequestParam Long contactId) {
        try {
            // Validate that both users exist
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

            User contactUser = userRepository.findById(contactId)
                    .orElseThrow(() -> new RuntimeException("Contact user not found with id: " + contactId));

            // Check if contact already exists
            boolean contactExists = contactRepository.existsByUserAndContactUser(user, contactUser);
            if (contactExists) {
                return ResponseEntity.badRequest()
                        .body("Contact already exists");
            }

            // Create and save the contact relationship
            Contact contact = new Contact();
            contact.setUser(user);
            contact.setContactUser(contactUser);
            contact.setContactName(contactUser.getUsername()); // Default name

            Contact savedContact = contactRepository.save(contact);

            return ResponseEntity.ok(savedContact);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Error adding contact: " + e.getMessage());
        }
    }



}
