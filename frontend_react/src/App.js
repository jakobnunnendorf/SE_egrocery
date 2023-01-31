import './App.css';
import Catalogue from './Catalogue/Catalogue';

function App() {
  return (
    <div className="App">
      <header>
        Navbar
      </header>
      {/* we wrap in main to push the entire main section down
      so we can prevent overlap with header */}
      <main>
      <Catalogue/>
      </main>
    </div>
  );
}

export default App;
