export default function GalleryCard({ image, index, alt }) {
  return (
    <a href="/gallery" aria-label={`Open gallery image ${index + 1}`}>
      <img src={image} alt={alt || `Sevoday Foundation moment ${index + 1}`} />
    </a>
  );
}
