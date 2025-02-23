package com.example.Task_Management_System.service;

import com.example.Task_Management_System.dto.TaskDTO;
import com.example.Task_Management_System.entity.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    public void createTask(TaskDTO taskDTO);
    public void updateTask(TaskDTO taskDTO);
    public TaskDTO getTaskById(int taskId);
    public List<TaskDTO> getAllTasks();
    public void deleteTask(int taskId);
}
