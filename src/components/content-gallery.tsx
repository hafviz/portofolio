import Image from "next/image";

// Reusable gallery for content images of unknown dimensions.
// Uses next/image with fill inside a fixed-aspect box, so:
// - no layout shift (the box reserves space before loading)
// - responsive sizes (browser downloads an appropriate width)
// - consistent 4:3 rectangles matching the design system
// Render only when images exist; parents handle the empty state.

export function ContentGallery({
  images,
  alt,
  columns = 3,
}: {
  images: string[];
  alt: string;
  columns?: 2 | 3;
}) {
  if (images.length === 0) return null;
  return (
    <div className={columns === 2 ? "grid-2" : "grid-3"}>
      {images.map((src, i) => (
        <div key={src} className="gallery-box">
          <Image
            src={src}
            alt={i === 0 ? alt : ""}
            fill
            sizes="(max-width: 860px) 100vw, 33vw"
            className="gallery-fill"
          />
        </div>
      ))}
    </div>
  );
}
