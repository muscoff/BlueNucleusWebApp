package com.bluenucleus.controller;

import com.bluenucleus.service.ApiService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/basic")
public class BasicController {

  private final ApiService apiService;

  public BasicController(ApiService apiService) {
    this.apiService = apiService;
  }

  @GetMapping
  public List<String> getResponse() {
    return apiService.getBasicResponse();
  }
}
