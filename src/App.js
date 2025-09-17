import './App.css';
import AddNote from './components/AddNote';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/notes" element={<Notes />} />
          <Route exact path="/create" element={<AddNote />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;

