package com.myprojects.namaste.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myprojects.namaste.model.Contact;
import com.myprojects.namaste.model.User;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>{
    
    public boolean existsByUserAndContactUser(User user, User contactUser);
}
