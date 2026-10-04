export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-status-danger">{children}</p>;
}
