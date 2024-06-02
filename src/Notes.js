import { useCallback, useEffect, useState } from 'react';

const Notes = ({ notes, setNotes }) => {
  return notes.map((note) => <Note setNotes={setNotes} note={note} key={note.id} />);
};

const Note = ({ setNotes, note }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: null,
    y: null,
  });

  const [noteStyle, setNoteStyle] = useState({
    position: 'absolute',
    left: note.left ?? '0px',
    top: note.top ?? '0px',
    width: '300px',
    height: '100px',
    border: '1px solid black',
    background: 'lightyellow',
    padding: '5px',
  });

  const setNotesStore = useCallback(
    (left, top) => {
      setNotes((notes) => {
        let n = notes.find((item) => item.id === note.id);

        n.left = left;
        n.top = top;

        return [...notes];
      });
    },
    [setNotes, note]
  );

  useEffect(() => {
    if (note.default || !note.left) {
      const maxX = window.innerWidth - 310;
      const maxY = window.innerHeight - 110;

      setNoteStyle((style) => {
        return {
          ...style,
          left: `${Math.floor(Math.random() * maxX)}px`,
          top: `${Math.floor(Math.random() * maxY)}px`,
        };
      });
    } else {
      setNoteStyle((style) => {
        return {
          ...style,
          left: note.left,
          top: note.top,
        };
      });
    }
  }, [note]);

  useEffect(() => {
    if (isMouseDown) {
      setNoteStyle((style) => {
        return {
          ...style,
          left: mousePos.x ? `${mousePos.x - 150}px` : style.left,
          top: mousePos.y ? `${mousePos.y - 50}px` : style.top,
          zIndex: 10,
        };
      });
    } else {
      setNoteStyle((style) => {
        return {
          ...style,
          zIndex: 0,
        };
      });
    }
  }, [isMouseDown, mousePos]);

  useEffect(() => {
    setNotesStore(noteStyle.left, noteStyle.top);
  }, [setNotesStore, noteStyle]);

  const onMouseDown = (event) => {
    setIsMouseDown(true);
    setMousePos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = (event) => {
    if (isMouseDown) {
      setMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  return (
    <div onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={noteStyle}>
      📌 {note.note}
    </div>
  );
};

export default Notes;
