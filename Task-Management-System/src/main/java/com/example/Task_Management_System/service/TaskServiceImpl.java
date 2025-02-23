package com.example.Task_Management_System.service;

import com.example.Task_Management_System.dto.TaskDTO;
import com.example.Task_Management_System.entity.Task;
import com.example.Task_Management_System.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final ModelMapper modelMapper;
    private final TaskRepository taskRepository;

    @Override
    public void createTask(TaskDTO taskDTO) {
        taskRepository.save(modelMapper.map(taskDTO, Task.class));
    }

    @Override
    public void updateTask(TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskDTO.getTaskId()).orElse(null);

        if(task != null) {
            taskDTO.setCreatedAt(task.getCreatedAt());
        }

        taskRepository.save(modelMapper.map(taskDTO, Task.class));
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return modelMapper.map(tasks, new TypeToken<List<TaskDTO>>(){}.getType());
    }

    @Override
    public TaskDTO getTaskById(int id) {
        Task task = taskRepository.findById(id).orElse(null);
        if(task == null) {
            return null;
        }
        return modelMapper.map(task, TaskDTO.class);
    }

    @Override
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }
}
