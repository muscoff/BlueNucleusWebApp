package com.bluenucleus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name="firebase_id", nullable = false)
  private String firebaseId;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "github_username", nullable = false)
  private String githubUsername;

  @Column(name = "active_status", nullable = false)
  private boolean activeStatus;
  
  @Column(name = "is_admin", nullable = false)
  private boolean isAdmin;

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
