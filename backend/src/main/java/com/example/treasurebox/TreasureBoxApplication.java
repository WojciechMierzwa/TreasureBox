package com.example.treasurebox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TreasureBoxApplication {

	public static void main(String[] args) {
		SpringApplication.run(TreasureBoxApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://192.168.0.4:3000", "http://192.168.0.4:3000/")
						.allowedMethods("*")
						.allowedHeaders("*");
			}
		};
	}
}
