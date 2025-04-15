package com.example.carpool.service;


import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.repository.RideRepository;
import com.example.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;



    public boolean createRide(Ride ride, int driverId) {
        Optional<User> driver = userRepository.findById(driverId);
        if (driver.isPresent()) {
            ride.setDriver(driver.get());
             rideRepository.save(ride);
             return true;
        } else {
            return false;
        }
    }


    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }


    public Ride getRideById(int rideId) {
        return rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }


    public List<Ride> getRidesByDriver(int driverId) {
        return rideRepository.findByDriver_Id(driverId);
    }

    public List<Ride> getUpcomingRides() {
        return rideRepository.findUpcomingRides(LocalDateTime.now());
    }

    public Ride updateRide(int rideId, Ride rideDetails) {
        Ride existingRide = getRideById(rideId);
        existingRide.setRoute(rideDetails.getRoute());
        existingRide.setDeparture_time(rideDetails.getDeparture_time());
        existingRide.setAvailable_seats(rideDetails.getAvailable_seats());
        return rideRepository.save(existingRide);
    }


    public void deleteRide(int rideId, int driverId) {
        Ride ride = getRideById(rideId);
        if (ride.getDriver().getUser_id() == driverId) {
            rideRepository.delete(ride);
        } else {
            throw new RuntimeException("You can only delete your own rides");
        }
    }



    public Ride changeRideStatus(int rideId, String status) {
        Ride ride = getRideById(rideId);
        ride.setStatus(status);
        return rideRepository.save(ride);
    }
}
