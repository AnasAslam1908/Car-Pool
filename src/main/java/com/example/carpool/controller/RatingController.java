package com.example.carpool.controller;

import com.example.carpool.model.Rating;
import com.example.carpool.model.User;
import com.example.carpool.service.RatingService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }


    @PostMapping("/add/{rideId}")
    public ResponseEntity<String> rateRide(@PathVariable int rideId,
                                           @RequestParam int rating,
                                           @RequestParam String review,
                                           HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"PASSENGER".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Only passengers can rate rides.");
        }

        boolean success = ratingService.rateRide(rideId, user.getUser_id(), rating, review);
        if (success) {
            return ResponseEntity.ok("Rating submitted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to submit rating.");
        }
    }


    @GetMapping("/ride/{rideId}")
    public ResponseEntity<List<Rating>> getRatingsForRide(@PathVariable int rideId, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"DRIVER".equals(user.getRole()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        List<Rating> ratings = ratingService.getRatingsForRide(rideId);
        return ResponseEntity.ok(ratings);
    }

    // 3. Get all ratings given by a passenger (Only that passenger can view)
    @GetMapping("/passenger")
    public ResponseEntity<List<Rating>> getRatingsByPassenger(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"PASSENGER".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        List<Rating> ratings = ratingService.getRatingsByPassenger(user.getUser_id());
        return ResponseEntity.ok(ratings);
    }
}
