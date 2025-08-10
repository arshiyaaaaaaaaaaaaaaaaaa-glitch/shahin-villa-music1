import React, { useState, useRef, useEffect } from "react";

const tracks = [
  {
    title: "آهنگ شماره ۱",
    src: "track1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "آهنگ شماره ۲",
    src: "track2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "آهنگ شماره ۳",
    src: "track3.mp3",
    cover: "cover3.jpg"
  }
];

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // وقتی ترک تغییر میکنه، آهنگ جدید رو بارگذاری کن و اگه قبلاً پخش بود، پخش کن
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    setProgress(0);
  }, [currentTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress((current / total) * 100);
  };

  const onSeek = (e) => {
    const total = audioRef.current.duration;
    audioRef.current.currentTime = (e.target.value / 100) * total;
  };

  return (
    <div className="container">
      <h1>🎵 Shahin Villa Music 🎵</h1>
      <p>{tracks[currentTrack].title}</p>
      <img
        src={tracks[currentTrack].cover}
        alt="cover"
        className="cover"
      />

      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextTrack}
      >
        <source src={tracks[currentTrack].src} type="audio/mpeg" />
      </audio>

      <input
        type="range"
        value={progress}
        onChange={onSeek}
        className="progress-bar"
      />

      <div className="controls">
        <button onClick={prevTrack}>⏮ قبلی</button>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸ توقف" : "▶ پخش"}
        </button>
        <button onClick={nextTrack}>⏭ بعدی</button>
      </div>
    </div>
  );
}
