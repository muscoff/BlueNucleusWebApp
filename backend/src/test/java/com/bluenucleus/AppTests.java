package com.bluenucleus;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.google.gson.JsonObject;

import com.bluenucleus.model.User;

import java.time.LocalDateTime;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

  @Test void testLombokInjection() {
    User user = new User();
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());
  }

}
