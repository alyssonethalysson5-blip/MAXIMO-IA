import React, { useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, Play, Copy, Check, Sliders, AudioLines, Music } from "lucide-react";

interface SoundPreset {
  name: string;
  type: OscillatorType;
  startFreq: number;
  endFreq: number;
  duration: number;
  rampType: "linear" | "exponential";
  description: string;
}

const SOUND_PRESETS: Record<string, SoundPreset> = {
  "Laser": {
    name: "Laser Espacial",
    type: "sawtooth",
    startFreq: 880,
    endFreq: 110,
    duration: 0.25,
    rampType: "exponential",
    description: "Varredura rápida de frequência descendente com onda dente de serra para simular disparos."
  },
  "Pulo": {
    name: "Salto Retro",
    type: "triangle",
    startFreq: 150,
    endFreq: 600,
    duration: 0.18,
    rampType: "linear",
    description: "Frequência ascendente suave com onda triangular para simular gravidade."
  },
  "Moeda": {
    name: "Moeda Coletada",
    type: "sine",
    startFreq: 587.33, // D5
    endFreq: 880, // A5
    duration: 0.3,
    rampType: "linear",
    description: "Frequência de tom harmonioso duplo em ascensão limpa de tom puro."
  },
  "Explosão": {
    name: "Impacto Explosão",
    type: "square",
    startFreq: 120,
    endFreq: 20,
    duration: 0.5,
    rampType: "exponential",
    description: "Ruído descendente profundo com onda quadrada simulando estouros e destruições."
  },
  "Beep": {
    name: "Beep Simples",
    type: "sine",
    startFreq: 440,
    endFreq: 440,
    duration: 0.15,
    rampType: "linear",
    description: "Nota constante limpa ideal para cliques e seleções de interface."
  }
};

export default function AudioSynthLab() {
  const [soundType, setSoundType] = useState<OscillatorType>("sine");
  const [startFreq, setStartFreq] = useState<number>(440);
  const [endFreq, setEndFreq] = useState<number>(440);
  const [duration, setDuration] = useState<number>(0.2);
  const [rampType, setRampType] = useState<"linear" | "exponential">("linear");
  
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const handlePlaySound = (preset?: SoundPreset) => {
    // Determine active properties
    const activeType = preset ? preset.type : soundType;
    const activeStart = preset ? preset.startFreq : startFreq;
    const activeEnd = preset ? preset.endFreq : endFreq;
    const activeDur = preset ? preset.duration : duration;
    const activeRamp = preset ? preset.rampType : rampType;

    if (preset) {
      setSoundType(preset.type);
      setStartFreq(preset.startFreq);
      setEndFreq(preset.endFreq);
      setDuration(preset.duration);
      setRampType(preset.rampType);
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        setAudioError("Seu navegador não suporta a Web Audio API.");
        return;
      }

      setPlaying(true);
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = activeType;
      
      // Handle ramp values
      osc.frequency.setValueAtTime(activeStart, ctx.currentTime);
      if (activeStart !== activeEnd) {
        if (activeRamp === "exponential" && activeEnd > 0) {
          osc.frequency.exponentialRampToValueAtTime(activeEnd, ctx.currentTime + activeDur);
        } else {
          osc.frequency.linearRampToValueAtTime(activeEnd, ctx.currentTime + activeDur);
        }
      }

      // Smooth gain envelope (Attack & Release)
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + activeDur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + activeDur);

      setTimeout(() => {
        setPlaying(false);
      }, activeDur * 1000);

    } catch (err: any) {
      console.warn("Audio Context bloqueado ou indisponível:", err);
      setAudioError("Permissão de áudio restrita pelo navegador. Dica: Clique na página e tente reproduzir novamente!");
      setPlaying(false);
    }
  };

  const codeSnippet = `// Código para reproduzir este efeito em JavaScript / HTML5:
function playSoundEffect() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "${soundType}";
    osc.frequency.setValueAtTime(${startFreq}, ctx.currentTime);
    ${startFreq !== endFreq ? `osc.frequency.${rampType === "exponential" ? "exponentialRampToValueAtTime" : "linearRampToValueAtTime"}(${endFreq}, ctx.currentTime + ${duration});` : ""}

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ${duration});

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + ${duration});
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="audio-synth-main">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Music className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Estúdio de Sintetizador Retro SFX</h3>
            <p className="text-xs text-slate-400">Gere e ouça em tempo real efeitos sonoros para as interfaces do seu jogo usando tecnologia Web Audio.</p>
          </div>
        </div>
      </div>

      {audioError && (
        <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs rounded-xl flex items-center gap-2">
          <VolumeX className="w-4 h-4 text-indigo-400 shrink-0" />
          <p>{audioError}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Preset list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
              🎵 Presets de Áudio Prontos
            </span>
            <div className="space-y-2.5">
              {Object.entries(SOUND_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handlePlaySound(preset)}
                  className="w-full text-left p-3.5 bg-slate-950/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">{preset.name}</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed max-w-[250px]">{preset.description}</p>
                  </div>
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-all">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Oscillators modular setup */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5 flex-1 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5 shrink-0">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Sintetizador Manual
            </span>

            <div className="space-y-4 flex-1 justify-center flex flex-col">
              {/* Wave Type selection */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-xs font-bold text-slate-300">Forma de Onda:</span>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                  {(["sine", "square", "sawtooth", "triangle"] as OscillatorType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setSoundType(type)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded capitalize transition-all ${
                        soundType === type
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {type === "sine" ? "Seno" : type === "square" ? "Quadrada" : type === "sawtooth" ? "Dente" : "Triângulo"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Frequency */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono font-bold">
                  <span className="text-slate-400">Frequência Inicial (Hz)</span>
                  <span className="text-indigo-300">{startFreq} Hz</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  value={startFreq}
                  onChange={(e) => setStartFreq(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* End Frequency */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono font-bold">
                  <span className="text-slate-400">Frequência Final / Varredura (Hz)</span>
                  <span className="text-indigo-300">{endFreq} Hz</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  value={endFreq}
                  onChange={(e) => setEndFreq(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sound Duration */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono font-bold">
                  <span className="text-slate-400">Duração Total</span>
                  <span className="text-indigo-300">{duration.toFixed(2)}s</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sweep Transition */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1.5">
                <span className="text-xs font-bold text-slate-300">Modo de Transição:</span>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                  {["linear", "exponential"].map(type => (
                    <button
                      key={type}
                      onClick={() => setRampType(type as "linear" | "exponential")}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded capitalize transition-all ${
                        rampType === type
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {type === "linear" ? "Linear" : "Exponencial"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-950 shrink-0">
              <button
                onClick={() => handlePlaySound()}
                disabled={playing}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-950 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <AudioLines className={`w-4 h-4 ${playing ? "animate-pulse" : ""}`} />
                <span>Testar Áudio Customizado</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Display Frame */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
            📂 Código Integrável (Web Audio API)
          </span>

          <button
            onClick={handleCopyCode}
            className="text-[10px] bg-slate-950 hover:bg-slate-800 border border-slate-850 text-slate-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copiado!" : "Copiar JS"}</span>
          </button>
        </div>

        <pre className="bg-slate-950 border border-slate-850 rounded-lg p-3.5 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-x-auto shadow-inner max-h-[160px]">
          {codeSnippet}
        </pre>
      </div>
    </div>
  );
}
