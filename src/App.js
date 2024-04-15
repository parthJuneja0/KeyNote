import './App.css';
import About from './components/About';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <NoteState>
      {/* This is required to use Context API */}
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;

