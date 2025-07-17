package com.myprojects.namaste.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

import com.myprojects.namaste.filter.JwtHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private JwtHandshakeInterceptor jwtHandshakeInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // This is the endpoint clients will connect to (e.g. ws://localhost:8080/ws)
        registry.addEndpoint("/ws")
        .addInterceptors(jwtHandshakeInterceptor)
        .setAllowedOriginPatterns("*")
        .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // /app -> prefix for sending messages
        config.setApplicationDestinationPrefixes("/app");

        // /topic -> for broadcasting, /queue -> for point-to-point
        config.enableSimpleBroker("/topic", "/queue");
    }
}

