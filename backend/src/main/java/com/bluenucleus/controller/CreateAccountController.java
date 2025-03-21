package com.bluenucleus.controller;

import com.bluenucleus.service.UserService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.User;
import com.bluenucleus.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class CreateAccountController {

  private final UserService userService;
  private static final Logger logger = LoggerFactory.getLogger(CreateAccountController.class);

  public CreateAccountController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/create")
  public ResponseEntity<User> createAccount(@RequestBody User user) {
    try {
      logger.info("CREATING USER WITH DATA {}", user);
      User createdUser = userService.saveUser(user);
      return new ResponseEntity<>(createdUser, HttpStatus.CREATED); 
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }

  @GetMapping("/getUsers")
  public ResponseEntity<List<User>> getUsers() {
    try {
      List<User> users = userService.getAllUsers();
      return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }
}
