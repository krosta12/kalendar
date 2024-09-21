function Button({ id, text, onClick }) {
  return (
    <button id={id} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
