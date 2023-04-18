const removeChildrenNoteById = (
  childrenNoteId: number,
  notes: any,
  setNotes: any
) => {
  const filteredNotes = notes.filter(
    (note: any, idx: number) => childrenNoteId !== idx
  );
  setNotes(filteredNotes);
};
export default removeChildrenNoteById;
