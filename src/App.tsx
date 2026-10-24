import { useState } from 'react';
import { DepthCarousel } from './components/DepthCarousel/DepthCarousel';
import { LightboxModal } from './components/Gallery/LightboxModal';
import { Sparkles, Maximize2, Play, Pause, Compass, MousePointer } from 'lucide-react';
import './App.css';

// 5 images from public folder
const items = [
  {
    id: "1",
    image: '/WhatsApp Image 2026-10-25 at 00.32.11.jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.11.jpeg',
    alt: 'Sweet Sunshine Smile',
    title: 'Sweet Sunshine Smile',
    category: 'Portrait',
    date: '25 Oct 2026',
    desc: 'A bright, warm portrait capturing genuine charm and cheerful energy.'
  },
  {
    id: "2",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12.jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12.jpeg',
    alt: 'Aisle Adventures',
    title: 'Aisle Adventures',
    category: 'Lifestyle',
    date: '25 Oct 2026',
    desc: 'Playful candid moment exploring plushies and vibrant aisles.'
  },
  {
    id: "3",
    image: '/WhatsApp Image 2026-10-25 at 00.32.11 (1).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.11 (1).jpeg',
    alt: 'Floral Cozy Mood',
    title: 'Floral Cozy Mood',
    category: 'Moments',
    date: '25 Oct 2026',
    desc: 'Serene relaxation with colorful floral accents and calm warmth.'
  },
  {
    id: "4",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12 (1).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12 (1).jpeg',
    alt: 'Gentle Glow',
    title: 'Gentle Glow',
    category: 'Portrait',
    date: '25 Oct 2026',
    desc: 'Soft natural light highlighting effortless grace and subtle joy.'
  },
  {
    id: "5",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12 (2).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12 (2).jpeg',
    alt: 'Candid Elegance',
    title: 'Candid Elegance',
    category: 'Candid',
    date: '25 Oct 2026',
    desc: 'Unposed spontaneity with an authentic and endearing sparkle.'
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tiltDir, setTiltDir] = useState<'right' | 'left'>('right');
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [depthValue, setDepthValue] = useState(220);
  const [spreadValue, setSpreadValue] = useState(90);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  const currentItem = items[activeIndex] || items[0];

  return (
    <div className="app-wrapper">
      {/* Ambient Glow Mesh */}
      <div className="app-ambient">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-grid" />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="app-badge">
          <Sparkles size={14} className="sparkle" />
          <span>React Bits Component</span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ color: '#c084fc' }}>Depth Carousel</span>
        </div>
        <h1 className="app-title">Depth Carousel</h1>
        <p className="app-desc">
          Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance.
        </p>
      </header>

      {/* DepthCarousel Stage */}
      <div className="carousel-stage-container">
        <DepthCarousel
          items={items}
          cardWidth={300}
          cardHeight={380}
          radius={18}
          depth={depthValue}
          spread={spreadValue}
          tilt={22}
          tiltDirection={tiltDir}
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay={isAutoplay}
          autoplayDelay={3200}
          loop={true}
          showControls={true}
          showIndicators={true}
          onChange={(index) => setActiveIndex(index)}
          onItemClick={(index) => setSelectedItem(items[index])}
        />
      </div>

      {/* Active Card Info Panel */}
      <div className="active-info-panel">
        <div className="active-meta">
          <div className="active-badge-row">
            <span className="active-cat">{currentItem.category}</span>
            <span className="active-num">{activeIndex + 1} / {items.length}</span>
          </div>
          <h3 className="active-title">{currentItem.title}</h3>
          <p className="active-desc">{currentItem.desc}</p>
        </div>

        <button
          className="active-open-btn"
          onClick={() => setSelectedItem(currentItem)}
          title="Buka Foto Penuh (Lightbox)"
        >
          <Maximize2 size={16} />
          <span>Buka Full</span>
        </button>
      </div>

      {/* Interactive Controls Playground */}
      <div className="playground-bar">
        {/* Tilt Direction */}
        <div className="control-pill-group">
          <span className="control-label">Arah Tilt:</span>
          <button
            className={`control-toggle-btn ${tiltDir === 'right' ? 'active' : ''}`}
            onClick={() => setTiltDir('right')}
          >
            <Compass size={14} />
            <span>Kanan (Right)</span>
          </button>
          <button
            className={`control-toggle-btn ${tiltDir === 'left' ? 'active' : ''}`}
            onClick={() => setTiltDir('left')}
          >
            <Compass size={14} />
            <span>Kiri (Left)</span>
          </button>
        </div>

        <div className="bar-divider" />

        {/* Autoplay */}
        <div className="control-pill-group">
          <span className="control-label">Autoplay:</span>
          <button
            className={`control-toggle-btn ${isAutoplay ? 'active' : ''}`}
            onClick={() => setIsAutoplay(!isAutoplay)}
          >
            {isAutoplay ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoplay ? 'Aktif' : 'Jeda'}</span>
          </button>
        </div>

        <div className="bar-divider" />

        {/* Depth Presets */}
        <div className="control-pill-group">
          <span className="control-label">Preset Efek:</span>
          <button
            className={`control-toggle-btn ${depthValue === 220 ? 'active' : ''}`}
            onClick={() => {
              setDepthValue(220);
              setSpreadValue(90);
            }}
          >
            <span>Standar</span>
          </button>
          <button
            className={`control-toggle-btn ${depthValue === 290 ? 'active' : ''}`}
            onClick={() => {
              setDepthValue(290);
              setSpreadValue(120);
            }}
          >
            <span>Dramatis (Wide)</span>
          </button>
          <button
            className={`control-toggle-btn ${depthValue === 160 ? 'active' : ''}`}
            onClick={() => {
              setDepthValue(160);
              setSpreadValue(60);
            }}
          >
            <span>Kompak</span>
          </button>
        </div>
      </div>

      {/* Keyboard & Mouse hints */}
      <div className="app-instructions">
        <div className="instruction-item">
          <MousePointer size={14} />
          <span>Klik & drag kartu atau scroll roda mouse untuk menggeser</span>
        </div>
        <div className="instruction-item">
          <span>Navigasi keyboard:</span>
          <kbd>←</kbd>
          <kbd>→</kbd>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={items}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item as any)}
      />
    </div>
  );
}

export default App;
