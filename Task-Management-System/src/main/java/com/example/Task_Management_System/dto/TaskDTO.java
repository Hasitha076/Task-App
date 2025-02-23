package com.example.Task_Management_System.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private int taskId;
    private String taskName;
    private String description;
    private boolean status= false;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
