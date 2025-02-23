package com.example.Task_Management_System;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;

import com.example.Task_Management_System.dto.TaskDTO;
import com.example.Task_Management_System.entity.Task;
import com.example.Task_Management_System.repository.TaskRepository;
import com.example.Task_Management_System.service.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    public void testCreateTask() {
        // Given: A new taskDTO
        TaskDTO taskDTO = new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        Task task = new Task(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        // Stub modelMapper.map() to return the correct task object
        when(modelMapper.map(taskDTO, Task.class)).thenReturn(task);

        // Stub repository save method
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When: Calling createTask with TaskDTO
        taskService.createTask(taskDTO);

        // Then: Verify that save was called once
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    public void testUpdateTask() {
        // Given: A new taskDTO
        TaskDTO taskDTO = new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        Task task = new Task(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        // Stub repository findById method
        when(taskRepository.findById(1)).thenReturn(java.util.Optional.of(task));

        // Stub modelMapper.map() to return the correct task object
        when(modelMapper.map(taskDTO, Task.class)).thenReturn(task);

        // Stub repository save method
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When: Calling updateTask with TaskDTO
        taskService.updateTask(taskDTO);

        // Then: Verify that save was called once
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    public void testDeleteTask() {
        // Given: A task id
        int taskId = 1;

        // When: Calling deleteTask with task id
        taskService.deleteTask(taskId);

        // Then: Verify that deleteById was called once
        verify(taskRepository, times(1)).deleteById(taskId);
    }

    @Test
    public void testGetTaskById() {
        // Given: A task id
        int taskId = 1;

        Task task = new Task(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        // Stub repository findById method
        when(taskRepository.findById(1)).thenReturn(java.util.Optional.of(task));

        // When: Calling getTaskById with task id
        TaskDTO taskDTO = taskService.getTaskById(taskId);

        // Then: Verify that findById was called once
        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    public void testGetAllTasks() {
        // When: Calling getAllTasks
        taskService.getAllTasks();

        // Then: Verify that findAll was called once
        verify(taskRepository, times(1)).findAll();
    }

}
