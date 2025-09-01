package com.myprojects.namaste.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "contacts")
@Data
public class Contact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_user_id", nullable = false)
    private User contactUser;
    
    @Column(name = "contact_name", length = 100)
    private String contactName; // Custom name for the contact
    
    @Column(name = "added_at", nullable = false)
    private LocalDateTime addedAt;
    
    @Column(name = "is_blocked")
    private Boolean isBlocked = false;
    
    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }
}
