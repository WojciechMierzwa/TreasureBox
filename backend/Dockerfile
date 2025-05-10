# Use a Java base image to build the app
FROM eclipse-temurin:17-jdk as builder

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory
WORKDIR /app

# Copy Maven descriptor file
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy the full source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JRE image to run the app
FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/treasurebox-0.0.1-SNAPSHOT.jar /app/treasurebox.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/treasurebox.jar"]
