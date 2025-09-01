package com.myprojects.namaste.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;

import com.myprojects.namaste.dto.ChatMessage;
import com.myprojects.namaste.model.Message;
import com.myprojects.namaste.model.User;
import com.myprojects.namaste.repository.MessageRepository;
import com.myprojects.namaste.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;

@Controller
public class WebSocketChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public WebSocketChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Receive from /app/chat.send and send to /queue/{receiver}
    @MessageMapping("/chat.send")
    @Operation(summary = "Send Message to user", 
               description = "API to send messgae")
    public void sendMessage(@Payload ChatMessage message) {
        User sender = userRepository.findByContactNo(message.getSender())
            .orElseThrow(() -> new UsernameNotFoundException("Sender not found"));
        User receiver = userRepository.findByContactNo(message.getReceiver())
                .orElseThrow(() -> new UsernameNotFoundException("Receiver not found"));
        // Save message
        Message entity = new Message();
        entity.setSender(sender);
        entity.setReceiver(receiver);
        entity.setMessage(message.getContent());
        entity.setType(message.getType()); // TEXT or BLOB
        messageRepository.save(entity);

        messagingTemplate.convertAndSendToUser(
                message.getReceiver(), "/queue/messages", message
        );
    }
}

