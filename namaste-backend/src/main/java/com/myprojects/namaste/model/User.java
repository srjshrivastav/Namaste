package com.myprojects.namaste.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(exclude = {"contacts", "contactOf"})
@ToString(exclude = {"contacts", "contactOf"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(nullable = false, unique = true, length = 15)
    private String contactNo;

    @Column(unique = true, length = 100)
    private String email;

    @Column(nullable = false, name = "password") // Fixed typo: "pasword" -> "password"
    private String password;

    @Column(length = 500)
    private String profilePicture;

    @Column(length = 200)
    private String status = "Hey there! I'm using WhatsApp.";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.OFFLINE;

    @Column(name = "last_seen")
    private LocalDateTime lastSeen;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Many-to-Many relationship for contacts (bidirectional)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Contact> userContacts = new HashSet<>();
    
    @OneToMany(mappedBy = "contactUser", fetch = FetchType.LAZY)
    private Set<Contact> contactedBy = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
