'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { labels } from '@/lib/labels';
export interface GalleryPhoto {
  id: string;
  src: string;
  largeSrc: string;
  alt: string;
  caption?: string;
  category?: string;
  blurDataURL?: string;
  objectPosition?: string;
}
export function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const photo = photos[index];
  const move = (delta: number) =>
    setIndex((current) => (current + delta + photos.length) % photos.length);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  if (!photo) return null;
  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photo gallery"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-toolbar">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
        <button
          autoFocus
          onClick={onClose}
          className="icon-button"
          aria-label="Close photo gallery"
        >
          <Icon name="close" />
        </button>
      </div>
      <div
        className="lightbox-stage"
        onTouchStart={(event) => {
          touchStart.current = event.changedTouches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <Image
          src={photo.largeSrc}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="lightbox-bottom">
        {photos.length > 1 && (
          <button onClick={() => move(-1)} className="icon-button" aria-label={labels.previous}>
            <Icon className="rotate-180" />
          </button>
        )}
        <p aria-live="polite" aria-atomic="true">
          {photo.caption || photo.alt}
          <span className="sr-only">
            {' '}
            — Photograph {index + 1} of {photos.length}
          </span>
        </p>
        {photos.length > 1 && (
          <button onClick={() => move(1)} className="icon-button" aria-label={labels.next}>
            <Icon />
          </button>
        )}
      </div>
    </dialog>
  );
}
