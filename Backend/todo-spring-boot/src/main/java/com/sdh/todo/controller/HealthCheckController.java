package com.sdh.todo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
	
	@GetMapping("/health")
	public String healthCheck() {
		return "The service is up and running...";
	}
}
