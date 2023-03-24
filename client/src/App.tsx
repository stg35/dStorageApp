import React from 'react';
import { BasicForm } from './components/BasicForm';
import { FileList } from './components/FileList';
import { Col, Row } from 'react-bootstrap';
import "./App.css"

export interface AppProps {
  rpcUrl: string
}

function App({ rpcUrl }: AppProps): JSX.Element {
  return (
      <div className='wrapper'>
      <Row>
        <Col xs={8}>
          <BasicForm rpcUrl={rpcUrl}/>
        </Col>
        <Col xs={4}><FileList rpcUrl={rpcUrl}/></Col>
      </Row>
      </div>
  );
}

export default App;
