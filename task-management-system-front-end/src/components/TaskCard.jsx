import React, { useState } from "react";
import styled from "styled-components";
import {
  TimelapseRounded
} from "@mui/icons-material";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";
import {Button, IconButton} from '@mui/material';
import axios from "axios";
import {
    Delete,
    Edit
  } from "@mui/icons-material";
import UpdateTask from "./UpdateTask";
import DeletePop from "./DeletePop";

const Container = styled.div`
  padding: 15px;
  text-align: left;
  margin: 10px 0px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  color: #000;
  cursor: pointer;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
  &:hover {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Top = styled.div`
display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-top: 0;
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Desc = styled.h6`
  font-size: 14px;
  color: #000;
    margin: 0;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 0 0px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #000;
`;

const IcoBtn = styled(IconButton)`
  width: 30px;
  height: 30px;
`;


const TaskCard = ({ task, setStatusChanged, setTaskUpdated, setTaskDeleted }) => {

  const [openUpdate, setOpenUpdate] = useState({ state: false, type: "Task", data: task });
  const [openDelete, setOpenDelete] = useState({ state: false, type: "Task", data: task });

    const handleChange = async () => {
        await axios.put(`http://localhost:8080/api/v1/task/updateTask`, {
            taskId: task.taskId,
            taskName: task.taskName,
            description: task.description,
            status: !task.status,
        }).then(() => {
            setStatusChanged(true)
        }).catch((err) => {
            console.log(err);
            
        })
    }
  
  return (
    <Container className={"item"}>
      <Top>
            <div>
            <Main>
                <Avatar
                        sx={{
                            marginRight: "13px",
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                            borderRadius: '20px',
                            backgroundColor: "#0096ff",
                            textTransform: 'uppercase'
                        }}
                        >
                        {task.taskName.charAt(0)}
                </Avatar>
                <Title>{task.taskName}</Title>
            </Main>
            <Desc>{task.description}</Desc>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '10px' }}>
              <IcoBtn style={{ border: '1px solid orange', backgroundColor: "orange", color: "#fff" }} onClick={() => setOpenUpdate({ state: true, type: 'Task', data: task })}>
                <Edit sx={{ fontSize: "18px" }} />
              </IcoBtn>
              <IcoBtn style={{ border: '1px solid red', backgroundColor: "red", color: "#fff" }} onClick={() => setOpenDelete({ state: true, type: 'Task', name: task?.taskName, id: task.taskId })}>
                <Delete sx={{ fontSize: "18px" }} />
              </IcoBtn>
              
            </div>
      </Top>
        
      <Bottom>
        <Time>
          <TimelapseRounded sx={{ fontSize: "22px" }} /> Updated{" "}
          {format(task.updatedAt)}
        </Time>

        <Button variant="outlined" onClick={handleChange}>{
            task.status === false ? "Done" : "Undo"
        }</Button>
      </Bottom>
      {openUpdate.state && <UpdateTask openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} setTaskUpdated={setTaskUpdated}  />}
      {openDelete.state && <DeletePop openDelete={openDelete} setOpenDelete={setOpenDelete} setTaskUpdated={setTaskUpdated} setTaskDeleted={setTaskDeleted}  />}
    </Container>

    
  );

};



export default TaskCard;
