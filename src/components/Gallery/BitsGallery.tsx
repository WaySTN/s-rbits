import React, { useState } from 'react';
import { Orbit, Layers, Grid, Sparkles, Image as ImageIcon, Heart } from 'lucide-react';
import { galleryItems, type GalleryItem } from '../../data/galleryData';
import { Rolling3DGallery } from './Rolling3DGallery';
import { CardStackGallery } from './CardStackGallery';
import { SpotlightGridGallery } from './SpotlightGridGallery';
import { LightboxModal } from './LightboxModal';
import './BitsGallery.css';

type ViewMode = 'rolling' | 'stack' | 'grid';

export const BitsGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('rolling');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(galleryItems.map((i) => i.category)))];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="bits-gallery-root">
      {/* Background Animated Glow Ambience */}
      <div className="ambient-mesh">
        <div className="glow-sphere sphere-1" />
        <div className="glow-sphere sphere-2" />
        <div className="glow-sphere sphere-3" />
        <div className="grid-overlay" />
      </div>

      <div className="bits-gallery-container">
        {/* Top Floating Badge */}
        <div className="bits-pill-badge">
          <Sparkles size={14} className="sparkle-anim" />
          <span>React Bits Showcase</span>
          <span className="badge-sep">•</span>
          <span className="badge-highlight">5 Special Memories</span>
        </div>

        {/* Hero Title Section */}
        <header className="bits-header">
          <h1 className="bits-title">
            <span className="gradient-text">Visual Chronicles</span>
          </h1>
          <p className="bits-subtitle">
            Galeri foto interaktif bertema modern aesthetic terinspirasi dari React Bits,
            menampilkan efek 3D Cylinder, Interactive Card Stack, dan Spotlight Magnetic Tilt.
          </p>
        </header>

        {/* View Mode Switcher & Category Filters */}
        <div className="bits-toolbar">
          <div className="mode-switcher">
            <button
              className={`mode-btn ${viewMode === 'rolling' ? 'active' : ''}`}
              onClick={() => setViewMode('rolling')}
              title="3D Rolling Cylinder"
            >
              <Orbit size={16} />
              <span>3D Cylinder</span>
            </button>

            <button
              className={`mode-btn ${viewMode === 'stack' ? 'active' : ''}`}
              onClick={() => setViewMode('stack')}
              title="Interactive Card Stack"
            >
              <Layers size={16} />
              <span>Card Stack</span>
            </button>

            <button
              className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Spotlight 3D Grid"
            >
              <Grid size={16} />
              <span>Spotlight Grid</span>
            </button>
          </div>

          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Gallery Stage */}
        <main className="bits-stage">
          {viewMode === 'rolling' && (
            <Rolling3DGallery
              items={filteredItems}
              onSelect={(item) => setSelectedItem(item)}
            />
          )}

          {viewMode === 'stack' && (
            <CardStackGallery
              items={filteredItems}
              onSelect={(item) => setSelectedItem(item)}
            />
          )}

          {viewMode === 'grid' && (
            <SpotlightGridGallery
              items={filteredItems}
              onSelect={(item) => setSelectedItem(item)}
            />
          )}
        </main>

        {/* Footer Meta Bar */}
        <footer className="bits-footer">
          <div className="footer-left">
            <ImageIcon size={16} />
            <span>5 Foto tersimpan di <code>public/</code></span>
          </div>
          <div className="footer-right">
            <span>Dibuat dengan</span>
            <Heart size={14} className="heart-icon" />
            <span>untuk s-rbits</span>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
};
