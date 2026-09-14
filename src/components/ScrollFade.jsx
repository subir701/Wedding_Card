export default function ScrollFade({ children, className = "" }) {
  return (
    <div className={`w-full max-w-4xl px-4 flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
}