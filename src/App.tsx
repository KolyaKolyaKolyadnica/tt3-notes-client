import { useEffect, useState } from "react";
import "./App.css";
import FirstNote from "./components/FirstNote/FirstNote";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getAllNotes } from "./redux/notes/notesOptions";
import Note from "./components/Note/Note";
import { useAppSelector } from "./hooks/useAppSelector";

function App() {
  const dispatch = useAppDispatch();
  const { notes, isLoading } = useAppSelector((store) => store.notes);
  const [allNotes, setAllNotes] = useState(notes);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  useEffect(() => {
    setAllNotes(notes);
  }, [notes]);

  // console.log("App notes ", notes);
  return (
    <div className={isLoading ? "App-loading " : "App"}>
      <div className="content">
        {/* <FirstNote /> */}
        <Note notes={notes} noteId={allNotes[0]._id} />
      </div>
    </div>
  );
}

export default App;
