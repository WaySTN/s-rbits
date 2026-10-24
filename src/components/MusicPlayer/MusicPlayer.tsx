import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Repeat, Disc } from 'lucide-react';
import './MusicPlayer.css';

interface MusicPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
  coverImage?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src = '/music.mp3',
  title = 'Clair de Lune (Suite Bergamasque)',
  artist = 'Claude Debussy • Romantic Classical Piano',
  coverImage = '/WhatsApp Image 2026-10-25 at 00.32.11.jpeg'
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      if (!isLoop) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLoop]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error or policy blocked:', err);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleLoop = () => {
    setIsLoop((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.loop = next;
      return next;
    });
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player-card">
      <audio ref={audioRef} src={src} loop={isLoop} preload="metadata" />

      {/* Cover Art / Vinyl Disc */}
      <div className={`vinyl-wrapper ${isPlaying ? 'playing' : ''}`}>
        <div className="vinyl-disc">
          <div className="vinyl-grooves" />
          <div className="vinyl-center">
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="vinyl-cover-img" />
            ) : (
              <Disc className="vinyl-icon" />
            )}
          </div>
        </div>
      </div>

      {/* Track Info & Equalizer */}
      <div className="music-details">
        <div className="music-meta">
          <div className="music-title-wrap">
            <h4 className="music-title">{title}</h4>
            <span className="music-artist">{artist}</span>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className={`equalizer-bars ${isPlaying ? 'active' : ''}`} aria-hidden="true">
            <span className="eq-bar bar-1" />
            <span className="eq-bar bar-2" />
            <span className="eq-bar bar-3" />
            <span className="eq-bar bar-4" />
            <span className="eq-bar bar-5" />
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="timeline-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="progress-slider-wrap">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="progress-slider"
              style={{
                background: `linear-gradient(to right, #ff6188 ${progressPercent}%, rgba(255, 255, 255, 0.12) ${progressPercent}%)`
              }}
              aria-label="Seek time slider"
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        {/* Controls row */}
        <div className="controls-row">
          <div className="controls-left">
            <button
              type="button"
              className={`control-btn loop-btn ${isLoop ? 'active' : ''}`}
              onClick={toggleLoop}
              title={isLoop ? 'Repeat: On' : 'Repeat: Off'}
              aria-label="Toggle Repeat"
            >
              <Repeat size={17} />
            </button>
          </div>

          <div className="controls-center">
            <button
              type="button"
              className={`main-play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="play-icon-offset" />}
            </button>
          </div>

          <div className="controls-right">
            <button
              type="button"
              className="control-btn mute-btn"
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle Mute"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
