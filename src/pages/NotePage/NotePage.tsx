import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllNotes } from "../../redux/notes/notesOptions";
import Note from "../../components/Note/Note";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import style from "./NotePage.module.css";

function NotePage() {
  const dispatch = useAppDispatch();
  const { notes, isLoading, error } = useAppSelector((store) => store.notes);
  const { user, isAutorizated } = useAppSelector((store) => store.auth);
  // const [allNotes, setAllNotes] = useState(notes);
  let navigate = useNavigate();

  if (!isAutorizated) {
    navigate("/");
  }

  // useEffect(() => {
  //   if (isAutorizated) {
  //     navigate("/");
  //   }
  // }, []);
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllNotes(user.id));
    }
  }, [user]);

  // useEffect(() => {
  //   setAllNotes(notes);
  // }, [notes]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  if (!user?.isActivated) {
    return <h1>Please, go to your email for activated.</h1>;
  }

  return (
    <div className={isLoading ? style.appLoading : style.app}>
      <div className={style.content}>
        {notes.length > 0 && <Note notes={notes} noteId={notes[0]._id} />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default NotePage;
