package com.myprojects.namaste.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.myprojects.namaste.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}

