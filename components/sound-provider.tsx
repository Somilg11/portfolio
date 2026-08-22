"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { sound, type SoundName } from "@/lib/sound";

const STORAGE_KEY = "mac-ui-sound";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue>({
  enabled: true,
  setEnabled: () => {},
  toggle: () => {},
  play: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

/**
 * Wires the synthesised sound engine to the whole document.
 *
 * Interactive elements get feedback for free through event delegation:
 * anything that is a link, a button or carries `data-sound` clicks and
 * ticks on hover. `data-sound="open"` (etc.) overrides the sound, and
 * `data-sound="none"` silences an element.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const enabledRef = useRef(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const on = stored === null ? true : stored === "on";
    setEnabledState(on);
    enabledRef.current = on;
    sound.setMuted(!on);
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next);
    enabledRef.current = next;
    sound.setMuted(!next);
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    if (next) {
      sound.unlock();
      sound.play("toggle");
    }
  }, []);

  const toggle = useCallback(() => setEnabled(!enabledRef.current), [setEnabled]);

  const play = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    sound.play(name);
  }, []);

  useEffect(() => {
    const unlock = () => sound.unlock();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    const resolve = (target: EventTarget | null): SoundName | null => {
      if (!(target instanceof Element)) return null;
      const el = target.closest<HTMLElement>("[data-sound], a, button, [role='button'], input, summary");
      if (!el) return null;
      const explicit = el.dataset.sound;
      if (explicit === "none") return null;
      return (explicit as SoundName) || "click";
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!enabledRef.current) return;
      const name = resolve(e.target);
      if (name) sound.play(name);
    };

    const onPointerOver = (e: PointerEvent) => {
      if (!enabledRef.current) return;
      if (e.pointerType !== "mouse") return;
      const name = resolve(e.target);
      if (name) sound.play("tick");
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!enabledRef.current) return;
      if (e.key === "Tab") sound.play("tick");
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}
