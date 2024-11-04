package com.rideAndGo.rideAndGo.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rideAndGo.rideAndGo.models.Notification;
import com.rideAndGo.rideAndGo.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification){
        notificationRepository.save(notification);
        return notification;
    }

    public Iterable<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(UUID id){
        return notificationRepository.findById(id).orElse(null);
    }

    public Notification setNotificationState(Notification notification, String state) throws Exception{
        if (state == "alert" || state == "new" || state == "archived"){
            throw new Exception("Status not permitted");
        }
        notification.setState(state);
        notificationRepository.save(notification);
        return notification;
    }
}
