export default function SketchyRule({ className = "" }) {
  return (
    <svg
      className={`w-full text-c-gold ${className}`}
      height="8"
      viewBox="0 0 400 8"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 4.5 C44 2, 88 7, 133 4.5 C177 2, 221 7, 265 4.5 C310 2, 354 7, 400 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}
