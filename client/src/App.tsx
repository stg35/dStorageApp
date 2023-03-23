import React from 'react';
import { BasicForm } from './components/BasicForm';
import { FileList } from './components/FileList';

export interface AppProps {
  rpcUrl: string
}

function App({ rpcUrl }: AppProps): JSX.Element {
  return (
    <div>
      <BasicForm rpcUrl={rpcUrl}/>
      <FileList rpcUrl={rpcUrl}/>
    </div>
  );
}

export default App;
