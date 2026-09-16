"use client";

import { useEffect, useState } from "react";
import { audioManager, type PlayerState } from "@/lib/audioManager";

export function useAudioManager(): PlayerState {
  const [state, setState] = useState<PlayerState>(() => audioManager.getState());

  useEffect(() => {
    setState(audioManager.getState());
    return audioManager.subscribe(() => setState(audioManager.getState()));
  }, []);

  return state;
}
