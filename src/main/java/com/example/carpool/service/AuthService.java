package com.example.carpool.service;


import com.example.carpool.model.User;
import com.example.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean register(User user) {
        if(userRepository.findByEmail(user.getEmail())!=null){
            return false;
        }
        userRepository.save(user);
        return true;
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if( user.getPassword().equals(password)){
            return user;
        }
        return null;
    }

    public User getUserById(int id) {
       Optional<User> user= userRepository.findById(id);
        return user.orElse(null);
    }

    public boolean updateUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getUser_id());

        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setFull_name(user.getFull_name());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhone(user.getPhone());
            updatedUser.setRole(user.getRole());

            userRepository.save(updatedUser);
            return true;
        } else {
            return false;
        }
    }
    public boolean deleteUser(int id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return true;

        }
        return false;
    }
}
