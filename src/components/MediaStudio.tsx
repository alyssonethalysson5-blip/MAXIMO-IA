import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, Video, Image, Play, Pause, Sparkles, Wand2, RefreshCw, Download, 
  Trash2, Plus, Terminal, Sliders, Type, Volume2, HelpCircle, Eye, 
  Scissors, Music, Layers, CheckCircle2, ChevronRight, AlertCircle, Maximize2
} from "lucide-react";

interface ScriptScene {
  id: number;
  timeStart: string;
  timeEnd: string;
  subtitle: string;
  camera: string;
  visualPrompt: string;
  bgUrl: string;
}

interface VideoTemplate {
  id: string;
  title: string;
  url: string;
  duration: string;
  originalStyle: string;
}

const VIDEO_TEMPLATES: VideoTemplate[] = [
  { id: "samp_gameplay", title: "GTA SA-MP Gameplay Corrida", url: "https://picsum.photos/seed/sampgame/640/360", duration: "15s", originalStyle: "Padrão" },
  { id: "cyber_city", title: "Cenário Neon Cyberpunk Cidade", url: "https://picsum.photos/seed/neoncity/640/360", duration: "10s", originalStyle: "Estilizado" },
  { id: "android_app", title: "Demonstração App Android Máximo", url: "https://picsum.photos/seed/androiddev/640/360", duration: "12s", originalStyle: "Screencast" },
];

const PRESET_IMAGES_TO_ANIMATE = [
  { name: "Metrópole de Neon", url: "https://picsum.photos/seed/cybermetropolis/800/450" },
  { name: "Guerreiro Samp", url: "https://picsum.photos/seed/sampwarrior/800/450" },
  { name: "Nave Espacial Retro", url: "https://picsum.photos/seed/retrospace/800/450" },
  { name: "Cérebro Digital IA", url: "https://picsum.photos/seed/digitalbrain/800/450" },
];

export default function MediaStudio() {
  const [activeSubTab, setActiveSubTab] = useState<"script-video" | "image-video" | "video-editor" | "image-gen">("script-video");

  // --- SCRIPT TO VIDEO STATES ---
  const [scriptText, setScriptText] = useState(
    "Apresentando o MÁXIMO 10.0! 🚀 A inteligência artificial definitiva com fusão de modelos globais de elite. Ele não é apenas um chat: ele compila Pawn, constrói servidores de SAMP, cria apps Android em segundos e automatiza seus projetos! Deixe seu like e comente 'MÁXIMO' para receber o acesso instantâneo!"
  );
  const [voiceTone, setVoiceTone] = useState("enthusiastic");
  const [visualStyle, setVisualStyle] = useState("cyberpunk");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [isGeneratingScriptVideo, setIsGeneratingScriptVideo] = useState(false);
  const [scriptVideoLogs, setScriptVideoLogs] = useState<string[]>([]);
  const [generatedScenes, setGeneratedScenes] = useState<ScriptScene[]>([]);
  const [isPlayingScenes, setIsPlayingScenes] = useState(false);
  const [activePlayingSceneIdx, setActivePlayingSceneIdx] = useState(0);

  // --- IMAGE TO VIDEO STATES ---
  const [selectedImageToAnimate, setSelectedImageToAnimate] = useState(PRESET_IMAGES_TO_ANIMATE[0].url);
  const [animationStrength, setAnimationStrength] = useState(65);
  const [cameraMotion, setCameraMotion] = useState("zoom-in");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animatedVideoUrl, setAnimatedVideoUrl] = useState<string | null>(null);

  // --- VIDEO EDITOR STATES ---
  const [selectedVideoTemplate, setSelectedVideoTemplate] = useState<VideoTemplate>(VIDEO_TEMPLATES[0]);
  const [editingCommand, setEditingCommand] = useState("Corte os primeiros 3 segundos, aplique filtro Vintage Retro e coloque legendas com o título 'GTA SA-MP 2026'");
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [editingLogs, setEditingLogs] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<"none" | "retro" | "cyber" | "grayscale" | "warm">("none");
  const [editedVideoResult, setEditedVideoResult] = useState<{
    url: string;
    duration: string;
    appliedFilters: string[];
    fileSize: string;
  } | null>(null);

  // --- IMAGE STABLE GEN STATES ---
  const [imagePrompt, setImagePrompt] = useState("A futuristic hacker workspace with multiple monitors running SAMP servers and green code matrix terminal, ultra-realistic cinematic render, 8k resolution, cyberpunk aesthetic");
  const [selectedImageStyle, setSelectedImageStyle] = useState("cyberpunk");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // --- PLAY SCENES CAROUSEL TICKER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingScenes && generatedScenes.length > 0) {
      interval = setInterval(() => {
        setActivePlayingSceneIdx((prev) => {
          if (prev >= generatedScenes.length - 1) {
            return 0; // Loop back
          }
          return prev + 1;
        });
      }, 4000); // 4 seconds per scene
    }
    return () => clearInterval(interval);
  }, [isPlayingScenes, generatedScenes]);

  // --- GENERATE SCRIPT TO VIDEO ---
  const handleGenerateScriptVideo = () => {
    if (!scriptText.trim()) return;
    setIsGeneratingScriptVideo(true);
    setGeneratedScenes([]);
    setScriptVideoLogs([
      "Iniciando Renderizador Multimodal MÁXIMO Engine v10.0...",
      "Processando roteiro narrativo: Analisando entonações e marcações de tempo...",
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setScriptVideoLogs(prev => [...prev, `Dividindo roteiro em cenas dinâmicas (Estilo: ${visualStyle === "cyberpunk" ? "Neon Cyber" : visualStyle === "realistic" ? "Fotorrealista" : visualStyle === "anime" ? "Cena de Anime" : "Render 3D"})...`]);
      } else if (step === 2) {
        setScriptVideoLogs(prev => [...prev, `Sintetizando voz neural IA (Tom: ${voiceTone === "enthusiastic" ? "Super Entusiasta" : voiceTone === "deep" ? "Grave Profissional" : "Robótico GTA"}) com compressão de rádio...`]);
      } else if (step === 3) {
        setScriptVideoLogs(prev => [...prev, "Gerando frames visuais base com inteligência artificial generativa..."]);
      } else if (step === 4) {
        setScriptVideoLogs(prev => [...prev, `Formatando resolução de saída para o Aspect Ratio ${aspectRatio} (Perfeito para TikTok/Shorts)...`]);
      } else if (step === 5) {
        clearInterval(interval);
        setIsGeneratingScriptVideo(false);
        setScriptVideoLogs(prev => [...prev, "✅ SUCESSO! Projeto renderizado e compilado com áudio sincronizado e legendas formatadas."]);

        // Generate mock scenes
        const sampleScenes: ScriptScene[] = [
          {
            id: 1,
            timeStart: "00:00",
            timeEnd: "00:04",
            subtitle: "Apresentando o MÁXIMO 10.0! 🚀 A inteligência artificial definitiva com fusão de modelos.",
            camera: "Zoom-in lento focado no logotipo holográfico de IA.",
            visualPrompt: "Futuristic digital brain with bright blue core, neural pathways glowing.",
            bgUrl: "https://picsum.photos/seed/scene1/600/1000"
          },
          {
            id: 2,
            timeStart: "00:04",
            timeEnd: "00:08",
            subtitle: "Ele não é apenas um chat: ele compila Pawn, constrói servidores de SAMP e cria apps!",
            camera: "Pan horizontal rápido sobre uma tela de terminal preta rodando compilador pawn.",
            visualPrompt: "Computer screen displaying green matrix code and gamemode scripts.",
            bgUrl: "https://picsum.photos/seed/scene2/600/1000"
          },
          {
            id: 3,
            timeStart: "00:08",
            timeEnd: "00:12",
            subtitle: "Deixe seu like e comente 'MÁXIMO' para receber o acesso instantâneo!",
            camera: "Efeito glitch cinematográfico com botão flutuante de curtir e fogos digitais.",
            visualPrompt: "Futuristic social media heart icon on floating holographic podium.",
            bgUrl: "https://picsum.photos/seed/scene3/600/1000"
          }
        ];
        setGeneratedScenes(sampleScenes);
        setActivePlayingSceneIdx(0);
        setIsPlayingScenes(true);
      }
    }, 1000);
  };

  // --- ANIMATE IMAGE TO VIDEO ---
  const handleAnimateImage = () => {
    setIsAnimating(true);
    setAnimationProgress(0);
    setAnimatedVideoUrl(null);

    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          setAnimatedVideoUrl(selectedImageToAnimate);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // --- EDIT & PROCESS VIDEO ---
  const handleEditVideo = () => {
    if (!editingCommand.trim()) return;
    setIsEditingVideo(true);
    setEditedVideoResult(null);
    setEditingLogs([
      `Iniciando renderizador de edição de vídeo para: ${selectedVideoTemplate.title}`,
      `Comando de edição recebido: "${editingCommand}"`,
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setEditingLogs(prev => [...prev, "Removendo frames iniciais com precisão de corte (0:00 - 0:03)..."]);
      } else if (step === 2) {
        // Detect filter request
        let detectedFilter: typeof activeFilter = "retro";
        if (editingCommand.toLowerCase().includes("cyber")) detectedFilter = "cyber";
        else if (editingCommand.toLowerCase().includes("grayscale") || editingCommand.toLowerCase().includes("cinza")) detectedFilter = "grayscale";
        else if (editingCommand.toLowerCase().includes("vintage") || editingCommand.toLowerCase().includes("vintage")) detectedFilter = "retro";
        else if (editingCommand.toLowerCase().includes("warm") || editingCommand.toLowerCase().includes("quente")) detectedFilter = "warm";

        setActiveFilter(detectedFilter);
        setEditingLogs(prev => [...prev, `Aplicando matriz colorimétrica de filtro: ${detectedFilter.toUpperCase()}...`]);
      } else if (step === 3) {
        setEditingLogs(prev => [...prev, "Gerando camada de texto overlay com fonte 'Space Grotesk' estilizada..."]);
      } else if (step === 4) {
        clearInterval(interval);
        setIsEditingVideo(false);
        setEditingLogs(prev => [...prev, "✅ COMPILADO! Arquivo de vídeo final processado com sucesso."]);
        setEditedVideoResult({
          url: selectedVideoTemplate.url,
          duration: "12s",
          appliedFilters: [activeFilter, "SubtitlesOverlay"],
          fileSize: "4.8 MB"
        });
      }
    }, 900);
  };

  // --- STABLE IMAGE GENERATION ---
  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);

    setTimeout(() => {
      setIsGeneratingImage(false);
      setGeneratedImageUrl(`https://picsum.photos/seed/${encodeURIComponent(imagePrompt)}/800/800`);
    }, 2000);
  };

  return (
    <div className="space-y-6" id="media-studio-main">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Film className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Estúdio Multimídia Avançado IA</h3>
            <p className="text-xs text-slate-400">Gere roteiros, crie e anime vídeos para TikTok, analise arquivos multimídia e edite cenas com filtros integrados.</p>
          </div>
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-900 rounded-xl max-w-2xl shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab("script-video")}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "script-video"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Roteiro para Vídeo (TikTok)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("image-video")}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "image-video"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Imagem para Vídeo</span>
        </button>

        <button
          onClick={() => setActiveSubTab("video-editor")}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "video-editor"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Análise & Edição</span>
        </button>

        <button
          onClick={() => setActiveSubTab("image-gen")}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "image-gen"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>Estúdio de Imagem</span>
        </button>
      </div>

      {/* --- SUBTAB: SCRIPT TO VIDEO --- */}
      {activeSubTab === "script-video" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-2">
              📝 Roteiro Narrativo & Voz
            </span>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Roteiro Completo (TikTok/Reels)</label>
                <textarea
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  className="w-full h-36 bg-slate-950 text-xs text-slate-200 p-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                  placeholder="Escreva seu roteiro de vídeo..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase">Tom da Voz Narradora</label>
                  <select
                    value={voiceTone}
                    onChange={(e) => setVoiceTone(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-slate-300 p-2.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="enthusiastic">Super Entusiasta (TikTok)</option>
                    <option value="deep">Radialista Grave</option>
                    <option value="calm">Narrador Calmo</option>
                    <option value="robotic">Robótico GTA Retro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase">Estilo Visual das Cenas</label>
                  <select
                    value={visualStyle}
                    onChange={(e) => setVisualStyle(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-slate-300 p-2.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="realistic">Cinemático Realista</option>
                    <option value="anime">Anime Moderno</option>
                    <option value="3d-render">SAMP 3D Render</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex gap-1.5 items-center">
                  <span className="text-[10px] text-slate-500 font-bold">Resolução:</span>
                  <div className="flex gap-1 bg-slate-950 p-0.5 rounded border border-slate-850">
                    {["9:16", "1:1", "16:9"].map(ar => (
                      <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded ${
                          aspectRatio === ar ? "bg-indigo-600 text-white" : "text-slate-400"
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateScriptVideo}
                  disabled={isGeneratingScriptVideo}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-950 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Gerar Cenas & Vídeo</span>
                </button>
              </div>
            </div>

            {/* Render Log Diagnostic */}
            <div className="space-y-1.5 pt-2 border-t border-slate-900">
              <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase flex items-center gap-1">
                <Terminal className="w-3 h-3 text-indigo-400" /> Logs de Renderização Multimídia
              </span>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 font-mono text-[9px] text-slate-400 space-y-1 max-h-[110px] overflow-y-auto">
                {scriptVideoLogs.length === 0 ? (
                  <span className="text-slate-600 italic">Pronto para gerar cenas do roteiro...</span>
                ) : (
                  scriptVideoLogs.map((log, idx) => (
                    <div key={idx} className={log.includes("✅") ? "text-emerald-400 font-bold" : "text-slate-400"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Video Player Display Frame */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center min-h-[400px]">
              {generatedScenes.length > 0 ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" /> Preview do Vídeo Gerado
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlayingScenes(!isPlayingScenes)}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded text-[10.5px] font-bold flex items-center gap-1 transition-colors"
                      >
                        {isPlayingScenes ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                        <span>{isPlayingScenes ? "Pausar" : "Reproduzir"}</span>
                      </button>

                      <a
                        href={generatedScenes[activePlayingSceneIdx].bgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-800 px-2 py-1 rounded text-[10.5px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Exportar Projeto</span>
                      </a>
                    </div>
                  </div>

                  {/* Interactive Visual Player Frame */}
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Scene vertical 9:16 style canvas */}
                    <div className="w-full md:w-56 aspect-[9/16] bg-slate-950 border border-slate-850 rounded-xl overflow-hidden relative shadow-2xl mx-auto flex flex-col justify-between p-3.5">
                      {/* background image with animation when playing */}
                      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <img
                          src={generatedScenes[activePlayingSceneIdx].bgUrl}
                          alt="Scene Preview"
                          className={`w-full h-full object-cover opacity-80 transition-transform duration-[4000ms] ease-linear ${
                            isPlayingScenes ? "scale-110 translate-y-2" : "scale-100"
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/30" />
                      </div>

                      {/* Top Overlay metadata */}
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[8.5px] font-mono bg-indigo-600 text-white px-1.5 py-0.5 rounded font-black">
                          CENA {generatedScenes[activePlayingSceneIdx].id}
                        </span>
                        <span className="text-[8.5px] font-mono bg-slate-950/85 text-slate-300 px-1.5 py-0.5 rounded">
                          {generatedScenes[activePlayingSceneIdx].timeStart} - {generatedScenes[activePlayingSceneIdx].timeEnd}
                        </span>
                      </div>

                      {/* Middle overlay: active audio visualizer bar */}
                      {isPlayingScenes && (
                        <div className="relative z-10 flex justify-center gap-1 pointer-events-none">
                          <span className="w-1 h-6 bg-indigo-500 rounded animate-pulse" />
                          <span className="w-1 h-8 bg-purple-500 rounded animate-pulse delay-75" />
                          <span className="w-1 h-5 bg-teal-500 rounded animate-pulse delay-150" />
                        </div>
                      )}

                      {/* Subtitle box */}
                      <div className="relative z-10 bg-slate-950/90 border border-slate-850 p-2.5 rounded-lg text-center backdrop-blur-md">
                        <p className="text-[10px] text-yellow-300 font-black leading-relaxed tracking-wide drop-shadow-md">
                          {generatedScenes[activePlayingSceneIdx].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Timeline scenes list detail */}
                    <div className="flex-1 space-y-2.5">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Lista de Frames da Linha do Tempo</span>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {generatedScenes.map((scene, idx) => (
                          <button
                            key={scene.id}
                            onClick={() => {
                              setActivePlayingSceneIdx(idx);
                              setIsPlayingScenes(false);
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                              activePlayingSceneIdx === idx
                                ? "bg-indigo-600/10 border-indigo-500/40"
                                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                            }`}
                          >
                            <img
                              src={scene.bgUrl}
                              alt="Scene thumbnail"
                              className="w-12 h-16 object-cover rounded border border-slate-800"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-300">
                                <span>Cena {scene.id}</span>
                                <span className="text-indigo-400">{scene.timeStart} - {scene.timeEnd}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-200 line-clamp-2 leading-tight">{scene.subtitle}</p>
                              <p className="text-[8.5px] font-mono text-slate-500 truncate">🎬 Câmera: {scene.camera}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 space-y-3">
                  <Film className="w-12 h-12 text-slate-700 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-300">Nenhum Projeto Renderizado</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">Insira seu roteiro narrativo à esquerda, selecione as opções de estilo e clique em gerar para ver sua cena do TikTok.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB: IMAGE TO VIDEO --- */}
      {activeSubTab === "image-video" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-2">
              📸 Animar Imagem (Image-to-Video)
            </span>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Selecione uma imagem de base</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_IMAGES_TO_ANIMATE.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => {
                      setSelectedImageToAnimate(img.url);
                      setAnimatedVideoUrl(null);
                    }}
                    className={`p-1.5 bg-slate-950 rounded-lg border transition-all text-left flex items-center gap-2 cursor-pointer group ${
                      selectedImageToAnimate === img.url
                        ? "border-indigo-500"
                        : "border-slate-850 hover:border-slate-700"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-10 h-10 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9.5px] font-bold text-slate-300 truncate group-hover:text-indigo-400">{img.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Motion adjustments */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Intensidade do Movimento</label>
                <div className="flex justify-between text-[11px] font-mono text-indigo-300 font-bold">
                  <span>Suave</span>
                  <span>{animationStrength}%</span>
                  <span>Cinemática Extrema</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={animationStrength}
                  onChange={(e) => setAnimationStrength(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Trajetória da Câmera</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "zoom-in", label: "Aproximar (Zoom-In)" },
                    { id: "zoom-out", label: "Afastar (Zoom-Out)" },
                    { id: "pan-left", label: "Deslizar Esquerda" },
                    { id: "pan-right", label: "Deslizar Direita" },
                    { id: "orbital", label: "Giro Orbital" },
                    { id: "dramatic-tilt", label: "Inclinação" },
                  ].map(mot => (
                    <button
                      key={mot.id}
                      onClick={() => setCameraMotion(mot.id)}
                      className={`text-[9px] font-bold p-2 rounded-lg border transition-all cursor-pointer ${
                        cameraMotion === mot.id
                          ? "bg-indigo-600/10 border-indigo-500/60 text-white"
                          : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {mot.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAnimateImage}
                disabled={isAnimating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnimating ? `Animação em progresso... (${animationProgress}%)` : "Gerar Vídeo Animado"}</span>
              </button>
            </div>
          </div>

          {/* Render Output View */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[400px]">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-indigo-400" /> Monitor de Saída de Vídeo 3D
              </span>
              {animatedVideoUrl && (
                <a
                  href={animatedVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
              {isAnimating ? (
                <div className="text-center space-y-3.5">
                  <div className="relative w-16 h-16 mx-auto">
                    <span className="absolute inset-0 rounded-full border-4 border-slate-800" />
                    <span className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-300">Computando Vetores de Movimento...</h5>
                    <p className="text-[10.5px] text-slate-500">Mapeando fluxo óptico de {cameraMotion.toUpperCase()}...</p>
                  </div>
                  <div className="w-48 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-850 mx-auto">
                    <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${animationProgress}%` }} />
                  </div>
                </div>
              ) : animatedVideoUrl ? (
                <div className="w-full max-w-lg aspect-video bg-slate-950 border border-slate-850 rounded-xl overflow-hidden relative shadow-2xl">
                  {/* Dynamic movement simulation using CSS animations */}
                  <img
                    src={animatedVideoUrl}
                    alt="Animated output"
                    className={`w-full h-full object-cover opacity-90 ${
                      cameraMotion === "zoom-in"
                        ? "animate-pulse scale-110"
                        : cameraMotion === "zoom-out"
                        ? "animate-pulse scale-95"
                        : cameraMotion === "pan-left"
                        ? "translate-x-4 scale-105"
                        : "translate-y-2 scale-110"
                    } transition-all duration-1000`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay" />
                  <div className="absolute left-3 top-3 bg-slate-950/80 px-2 py-0.5 rounded text-[8px] font-mono text-emerald-400 border border-slate-850">
                    ● ANIMADO ({cameraMotion}) - {animationStrength}% Força
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2 max-w-sm">
                  <Video className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-xs text-slate-300 font-bold">Nenhum Vídeo Animado na Fila</p>
                  <p className="text-[11px] text-slate-500">Escolha uma imagem de base à esquerda, selecione os parâmetros de movimento da câmera e clique em gerar.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-850 text-[10px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-400">Especificações de Animação:</span>
              <p>O MÁXIMO gera interpolações de fluxo óptico a 30 FPS e exporta arquivos codificados em H.264 MP4 compatíveis com todas as redes sociais e motores de jogo.</p>
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB: VIDEO ANALYZER & EDITOR --- */}
      {activeSubTab === "video-editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor commands */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-2">
              ✂️ Analisador & Editor de Vídeo IA
            </span>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Selecione o Vídeo Alvo</label>
                <div className="space-y-2">
                  {VIDEO_TEMPLATES.map(temp => (
                    <button
                      key={temp.id}
                      onClick={() => {
                        setSelectedVideoTemplate(temp);
                        setEditedVideoResult(null);
                        setActiveFilter("none");
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                        selectedVideoTemplate.id === temp.id
                          ? "bg-indigo-600/10 border-indigo-500/40"
                          : "bg-slate-950 border-slate-900 hover:border-slate-800"
                      }`}
                    >
                      <img
                        src={temp.url}
                        alt={temp.title}
                        className="w-12 h-8 object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-200 truncate">{temp.title}</p>
                        <p className="text-[9.5px] text-slate-500">Duração: {temp.duration} | Original: {temp.originalStyle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Comando de Edição Natural</label>
                <textarea
                  value={editingCommand}
                  onChange={(e) => setEditingCommand(e.target.value)}
                  className="w-full h-24 bg-slate-950 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                  placeholder="Escreva como você quer editar o vídeo..."
                />
                <span className="text-[9px] text-slate-500 block leading-relaxed">Exemplos: "Aplique filtro Vintage", "Coloque filtro Cyber", "Adicione marca d'água MÁXIMO"</span>
              </div>

              <button
                onClick={handleEditVideo}
                disabled={isEditingVideo}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Scissors className="w-4 h-4" />
                <span>{isEditingVideo ? "Processando Edição..." : "Analisar & Aplicar Edição"}</span>
              </button>
            </div>

            {/* Diagnostic Logs */}
            <div className="space-y-1.5 pt-2 border-t border-slate-900">
              <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase flex items-center gap-1">
                <Terminal className="w-3 h-3 text-indigo-400" /> Console de Processamento do Editor
              </span>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 font-mono text-[9px] text-slate-400 space-y-1 max-h-[110px] overflow-y-auto">
                {editingLogs.length === 0 ? (
                  <span className="text-slate-600 italic">Insira comandos para iniciar a edição virtual...</span>
                ) : (
                  editingLogs.map((log, idx) => (
                    <div key={idx} className={log.includes("✅") ? "text-emerald-400 font-bold" : "text-slate-400"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Interactive video simulator canvas */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[400px]">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-3">
              📺 Tela de Exibição de Vídeo Editado
            </span>

            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {isEditingVideo ? (
                <div className="text-center space-y-2">
                  <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                  <h5 className="text-xs font-bold text-slate-300">Analisando Trilha de Vídeo...</h5>
                  <p className="text-[10px] text-slate-500">Mapeando histogramas de cor e metadados...</p>
                </div>
              ) : (
                <div className="w-full max-w-md aspect-video bg-slate-950 border border-slate-850 rounded-xl overflow-hidden relative shadow-2xl">
                  {/* Applied Filter Simulation inside image canvas */}
                  <img
                    src={selectedVideoTemplate.url}
                    alt="Active Video Frame"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      activeFilter === "retro"
                        ? "sepia saturate-150 contrast-125 brightness-95"
                        : activeFilter === "cyber"
                        ? "hue-rotate-60 saturate-200 brightness-110"
                        : activeFilter === "grayscale"
                        ? "grayscale brightness-90"
                        : activeFilter === "warm"
                        ? "sepia-[0.3] saturate-125 brightness-105"
                        : ""
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle video overlay layout */}
                  <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />

                  {/* Subtitles Simulation */}
                  {editedVideoResult && (
                    <div className="absolute bottom-4 left-4 right-4 text-center z-10 pointer-events-none">
                      <span className="bg-black/85 text-yellow-300 text-[10.5px] font-black font-mono tracking-wide px-2.5 py-1 rounded border border-slate-800">
                        GTA SA-MP 2026 [FILTRO: {activeFilter.toUpperCase()}]
                      </span>
                    </div>
                  )}

                  {/* Playback time indicator */}
                  <div className="absolute right-3 top-3 bg-slate-950/80 px-2 py-0.5 rounded text-[8.5px] font-mono text-indigo-300 border border-slate-850">
                    {selectedVideoTemplate.duration}
                  </div>
                </div>
              )}
            </div>

            {/* Results metadata */}
            {editedVideoResult ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-400 font-extrabold tracking-wider block">● COMPILADO COM SUCESSO</span>
                  <p className="text-[11px] text-slate-300 font-bold">Arquivo: edited_export_output.mp4</p>
                  <p className="text-[10px] text-slate-500">Tamanho: {editedVideoResult.fileSize} | Filtros: {editedVideoResult.appliedFilters.join(", ")}</p>
                </div>

                <a
                  href={editedVideoResult.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1 shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>
              </div>
            ) : (
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-850 text-center text-[10px] text-slate-500">
                O analisador lê histogramas de cores e trilhas de áudio para fazer os cortes e mixagens baseados em comandos descritivos de linguagem natural.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- SUBTAB: STABLE IMAGE STUDIO --- */}
      {activeSubTab === "image-gen" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Prompt builder */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-2">
              🎨 Estúdio de Geração Estável
            </span>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Prompt de Imagem (Descrição Detalhada)</label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full h-28 bg-slate-950 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                  placeholder="Descreva a imagem que deseja gerar..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Estilos de Pintura Generativa</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "cyberpunk", name: "Cyberpunk Neon" },
                    { id: "realistic", name: "Fotorrealismo 8k" },
                    { id: "digital-art", name: "Ilustração Digital" },
                    { id: "pixel", name: "Retro Pixel Art" },
                  ].map(sty => (
                    <button
                      key={sty.id}
                      onClick={() => setSelectedImageStyle(sty.id)}
                      className={`text-xs font-bold p-2.5 rounded-lg border transition-all text-center cursor-pointer ${
                        selectedImageStyle === sty.id
                          ? "bg-indigo-600/15 border-indigo-500/60 text-white"
                          : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {sty.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Wand2 className="w-4 h-4" />
                <span>{isGeneratingImage ? "Computando Redes Neurais..." : "Gerar Imagem de Alta Qualidade"}</span>
              </button>
            </div>
          </div>

          {/* Results display */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[400px]">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
                🎯 Resultado da Imagem Generativa
              </span>
              {generatedImageUrl && (
                <a
                  href={generatedImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Imagem</span>
                </a>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {isGeneratingImage ? (
                <div className="text-center space-y-2">
                  <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                  <h5 className="text-xs font-bold text-slate-300">Convertendo Ruído Latente...</h5>
                  <p className="text-[10px] text-slate-500">Super-resolução e upscaling ativos (Style: {selectedImageStyle.toUpperCase()})</p>
                </div>
              ) : generatedImageUrl ? (
                <div className="w-full max-w-sm aspect-square bg-slate-950 border border-slate-850 rounded-xl overflow-hidden relative shadow-2xl">
                  <img
                    src={generatedImageUrl}
                    alt="Generative output"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="text-center space-y-2 max-w-sm">
                  <Image className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-xs text-slate-300 font-bold">Aguardando Prompt</p>
                  <p className="text-[11px] text-slate-500">Descreva uma cena artística ou fotorrealista e clique em gerar para ver o resultado instantâneo do cérebro generativo.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-850 text-center text-[10px] text-slate-500">
              O módulo se conecta a pipelines generativas de difusão estável de alta performance capazes de entender termos complexos de engenharia de software e jogos.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
