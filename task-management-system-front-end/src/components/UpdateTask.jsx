import { IconButton, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import {
    CloseRounded
} from "@mui/icons-material";
import axios from "axios";

const Container = styled.div`
width: 600px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 600px;
  border-radius: 16px;
  color: #000;
  border-radius: 16px;
    background-color: #50c7ff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #000;
  margin: 12px 0;
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
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin: 12px 0 0px 0;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 12px 0;
  align-items: center;
  justify-content: space-between;
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


const UpdateTask = ({ openUpdate, setOpenUpdate, setTaskUpdated }) => {
    const [Loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [inputs, setInputs] = useState({ 
        taskId: openUpdate.data.taskId, 
        taskName: openUpdate.data.taskName, 
        description: openUpdate.data.description,
        ststus: openUpdate.data.status
    });


    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const UpdateTask = async () => {
        setLoading(true);
        setDisabled(true);
        

        await axios.put(`http://localhost:8080/api/v1/task/updateTask`, {
            taskId: inputs.taskId, 
            taskName: inputs.taskName, 
            description: inputs.description, 
            status: inputs.ststus
        })
            .then((res) => {
                console.log(res);
                setLoading(false);
                setOpenUpdate({ ...openUpdate, state: false });
                setTaskUpdated(true)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setDisabled(false);
            });

    };

    useEffect(() => {
        if (inputs.taskName === "" || inputs.description === "") {
            setDisabled(true);
            setLoading(true);
        } else {
            setDisabled(false);
            setLoading(false);
        }
    }, [inputs]);

    return (
        <Modal open={true} onClose={() => setOpenUpdate({ ...openUpdate, state: false })}>
            <Container>
                <Wrapper>
                    <IconButton
                        style={{
                            position: "absolute",
                            top: "18px",
                            right: "0",
                            cursor: "pointer",
                            color: "inherit",
                        }}
                        onClick={() => setOpenUpdate({ ...openUpdate, state: false })}
                    >
                        <CloseRounded style={{ color: "inherit" }} />
                    </IconButton>
                    <Title>Update Task</Title>

                        <>
                            <Label>Task Details :</Label>
                            <OutlinedBox style={{ marginTop: "12px" }}>
                                <TextInput
                                    placeholder="Title (Required)*"
                                    type="text"
                                    name="taskName"
                                    value={inputs.taskName}
                                    onChange={handleChange}
                                />
                            </OutlinedBox>
                            <OutlinedBox style={{ marginTop: "6px" }}>
                                <Desc
                                    placeholder="Description (Required)* "
                                    name="description"
                                    rows={5}
                                    value={inputs.description}
                                    onChange={handleChange}
                                />
                            </OutlinedBox>

                            {openUpdate.type === "Task" && (
                            <ButtonContainer>
                                <OutlinedBox
                                    button={true}
                                    activeButton={false}
                                    style={{ marginTop: "18px", width: "100%", cursor: "pointer" }}
                                    onClick={() => {setOpenUpdate({ ...openUpdate, state: false });}}
                                >
                                    Close
                                </OutlinedBox>
                                <OutlinedBox
                                    button={true}
                                    activeButton={!disabled}
                                    style={{ marginTop: "18px", width: "100%", cursor: "pointer", backgroundColor: !disabled ? "#000" : "transparent", color: !disabled ? "#fff" : "#000" }}
                                    onClick={() => {
                                        !disabled && UpdateTask();
                                    }}
                                >
                                    {Loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        "Update Task"
                                    )}
                                </OutlinedBox>
                            </ButtonContainer>
                            )}
                        </>
                </Wrapper>
            </Container>
        </Modal>
    );
}

export default UpdateTask