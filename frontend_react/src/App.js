import './App.css'; // for the styling of the app frame

// import the components rendered in the app frame
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';

// we use useState to set the active component in the body for navigation purposes
import { useState } from 'react';

// the app frame component in which all of the components are going to be hosted
function App() {
  // set the active component in the body
  const [activeBodyComponent, setActiveBodyComponent] = useState('home'); // by default the home page component is active
  
  return( // rendering section
    <div className="App">
      <Header setActiveBodyComponent={setActiveBodyComponent}></Header> {/* pass setter function to the header so navlinks can change the active component */}
      <Body activeComponent={activeBodyComponent}></Body> {/* pass info about which component was selected to body */}
      <Footer></Footer> {/* footer is always the same */}
    </div>
  )
}

export default App;
