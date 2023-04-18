let foo = () => {
  let color = () => {
    let randomNumber = () => {
      return Math.round(Math.random() * 255);
    };
    return `RGB(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
  };
  let rotate = () => {
    return Math.round(Math.random() * 360) + "deg";
  };
  return {
    background: `linear-gradient(${rotate()}, ${color()}, ${color()}`,
  };
};

export default foo;
