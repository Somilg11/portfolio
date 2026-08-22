/**
 * macOS-flavoured UI sound engine.
 *
 * Every sound is synthesised with the Web Audio API at runtime — no audio
 * assets are shipped, nothing is fetched, and the whole thing is a few
 * hundred bytes of oscillator scheduling. Sounds are short, dry and clicky
 * on purpose: they should feel like interface feedback, not music.
 */

export type SoundName =
  | "click" // primary tap / button press
  | "tick" // subtle hover / focus move
  | "toggle" // switch, checkbox, segmented control
  | "open" // window or menu opening
  | "close" // window or menu closing
  | "pop" // dock icon, badge, small element appearing
  | "swoosh" // page navigation
  | "success" // completed action (copy, download)
  | "error"; // refused action

const now = () => (typeof performance !== "undefined" ? performance.now() : 0);

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private lastPlayed = new Map<SoundName, number>();
  private muted = false;
  private volume = 0.5;

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.master && this.ctx && !this.muted) {
      this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.02);
    }
  }

  /** Must be called from a user gesture the first time — browsers require it. */
  unlock() {
    const ctx = this.ensureContext();
    if (ctx && ctx.state === "suspended") void ctx.resume();
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (this.ctx) return this.ctx;

    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;

    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);

    // 1s of white noise, reused by every transient
    const length = this.ctx.sampleRate;
    this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;

    return this.ctx;
  }

  /** Short filtered-noise transient — the "physical" part of a click. */
  private transient(at: number, opts: { freq: number; q: number; gain: number; decay: number; type?: BiquadFilterType }) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;

    const filter = ctx.createBiquadFilter();
    filter.type = opts.type ?? "bandpass";
    filter.frequency.value = opts.freq;
    filter.Q.value = opts.q;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(opts.gain, at + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + opts.decay);

    src.connect(filter).connect(gain).connect(this.master!);
    src.start(at, Math.random() * 0.5);
    src.stop(at + opts.decay + 0.02);
  }

  /** Pitched body — the "tone" part. */
  private tone(
    at: number,
    opts: { from: number; to?: number; gain: number; decay: number; type?: OscillatorType; attack?: number }
  ) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = opts.type ?? "sine";
    osc.frequency.setValueAtTime(opts.from, at);
    if (opts.to && opts.to !== opts.from) {
      osc.frequency.exponentialRampToValueAtTime(opts.to, at + opts.decay);
    }

    const gain = ctx.createGain();
    const attack = opts.attack ?? 0.002;
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(opts.gain, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + opts.decay);

    osc.connect(gain).connect(this.master!);
    osc.start(at);
    osc.stop(at + opts.decay + 0.02);
  }

  play(name: SoundName) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    if (ctx.state === "suspended") void ctx.resume();

    // Rate-limit so rapid hovers don't turn into a machine-gun.
    const throttle = name === "tick" ? 45 : 25;
    const last = this.lastPlayed.get(name) ?? -Infinity;
    if (now() - last < throttle) return;
    this.lastPlayed.set(name, now());

    const t = ctx.currentTime + 0.001;

    switch (name) {
      case "click":
        this.transient(t, { freq: 2600, q: 1.4, gain: 0.16, decay: 0.022 });
        this.tone(t, { from: 1750, to: 900, gain: 0.06, decay: 0.035 });
        break;

      case "tick":
        this.transient(t, { freq: 3600, q: 2.2, gain: 0.045, decay: 0.012 });
        break;

      case "toggle":
        this.transient(t, { freq: 2200, q: 1.2, gain: 0.13, decay: 0.02 });
        this.tone(t, { from: 620, to: 1180, gain: 0.07, decay: 0.07 });
        break;

      case "open":
        this.tone(t, { from: 520, to: 1040, gain: 0.05, decay: 0.16, attack: 0.012 });
        this.tone(t + 0.02, { from: 780, to: 1560, gain: 0.028, decay: 0.14, attack: 0.012 });
        this.transient(t, { freq: 5200, q: 0.9, gain: 0.05, decay: 0.05, type: "highpass" });
        break;

      case "close":
        this.tone(t, { from: 900, to: 380, gain: 0.05, decay: 0.15, attack: 0.008 });
        this.transient(t, { freq: 3000, q: 0.8, gain: 0.05, decay: 0.05 });
        break;

      case "pop":
        this.tone(t, { from: 980, to: 320, gain: 0.11, decay: 0.09, attack: 0.003 });
        this.transient(t, { freq: 1800, q: 1.6, gain: 0.06, decay: 0.02 });
        break;

      case "swoosh":
        this.transient(t, { freq: 900, q: 0.6, gain: 0.09, decay: 0.22, type: "bandpass" });
        this.tone(t, { from: 300, to: 1400, gain: 0.022, decay: 0.2, attack: 0.05 });
        break;

      case "success":
        this.tone(t, { from: 880, gain: 0.05, decay: 0.1 });
        this.tone(t + 0.075, { from: 1320, gain: 0.05, decay: 0.14 });
        break;

      case "error":
        this.tone(t, { from: 210, gain: 0.07, decay: 0.1, type: "square" });
        this.tone(t + 0.12, { from: 165, gain: 0.07, decay: 0.16, type: "square" });
        break;
    }
  }
}

export const sound = new SoundEngine();
