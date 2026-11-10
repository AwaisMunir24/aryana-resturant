export default function Logo() {
  return (
    <span className="logo" aria-label="Aryana Restaurant">
      <svg width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#3b0f55" stroke="#ffb703" strokeWidth="2" />
        <path d="M13 37V23a11 11 0 0122 0v14z" fill="none" stroke="#ffb703" strokeWidth="2" />
        <path d="M24 35c-5-2-6-7-2-12 1 2 2 3 3 3 0-3 1-5 3-8 4 6 3 14-4 17z" fill="#ff4d94" />
        <path d="M24 35c-2-1-3-3-1-6 1 1 2 1 2 0 2 2 1 5-1 6z" fill="#ffb703" />
      </svg>
      <span><b>Aryana</b><small>Restaurant</small></span>
    </span>
  );
}
