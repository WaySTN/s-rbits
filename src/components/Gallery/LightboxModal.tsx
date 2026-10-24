import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';
import './LightboxModal.css';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onSelect
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const nextIdx = (items.findIndex((i) => i.id === item.id) + 1) % items.length;
        onSelect(items[nextIdx]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIdx = (items.findIndex((i) => i.id === item.id) - 1 + items.length) % items.length;
        onSelect(items[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onSelect]);

  if (!item) return null;

  return (
    <div className="clean-lightbox-backdrop" onClick={onClose}>
      {/* Tombol X Polos Tanpa Bulatan dengan Animasi */}
      <button
        className="clean-close-btn"
        onClick={onClose}
        title="Tutup (Esc)"
        aria-label="Tutup preview"
      >
        <X size={34} strokeWidth={2.2} />
      </button>

      {/* Tampilan Foto Clean Utama */}
      <div
        className="clean-image-container"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url || (item as any).image}
          alt={item.title || (item as any).alt || 'Preview'}
          className="clean-preview-img"
        />
      </div>
    </div>
  );
};
