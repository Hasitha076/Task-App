import { CloseRounded } from '@mui/icons-material';
import { CircularProgress, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';


const Container = styled.div`
  position: absolute;
  top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 430px;
  height: 300px;
  border-radius: 16px;
  background-color: #50c7ff;
  color: #000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Heading = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin: 12px 12px 0 12px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  margin: 12px ;
  line-height: 1.5;
`;

const Input = styled.input`
  border: none;
  font-size: 14px;
  padding: 14px 20px;
  margin: 12px;
  border-radius: 12px;
  color: #000;
  &:focus {
    outline: 1px solid #000;
  }
`;

const Button = styled.button`
  border: none;
  font-size: 14px;
  padding: 14px 20px;
  margin: 0px 12px 12px 12px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
`;


const DeletePop = ({ openDelete, setOpenDelete, setTaskDeleted}) => {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (name === openDelete.name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, openDelete.name]);


  const handleDelete = () => {
    setLoading(true);
    setDisabled(true);
    if (openDelete.type === "Task") {
        DeleteTeam();
    }

  }

  const DeleteTeam = async () => {
    await axios.delete(`http://localhost:8080/api/v1/task/deleteTask/${openDelete.id}`)
    .then((res) => {
      console.log(res);
      setTaskDeleted(true);
      handleDeleteSuccess();
    }
    ).catch((err) => {
    })
  }

  const handleDeleteSuccess = () => {
    setLoading(false);
    setOpenDelete({ ...openDelete, state: false });
  }

  return (
    <Modal open={true} onClose={() => setOpenDelete({ ...openDelete, state: false })}>
      <Container>
        <Wrapper>
          <CloseRounded
            sx={{ fontSize: "22px" }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpenDelete({ ...openDelete, state: false })}
          />
          <Heading>Delete {openDelete.type}</Heading>
          <Text>Are you sure you want to delete this {openDelete.type} <b>{openDelete.name}</b>.<br /> This will permanently delete <b>{openDelete.name}</b> {openDelete.type}'s all the informations.</Text>
          <Input type="text" placeholder={`Enter the name of the ${openDelete.type} to confirm`} value={name} onChange={(e) => setName(e.target.value)} />
          <Button disabled={disabled} onClick={() => handleDelete()}>
            {loading ? <CircularProgress size="14px" color="inherit" />
              : "Confirm"}
          </Button>
        </Wrapper>
      </Container>
    </Modal>
  )
}

export default DeletePop