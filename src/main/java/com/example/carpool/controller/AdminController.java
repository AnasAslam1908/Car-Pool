package com.example.carpool.controller;

import com.example.carpool.model.AdminAction;
import com.example.carpool.model.Booking;
import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.service.AdminService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    private ResponseEntity<String> checkAdminAccess(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access denied. Admins only.");
        }

        return null;
    }

    // 1. Get all users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // 2. Get all rides
    @GetMapping("/rides")
    public ResponseEntity<?> getAllRides(HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        return ResponseEntity.ok(adminService.getAllRides());
    }

    // 3. Get all bookings
    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings(HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        return ResponseEntity.ok(adminService.getAllBookings());
    }

    // ✅ 4. Delete a user
    @DeleteMapping("/delete/user/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId, HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        boolean success = adminService.deleteUser(userId);
        return success ? ResponseEntity.ok("User deleted successfully.")
                : ResponseEntity.badRequest().body("User not found.");
    }

    // ✅ 5. Delete a ride
    @DeleteMapping("/delete/ride/{rideId}")
    public ResponseEntity<String> deleteRide(@PathVariable int rideId, HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        boolean success = adminService.deleteRide(rideId);
        return success ? ResponseEntity.ok("Ride deleted successfully.")
                : ResponseEntity.badRequest().body("Ride not found.");
    }

    // ✅ 6. Delete a booking
    @DeleteMapping("/delete/booking/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable int bookingId, HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        boolean success = adminService.deleteBooking(bookingId);
        return success ? ResponseEntity.ok("Booking deleted successfully.")
                : ResponseEntity.badRequest().body("Booking not found.");
    }

    // ✅ 7. Get all admin actions
    @GetMapping("/actions")
    public ResponseEntity<?> getAdminActions(HttpSession session) {
        ResponseEntity<String> accessCheck = checkAdminAccess(session);
        if (accessCheck != null) return accessCheck;

        return ResponseEntity.ok(adminService.getAdminActions());
    }
}
