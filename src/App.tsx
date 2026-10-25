import { useState } from 'react';
import { DepthCarousel } from './components/DepthCarousel/DepthCarousel';
import { ASCIIText } from './components/ASCIIText/ASCIIText';
import { LightboxModal } from './components/Gallery/LightboxModal';
import PaperCrumple from './components/PaperCrumple/PaperCrumple';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';
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
  },
  {
    id: "6",
    image: '/WhatsApp Image 2026-10-25 at 11.50.43 (1).jpeg',
    url: '/WhatsApp Image 2026-10-25 at 11.50.43 (1).jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Close-up',
    date: '25 Oct 2026',
    desc: 'Cozy and sweet close-up moment.',
    objectPosition: 'center 40%'
  },
  {
    id: "7",
    image: '/WhatsApp Image 2026-10-25 at 11.50.43.jpeg',
    url: '/WhatsApp Image 2026-10-25 at 11.50.43.jpeg',
    alt: 'Selvi Maulid',
    title: 'Selvi Maulid',
    category: 'Special Moment',
    date: '25 Oct 2026',
    desc: 'Radiant and charming portrait with beautiful warm smile.',
    objectPosition: 'center 20%'
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
            text="Selvyyy"
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

      {/* Paper Crumple: Clean Kertas 3D */}
      <section className="paper-section">
        <div className="paper-container">
          <PaperCrumple
            src="/selvi-story.png"
            alt="Catatan Lucu untuk Selvi Maulidatul Lidyawati"
            width={320}
            height={400}
            sceneHeight={520}
            releaseBehavior="restore"
            crumpleAmount={0.85}
            crumpleDuration={0.55}
            releaseDuration={0.4}
            foldCount={6}
            foldSharpness={0.6}
            wrinkleDepth={0.65}
            creaseStrength={0.18}
            paperColor="#ffffff"
            paperTexture={0.06}
            lightIntensity={1.8}
            lightAngle={-35}
            shadow={true}
            shadowOpacity={0.08}
            draggable={true}
            dragRotation={10}
            dragRadius={180}
            returnToOrigin={true}
          />
        </div>
      </section>

      {/* Music Player Section (di bawah section kertas) */}
      <section className="music-section">
        <MusicPlayer
          src="/music.mp3"
          title="Clair de Lune (Suite Bergamasque)"
          artist="Claude Debussy • Romantic Classical Piano"
          coverImage={items[0].image}
        />
      </section>

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
