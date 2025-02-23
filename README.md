# Task Management System

This project is a **Task Management System** built with **Spring Boot** and **React**. It is connected to a **MySQL** database and can be run using **Docker**.

## Project Overview

- **Backend**: Built with **Spring Boot**.
- **Frontend**: Built with **React**.
- **Database**: Uses **MySQL** for persistent storage.
- **Docker**: The entire project is containerized and can be run using Docker.

## Prerequisites

Before you run this project, ensure you have the following installed:

- **Docker**: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- **Java** (for Spring Boot backend): [Java Installation Guide](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Node.js** (for React frontend): [Node.js Installation Guide](https://nodejs.org/)

## Running the Project

Follow the steps below to run the project:

### 1. Clone the Repository

Clone the repository to your local machine using:

- git clone https://github.com/Hasitha076/Task-Management-Application.git
- cd Task-Management-Application

### 2. Docker Setup

The project is containerized using Docker and Docker Compose. This will allow you to run both the backend and frontend services together with a MySQL database in isolated containers.

1. Build and Run with Docker Compose
In the root of your project, there should be a docker-compose.yml file. You can use Docker Compose to build and run the backend, frontend, and MySQL containers.

Step 1: Build and Run the Containers

Open your terminal and run the following command from the root directory of the project:

- docker-compose up --build

This command will:

Build Docker images for the Spring Boot backend, React frontend, and MySQL database.
Start all the necessary containers.
Expose ports for the backend and frontend services.
Step 2: Wait for the Containers to Start

After running the docker-compose up --build command, Docker will start building the images for each service. Once the process is complete, the containers will start running. It might take a few minutes depending on your internet speed and machine configuration.

### 3. Access the Application
After starting the containers, you can access the application in the following ways:

Frontend: Open your browser and navigate to http://localhost:3000 to access the React frontend.
Backend: The Spring Boot backend should be running on http://localhost:8080. You can access any API endpoints exposed by the backend through this URL.
Database: The MySQL database can be accessed via localhost:3306 (you may need database management tools like DBeaver or MySQL Workbench for better interaction with the database).

### 4.  Stopping the Application
To stop all running containers, use the following command:

- docker-compose down
