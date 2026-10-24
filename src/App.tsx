import { useState } from 'react';
import { DepthCarousel } from './components/DepthCarousel/DepthCarousel';
import { ASCIIText } from './components/ASCIIText/ASCIIText';
import { LightboxModal } from './components/Gallery/LightboxModal';
import './App.css';

// 5 images from public folder
const items = [
  {
    id: "1",
    image: '/WhatsApp Image 2026-10-25 at 00.32.11.jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.11.jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Portrait',
    date: '25 Oct 2026',
    desc: 'Sweet sunshine smile captured in natural gentle light.'
  },
  {
    id: "2",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12.jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12.jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Lifestyle',
    date: '25 Oct 2026',
    desc: 'Playful candid moments embracing adorable plushies.'
  },
  {
    id: "3",
    image: '/WhatsApp Image 2026-10-25 at 00.32.11 (1).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.11 (1).jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Moments',
    date: '25 Oct 2026',
    desc: 'Serene cozy mood with colorful floral accents.'
  },
  {
    id: "4",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12 (1).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12 (1).jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Portrait',
    date: '25 Oct 2026',
    desc: 'Soft natural glow filled with authentic charm.',
    objectPosition: '85% 25%'
  },
  {
    id: "5",
    image: '/WhatsApp Image 2026-10-25 at 00.32.12 (2).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 00.32.12 (2).jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Candid',
    date: '25 Oct 2026',
    desc: 'Effortless and endearing smile captured in the moment.'
  }
];

function App() {
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  return (
    <div className="app-wrapper">
      {/* Ambient Glow Mesh */}
      <div className="app-ambient">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-grid" />
      </div>

      {/* ASCII Text Header: Selvy ❤️ (Jelas & Tajam) */}
      <header className="ascii-header-container">
        <div className="ascii-text-box">
          <ASCIIText
            text="Selvy ❤️"
            asciiFontSize={5}
            fontFamily="'Outfit', 'Inter', system-ui, sans-serif"
            fontWeight={800}
            textColor="#ffffff"
            colors={['#ff6188', '#fc9867', '#ffd866']}
            textScale={1.2}
            blocks={0.95}
            waves={0.12}
            waveSpeed={0.5}
            chroma={0.15}
            tilt={0.6}
            hueShift={0.5}
            scramble={0}
            clickRipple={true}
            idle={true}
            interactive={true}
            theme="dark"
          />
        </div>
      </header>

      {/* DepthCarousel Stage (Ukuran Album Diperbesar) */}
      <div className="carousel-stage-container">
        <DepthCarousel
          items={items}
          cardWidth={340}
          cardHeight={430}
          radius={20}
          depth={220}
          spread={85}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay={true}
          autoplayDelay={3200}
          loop={true}
          showControls={true}
          showIndicators={true}
          onItemClick={(index) => setSelectedItem(items[index])}
        />
      </div>

      {/* Lightbox Modal (buka ukuran penuh jika kartu diklik) */}
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
