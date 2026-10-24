import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Maximize2 } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';

interface Rolling3DGalleryProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

export const Rolling3DGallery: React.FC<Rolling3DGalleryProps> = ({ items, onSelect }) => {
  const [rotation, setRotation] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const count = items.length;
  const angleStep = 360 / count;
  const radius = 380; // Distance in Z for cylindrical distribution

  // Animation Loop for Auto-Play & Inertia
  useEffect(() => {
    const tick = () => {
      if (!isDragging) {
        if (Math.abs(velocityRef.current) > 0.05) {
          // Inertia damping
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.94;
        } else if (isAutoPlay && !isHovered) {
          // Smooth continuous autoplay
          setRotation((prev) => (prev + 0.25) % 360);
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isAutoPlay, isHovered]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = rotation;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - dragStartXRef.current;
    const dt = Math.max(1, now - lastTimeRef.current);
    const speed = ((currentX - lastXRef.current) / dt) * 8;

    velocityRef.current = speed;
    lastXRef.current = currentX;
    lastTimeRef.current = now;

    // 0.35 sensitivity coefficient
    setRotation(dragStartRotRef.current + deltaX * 0.35);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  const rotateToStep = useCallback((direction: 'next' | 'prev') => {
    velocityRef.current = 0;
    setRotation((prev) => {
      const remainder = prev % angleStep;
      const base = prev - remainder;
      return direction === 'next' ? base + angleStep : base - angleStep;
    });
  }, [angleStep]);

  return (
    <div className="rolling-gallery-wrapper">
      {/* 3D Viewport */}
      <div
        className="rolling-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="rolling-cylinder"
          style={{
            transform: `rotateY(${rotation}deg)`
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep;
            // Calculate relative angle to determine depth/facing camera
            const normalizedAngle = (((itemAngle + rotation) % 360) + 360) % 360;
            const isFacingFront = normalizedAngle > 300 || normalizedAngle < 60;

            return (
              <div
                key={item.id}
                className={`rolling-card-slot ${isFacingFront ? 'active-slot' : ''}`}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`
                }}
              >
                <div
                  className="rolling-card"
                  onClick={(e) => {
                    // Only open if not currently dragging
                    if (Math.abs(velocityRef.current) < 0.2) {
                      e.stopPropagation();
                      onSelect(item);
                    }
                  }}
                >
                  <div className="rolling-card-image-box">
                    <img src={item.url} alt={item.title} draggable={false} />
                    <div className="rolling-card-overlay">
                      <span className="card-badge">{item.category}</span>
                      <h4 className="card-title">{item.title}</h4>
                      <button
                        className="card-expand-btn"
                        title="Perbesar"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(item);
                        }}
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="rolling-card-glow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="rolling-controls">
        <button
          className="control-icon-btn"
          onClick={() => rotateToStep('prev')}
          title="Putar Sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className={`control-icon-btn ${isAutoPlay ? 'active' : ''}`}
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          title={isAutoPlay ? "Jeda Auto-putar" : "Mulai Auto-putar"}
        >
          {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          className="control-icon-btn"
          onClick={() => setRotation(0)}
          title="Reset Rotasi"
        >
          <RotateCcw size={18} />
        </button>

        <button
          className="control-icon-btn"
          onClick={() => rotateToStep('next')}
          title="Putar Berikutnya"
        >
          <ChevronRight size={20} />
        </button>

        <div className="drag-hint">
          <span className="hint-pulse" />
          <span>Tarik / Drag horizontal untuk memutar 3D</span>
        </div>
      </div>
    </div>
  );
};
