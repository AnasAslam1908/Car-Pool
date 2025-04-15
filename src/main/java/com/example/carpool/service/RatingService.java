package com.example.carpool.service;

import com.example.carpool.model.Rating;
import com.example.carpool.model.Ride;
import com.example.carpool.model.User;
import com.example.carpool.repository.RatingRepository;
import com.example.carpool.repository.RideRepository;
import com.example.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;


    public boolean rateRide(int rideId, int passengerId, int rating, String review) {
        Optional<Ride> rideOpt = rideRepository.findById(rideId);
        Optional<User> passengerOpt = userRepository.findById(passengerId);

        if (rideOpt.isPresent() && passengerOpt.isPresent()) {
            Rating rideRating = new Rating();
            rideRating.setRide(rideOpt.get());
            rideRating.setPassenger(passengerOpt.get());
            rideRating.setRating(rating);
            rideRating.setReview(review);

            ratingRepository.save(rideRating);
            return true;
        }
        return false;
    }


    public List<Rating> getRatingsForRide(int rideId) {
        return ratingRepository.findByRideId(rideId);
    }


    public List<Rating> getRatingsByPassenger(int passengerId) {
        return ratingRepository.findByPassengerId(passengerId);
    }
}
