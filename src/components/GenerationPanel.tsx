import { useState } from 'react';
import { tts } from '../api/eleven';
import { saveBlob } from '../hooks/useIndexedAudio';
import useProjectStore from '../store/useProjectStore';
import { hasKey } from '../hooks/useApiKey';

const VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Domi' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
];

export default function GenerationPanel() {
  const addClip = useProjectStore(s => s.addClip);
  const project = useProjectStore(s => s.project);
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState(VOICES[0].id);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!project.tracks[0]) return;
    setLoading(true);
    try {
      const blob = await tts(text, voiceId);
      const blobId = await saveBlob(blob);
      const ctx = new AudioContext();
      const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
      addClip(project.tracks[0].id, blobId, buf.duration);
      setText('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
      />
      <div>
        <select value={voiceId} onChange={e => setVoiceId(e.target.value)}>
          {VOICES.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        <button onClick={handleGenerate} disabled={!hasKey() || loading}>
          Generate Voice
        </button>
      </div>
    </div>
  );
}
