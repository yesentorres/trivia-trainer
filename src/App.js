import Round from './components/Round.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Trainer</h1>
      </header>

      <main className="App-main">
        < Round />
      </main>
    </div>
  );
}

export default App;