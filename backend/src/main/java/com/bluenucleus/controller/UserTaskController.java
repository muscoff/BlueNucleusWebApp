package com.bluenucleus.controller;

import com.bluenucleus.service.UserTaskService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.UserTask;
import com.bluenucleus.repository.UserTaskRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/usertasks")
public class UserTaskController {

  private final UserTaskService userTaskService;
  private static final Logger logger = LoggerFactory.getLogger(UserTaskController.class);

  public UserTaskController(UserTaskService userTaskService) {
    this.userTaskService = userTaskService;
  }

  @PostMapping("/create")
  public ResponseEntity<UserTask> createUserTask(@RequestBody UserTask userTask) {
    try {
      logger.info("CREATING USERTASK WITH DATA {}", userTask);
      UserTask createdUserTask = userTaskService.saveUserTask(userTask);
      return new ResponseEntity<>(createdUserTask, HttpStatus.CREATED); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @PutMapping("/update")
  public ResponseEntity<UserTask> updateUserTask(@RequestBody UserTask userTask) {
    try {
      logger.info("UPDATING USERTASK WITH DATA {}", userTask);
      UserTask updatedUserTask = userTaskService.updateUserTask(userTask);
      return new ResponseEntity<>(updatedUserTask, HttpStatus.OK); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get")
  public ResponseEntity<List<UserTask>> getUserTasks() {
    try {
      List<UserTask> userTasks = userTaskService.getAllUserTasks();
      return new ResponseEntity<List<UserTask>>(userTasks, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get/userid")
  public ResponseEntity<UserTask> getSingleUserTask(@RequestParam(name="userid", required=true) String userid) {
    try {
      UserTask userTask = userTaskService.getSingleUserTask(userid);
      logger.info("FETCHING USERTASK BASED ON userid {}", userTask);
      return new ResponseEntity<>(userTask, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/getSingle/{id}")
  public ResponseEntity<UserTask> getUserTask(@PathVariable int id) {
    try {
      UserTask userTask = userTaskService.getUserTaskById(id);
      return new ResponseEntity<>(userTask, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteUserTask(@PathVariable int id) {
    try {
      userTaskService.deleteUserTaskById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }
}
