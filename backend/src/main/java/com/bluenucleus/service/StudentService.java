package com.bluenucleus.service;

import org.springframework.data.jpa.repository.Query;

import com.bluenucleus.model.Student;
import com.bluenucleus.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException; // I added this line 

@Service
public class StudentService {

  @Autowired
  private StudentRepository studentRepository;

  public List<Student> getStudentByFirstName(String name) {
    return this.studentRepository.getStudentByFirstName(name);
  }

  public List<Student> getAllStudents() {
    return this.studentRepository.findAll();
  }

  public Student getStudentById(int id) {
    // return this.studentRepository.findById(id).get();
    return this.studentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Student not found with ID: " + id));
  }

  public Student saveStudent(Student student) {
    // TODO: Deep dive lifecycle methods. @PrePersist and @PreUpdate may not 
    // be necessary or work with the hibernate implementation.
    if (student.getCreatedAt() == null) {
      student.setCreatedAt(LocalDateTime.now());
    }
    student.setUpdatedAt(LocalDateTime.now());
    return this.studentRepository.save(student);
  }

  public Student updateStudent(Student student) {
    Student existingStudent = this.getStudentById(student.getId());
    
    existingStudent.setFirstname(student.getFirstname());
    existingStudent.setLastname(student.getLastname());
    existingStudent.setAge(student.getAge());
    existingStudent.setUpdatedAt(LocalDateTime.now());
    return this.studentRepository.save(existingStudent);
  }

  public void deleteStudentById(int id) {
    Student student = this.getStudentById(id);
    this.studentRepository.delete(student);
  }
}
