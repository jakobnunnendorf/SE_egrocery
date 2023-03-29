import './App.css';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import { useState } from 'react';

function App() {
  const [activeBodyComponent, setActiveBodyComponent] = useState('home');
  return (
    <div className="App">
      <Header setActiveBodyComponent={setActiveBodyComponent}></Header>
      <Body activeComponent={activeBodyComponent}></Body>
    </div>
  );
}

export default App;
