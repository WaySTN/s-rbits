import React, { useState, useRef } from 'react';
import { Maximize2, Sparkles, Calendar, Eye } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';

interface SpotlightGridGalleryProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

interface TiltCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ item, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * 18; // Max 18 deg
    const tiltY = (x - 0.5) * 18;

    setTransformStyle(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`
    );
    setSpotlightPos({
      x: x * 100,
      y: y * 100,
      opacity: 0.6
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className="spotlight-card"
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="card-spotlight-overlay"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(168, 85, 247, 0.35) 0%, rgba(99, 102, 241, 0.15) 35%, transparent 70%)`,
          opacity: spotlightPos.opacity,
          transition: 'opacity 0.25s ease'
        }}
      />

      <div className="spotlight-img-box">
        <img src={item.url} alt={item.title} />
        <div className="spotlight-badge">
          <Sparkles size={12} />
          <span>{item.category}</span>
        </div>
        <div className="spotlight-hover-trigger">
          <span className="expand-pill">
            <Eye size={14} />
            <span>Lihat Detail</span>
          </span>
        </div>
      </div>

      <div className="spotlight-content">
        <div className="spotlight-row">
          <h4 className="spotlight-title">{item.title}</h4>
          <span className="spotlight-date">
            <Calendar size={12} />
            {item.date}
          </span>
        </div>
        <p className="spotlight-desc">{item.desc}</p>
        <button
          className="spotlight-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
        >
          <Maximize2 size={14} />
          <span>Buka Preview</span>
        </button>
      </div>
    </div>
  );
};

export const SpotlightGridGallery: React.FC<SpotlightGridGalleryProps> = ({
  items,
  onSelect
}) => {
  return (
    <div className="spotlight-grid-wrapper">
      <div className="spotlight-grid">
        {items.map((item) => (
          <TiltCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};
