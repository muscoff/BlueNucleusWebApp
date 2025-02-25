package com.bluenucleus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@Data
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name="firstname", nullable = false)
  private String firstname;

  @Column(nullable = false)
  private String lastname;

  @Column(nullable = false)
  private int age;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt; // TODO: Deep dive why @Data isn't generating setters

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt; // TODO: Deep dive why @Data isn't generating setters

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
