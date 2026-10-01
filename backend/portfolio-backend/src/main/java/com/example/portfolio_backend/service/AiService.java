package com.example.portfolio_backend.service;

import com.example.portfolio_backend.dto.AiChatRequest;
import com.example.portfolio_backend.dto.AiChatResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AiService {

        public final RestClient restClient;

        public AiService(RestClient.Builder restClientBuilder, @Value("${ai.service.url}") String aiServiceUrl) {
                this.restClient = restClientBuilder
                .baseUrl(aiServiceUrl)
                .build();
        }

    public AiChatResponse processMessage(AiChatRequest request) {

        AiChatResponse response = restClient
        .post()
        .uri("/ai/chat")
        .body(request)
        .retrieve().body(AiChatResponse.class);
       return response;
    }
}