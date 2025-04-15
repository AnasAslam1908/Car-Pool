package com.example.carpool.service;


import com.example.carpool.model.Booking;
import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.repository.BookingRepository;
import com.example.carpool.repository.RideRepository;
import com.example.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {



    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;


    public boolean bookSeats(int rideId, int passengerId, int seats) {
        Optional<Ride> rideOpt = rideRepository.findById(rideId);
        Optional<User> passengerOpt = userRepository.findById(passengerId);

        if (rideOpt.isPresent() && passengerOpt.isPresent()) {
            Ride ride = rideOpt.get();

            if (ride.getAvailable_seats() >= seats) {
                Booking booking = new Booking();
                booking.setRide(ride);
                booking.setPassenger(passengerOpt.get());
                booking.setSeats_booked(seats);
                booking.setStatus("BOOKED");

                ride.setAvailable_seats(ride.getAvailable_seats() - seats);
                rideRepository.save(ride);
                bookingRepository.save(booking);

                return true;
            }
        }
        return false;
    }


    public List<Booking> getBookingsByPassenger(int passengerId) {
        return bookingRepository.findByPassengerId(passengerId);
    }


    public List<Booking> getBookingsByRide(int rideId) {
        return bookingRepository.findByRideId(rideId);
    }


    public boolean cancelBooking(int bookingId, int passengerId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();

            if (booking.getPassenger().getUser_id() == passengerId) {
                Ride ride = booking.getRide();
                ride.setAvailable_seats(ride.getAvailable_seats() + booking.getSeats_booked());

                rideRepository.save(ride);
                bookingRepository.delete(booking);

                return true;
            }
        }
        return false;
    }


    public boolean updateBookingStatus(int bookingId, String status) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(status);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }
}
