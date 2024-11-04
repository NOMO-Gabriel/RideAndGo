package com.rideAndGo.rideAndGo.controllers;

import java.util.UUID;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Optional;

import com.rideAndGo.rideAndGo.services.UserService;
import com.rideAndGo.rideAndGo.services.SubscriptionService;
import com.rideAndGo.rideAndGo.models.Subscription;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.dto.HTTPResponse;

import com.rideAndGo.rideAndGo.dto.SubscriptionRequest;


@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
  
    SubscriptionService subscriptionService;
    UserService userService;


    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    private boolean isAdmin(UUID adminId) {
        Optional<User> admin = userService.getUserById(adminId);
        return admin.isPresent() && admin.get().getRoles().contains("ROLE_ADMIN");
    }

    // create a subscription

    @PostMapping("/create")
    public ResponseEntity<HTTPResponse> createSubscription(@RequestBody SubscriptionRequest subscriptionRequest) {
        Optional <User> admin = userService.getUserById(subscriptionRequest.getAdminId());

        if(!admin.isPresent()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HTTPResponse("user not found"));
        }
        if(!isAdmin(subscriptionRequest.getAdminId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HTTPResponse("you must to be administrator to create subscriptions"));
        }
        
        Optional<Subscription> subscriptionToCheck = subscriptionService.findByLabel(subscriptionRequest.getSubscription().getLabel());
        
        if (subscriptionToCheck.isPresent() ) { 
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new HTTPResponse("Subscription already exist,please change Label"));
        }
        
        Subscription subscription = new Subscription();
        subscription.setId(UUID.randomUUID());
        subscription.setLabel(subscriptionRequest.getSubscription().getLabel());
        subscription.setPrice(subscriptionRequest.getSubscription().getPrice());
        subscription.setDescription(subscriptionRequest.getSubscription().getDescription());
        subscription.setFeatures(subscriptionRequest.getSubscription().getFeatures());
        
        subscriptionService.save(subscription);
        return ResponseEntity.ok(new HTTPResponse("subscription created successffully"));
    }

        // get all subscriptions
        @GetMapping("/")
        public ResponseEntity<Iterable<Subscription>> getAllSubscriotion(){
            Iterable <Subscription> subscriptions = subscriptionService.getAllSubscriptions();
            return ResponseEntity.ok(subscriptions);
        }
    
    
    // get a single subscription by id
    @GetMapping("/id/{id}")
    public  ResponseEntity<?> getSubscription(@PathVariable UUID id){
        Optional<Subscription> subscription = subscriptionService.findById(id);
        if(!subscription.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        return ResponseEntity.ok(subscription.get());

    }

    // get a single subscription by label
    @GetMapping("/label/{label}")
    public  ResponseEntity<?> getSubscriptionByLabel(@PathVariable String label){
        Optional<Subscription> subscription = subscriptionService.findByLabel(label);
        if(!subscription.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        return ResponseEntity.ok(subscription.get());

    }





    // update a subscription by label
    @PutMapping("/update/label")
    public ResponseEntity<HTTPResponse> updateSubscriptionByLabel(@RequestBody SubscriptionRequest subscriptionRequest) {
        
        Optional<Subscription> subscription = subscriptionService.findByLabel(subscriptionRequest.getSubscription().getLabel());
        
        if (!subscription.isPresent() ) { 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        
        // subscription.get().setLabel(subscriptionRequest.getSubscription().getLabel());
        subscription.get().setPrice(subscriptionRequest.getSubscription().getPrice());
        subscription.get().setDescription(subscriptionRequest.getSubscription().getDescription());
        subscription.get().setFeatures(subscriptionRequest.getSubscription().getFeatures());
        
        subscriptionService.save(subscription.get());
        return ResponseEntity.ok(new HTTPResponse("subscription updated succeffully"));
    }

    // update subscription by id
    @PutMapping("/update/id/{id}")
    public ResponseEntity<HTTPResponse> updateSubscriptionById(@RequestBody SubscriptionRequest subscriptionRequest, @PathVariable UUID id) {
        
        Optional<Subscription> subscription = subscriptionService.findById(id);
        
        if (!subscription.isPresent() ) { 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        if(subscriptionService.findByLabel(subscriptionRequest.getSubscription().getLabel()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new HTTPResponse("Subscription with this label already exists "));
        }
        
        subscription.get().setLabel(subscriptionRequest.getSubscription().getLabel());
        subscription.get().setPrice(subscriptionRequest.getSubscription().getPrice());
        subscription.get().setDescription(subscriptionRequest.getSubscription().getDescription());
        subscription.get().setFeatures(subscriptionRequest.getSubscription().getFeatures());
        
        subscriptionService.save(subscription.get());
        return ResponseEntity.ok(new HTTPResponse("subscription updated succeffully"));
    }



    // get current subscription of a  user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserSubscription(@PathVariable UUID userId){
         Optional <User> user = userService.getUserById(userId);
        if(!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("User not found"));
        }
        
        UUID subcriptionId = user.get().getSubscription();
        Optional <Subscription> UserSubscription = subscriptionService.findById(subcriptionId);

        return ResponseEntity.ok(UserSubscription);   
    } 

    // change subscription of a user
    @PutMapping("/change/{subscriptionLabel}/user/{userId}")
    public ResponseEntity<?> changeUserSubscription(@PathVariable String subscriptionLabel,@PathVariable UUID userId){
        Optional <User> user = userService.getUserById(userId);
        if(!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("User not found"));
        }
        Optional <Subscription> subscription = subscriptionService.findByLabel(subscriptionLabel);
        if(!subscription.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        Instant now = Instant.now();
        user.get().setSubscription(subscription.get().getId());
        user.get().setPaiementDate(now);
        userService.save(user.get());

        return ResponseEntity.ok(new HTTPResponse("change success"));

    }

    // delete a subscription
    @DeleteMapping("/delete/{subscriptionId}/admin/{adminId}")
    public ResponseEntity<?> delete(@PathVariable UUID subscriptionId, @PathVariable UUID adminId){
        Optional <User> admin = userService.getUserById(adminId);

        if(!admin.isPresent()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HTTPResponse("admin not found"));
        }
        if(!isAdmin(adminId)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HTTPResponse("you must to be administrator to delete subscriptions"));
        }
        Optional <Subscription> subscription = subscriptionService.findById(subscriptionId);
        if(!subscription.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("Subscription not found"));
        }
        subscriptionService.deleteSubscription(subscriptionId);
        return ResponseEntity.ok(new HTTPResponse("delete success"));

    }
}
