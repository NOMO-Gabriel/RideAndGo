package com.rideAndGo.rideAndGo.services;
import com.rideAndGo.rideAndGo.models.Subscription;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.dto.SubscriptionRequest;
import com.rideAndGo.rideAndGo.repositories.SubscriptionRepository;
import com.rideAndGo.rideAndGo.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    private UserRepository userRepository;

    public Subscription createSubscription(SubscriptionRequest subscriptionRequest) {
        Subscription subscription = new Subscription();
        subscription.setLabel(subscriptionRequest.getSubscription().getLabel());
        subscription.setPrice(subscriptionRequest.getSubscription().getPrice());
        subscription.setDescription(subscriptionRequest.getSubscription().getDescription());
        subscription.setFeatures(subscriptionRequest.getSubscription().getFeatures());
        subscriptionRepository.save(subscription);
        return subscription;
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Optional<Subscription> findById(UUID id) {
        return subscriptionRepository.findById(id);
    }

    public Optional<Subscription> findByLabel(String label) {
        return subscriptionRepository.findByLabel(label);
    }

    public Iterable<Subscription> getAllSubsCriptions(){
        return subscriptionRepository.findAll();
    }
   
    public Subscription updateSubscription(UUID id, Subscription subscriptionDetails) {
        Optional<Subscription> optionalSubscription = subscriptionRepository.findById(id);
        if (optionalSubscription.isPresent()) {
            Subscription subscription = optionalSubscription.get();
            subscription.setLabel(subscriptionDetails.getLabel());
            subscription.setPrice(subscriptionDetails.getPrice());
            subscription.setDescription(subscriptionDetails.getDescription());
            subscription.setFeatures(subscriptionDetails.getFeatures());
            return subscriptionRepository.save(subscription);
        } else {
            throw new RuntimeException("Subscription not found with id " + id);
        }
    }

    public void deleteSubscription(UUID id) {
        subscriptionRepository.deleteById(id);
    }

    public void save(Subscription subscription){
        subscriptionRepository.save(subscription);
    }

    public boolean existByLabel(String label){
        return subscriptionRepository.existsByLabel(label);
    }

   
    public Subscription getCurrentUserSubscription(User user) {
        UUID id = user.getSubscription();
        return subscriptionRepository.findById(id).orElse(null);
    }

    public void changeUserSubscription(User user, UUID subscriptionId) {
        user.setSubscription(subscriptionId);
        userRepository.save(user);
    }
}
