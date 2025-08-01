import { create } from 'zustand';
import { Project, Clip } from '../types/timeline';

interface ProjectState {
  project: Project;
  selectedClipId?: string;
  playing: boolean;
  addClip: (trackId: string, blobId: string, duration: number) => void;
  moveClip: (clipId: string, start: number) => void;
  setPlaying: (playing: boolean) => void;
}

const useProjectStore = create<ProjectState>((set, get) => ({
  project: {
    id: 'project1',
    name: 'New Project',
    tracks: [
      { id: 'track1', type: 'voice', name: 'Voice' },
    ],
    clips: [],
  },
  selectedClipId: undefined,
  playing: false,
  addClip: (trackId, blobId, duration) =>
    set(state => {
      const clipsForTrack = state.project.clips.filter(c => c.trackId === trackId);
      const start = clipsForTrack.reduce((acc, c) => Math.max(acc, c.start + c.duration), 0);
      const clip: Clip = {
        id: crypto.randomUUID(),
        trackId,
        blobId,
        start,
        duration,
      };
      return {
        project: { ...state.project, clips: [...state.project.clips, clip] },
      };
    }),
  moveClip: (clipId, start) =>
    set(state => ({
      project: {
        ...state.project,
        clips: state.project.clips.map(c =>
          c.id === clipId ? { ...c, start } : c
        ),
      },
    })),
  setPlaying: playing => set({ playing }),
}));

export default useProjectStore;
