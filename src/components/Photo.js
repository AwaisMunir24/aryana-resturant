export default function Photo({ src, alt }) {
  return src ? <img src={src} alt={alt} loading="lazy" /> : <div className="ph">{alt}</div>;
}
