'use client';
import Image from 'next/image';
import { useState } from 'react';
import { galleryCategories } from '@/lib/labels';
import { Icon } from './Icon';
import { Lightbox, type GalleryPhoto } from './Lightbox';
export function GalleryGrid({
  photos,
  filterable = false,
  preview = false,
}: {
  photos: GalleryPhoto[];
  filterable?: boolean;
  preview?: boolean;
}) {
  const [category, setCategory] = useState('all');
  const [index, setIndex] = useState<number | null>(null);
  const visible = photos.filter((photo) => category === 'all' || photo.category === category);
  return (
    <>
      {filterable && (
        <div className="gallery-filters" role="group" aria-label="Filter photographs">
          {[['all', 'All photographs'], ...Object.entries(galleryCategories)].map(
            ([key, label]) => (
              <button key={key} onClick={() => setCategory(key)} aria-pressed={category === key}>
                {label}
              </button>
            ),
          )}
        </div>
      )}
      <div className={`gallery-grid ${preview ? 'gallery-preview' : ''}`}>
        {visible.map((photo, photoIndex) => (
          <button
            className="gallery-item"
            key={photo.id}
            onClick={() => setIndex(photoIndex)}
            aria-label={`Open photograph: ${photo.alt}`}
          >
            <span className="gallery-photo">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder={photo.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={photo.blurDataURL}
                style={{ objectPosition: photo.objectPosition }}
              />
              <span className="gallery-open">
                <Icon name="plus" />
              </span>
            </span>
            {photo.caption && <span className="gallery-caption">{photo.caption}</span>}
          </button>
        ))}
      </div>
      {!visible.length && (
        <p className="empty-state" role="status">
          No photographs in this collection yet.
        </p>
      )}
      {index !== null && (
        <Lightbox photos={visible} initialIndex={index} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
