package com.example.carpool.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ride_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "user_id")
    private User driver;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String route;

    @Column(nullable = false)
    private LocalDateTime departure_time;

    @Column(nullable = false)
    private int available_seats;

    @Column(length = 10, columnDefinition = "VARCHAR(10) DEFAULT 'UPCOMING'")
    private String status = "UPCOMING";

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at = LocalDateTime.now();

    public int getRide_id() {
        return id;
    }

    public void setRide_id(int ride_id) {
        this.id = ride_id;
    }

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public LocalDateTime getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(LocalDateTime departure_time) {
        this.departure_time = departure_time;
    }

    public int getAvailable_seats() {
        return available_seats;
    }

    public void setAvailable_seats(int available_seats) {
        this.available_seats = available_seats;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
