package com.example.carpool.repository;

import com.example.carpool.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByRideId(int rideId);

    List<Rating> findByPassengerId(int passengerId);
}
