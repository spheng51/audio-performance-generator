import useProjectStore from '../store/useProjectStore';
import { getBlob } from '../hooks/useIndexedAudio';

const PIXELS_PER_SEC = 100;

export default function Timeline() {
  const project = useProjectStore(s => s.project);
  const playing = useProjectStore(s => s.playing);
  const setPlaying = useProjectStore(s => s.setPlaying);

  const play = async () => {
    if (playing) return;
    setPlaying(true);
    const ctx = new AudioContext();
    const sorted = [...project.clips].sort((a, b) => a.start - b.start);
    for (const clip of sorted) {
      const blob = await getBlob(clip.blobId);
      if (!blob) continue;
      const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(ctx.currentTime + clip.start);
    }
    const last = sorted.reduce((m, c) => Math.max(m, c.start + c.duration), 0);
    setTimeout(() => setPlaying(false), last * 1000);
  };

  return (
    <div>
      <button onClick={play} disabled={playing}>Play</button>
      <div style={{ position: 'relative', height: project.tracks.length * 60 }}>
        {project.clips.map(clip => {
          const trackIndex = project.tracks.findIndex(t => t.id === clip.trackId);
          return (
            <div
              key={clip.id}
              style={{
                position: 'absolute',
                top: trackIndex * 60 + 10,
                left: clip.start * PIXELS_PER_SEC,
                width: clip.duration * PIXELS_PER_SEC,
                height: 40,
                background: '#9af',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
