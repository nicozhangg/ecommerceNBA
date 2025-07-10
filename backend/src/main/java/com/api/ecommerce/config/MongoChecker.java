package com.api.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MongoChecker {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @EventListener(ApplicationReadyEvent.class)
    public void checkConnection() {
        System.out.println("✅ El backend se inició.");
        System.out.println("🔍 URI de MongoDB: " + mongoUri);
    }
}
