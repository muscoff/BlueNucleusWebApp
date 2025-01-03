package com.bluenucleus.service;

import com.bluenucleus.model.User;
import com.bluenucleus.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> getAllUsers() {
    return this.userRepository.findAll();
  }

  public User getUserById(int id) {
    return this.userRepository.findById(id).get();
  }

  public User saveUser(User user) {
    // TODO: Deep dive lifecycle methods. @PrePersist and @PreUpdate may not 
    // be necessary or work with the hibernate implementation.
    if (user.getCreatedAt() == null) {
      user.setCreatedAt(LocalDateTime.now());
    }
    user.setUpdatedAt(LocalDateTime.now());
    return this.userRepository.save(user);
  }
}
