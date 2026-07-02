import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Palette, Copy, Check, Sliders, Eye, RefreshCw } from "lucide-react";

interface ColorPreset {
  name: string;
  hex: string;
  sampDef: string;
}

const PALETTES: Record<string, ColorPreset[]> = {
  "SA-MP Clássicos": [
    { name: "Verde Admin", hex: "#33CC33", sampDef: "0x33CC33FF" },
    { name: "Vermelho Erro", hex: "#FF3333", sampDef: "0xFF3333FF" },
    { name: "Azul Staff", hex: "#00C2EE", sampDef: "0x00C2EEFF" },
    { name: "Amarelo Info", hex: "#F3F315", sampDef: "0xF3F315FF" },
    { name: "Cinza Offline", hex: "#A9A9A9", sampDef: "0xA9A9A9FF" },
    { name: "Rosa VIP", hex: "#FF66CC", sampDef: "0xFF66CCFF" },
  ],
  "Retro Arcade": [
    { name: "Laser Magenta", hex: "#FF0055", sampDef: "0xFF0055FF" },
    { name: "Neon Cyan", hex: "#00F0FF", sampDef: "0x00F0FFFF" },
    { name: "Grid Yellow", hex: "#FFD700", sampDef: "0xFFD700FF" },
    { name: "Alien Green", hex: "#39FF14", sampDef: "0x39FF14FF" },
    { name: "Cyber Purple", hex: "#8A2BE2", sampDef: "0x8A2BE2FF" },
  ],
  "Modern Flat UI": [
    { name: "Sleek Indigo", hex: "#6366F1", sampDef: "0x6366F1FF" },
    { name: "Emerald Mint", hex: "#10B981", sampDef: "0x10B981FF" },
    { name: "Sun Amber", hex: "#F59E0B", sampDef: "0xF59E0BFF" },
    { name: "Rose Coral", hex: "#F43F5E", sampDef: "0xF43F5EFF" },
    { name: "Soft Sky", hex: "#0EA5E9", sampDef: "0x0EA5E9FF" },
  ]
};

export default function ColorDevkit() {
  const [hexColor, setHexColor] = useState<string>("#6366F1");
  const [alpha, setAlpha] = useState<number>(255);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // RGB calculated values
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);

  useEffect(() => {
    // Parse hex to decimal RGB
    let cleanHex = hexColor.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map(c => c + c).join("");
    }
    if (cleanHex.length === 6) {
      const parsedR = parseInt(cleanHex.substring(0, 2), 16);
      const parsedG = parseInt(cleanHex.substring(2, 4), 16);
      const parsedB = parseInt(cleanHex.substring(4, 6), 16);
      setR(isNaN(parsedR) ? 0 : parsedR);
      setG(isNaN(parsedG) ? 0 : parsedG);
      setB(isNaN(parsedB) ? 0 : parsedB);
    }
  }, [hexColor]);

  const handleRGBChange = (channel: "r" | "g" | "b", val: number) => {
    let newR = r, newG = g, newB = b;
    if (channel === "r") newR = val;
    if (channel === "g") newG = val;
    if (channel === "b") newB = val;
    
    setR(newR);
    setG(newG);
    setB(newB);

    // Convert back to Hex
    const toHexStr = (n: number) => {
      const h = n.toString(16).toUpperCase();
      return h.length === 1 ? "0" + h : h;
    };
    setHexColor(`#${toHexStr(newR)}${toHexStr(newG)}${toHexStr(newB)}`);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const toHexStr = (n: number) => {
    const h = n.toString(16).toUpperCase();
    return h.length === 1 ? "0" + h : h;
  };

  // Multiple formats calculations
  const formatSAMP = `0x${hexColor.replace("#", "")}${toHexStr(alpha)}`;
  const formatSAMPDef = `#define COR_CUSTOM 0x${hexColor.replace("#", "")}${toHexStr(alpha)}`;
  const formatRGBA = `rgba(${r}, ${g}, ${b}, ${(alpha / 255).toFixed(2)})`;
  const formatUnity = `new Color(${(r/255).toFixed(3)}f, ${(g/255).toFixed(3)}f, ${(b/255).toFixed(3)}f, ${(alpha/255).toFixed(3)}f);`;

  return (
    <div className="space-y-6" id="color-devkit-main">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Palette className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Kit de Conversão de Cores de Dev</h3>
            <p className="text-xs text-slate-400">Escolha cores e gere instantaneamente códigos para o SA-MP Pawn, Unity Engine, CSS RGBA ou códigos Hexadecimais.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Color Picker and Sliders */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5 flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5 shrink-0">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Ajuste Fino de Cores
          </span>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
            <input
              type="color"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-16 h-16 rounded border border-slate-800 bg-slate-900 cursor-pointer p-1"
            />
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-300">Seletor Visual Ativo</span>
              <p className="text-[10.5px] text-slate-400">Clique na caixa ao lado para abrir a paleta nativa ou arraste as barras abaixo.</p>
            </div>
          </div>

          <div className="space-y-4 flex-1 justify-center flex flex-col">
            {/* R */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span className="text-rose-400">Canal Vermelho (R)</span>
                <span className="text-slate-300">{r}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={r}
                onChange={(e) => handleRGBChange("r", parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* G */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span className="text-emerald-400">Canal Verde (G)</span>
                <span className="text-slate-300">{g}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={g}
                onChange={(e) => handleRGBChange("g", parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* B */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span className="text-indigo-400">Canal Azul (B)</span>
                <span className="text-slate-300">{b}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={b}
                onChange={(e) => handleRGBChange("b", parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* Alpha */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span className="text-slate-400">Transparência / Alpha (A)</span>
                <span className="text-slate-300">{alpha} ({Math.round((alpha/255)*100)}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={alpha}
                onChange={(e) => setAlpha(parseInt(e.target.value))}
                className="w-full accent-slate-400 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Color Formats Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
              💻 Código Formatado para Motores
            </span>

            <div className="space-y-3">
              {/* SA-MP Hex */}
              <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>SA-MP RGBA HEXADECIMAL</span>
                  <button
                    onClick={() => handleCopy(formatSAMP, "samp")}
                    className="hover:text-indigo-400 flex items-center gap-1 font-bold transition-colors"
                  >
                    {copiedKey === "samp" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "samp" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-1 select-all">{formatSAMP}</div>
              </div>

              {/* SA-MP #define */}
              <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>DEFINIÇÃO PAWN (#define)</span>
                  <button
                    onClick={() => handleCopy(formatSAMPDef, "def")}
                    className="hover:text-indigo-400 flex items-center gap-1 font-bold transition-colors"
                  >
                    {copiedKey === "def" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "def" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-1 select-all">{formatSAMPDef}</div>
              </div>

              {/* Unity Color Struct */}
              <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>C# / UNITY ENGINE (Float 0.0 - 1.0)</span>
                  <button
                    onClick={() => handleCopy(formatUnity, "unity")}
                    className="hover:text-indigo-400 flex items-center gap-1 font-bold transition-colors"
                  >
                    {copiedKey === "unity" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "unity" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-1 select-all">{formatUnity}</div>
              </div>

              {/* Web RGBA */}
              <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>WEB STYLING CSS (RGBA)</span>
                  <button
                    onClick={() => handleCopy(formatRGBA, "rgba")}
                    className="hover:text-indigo-400 flex items-center gap-1 font-bold transition-colors"
                  >
                    {copiedKey === "rgba" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "rgba" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-1 select-all">{formatRGBA}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Palettes */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
          🎨 Paletas de HUDs de Jogos de Alta Performance
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(PALETTES).map(([category, colors]) => (
            <div key={category} className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
              <span className="text-[10.5px] font-black text-slate-300 tracking-tight block uppercase">{category}</span>
              <div className="grid grid-cols-2 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setHexColor(c.hex);
                    }}
                    className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-left transition-colors flex items-center gap-2 cursor-pointer w-full group"
                  >
                    <span 
                      className="w-4 h-4 rounded shrink-0 border border-slate-950" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-slate-200 truncate">{c.name}</p>
                      <p className="text-[9px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">{c.hex}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
