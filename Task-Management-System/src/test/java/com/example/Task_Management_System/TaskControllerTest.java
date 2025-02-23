package com.example.Task_Management_System;

import com.example.Task_Management_System.controller.TaskController;
import com.example.Task_Management_System.dto.TaskDTO;
import com.example.Task_Management_System.service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService taskService;

    @Test
    public void testGetAllTasks() throws Exception {
        List<TaskDTO> taskDTOs = List.of(new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00")));

        when(taskService.getAllTasks()).thenReturn(taskDTOs);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/task/getAllTasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].taskName").value("Task 1"))
                .andExpect(jsonPath("$[0].description").value("Description 1"));
    }

    @Test
    public void testGetTaskById() throws Exception {
        TaskDTO taskDTO = new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        when(taskService.getTaskById(1)).thenReturn(taskDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/task/getTask/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taskName").value("Task 1"));
    }

    @Test
    public void testCreateTask() throws Exception {
        TaskDTO taskDTO = new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        doNothing().when(taskService).createTask(any(TaskDTO.class));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/task/createTask")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"taskId\":1,\"taskName\":\"Task 1\",\"description\":\"Description 1\",\"completed\":false}")
                )
                .andExpect(status().isOk())
                .andExpect(content().string("Task created successfully"));

    }

    @Test
    public void testUpdateTask() throws Exception {
        TaskDTO taskDTO = new TaskDTO(1, "Task 1", "Description 1", false,
                LocalDateTime.parse("2021-09-01T00:00:00"),
                LocalDateTime.parse("2021-09-10T00:00:00"));

        doNothing().when(taskService).updateTask(any(TaskDTO.class));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/task/updateTask")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"taskId\":1,\"taskName\":\"Task 1\",\"description\":\"Description 1\",\"completed\":false}")
                )
                .andExpect(status().isOk())
                .andExpect(content().string("Task updated successfully"));

    }

    @Test
    public void testDeleteTask() throws Exception {
        doNothing().when(taskService).deleteTask(1);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/task/deleteTask/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Task deleted successfully"));
    }
}
