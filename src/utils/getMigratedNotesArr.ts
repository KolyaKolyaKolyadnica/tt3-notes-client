const getMigratedNotesArr = (id: string, arr: string[], direction: string) => {
  const idx = arr.findIndex((item) => item === id);

  const newArr = [...arr];

  direction === "up"
    ? ([newArr[idx], newArr[idx - 1]] = [newArr[idx - 1], newArr[idx]])
    : ([newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]]);

  return newArr;
};

export default getMigratedNotesArr;
