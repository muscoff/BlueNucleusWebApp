package com.bluenucleus.repository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.bluenucleus.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> { 
}
