package com.bluenucleus.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Arrays;

@Service
public class ApiService {

  private final List<String> list; 

  public ApiService() {
    this.list = Arrays.asList("Max", "Mulder");
  }

  public List<String> getBasicResponse() {
    return this.list;
  }
}
