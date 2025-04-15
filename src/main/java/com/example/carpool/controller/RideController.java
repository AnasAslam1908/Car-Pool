package com.example.carpool.controller;

import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.service.RideService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    // 1. Create a new ride (Only for Drivers)
    @PostMapping("/create-ride")
    public ResponseEntity<String> createRide(@RequestBody Ride ride, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"DRIVER".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Only drivers can create rides.");
        }

        boolean isCreated = rideService.createRide(ride, user.getUser_id());
        if (isCreated) {
            return ResponseEntity.ok("Ride created successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to create ride.");
        }
    }

    // 2. Get all rides (All logged-in users can access)
    @GetMapping
    public ResponseEntity<?> getAllRides(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        List<Ride> rides = rideService.getUpcomingRides();
        return ResponseEntity.ok(rides);
    }

    // 3. Get ride by ID (All logged-in users can access)
    @GetMapping("/{rideId}")
    public ResponseEntity<Ride> getRideById(@PathVariable int rideId, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        Ride ride = rideService.getRideById(rideId);
        return ResponseEntity.ok(ride);
    }

    // 4. Get all rides by a specific driver (Admin and Driver Only)
    @GetMapping("/my-rides")
    public ResponseEntity<List<Ride>> getMyRides(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"DRIVER".equals(user.getRole()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        List<Ride> rides = rideService.getRidesByDriver(user.getUser_id()); // ✅ Use session user ID
        return ResponseEntity.ok(rides);
    }

    // 5. Update ride details (Only the ride owner can update)
    @PutMapping("/update/{rideId}")
    public ResponseEntity<Ride> updateRide(@PathVariable int rideId, @RequestBody Ride rideDetails, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"DRIVER".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        Ride updatedRide = rideService.updateRide(rideId, rideDetails);
        return ResponseEntity.ok(updatedRide);
    }

    // 6. Delete ride (Only ride owner or Admin can delete)
    @DeleteMapping("/delete/{rideId}")
    public ResponseEntity<String> deleteRide(@PathVariable int rideId, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        Ride ride = rideService.getRideById(rideId);

        if (!"ADMIN".equals(user.getRole()) && ride.getDriver().getUser_id() != user.getUser_id()) {
            return ResponseEntity.status(403).body("Only the ride owner or admin can delete this ride.");
        }

        rideService.deleteRide(rideId, user.getUser_id());
        return ResponseEntity.ok("Ride deleted successfully.");
    }

    // 7. Change ride status (Only ride owner can update status)
    @PutMapping("/status/{rideId}")
    public ResponseEntity<Ride> changeRideStatus(@PathVariable int rideId, @RequestParam String status, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        Ride ride = rideService.getRideById(rideId);

        if (!"DRIVER".equals(user.getRole()) || ride.getDriver().getUser_id() != user.getUser_id()) {
            return ResponseEntity.status(403).body(null);
        }

        Ride updatedRide = rideService.changeRideStatus(rideId, status);
        return ResponseEntity.ok(updatedRide);
    }
}
