import { getKey } from '../hooks/useApiKey';

export async function tts(text: string, voiceId: string): Promise<Blob> {
  const key = getKey();
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
        'xi-api-key': key || '',
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!res.ok) {
    throw new Error('TTS request failed');
  }

  return await res.blob();
}

// TODO: implement generateSfx
