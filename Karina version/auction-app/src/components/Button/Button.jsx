export default function Button({ variant, children, ...props }) {
  return (
    <button className={`btn btn-${variant} ${props.className}`} {...props}>
      {children}
    </button>
  );
}
