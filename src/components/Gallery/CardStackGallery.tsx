import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Shuffle, Maximize2, Sparkles, Layers } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';

interface CardStackGalleryProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

export const CardStackGallery: React.FC<CardStackGalleryProps> = ({ items, onSelect }) => {
  const [deck, setDeck] = useState<GalleryItem[]>(items);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const handleNext = () => {
    setDeck((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
  };

  const handlePrev = () => {
    setDeck((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
  };

  const handleShuffle = () => {
    setDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  // Drag on top card
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsSwiping(true);
    setSwipeOffset({ x: 0, y: 0 });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSwiping) return;
    setSwipeOffset((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY * 0.3
    }));
  };

  const handlePointerUp = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    if (Math.abs(swipeOffset.x) > 90) {
      handleNext();
    }
    setSwipeOffset({ x: 0, y: 0 });
  };

  return (
    <div className="card-stack-wrapper">
      <div className="stack-container">
        {deck.map((card, index) => {
          // Only render top 4 cards for optimal DOM performance
          if (index > 3) return null;

          const isTop = index === 0;
          const rotAngle = (index * 4.5) * (index % 2 === 0 ? 1 : -1);
          const yOffset = index * 14;
          const scale = 1 - index * 0.05;
          const opacity = 1 - index * 0.15;

          const cardTransform = isTop
            ? `translate3d(${swipeOffset.x}px, ${swipeOffset.y}px, 0) rotate(${rotAngle + swipeOffset.x * 0.06}deg) scale(${scale})`
            : `translate3d(0, ${yOffset}px, 0) rotate(${rotAngle}deg) scale(${scale})`;

          return (
            <div
              key={card.id}
              className={`stack-card ${isTop ? 'stack-top' : ''}`}
              style={{
                zIndex: deck.length - index,
                transform: cardTransform,
                opacity,
                transition: isSwiping && isTop ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
              }}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerUp : undefined}
            >
              <div className="stack-card-inner">
                <div className="stack-img-wrapper">
                  <img src={card.url} alt={card.title} draggable={false} />
                  <div className="stack-card-pill">
                    <Sparkles size={12} />
                    <span>{card.category}</span>
                  </div>
                </div>

                <div className="stack-card-content">
                  <div className="stack-card-header">
                    <h4>{card.title}</h4>
                    <span className="stack-card-date">{card.date}</span>
                  </div>
                  <p className="stack-card-desc">{card.desc}</p>
                </div>

                <div className="stack-card-footer">
                  <span className="stack-card-index">Kartu {index + 1} dari {deck.length}</span>
                  <button
                    className="stack-open-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(card);
                    }}
                    title="Buka ukuran penuh"
                  >
                    <Maximize2 size={16} />
                    <span>Lihat Full</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="stack-controls">
        <button className="stack-btn" onClick={handlePrev} title="Kartu Sebelumnya">
          <ArrowLeft size={18} />
          <span>Prev</span>
        </button>

        <button className="stack-btn secondary" onClick={handleShuffle} title="Acak urutan kartu">
          <Shuffle size={16} />
          <span>Shuffle</span>
        </button>

        <button className="stack-btn primary" onClick={handleNext} title="Kartu Berikutnya">
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="stack-hint">
        <Layers size={15} />
        <span>Geser (swipe) kartu teratas ke kiri/kanan atau klik Next untuk mengganti foto</span>
      </div>
    </div>
  );
};
