function Button({ id, text, onClick, className }) {
  return (
    <button id={id} onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default Button;
