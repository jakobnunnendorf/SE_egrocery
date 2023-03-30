import './App.css';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [activeBodyComponent, setActiveBodyComponent] = useState('home');
  return (
    <div className="App">
      <Header setActiveBodyComponent={setActiveBodyComponent}></Header>
      <Body activeComponent={activeBodyComponent}></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
