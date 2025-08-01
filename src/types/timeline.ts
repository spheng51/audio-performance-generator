export type TrackType = 'voice' | 'sfx' | 'music';

export interface Track {
  id: string;
  type: TrackType;
  name: string;
}

export interface Clip {
  id: string;
  trackId: string;
  blobId: string;
  start: number;
  duration: number;
}

export interface Project {
  id: string;
  name: string;
  tracks: Track[];
  clips: Clip[];
}
