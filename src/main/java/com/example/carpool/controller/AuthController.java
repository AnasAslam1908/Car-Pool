package com.example.carpool.controller;

import com.example.carpool.model.User;
import com.example.carpool.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 1. User Registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return authService.register(user)
                ? ResponseEntity.ok("Registration successful.")
                : ResponseEntity.badRequest().body("Registration failed. Email may already exist.");
    }

    // 2. User Login with Session
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
        User user = authService.login(email, password);
        if (user != null) {
            session.setAttribute("user", user);

            return ResponseEntity.ok("Login successful.");
        }
        return ResponseEntity.badRequest().body("Invalid email or password.");
    }

    // 3. User Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful.");
    }

    // 4. Get Logged-in User Details
    @GetMapping("/session")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user != null
                ? ResponseEntity.ok(user)
                : ResponseEntity.status(401).body("No active session found. Please log in.");
    }

    // 5. Get User by ID (Only if Logged in or Admin)
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId, HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");

        if (sessionUser == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        if (sessionUser.getUser_id() != userId && !"ADMIN".equals(sessionUser.getRole())) {
            return ResponseEntity.status(403).body("Access denied. You can only view your own profile.");
        }

        User user = authService.getUserById(userId);
        return user != null
                ? ResponseEntity.ok(user)
                : ResponseEntity.badRequest().body("User not found.");
    }

    // 6. Update User (Only Self-Update or Admin)
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user, HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");

        if (sessionUser == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        if (sessionUser.getUser_id() != user.getUser_id() && !"ADMIN".equals(sessionUser.getRole())) {
            return ResponseEntity.status(403).body("Access denied. You can only update your own profile.");
        }

        return authService.updateUser(user)
                ? ResponseEntity.ok("User updated successfully.")
                : ResponseEntity.badRequest().body("Update failed. User not found.");
    }

    // ✅ 7. Delete User (Only Self-Delete or Admin)
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId, HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");

        if (sessionUser == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        if (sessionUser.getUser_id() != userId && !"ADMIN".equals(sessionUser.getRole())) {
            return ResponseEntity.status(403).body("Access denied. You can only delete your own account.");
        }

        return authService.deleteUser(userId)
                ? ResponseEntity.ok("User deleted successfully.")
                : ResponseEntity.badRequest().body("Deletion failed. User not found.");
    }

}
