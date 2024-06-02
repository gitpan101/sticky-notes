import { useEffect, useState } from 'react';
import './App.css';
import Notes from './Notes';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      note: 'Welcome!',
      default: true,
    },
  ]);
  const [text, setText] = useState('');

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const createNote = () => {
    setNotes((notes) => [
      ...notes,
      {
        id: notes[notes.length - 1].id + 1,
        note: text,
        default: false,
      },
    ]);

    setText('');
  };

  useEffect(() => {
    const notes = localStorage.getItem('notes');

    if (notes) {
      const notesJson = JSON.parse(notes);
      if (notesJson.length > 0) setNotes(notesJson);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 1) localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <input
          style={{
            padding: '5px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          type="text"
          placeholder="Add a note"
          value={text}
          onChange={onTextChange}
        />

        <button
          style={{
            padding: '5px 10px',
            background: '#007FFF',
            color: 'white',
            border: '2px solid blue',
            borderRadius: '5px',
            fontSize: '15px',
            marginLeft: '20px',
          }}
          onClick={createNote}
        >
          Add
        </button>
      </div>

      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
