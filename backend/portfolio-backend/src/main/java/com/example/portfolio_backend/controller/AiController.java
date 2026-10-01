package com.example.portfolio_backend.controller;

import com.example.portfolio_backend.dto.AiChatRequest;
import com.example.portfolio_backend.dto.AiChatResponse;
import com.example.portfolio_backend.service.AiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public AiChatResponse chat(
            @RequestBody AiChatRequest request
    ) {

        return aiService.processMessage(request);
    }
}