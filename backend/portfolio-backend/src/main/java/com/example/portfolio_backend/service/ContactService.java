package com.example.portfolio_backend.service;

import org.springframework.stereotype.Service;

import com.example.portfolio_backend.entity.Contact;
import com.example.portfolio_backend.repository.ContactRepository;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final EmailService emailService;

    public ContactService(ContactRepository contactRepository, EmailService emailService){
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    public Contact saveContact(Contact contact){
        Contact savedContact = contactRepository.save(contact);
        emailService.sendContactEmails(savedContact);
        return savedContact;
    }
    
}
