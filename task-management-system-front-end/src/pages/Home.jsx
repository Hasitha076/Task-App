import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskCard from "../components/TaskCard";

import {
    CheckCircleOutlineOutlined,
    DonutLarge,
  } from "@mui/icons-material";

const Container = styled.div`
  height: 100%;
  text-align: center;
  padding: 50px 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    margin: 6px 0px;
    flex-direction: column;
  }
`;

const Task = styled.div`
  
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 4px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Span = styled.span`
  color: #000;
  font-weight: 400;
  margin-left: 8px;
`;

const Left = styled.div`
    width: 100%;
    padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Right = styled.div`
    width: 100%;
    padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid #000;
  color: #000;
  margin: 3px 0;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: white;
  }

  &:focus-within {
    cursor: text;
  }
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: #000;
`;

const Label = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #000;
  margin: 0;
  text-align: left;
  padding-bottom: 15px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: #000;
`;

const HrHor = styled.div`
  border: 0.5px solid #000;
`;

const Home = () => {
  const [input, setInput] = React.useState({
    taskName: "",
    description: "",
  });

  const [tasks, setTasks] = React.useState([]);
  const [statusChanged, setStatusChanged] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [taskDeleted, setTaskDeleted] = useState(false);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
   if(statusChanged) {
    getAlltasks();
    setStatusChanged(false);
   }
   if(taskUpdated) {
    getAlltasks();
    setTaskUpdated(false);
   }
   if(taskDeleted) {
    getAlltasks();
    setTaskDeleted(false);
   }
  }, [statusChanged, taskUpdated, taskDeleted])

  const getAlltasks = async () => {
    await axios.get("http://localhost:8080/api/v1/task/getAllTasks").then((res) => {

        const sortedData = [...(res.data || [])].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
    
        setTasks(sortedData);
        console.log(res.data);
    });
  }

  const addTask = async () => {
    try {
      if(input.taskName !== "" && input.description !== "") {
        await axios.post(
          "http://localhost:8080/api/v1/task/createTask",
          input
        ).then((res) => {
          console.log(res.data);
          setInput({ taskName: "", description: "" });
          getAlltasks();
        })
      }
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAlltasks();
  }, []);

  return (
    <Container>
        <h1 style={{ padding: "10px", marginBottom: "30px", backgroundColor: "rgb(46 136 213)", color: "#fff" }} >Task Management System</h1>
        <Wrapper>
        <Left>
        <Label>Add a Task</Label>
        <OutlinedBox>
        <TextInput
            placeholder="Title (Required)*"
            type="text"
            name="taskName"
            value={input.taskName}
            onChange={handleChange}
        />
        </OutlinedBox>

      <OutlinedBox style={{ marginTop: "6px" }}>
        <Desc
          placeholder="Description (Required)* "
          name="description"
          rows={5}
          value={input.description}
          onChange={handleChange}
        />
      </OutlinedBox>
      <OutlinedBox
              style={{ backgroundColor: "#000", color: "white" }}
              onClick={addTask}
            >
              Create Task
            </OutlinedBox>
        </Left>
        <HrHor />
        <Right>
        <Label>Tasks</Label>

        <Task>
              <Column>
                <ItemWrapper>
                  
                  <Top>
                    <Text>
                      <DonutLarge sx={{ color: "#1976D2", fontSize: "20px" }} />
                      In Progress
                      <Span>(
                        {
                          tasks.length !== 0 && tasks.filter(
                            (item) => item.status === false
                          ).length
                        }
                        )</Span>
                    </Text>
                    
                  </Top>

                    {tasks.length !== 0 && tasks.filter((item) => item.status === false).slice(0, 5)
                      .map((filteredItem, index) => (
                          <TaskCard key={index} task={filteredItem} setStatusChanged={setStatusChanged} setTaskUpdated={setTaskUpdated} setTaskDeleted={setTaskDeleted} />
                      ))}

                </ItemWrapper>
                <ItemWrapper>
                  <Top>
                    <Text>
                      <CheckCircleOutlineOutlined
                        sx={{ color: "#67BC6D", fontSize: "20px" }}
                      />
                      Completed

                      <Span>(
                        {
                          tasks.length !== 0 && tasks
                            .filter(
                              (item) => item.status === true
                            ).length
                        }
                        )</Span>
                    </Text>
                  </Top>
                    {tasks.length !== 0 && tasks.filter((item) => item.status === true).slice(0, 3)
                      .map((filteredItem, index) => (
                          <TaskCard key={index} task={filteredItem} setStatusChanged={setStatusChanged} setTaskUpdated={setTaskUpdated} setTaskDeleted={setTaskDeleted} />
                      ))}
                </ItemWrapper>
              </Column>
            </Task>
        </Right>
        </Wrapper>
    </Container>
  );
};

export default Home;
