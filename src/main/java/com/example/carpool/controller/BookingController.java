package com.example.carpool.controller;

import com.example.carpool.model.Booking;
import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.service.BookingService;
import com.example.carpool.service.RideService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final RideService rideService;
    private final BookingService bookingService;

    public BookingController(RideService rideService, BookingService bookingService) {
        this.rideService = rideService;
        this.bookingService = bookingService;
    }

    // 1. Passenger books a seat
    @PostMapping("/book/{rideId}/{seats}")
    public ResponseEntity<String> bookSeats(@PathVariable int rideId, @PathVariable int seats, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"PASSENGER".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Only passengers can book rides.");
        }

        Ride ride = rideService.getRideById(rideId);
        if (ride == null) {
            return ResponseEntity.status(404).body("Ride not found.");
        }

        if (ride.getAvailable_seats() < seats) {
            return ResponseEntity.status(400).body("Not enough seats available.");
        }

        boolean success = bookingService.bookSeats(rideId, user.getUser_id(), seats);
        if (success) {
            return ResponseEntity.ok("Booking successful.");
        } else {
            return ResponseEntity.status(500).body("Booking failed. Please try again.");
        }
    }



    // 2. Get all bookings by a passenger (Only that passenger can access)
    @GetMapping("/passenger")
    public ResponseEntity<List<Booking>> getBookingsByPassenger(HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"PASSENGER".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        List<Booking> bookings = bookingService.getBookingsByPassenger(user.getUser_id());
        return ResponseEntity.ok(bookings);
    }

    // 3. Get all passengers of a ride (Only ride owner or Admin can view)
    @GetMapping("/ride/{rideId}")
    public ResponseEntity<List<Booking>> getBookingsByRide(@PathVariable int rideId, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"DRIVER".equals(user.getRole()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).build();
        }

        List<Booking> bookings = bookingService.getBookingsByRide(rideId);
        return ResponseEntity.ok(bookings);
    }

    // 4. Passenger cancels their own booking
    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable int bookingId, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"PASSENGER".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Only passengers can cancel bookings.");
        }

        boolean success = bookingService.cancelBooking(bookingId, user.getUser_id());
        if (success) {
            return ResponseEntity.ok("Booking cancelled successfully.");
        } else {
            return ResponseEntity.badRequest().body("Cancellation failed.");
        }
    }

    // 5. Admin updates booking status
    @PutMapping("/status/{bookingId}")
    public ResponseEntity<String> updateBookingStatus(@PathVariable int bookingId, @RequestParam String status, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("Please log in first.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Only admins can update booking statuses.");
        }

        boolean success = bookingService.updateBookingStatus(bookingId, status);
        if (success) {
            return ResponseEntity.ok("Booking status updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update booking status.");
        }
    }
}
