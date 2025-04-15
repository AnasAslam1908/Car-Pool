package com.example.carpool.repository;

import com.example.carpool.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Integer> {
    List<Ride> findByDriver_Id(int driverId);
    @Query("SELECT r FROM Ride r WHERE r.departure_time > :now")
    List<Ride> findUpcomingRides(@Param("now") LocalDateTime now);

}
