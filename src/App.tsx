import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getAllNotes } from "./redux/notes/notesOptions";
import Note from "./components/Note/Note";
import { useAppSelector } from "./hooks/useAppSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const { notes, isLoading, error } = useAppSelector((store) => store.notes);
  const [allNotes, setAllNotes] = useState(notes);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  useEffect(() => {
    setAllNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className={isLoading ? "App-loading " : "App"}>
      <div className="content">
        <Note notes={notes} noteId={allNotes[0]._id} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
