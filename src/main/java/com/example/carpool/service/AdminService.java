package com.example.carpool.service;

import com.example.carpool.model.AdminAction;
import com.example.carpool.model.Booking;
import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


import com.example.carpool.repository.*;
@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AdminActionRepository adminActionRepository;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }


    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }


    public boolean deleteUser(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }


    public boolean deleteRide(int rideId) {
        if (rideRepository.existsById(rideId)) {
            rideRepository.deleteById(rideId);
            return true;
        }
        return false;
    }


    public boolean deleteBooking(int bookingId) {
        if (bookingRepository.existsById(bookingId)) {
            bookingRepository.deleteById(bookingId);
            return true;
        }
        return false;
    }


    public List<AdminAction> getAdminActions() {
        return adminActionRepository.findAll();
    }
}