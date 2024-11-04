package com.rideAndGo.rideAndGo.controllers;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rideAndGo.rideAndGo.dto.NotificationCreateRequest;
import com.rideAndGo.rideAndGo.models.Notification;
import com.rideAndGo.rideAndGo.services.NotificationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/create")
    public ResponseEntity<?> createNotification(@RequestBody NotificationCreateRequest notificationInfos){
        try {
            UUID notification_id = UUID.randomUUID();
            Instant date = Instant.now();
            Notification notification = new Notification();
            notification.setId(notification_id);
            notification.setState("Unread");
            notification.setDate(date);
            notification.setTitle(notificationInfos.getTitle());
            notification.setDeleted(false);
            notification.setMessage(notificationInfos.getMessage());
            notification.setReceiver(notificationInfos.getReceiver());
            Notification createdNotification = notificationService.createNotification(notification);
            return ResponseEntity.status(201).body(createdNotification);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating notification" + e);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Notification>> getAllNotifications() {
        Iterable<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }


    
    @PutMapping("changestatus/{id}")
    public ResponseEntity<Notification> setNotificationState(@PathVariable UUID id, @RequestParam String status) {
        try {
            Notification notification = notificationService.getNotificationById(id);
            Notification updatedNotification = notificationService.setNotificationState(notification, status);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
