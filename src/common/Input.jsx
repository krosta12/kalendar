export default function Input(props) {
  return (
    <label>
      {props.labelText}
      <input
        name={props.name}
        type={props.extraItem ? "number" : "text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.className}
        onFocus={props.onFocus}
      />
    </label>
  );
}
