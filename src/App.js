import './App.css';
import LogoBackground from './components/LogoBackground';
import Footer from './components/footer';



function App() {

  return (
    <div className="App">

      <img src="/cloud.png" alt = "windAnimation" class = "wind" />
      <img src="/cloud.png" alt = "windAnimation2" class = "wind2" />
      <img src="/cloud.png" alt = "windAnimation2" class = "wind3" />
      <header className="App-header">
        
        <LogoBackground />
        <p className='userHint'>Click the herb for 3s</p>
      </header>

      <footer className="App-footer">
        <Footer />
      </footer>
    
    </div>
  );
}

export default App;
