import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Sparkles } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';

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
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="lightbox-header">
          <div className="lightbox-badge">
            <Sparkles size={14} className="accent-icon" />
            <span>{item.category}</span>
            <span className="dot-sep">•</span>
            <span>{currentIndex + 1} of {items.length}</span>
          </div>

          <div className="lightbox-actions">
            <button
              className="lightbox-btn"
              onClick={() => setIsZoomed((prev) => !prev)}
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            <a
              href={item.url}
              download={item.title}
              className="lightbox-btn"
              title="Download photo"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={18} />
            </a>
            <button
              className="lightbox-btn close-btn"
              onClick={onClose}
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className="lightbox-stage">
          <button
            className="lightbox-nav-btn prev-btn"
            onClick={handlePrev}
            title="Previous (Left arrow)"
          >
            <ChevronLeft size={28} />
          </button>

          <div className={`lightbox-image-wrapper ${isZoomed ? 'zoomed' : ''}`}>
            <img
              src={item.url}
              alt={item.title}
              className="lightbox-image"
              onClick={() => setIsZoomed((prev) => !prev)}
            />
          </div>

          <button
            className="lightbox-nav-btn next-btn"
            onClick={handleNext}
            title="Next (Right arrow)"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Bottom Details & Thumbnails */}
        <div className="lightbox-footer">
          <div className="lightbox-info">
            <h3 className="lightbox-title">{item.title}</h3>
            <p className="lightbox-desc">{item.desc}</p>
          </div>

          <div className="lightbox-thumbnails">
            {items.map((thumb) => (
              <button
                key={thumb.id}
                className={`lightbox-thumb ${thumb.id === item.id ? 'active' : ''}`}
                onClick={() => onSelect(thumb)}
              >
                <img src={thumb.url} alt={thumb.title} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
