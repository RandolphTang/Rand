import './App.css';
import LogoBackground from './components/LogoBackground';
import Footer from './components/footer';
import TotalVisitors from './components/userCounterClient'


function App() {

  return (
    <div className="App">

      <img src="/cloud.png" alt = "windAnimation" class = "wind" />
      <img src="/cloud.png" alt = "windAnimation2" class = "wind2" />
      <img src="/cloud.png" alt = "windAnimation2" class = "wind3" />
      <header className="App-header">
        <TotalVisitors className="dataTracker" />
        <LogoBackground />
        <p className='userHint'>Click the herb</p>
      </header>

      <footer className="App-footer">
        <Footer />
      </footer>
    
    </div>
  );
}

export default App;
