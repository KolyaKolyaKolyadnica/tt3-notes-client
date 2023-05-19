import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllNotes } from "../../redux/notes/notesOptions";
import Note from "../../components/Note/Note";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import style from "./NotePage.module.css";
import { checkAuth } from "../../redux/auth/authOptions";

function NotePage() {
  const dispatch = useAppDispatch();
  const { notes, isLoading, error } = useAppSelector((store) => store.notes);
  // { user, isAutorizated }
  const storeAuth = useAppSelector((store) => store.auth);
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     !storeAuth.user?.id &&
  //     !storeAuth.isAutorizated &&
  //     storeAuth.isLoading
  //   ) {
  //     navigate("/auth");
  //   }
  // }, []);

  useEffect(() => {
    if (!storeAuth.isAutorizated && !storeAuth.isLoading) {
      navigate("/auth");
    }
  }, [storeAuth.isAutorizated]);

  useEffect(() => {
    if (storeAuth.user?.id) {
      dispatch(getAllNotes(storeAuth.user.id));
    }
  }, [storeAuth.user]);

  return (
    <div className={isLoading ? style.appLoading : style.app}>
      <div className={style.content}>
        {!storeAuth.user?.isActivated &&
          notes[0] &&
          storeAuth.isAutorizated && (
            <h1>Please, go to your email for activated.</h1>
          )}
        {storeAuth.isLoading && <h1>Checking your authorization</h1>}
        {notes.length > 0 && storeAuth.user.isActivated && (
          <Note notes={notes} noteId={notes[0]._id} />
        )}
      </div>
    </div>
  );
}

export default NotePage;
