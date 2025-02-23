import { useState } from 'react';
import './App.css';
import Home from './pages/Home';

import styled from 'styled-components';

const Container = styled.div`
height: 100vh;
  overflow-x: hidden;
`;


function App() {
  const [loading, setLoading] = useState(false);

  return (
      <Container >
        {loading ? <div>Loading...</div> : <>
              
              <Home />
        </>}
      </Container>

  );
}

export default App;
