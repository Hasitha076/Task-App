package com.example.Task_Management_System.controller;

import com.example.Task_Management_System.dto.TaskDTO;
import com.example.Task_Management_System.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/createTask")
    public String createTask(@RequestBody TaskDTO taskDTO) {
        taskService.createTask(taskDTO);
        return "Task created successfully";
    }

    @PutMapping("/updateTask")
    public String updateTask(@RequestBody TaskDTO taskDTO) {
        taskService.updateTask(taskDTO);
        return "Task updated successfully";
    }

    @DeleteMapping("/deleteTask/{id}")
    public String deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }

    @GetMapping("/getTask/{id}")
    public TaskDTO getTask(@PathVariable int id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/getAllTasks")
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks();
    }
}
