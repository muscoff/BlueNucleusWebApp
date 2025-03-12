package com.bluenucleus.controller;

import com.bluenucleus.service.TaskService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.Task;
import com.bluenucleus.repository.TaskRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  private final TaskService taskService;
  private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @PostMapping("/create")
  public ResponseEntity<Task> createTask(@RequestBody Task task) {
    try {
      logger.info("CREATING TASK WITH DATA {}", task);
      Task createdTask = taskService.saveTask(task);
      return new ResponseEntity<>(createdTask, HttpStatus.CREATED); 
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Task> updateTask(@RequestBody Task task) {
    try {
      logger.info("UPDATING TASK WITH DATA {}", task);
      Task updatedTask = taskService.updateTask(task);
      return new ResponseEntity<>(updatedTask, HttpStatus.OK); 
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }

  @GetMapping("/get")
  public ResponseEntity<List<Task>> getTasks() {
    try {
      List<Task> tasks = taskService.getAllTasks();
      return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }

  @GetMapping("/getSingle/{id}")
  public ResponseEntity<Task> getTask(@PathVariable int id) {
    try {
      Task task = taskService.getTaskById(id);
      return new ResponseEntity<>(task, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable int id) {
    try {
      taskService.deleteTaskById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // TODO: Update to more specific error message
    }
  }
}
