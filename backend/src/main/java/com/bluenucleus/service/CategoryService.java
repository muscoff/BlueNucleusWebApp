package com.bluenucleus.service;

import org.springframework.data.jpa.repository.Query;

import com.bluenucleus.model.Category;
import com.bluenucleus.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException; // I added this line 

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public List<Category> getAllCategories() {
    return this.categoryRepository.findAll();
  }

  public Category getCategoryById(int id) {
    // return this.categoryRepository.findById(id).get();
    return this.categoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Category not found with ID: " + id));
  }

  public Category saveCategory(Category category) {
    // TODO: Deep dive lifecycle methods. @PrePersist and @PreUpdate may not 
    // be necessary or work with the hibernate implementation.
    return this.categoryRepository.save(category);
  }

  public Category updateCategory(Category category) {
    Category existingCategory = this.getCategoryById(category.getId());
    
    existingCategory.setTitle(category.getTitle());
    existingCategory.setIsActive(category.getIsActive());
    return this.categoryRepository.save(existingCategory);
  }

  public void deleteCategoryById(int id) {
    Category category = this.getCategoryById(id);
    this.categoryRepository.delete(category);
  }
}
