package com.myprojects.namaste.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String receiver;
    private String content;
    private MessageType type;
}

