package com.myprojects.namaste.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import com.myprojects.namaste.dto.MessageType;

@Entity
@Table(name = "messages")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many messages can be sent by one user
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // Many messages can be received by one user
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Lob
    private String message;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private MessageType type;
}

