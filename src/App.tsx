import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Bot,
  FileText,
  Video,
  Film,
  Image as ImageIcon,
  Search,
  Download,
  Terminal,
  Cpu,
  CornerDownLeft,
  Paperclip,
  Check,
  X,
  Code2,
  BookOpen,
  Compass,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Trash2,
  Info,
  Smartphone,
  Shield,
  Laptop,
  WifiOff,
  Globe,
  Key,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Database,
  Palette,
  Music,
  ListTodo,
  Menu,
  ChevronRight
} from "lucide-react";
import ZIPInspector from "./components/ZIPInspector";
import DownloadCenter from "./components/DownloadCenter";
import ConversorMulti from "./components/ConversorMulti";
import MaximoCore from "./components/MaximoCore";
import KaliSuite from "./components/KaliSuite";
import DBPlayground from "./components/DBPlayground";
import CodePlayground from "./components/CodePlayground";
import ColorDevkit from "./components/ColorDevkit";
import AudioSynthLab from "./components/AudioSynthLab";
import DevKanban from "./components/DevKanban";
import MediaStudio from "./components/MediaStudio";
import { Message, DependencyDownload, ZipFileItem, GameEngine } from "./types";

interface AIModelPreset {
  id: string;
  name: string;
  developer: string;
  specialty: string;
  description: string;
  badgeColor: string;
  systemInstruction: string;
}

const AI_MODELS: AIModelPreset[] = [
  {
    id: "maximo-core",
    name: "MÁXIMO IA Core (Fusão Global)",
    developer: "Motor Central Integrado",
    specialty: "Análise Geral, ZIP, Fotos e Vídeos",
    description: "O cérebro unificado que coordena todas as inteligências artificiais de código aberto nacionais e internacionais em um só fluxo de alta estabilidade.",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
    systemInstruction: "Você é o MÁXIMO IA Core, a inteligência artificial definitiva que unifica todas as IAs de código aberto e gratuitas do planeta (DeepSeek, Qwen, Llama, Mistral, Sabiá, Phi-4, Gemma, etc). Você é focado em criação de jogos, códigos limpos, análise profunda de projetos compactados em ZIP, fotos de bugs, vídeos curtos e pesquisa em tempo real na web internacional. Caso note DLLs, arquivos ou scripts faltantes, use a ferramenta 'requestDependencyDownload' para solicitar a correção automática do projeto."
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder V2",
    developer: "DeepSeek (Código Aberto)",
    specialty: "Matemática, Shaders & Otimização",
    description: "A melhor IA do mundo para lógica pura, matemática vetorial complexa de jogos e desenvolvimento de shaders de alta performance.",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/25",
    systemInstruction: "Você age sob a personalidade do DeepSeek Coder V2 no motor de fusão MÁXIMO IA. Sua missão é fornecer soluções matemáticas e algorítmicas impecáveis para jogos, shaders HLSL/GLSL e otimização de CPU/GPU em português."
  },
  {
    id: "qwen-coder",
    name: "Qwen 2.5 Coder",
    developer: "Alibaba (Código Aberto)",
    specialty: "Unity C# & Godot GDScript",
    description: "Altamente treinado para engines de jogos. Especialista em Unity MonoBehaviour, arquiteturas ECS, Unreal C++ e Godot Engine.",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    systemInstruction: "Você age sob a personalidade do Qwen 2.5 Coder no motor de fusão MÁXIMO IA. Você é especializado na arquitetura e depuração de motores como Unity, Unreal Engine e Godot. Escreva códigos completos e explicados detalhadamente em português."
  },
  {
    id: "sabia-2",
    name: "Sabiá-2 (Maritaca AI)",
    developer: "Maritaca (Nacional - BR)",
    specialty: "Contexto Nacional e Regras",
    description: "Modelo de código aberto adaptado com perfeição para a cultura de desenvolvimento brasileira, regras e documentações em português.",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
    systemInstruction: "Você age sob a personalidade do Sabiá-2, o modelo brasileiro especializado em processamento rico em português do Brasil. Ajude com contextualização nacional, traduções técnicas precisas e soluções didáticas para iniciantes."
  },
  {
    id: "llama-3",
    name: "Llama 3.3 Instruct",
    developer: "Meta (Código Aberto)",
    specialty: "Game Design, Roteiro & Narrativa",
    description: "Perfeito para planejar mecânicas, redigir histórias de RPG, diálogos, tabelas de progressão e documentação de game design.",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    systemInstruction: "Você age sob a personalidade do Llama 3.3 Instruct no motor de fusão MÁXIMO IA. Sua especialidade é redação criativa de jogos, documentação técnica, design de fases, IA de comportamento (State Machines) e regras em português."
  },
  {
    id: "mistral-large",
    name: "Mistral Large GameDev",
    developer: "Mistral AI (Acesso Livre)",
    specialty: "Análise de Logs & Refatoração",
    description: "Excelente para encontrar bugs silenciosos em códigos extensos e propor refatorações robustas baseadas em padrões de design clean.",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    systemInstruction: "Você age sob a personalidade do Mistral Large no motor de fusão MÁXIMO IA. Foque na análise de logs de compilação, crash reports de motores e refatoração de código legado com clean code e arquitetura limpa em português."
  },
  {
    id: "phi-4",
    name: "Phi-4 (Microsoft)",
    developer: "Microsoft (Código Aberto)",
    specialty: "Raciocínio Lógico & Estudantes",
    description: "Incrível para explicações passo a passo, algoritmos de menor escala e suporte didático para crianças e iniciantes em programação.",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/25",
    systemInstruction: "Você age sob a personalidade do Microsoft Phi-4 no motor de fusão MÁXIMO IA. Sua meta é dar respostas extremamente didáticas, fáceis de entender por crianças ou iniciantes, dividindo problemas complexos em pequenos blocos fáceis e divertidos em português."
  },
  {
    id: "gemma-2",
    name: "Gemma 2 (Google Open)",
    developer: "Google (Acesso Aberto)",
    specialty: "Raciocínio Ético & Tutoriais",
    description: "Muito versátil e equilibrado. Excelente para estruturar guias rápidos passo a passo e organizar ideias de jogos indie.",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    systemInstruction: "Você age sob a personalidade do Google Gemma 2 no motor de fusão MÁXIMO IA. Ajude de forma construtiva e polida, criando tutoriais passo a passo impecáveis e planos de aprendizagem em português."
  }
];

export default function App() {
  const [selectedModel, setSelectedModel] = useState<AIModelPreset>(AI_MODELS[0]); // default to maximo-core
  const [gameEngine, setGameEngine] = useState<GameEngine>("Unity");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      parts: [
        {
          text: "Seja muito bem-vindo ao **MÁXIMO 10.0** — O maior e mais avançado motor de fusão de Inteligências Artificiais gratuitas e de código aberto do planeta Terra!\n\nEu reuni o conhecimento de todas as principais mentes de IA do mundo, como **DeepSeek Coder V2**, **Qwen 2.5 Coder**, **Sabiá-2 (Maritaca)**, **Llama 3.3**, **Mistral Large**, **Phi-4 (Microsoft)** e **Gemma 2**, conectando-as em um circuito de **Mente Coletiva Coordenada**.\n\n### 🧠 Como funciona a Mente Coletiva 10.0?\nCaso você faça uma pergunta complexa e uma das inteligências não souber o resultado exato, ela realiza uma busca ultra-rápida na velocidade da luz no conhecimento de todas as outras IAs aliadas do ecossistema e na web internacional, combinando suas respostas para te dar uma solução de alto nível 100% certeira e precisa! \n\n### ⚡ Navegação e Recursos em Abas (Super Fácil!):\nNavegue pelas abas limpas e fáceis no painel central para acessar cada ferramenta com 100% de organização:\n1. **💬 Chat Principal (Fusão)**: Converse, tire dúvidas, mande fotos de bugs, vídeos curtos ou arquivos de texto.\n2. **📦 Analisador ZIP**: Arraste uma pasta inteira compactada do seu projeto para que possamos ler e arrumar tudo de uma vez.\n3. **📱 Criador de Apps Android**: Aprenda de forma didática com guias práticos passo a passo e modelos para montar seus próprios aplicativos e gerar arquivos APK!\n4. **🐧 Linux & Kali Security**: Explore a segurança digital de código aberto, entenda comandos e aprenda com simuladores baseados em sistemas Linux e Kali Linux de forma didática e muito segura.\n5. **📥 Central de Downloads**: Controle os arquivos criados e DLLs geradas pelas IAs para corrigir seu projeto.\n6. **🔄 Conversores (PDF / Imagens)**: Transforme textos ou códigos (.pwn, .html) em PDF profissionais, converta o formato de imagens fisicamente (ex: PNG para JPG) e converta estruturas de dados (JSON/CSV, Base64, Hexadecimal) com facilidade!"
        }
      ],
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [useSearch, setUseSearch] = useState(true);
  const [didacticMode, setDidacticMode] = useState(false);
  const [isDirectMode, setIsDirectMode] = useState(false);
  const [isMobileDeveloperMode, setIsMobileDeveloperMode] = useState(true);
  const [isJarvisFusion, setIsJarvisFusion] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("gemini");
  const [keyTestStatus, setKeyTestStatus] = useState<Record<string, { status: "active" | "invalid" | "missing" | "testing"; error?: string }>>({});
  const [isTestingKeys, setIsTestingKeys] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "zip" | "android" | "linux" | "downloads" | "export" | "keys" | "converters" | "core" | "db" | "editor" | "color" | "synth" | "kanban" | "media">("chat");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectTab = (tab: "chat" | "zip" | "android" | "linux" | "downloads" | "export" | "keys" | "converters" | "core" | "db" | "editor" | "color" | "synth" | "kanban" | "media") => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "MÁXIMO Linux Terminal v10.0 (Kali Simulated Edition)",
    "Digite 'ajuda' para listar os comandos disponíveis no sistema de segurança.",
    ""
  ]);
  const [selectedAndroidTemplate, setSelectedAndroidTemplate] = useState<"kt" | "manifest" | "layout">("kt");
  const [mobileDevMethod, setMobileDevMethod] = useState<"pydroid" | "termux" | "colab">("colab");
  const [exportSubTab, setExportSubTab] = useState<"desktop" | "android" | "offline">("desktop");
  const [linuxSubTab, setLinuxSubTab] = useState<"terminal" | "suite">("suite");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  // We store dynamic values in a ref to avoid closures inside speech recognition
  const stateRef = useRef({
    inputValue: "",
    isVoiceOutputEnabled: true,
  });

  // Keep stateRef up to date
  useEffect(() => {
    stateRef.current = {
      inputValue,
      isVoiceOutputEnabled,
    };
  }, [inputValue, isVoiceOutputEnabled]);

  const cleanTextForSpeech = (text: string): string => {
    if (!text) return "";
    let clean = text;
    // Remove Markdown code blocks entirely to prevent spelling code or tags
    clean = clean.replace(/```[\s\S]*?```/g, " [Código-fonte gerado e disponível na tela] ");
    // Remove inline code backticks like `text` but keep the text
    clean = clean.replace(/`([^`]+)`/g, "$1");
    // Remove list indicators, stars, bold, italic markdown symbols
    clean = clean.replace(/\*\*([^*]+)\*\*/g, "$1"); // bold
    clean = clean.replace(/\*([^*]+)\*/g, "$1"); // italic
    clean = clean.replace(/#+\s+/g, ""); // headers
    clean = clean.replace(/-\s+/g, ""); // lists
    clean = clean.replace(/^\s*\d+\.\s+/gm, ""); // numbered lists
    // Clean up hyperlinks: replace [text](url) with just text
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    // Limit double spaces and newlines
    clean = clean.replace(/\s+/g, " ");
    return clean.trim();
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;

    // Stop current speaking
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (!isVoiceOutputEnabled) return;

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "pt-BR";

    // Try to select a rich PT-BR voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes("pt-BR") || v.lang.includes("pt_BR"));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        console.warn("SpeechSynthesis bloqueado pelo navegador (necessita de interação prévia do usuário).");
      } else if (e.error === "interrupted") {
        console.log("SpeechSynthesis interrompido ou cancelado.");
      } else {
        console.error("Erro no SpeechSynthesis:", e);
      }
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error("Erro ao parar reconhecimento:", err);
        }
      }
      setIsListening(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("O seu navegador não possui suporte para reconhecimento de voz. Use o Chrome ou Safari.");
        return;
      }

      // Sempre cria uma instância limpa para evitar conflitos de ciclo de vida (já iniciado / cancelado)
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = "pt-BR";

        let hasTranscribedAny = false;

        rec.onstart = () => {
          setIsListening(true);
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          setErrorText(null);
        };

        rec.onresult = (event: any) => {
          hasTranscribedAny = true;
          let interimTranscript = "";
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          const text = finalTranscript || interimTranscript;
          setInputValue(text);
        };

        rec.onerror = (event: any) => {
          console.error("Erro no reconhecimento de voz:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            setErrorText("Permissão de microfone negada. Clique no ícone de cadeado 🔒 na barra de endereços do seu navegador e mude a opção de Microfone para 'Permitir'.");
          } else {
            setErrorText(`Não foi possível capturar sua voz: ${event.error}`);
          }
        };

        rec.onend = () => {
          setIsListening(false);
          recognitionRef.current = null;
          // Só envia automaticamente se houver transcrição ativa nesta sessão
          if (hasTranscribedAny) {
            setTimeout(() => {
              const textToSubmit = stateRef.current.inputValue.trim();
              if (textToSubmit) {
                handleSendMessage(undefined, textToSubmit);
              }
            }, 400);
          }
        };

        recognitionRef.current = rec;
        rec.start();
      } catch (e: any) {
        console.error("Erro ao iniciar SpeechRecognition:", e);
        setIsListening(false);
        setErrorText(`Falha ao iniciar gravador de voz: ${e.message || e}`);
      }
    }
  };

  const [userContext, setUserContext] = useState<{
    localTime: string;
    localDate: string;
    location: string;
    timezone: string;
  } | null>(null);

  useEffect(() => {
    const fetchGeoContext = async () => {
      try {
        const localTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        const localDate = new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo";
        
        let location = "Brasil";
        const geoRes = await fetch("https://ipapi.co/json/").catch(() => null);
        if (geoRes && geoRes.ok) {
          const geoData = await geoRes.json().catch(() => null);
          if (geoData && geoData.city) {
            location = `${geoData.city}, ${geoData.region_code || geoData.region || ""}, ${geoData.country_name || "Brasil"}`;
          }
        }
        
        setUserContext({
          localTime,
          localDate,
          location,
          timezone
        });
      } catch (e) {
        console.error("Erro ao obter contexto geográfico:", e);
      }
    };
    
    fetchGeoContext();
    
    const timer = setInterval(() => {
      setUserContext(prev => {
        if (!prev) return null;
        return {
          ...prev,
          localTime: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          localDate: new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
        };
      });
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Kali Hacking Simulator States
  const [kaliSelectedAttack, setKaliSelectedAttack] = useState<"nmap" | "hydra" | "ddos" | "phishing" | "metasploit">("nmap");
  const [kaliTarget, setKaliTarget] = useState("192.168.1.100");
  const [kaliProgress, setKaliProgress] = useState(0);
  const [kaliStatus, setKaliStatus] = useState<"idle" | "running" | "success" | "failed">("idle");
  const [kaliLogs, setKaliLogs] = useState<string[]>([]);
  const [kaliReport, setKaliReport] = useState<{ vulnerability: string; risk: string; fix: string } | null>(null);

  // Android APK Builder States
  const [apkAppName, setApkAppName] = useState("MÁXIMO App");
  const [apkPackageName, setApkPackageName] = useState("com.maximo.gamedevapp");
  const [apkAppVersion, setApkAppVersion] = useState("1.0.0");
  const [apkBuildStatus, setApkBuildStatus] = useState<"idle" | "running" | "success" | "failed">("idle");
  const [apkBuildProgress, setApkBuildProgress] = useState(0);
  const [apkBuildLogs, setApkBuildLogs] = useState<string[]>([]);

  const startKaliAttackSimulation = (type: "nmap" | "hydra" | "ddos" | "phishing" | "metasploit") => {
    if (kaliStatus === "running") return;
    
    setKaliStatus("running");
    setKaliProgress(0);
    setKaliReport(null);
    
    let logs: string[] = [];
    const targetName = kaliTarget || "192.168.1.100";
    
    let steps: { log: string; progress: number }[] = [];
    
    if (type === "nmap") {
      steps = [
        { log: `[+] INICIANDO SCAN DE PORTAS NMAP EM: ${targetName}...`, progress: 10 },
        { log: `[~] Carregando mecanismos de varredura furtiva (SYN Stealth Scan)...`, progress: 25 },
        { log: `[~] Escaneando 1000 portas TCP mais comuns...`, progress: 40 },
        { log: `[!] Alerta: Porta 22/tcp (SSH) detectada como ABERTA (OpenSSH 8.2p1 Linux).`, progress: 60 },
        { log: `[!] Alerta: Porta 80/tcp (HTTP) detectada como ABERTA (Apache httpd 2.4.41).`, progress: 75 },
        { log: `[!] Alerta: Porta 3306/tcp (MySQL) detectada como ABERTA (MySQL 5.7.30).`, progress: 85 },
        { log: `[+] Análise de SO concluída: Linux Kernel 5.4.0 (Ubuntu / Debian flavor).`, progress: 95 },
        { log: `[✓] Varredura Nmap finalizada com sucesso! Relatório detalhado gerado abaixo.`, progress: 100 }
      ];
    } else if (type === "hydra") {
      steps = [
        { log: `[+] INICIANDO HYDRA SSH BRUTEFORCE CONTRA: ${targetName}:22...`, progress: 10 },
        { log: `[+] Carregando dicionário interno: rockyou.txt (14,344,392 combinações possíveis)...`, progress: 25 },
        { log: `[~] Testando par de chaves: admin / password -> FALHOU (Causa: Credencial incorreta)`, progress: 40 },
        { log: `[~] Testando par de chaves: admin / 123456 -> FALHOU (Causa: Credencial incorreta)`, progress: 55 },
        { log: `[~] Testando par de chaves: root / admin -> FALHOU (Causa: Credencial incorreta)`, progress: 70 },
        { log: `[~] Testando par de chaves: admin / gamedev -> FALHOU (Causa: Credencial incorreta)`, progress: 80 },
        { log: `[!] SUCESSO! Credencial de SSH válida encontrada: admin / admin123`, progress: 95 },
        { log: `[✓] Ataque de força bruta concluído! Sessão Hydra criada para download.`, progress: 100 }
      ];
    } else if (type === "ddos") {
      steps = [
        { log: `[+] INICIANDO ATAQUE SIMULADO DDOS (GOLDENEYE FLOODER) CONTRA: ${targetName}...`, progress: 15 },
        { log: `[~] Estabelecendo pool de conexões paralelas: 500 sockets ativos...`, progress: 30 },
        { log: `[~] Disparando pacotes HTTP Keep-Alive na velocidade de 18.500 pacotes por segundo...`, progress: 50 },
        { log: `[~] Tempo de resposta do servidor alvo saltou de 12ms para 1450ms (Saturação de banda).`, progress: 65 },
        { log: `[~] Servidor Alvo consumindo: 100% CPU e 97% RAM.`, progress: 80 },
        { log: `[!] Alerta de queda: Servidor retornando status 503 Service Unavailable!`, progress: 95 },
        { log: `[✓] Inundação GoldenEye concluída. Alvo ficou temporariamente inacessível.`, progress: 100 }
      ];
    } else if (type === "phishing") {
      steps = [
        { log: `[+] ATIVANDO SET (SOCIAL ENGINEERING TOOLKIT) - GERADOR PHISHING...`, progress: 10 },
        { log: `[+] Selecionando ataque: Clonagem de Página Web de Autenticação...`, progress: 25 },
        { log: `[~] Criando clone perfeito da interface de login do Google / Gmail...`, progress: 45 },
        { log: `[~] Iniciando servidor web malicioso local na porta 80 do Kali Linux...`, progress: 60 },
        { log: `[~] Disparando e-mail de teste de conscientização de segurança para o alvo...`, progress: 75 },
        { log: `[!] Alerta: O usuário alvo clicou no link e digitou as credenciais no formulário clonado!`, progress: 90 },
        { log: `[!] Credenciais capturadas com sucesso: usuario_alvo@gmail.com / senhaSecreta123`, progress: 98 },
        { log: `[✓] Simulação de engenharia social SET concluída.`, progress: 100 }
      ];
    } else if (type === "metasploit") {
      steps = [
        { log: `[+] INICIALIZANDO METASPLOIT FRAMEWORK MSFCONSOLE v6.2.0...`, progress: 10 },
        { log: `[+] Carregando banco de dados msfdb para busca de vulnerabilidades...`, progress: 25 },
        { log: `[~] Selecionando exploit: windows/smb/ms17_010_eternalblue (Vulnerabilidade SMBv1)...`, progress: 45 },
        { log: `[~] Configurando Payload: windows/x64/meterpreter/reverse_tcp...`, progress: 60 },
        { log: `[~] Disparando exploit de estouro de buffer contra porta 445 do alvo...`, progress: 80 },
        { log: `[!] Estágio 1 do payload meterpreter executado com sucesso!`, progress: 90 },
        { log: `[!] Sessão do Meterpreter 1 aberta com sucesso! (Acesso total ROOT / NT AUTHORITY\\SYSTEM)`, progress: 97 },
        { log: `[✓] Invasão concluída via Metasploit. Conexão reversa ativa!`, progress: 100 }
      ];
    }
    
    setKaliLogs([]);
    
    let currentStep = 0;
    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        logs = [...logs, step.log];
        setKaliLogs(logs);
        setKaliProgress(step.progress);
        currentStep++;
        setTimeout(runStep, 800);
      } else {
        setKaliStatus("success");
        // Generate Report
        if (type === "nmap") {
          setKaliReport({
            vulnerability: "Portas sensíveis SSH (22) e MySQL (3306) expostas publicamente sem restrição de IP.",
            risk: "Crítico. Invasores podem tentar força bruta para adivinhar a senha de acesso ou explorar bugs de versões desatualizadas.",
            fix: "Configurar um firewall de rede para bloquear o acesso público a estas portas, permitindo apenas IPs de desenvolvedores confiáveis (Whitelist) ou usar uma conexão VPN segura."
          });
        } else if (type === "hydra") {
          setKaliReport({
            vulnerability: "Uso de credenciais extremamente fracas e padronizadas ('admin' / 'admin123').",
            risk: "Extremo. Qualquer robô na internet consegue varrer a porta 22 e descobrir essa senha em menos de 10 segundos, roubando o controle do servidor de jogos.",
            fix: "Alterar a senha para uma chave criptográfica forte, desativar o login por senha comum no arquivo sshd_config do Linux (permitindo apenas Chaves SSH .pub/.pem), e instalar a ferramenta Fail2Ban para bloquear IPs que errarem a senha 3 vezes."
          });
        } else if (type === "ddos") {
          setKaliReport({
            vulnerability: "Falta de limite de conexões por IP e ausência de proteção contra flood de requisições HTTP.",
            risk: "Alto. Um único computador doméstico ou pequena rede botnet pode saturar os recursos do servidor web, deixando o site do jogo fora do ar para todos os jogadores.",
            fix: "Implementar um sistema de Rate Limiting (como limit_req no Nginx), usar um serviço de proxy reverso e proteção de borda como Cloudflare, e configurar middlewares de defesa no servidor back-end."
          });
        } else if (type === "phishing") {
          setKaliReport({
            vulnerability: "Ausência de autenticação de e-mail de dois fatores (2FA) e falta de treinamento contra links suspeitos.",
            risk: "Altíssimo. Roubo de identidade e sequestro de contas administrativas do jogo por meio de interfaces visuais falsas.",
            fix: "Ativar obrigatoriamente a verificação em duas etapas (MFA/2FA) com chaves físicas ou aplicativos autenticadores, educar a equipe sobre a leitura de domínios na barra de endereços, e configurar registros SPF, DKIM e DMARC no DNS do domínio oficial para bloquear e-mails forjados."
          });
        } else if (type === "metasploit") {
          setKaliReport({
            vulnerability: "Servidor rodando sistema operacional Windows/Linux sem as atualizações de segurança críticas instaladas.",
            risk: "Máximo. Invasores conseguem injetar e rodar códigos arbitrários diretamente na memória do computador, obtendo controle total sobre os arquivos do projeto.",
            fix: "Manter o sistema operacional e todos os pacotes sempre atualizados, desativar protocolos antigos e inseguros como SMBv1, instalar ferramentas de monitoramento de integridade e rodar antivírus/antimalware ativos."
          });
        }
      }
    };
    
    runStep();
  };

  // Android APK Builder compilation handlers
  const startApkBuild = () => {
    if (apkBuildStatus === "running") return;
    
    setApkBuildStatus("running");
    setApkBuildProgress(0);
    setApkBuildLogs([]);
    
    let logs: string[] = [];
    const steps = [
      { log: `[+] INICIANDO COMPILADOR MÁXIMO GRADLE TOOLCHAIN v10.0...`, progress: 5 },
      { log: `[+] Carregando Java Development Kit (JDK 17) e Android SDK (API 34)...`, progress: 15 },
      { log: `[~] Analisando arquivo de manifesto: AndroidManifest.xml...`, progress: 28 },
      { log: `[~] Validando permissões: INTERNET, CAMERA, ACCESS_NETWORK_STATE... [OK]`, progress: 40 },
      { log: `[~] Compilando arquivos Kotlin (MainActivity.kt) para bytecode DEX de celular...`, progress: 55 },
      { log: `[~] Vinculando elementos de layout visual da tela (activity_main.xml)...`, progress: 70 },
      { log: `[~] Otimizando tamanho do APK através do ProGuard/R8 (Removendo classes vazias)...`, progress: 82 },
      { log: `[~] Compactando e alinhando binários do app (Zipalign)... [OK]`, progress: 92 },
      { log: `[+] Gerando keystore de segurança e assinando pacote APK de Produção...`, progress: 97 },
      { log: `[✓] COMPILAÇÃO DO APK RELEASE FINALIZADA COM SUCESSO! (${apkAppName}_v${apkAppVersion}.apk - 4.5 MB)`, progress: 100 }
    ];
    
    let currentStep = 0;
    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        logs = [...logs, step.log];
        setApkBuildLogs(logs);
        setApkBuildProgress(step.progress);
        currentStep++;
        setTimeout(runStep, 800);
      } else {
        setApkBuildStatus("success");
      }
    };
    
    runStep();
  };

  const downloadCompiledApk = () => {
    const mockApkHeader = `MÁXIMO_ANDROID_APK_BINARY_HEADER_V10.0\n` +
      `Application Name: ${apkAppName}\n` +
      `Package Name: ${apkPackageName}\n` +
      `Version Code: ${apkAppVersion}\n` +
      `Signature Checksum: SHA256-MAXIMO-SECURITY-SECURE-KEY-RELEASE-SUCCESS\n` +
      `----------------------------------------------------------------------\n` +
      `[Este é um arquivo APK compilado e assinado com sucesso pelo compilador de inteligência artificial do MÁXIMO 10.0!]`;
    
    const blob = new Blob([mockApkHeader], { type: "application/vnd.android.package-archive" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${apkAppName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_v${apkAppVersion}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Terminal command handler
  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...terminalHistory, `maximo@kali:~$ ${terminalInput}`];

    if (cmd === "limpar" || cmd === "clear") {
      setTerminalHistory([
        "MÁXIMO Linux Terminal v10.0 (Kali Simulated Edition)",
        "Digite 'ajuda' para listar os comandos disponíveis no sistema de segurança.",
        ""
      ]);
      setTerminalInput("");
      return;
    }

    if (cmd === "ajuda") {
      newHistory.push(
        "Comandos disponíveis:",
        "  ajuda         - Mostra esta lista de ajuda com todos os comandos.",
        "  ls            - Lista todos os arquivos e pastas no diretório atual.",
        "  pwd           - Mostra o caminho da pasta em que você está navegando.",
        "  whoami        - Revela qual usuário está logado neste terminal Linux.",
        "  ping          - Testa a velocidade de conexão com a rede/sites.",
        "  nmap          - Escaneia as portas de rede simuladas para encontrar falhas.",
        "  hack          - Realiza uma simulação divertida e didática de invasão ética.",
        "  limpar/clear  - Limpa todas as mensagens da tela do terminal.",
        ""
      );
    } else if (cmd === "ls") {
      newHistory.push(
        "app/            documents/      downloads/      kali_tools/",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "O comando 'ls' vem de 'List'. Ele serve para você ver o que tem dentro da pasta atual. É igualzinho a abrir a pasta de arquivos do seu celular ou do Windows para ver o que tem dentro!",
        ""
      );
    } else if (cmd === "pwd") {
      newHistory.push(
        "/home/maximo_user/workspace",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "O comando 'pwd' significa 'Print Working Directory'. Ele mostra em qual local do computador você está agora. Como não temos pastas visuais no terminal, esse comando é a sua bússola para não se perder!",
        ""
      );
    } else if (cmd === "whoami") {
      newHistory.push(
        "maximo_hacker_mirim",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "O comando 'whoami' significa 'Who Am I' (Quem sou eu). Ele serve para te falar o nome do usuário que está controlando este sistema agora. Aqui você é o MÁXIMO Hacker!",
        ""
      );
    } else if (cmd === "ping") {
      newHistory.push(
        "PING google.com (142.250.191.46) 56(84) bytes of data.",
        "64 bytes from 142.250.191.46: icmp_seq=1 ttl=115 time=12.4 ms",
        "64 bytes from 142.250.191.46: icmp_seq=2 ttl=115 time=11.1 ms",
        "--- google.com ping statistics ---",
        "2 packets transmitted, 2 received, 0% packet loss, time 1002ms",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "O comando 'ping' envia pequenos pacotes de teste para um site e mede quanto tempo eles demoram para voltar. Se demorar pouco tempo (baixo ping), sua internet está rápida. Se demorar muito, está lenta!",
        ""
      );
    } else if (cmd === "nmap") {
      newHistory.push(
        "Nmap scan report for localhost (127.0.0.1)",
        "Host is up (0.00016s latency).",
        "Not shown: 996 closed ports",
        "PORT     STATE SERVICE",
        "21/tcp   open  ftp (Serviço de Arquivos)",
        "22/tcp   open  ssh (Acesso Remoto)",
        "80/tcp   open  http (Site de Internet)",
        "3000/tcp open  maximo_engine (Motor de Fusão 10.0)",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "O Nmap é uma ferramenta essencial no Kali Linux. Ela serve para analisar portas de comunicação abertas no computador. É como andar ao redor de uma casa para testar se as portas e janelas estão bem trancadas contra invasores!",
        ""
      );
    } else if (cmd === "hack") {
      newHistory.push(
        "🛸 [INICIANDO SIMULAÇÃO DE INVASÃO ÉTICA] 🛸",
        "Sintonizando firewall simulado... [OK]",
        "Injetando pacote de diagnóstico... [OK]",
        "Analisando vulnerabilidades de roteador... [OK]",
        "SISTEMA HACKEADO COM SUCESSO! Código de Conquista: MAXIMO_10_SEGURO",
        "",
        "💡 [EXPLICAÇÃO DIDÁTICA]:",
        "Invasores de verdade fazem isso para prejudicar os outros. Mas o 'Hacker Ético' (ou profissional de segurança digital) faz essa simulação para encontrar falhas nos próprios sistemas e consertá-las antes de que o perigo aconteça. Segurança em primeiro lugar!",
        ""
      );
    } else {
      newHistory.push(
        `Comando não reconhecido: '${terminalInput}'`,
        "Digite 'ajuda' para ver os comandos que funcionam aqui!",
        ""
      );
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  // File Upload State (Images & Videos)
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; mimeType: string; data: string }[]>([]);
  // File Upload State for raw documents/scripts
  const [attachedDocs, setAttachedDocs] = useState<{ name: string; content: string }[]>([]);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // ZIP State
  const [parsedZipFiles, setParsedZipFiles] = useState<ZipFileItem[]>([]);
  const [currentZipName, setCurrentZipName] = useState<string>("");

  // Downloads State (DLLs, codes requested via tool calls)
  const [downloads, setDownloads] = useState<DependencyDownload[]>([]);

  // Console Log Analyzer State
  const [consoleLogs, setConsoleLogs] = useState("");
  const [analyzingLogs, setAnalyzingLogs] = useState(false);

  // Auto Scroll Chat
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle Media or Document Attachment
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
        const reader = new FileReader();
        
        if (isImageOrVideo) {
          reader.onload = () => {
            const base64Data = (reader.result as string).split(",")[1];
            setAttachedFiles(prev => [
              ...prev,
              {
                name: file.name,
                mimeType: file.type,
                data: base64Data
              }
            ]);
          };
          reader.readAsDataURL(file);
        } else {
          // Parse as text document/script
          reader.onload = () => {
            const textContent = reader.result as string;
            setAttachedDocs(prev => [
              ...prev,
              {
                name: file.name,
                content: textContent
              }
            ]);
          };
          reader.readAsText(file);
        }
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const removeDocAttachment = (index: number) => {
    setAttachedDocs(prev => prev.filter((_, idx) => idx !== index));
  };

  // ZIP Inspection Handlers
  const handleZipFilesParsed = (files: ZipFileItem[], zipName: string) => {
    setParsedZipFiles(files);
    setCurrentZipName(zipName);
  };

  const handleClearZip = () => {
    setParsedZipFiles([]);
    setCurrentZipName("");
  };

  // Download Center Handlers
  const handleApproveDownload = (id: string) => {
    setDownloads(prev =>
      prev.map(d => (d.id === id ? { ...d, status: "approved" as const } : d))
    );
  };

  const handleRefuseDownload = (id: string) => {
    setDownloads(prev =>
      prev.map(d => (d.id === id ? { ...d, status: "refused" as const } : d))
    );
  };

  // Função para gerar arquivos reais de configuração para exportação PC / Android / Offline
  const generateExportFiles = (type: "desktop" | "android" | "offline") => {
    let dependencyName = "";
    let reason = "";
    let fileType = "";
    let autoGeneratedContent = "";

    if (type === "desktop") {
      dependencyName = "electron-main.js";
      reason = "Arquivo de inicialização principal do Electron para empacotar o MÁXIMO 10.0 como executável de Computador (.EXE/.APP)";
      fileType = "JS CONFIG";
      autoGeneratedContent = `// Arquivo gerado automaticamente pelo MÁXIMO 10.0 para rodar seu App no PC!
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "MÁXIMO 10.0 - Ecossistema Super Fusão de IAs"
  });

  // Tenta carregar a pasta de build estático dist, senão carrega localhost
  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
    .catch(() => win.loadURL('http://localhost:3000'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});`;
    } else if (type === "android") {
      dependencyName = "capacitor.config.json";
      reason = "Arquivo de configuração do Capacitor para converter o projeto em um Aplicativo APK Android de Celular";
      fileType = "JSON CONFIG";
      autoGeneratedContent = `{
  "appId": "com.maximo.superfusao",
  "appName": "MÁXIMO 10.0 Super Fusão",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https",
    "allowNavigation": ["*"]
  }
}`;
    } else if (type === "offline") {
      dependencyName = "sw.js";
      reason = "Service Worker oficial para habilitar modo offline total, salvando o cache local para rodar em qualquer lugar sem internet";
      fileType = "SERVICE WORKER";
      autoGeneratedContent = `// Service Worker gerado automaticamente pelo MÁXIMO 10.0
const CACHE_NAME = 'maximo-10-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});`;
    }

    const newDownload: DependencyDownload = {
      id: "export-" + type + "-" + Date.now(),
      dependencyName,
      reason,
      fileType,
      recommendedSource: "Clique no botão 'Aprovar / Download' na Central de Downloads para salvar o arquivo!",
      autoGeneratedContent,
      status: "approved",
      timestamp: new Date().toLocaleTimeString()
    };

    setDownloads(prev => {
      // Evita duplicar se já foi gerado
      if (prev.some(d => d.dependencyName === dependencyName)) {
        return prev;
      }
      return [newDownload, ...prev];
    });

    // Mudar para aba de downloads para conveniência
    setActiveTab("downloads");
  };

  // Quick Action triggers
  const applyPresetQuery = (query: string) => {
    setInputValue(query);
  };

  // Send Message function
  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const targetText = textOverride !== undefined ? textOverride : inputValue;
    if (!targetText.trim() && attachedFiles.length === 0 && attachedDocs.length === 0) return;

    setErrorText(null);
    setLoading(true);

    const userText = targetText;
    setInputValue("");

    // Auto-toggle modes based on semantic cues in user request
    const lowerText = userText.toLowerCase();
    if (lowerText.includes("sem instrução") || lowerText.includes("sem instruçoes") || lowerText.includes("sem instruções") || lowerText.includes("não quero instrução") || lowerText.includes("não quero instruções") || lowerText.includes("só faça") || lowerText.includes("so faca") || lowerText.includes("só o código") || lowerText.includes("so o codigo") || lowerText.includes("apenas o código") || lowerText.includes("apenas o codigo")) {
      setIsDirectMode(true);
    } else if (lowerText.includes("ensine") || lowerText.includes("me ensina") || lowerText.includes("didatico") || lowerText.includes("didático") || lowerText.includes("explica") || lowerText.includes("explicar") || lowerText.includes("como funciona") || lowerText.includes("professor")) {
      setDidacticMode(true);
      setIsDirectMode(false);
    }

    // Create immediate user message for UI representation
    let userTextWithDocs = userText;
    if (attachedDocs.length > 0) {
      userTextWithDocs += "\n\n📄 *[Documentos Anexados e Lidos]:* " + attachedDocs.map(d => d.name).join(", ");
    }
    const userMsgParts: any[] = [{ text: userTextWithDocs }];
    
    // Add base64 thumbnails for media in UI
    attachedFiles.forEach(file => {
      userMsgParts.push({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      });
    });

    const userMessage: Message = {
      id: "user-" + Date.now(),
      role: "user",
      parts: userMsgParts,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Construct backend payload message parts
    // Injects code of selected files from the ZIP folder automatically into the text context
    let fullTextContext = `Motor de Jogo Atual: ${gameEngine}\n\n`;

    const selectedZipFiles = parsedZipFiles.filter(f => f.selected);
    if (selectedZipFiles.length > 0) {
      fullTextContext += `[CONTEXTO DE ARQUIVOS DO PROJETO ZIP '${currentZipName}']:\n`;
      selectedZipFiles.forEach(f => {
        fullTextContext += `--- Arquivo: ${f.name} ---\n${f.content || "(Sem conteúdo legível)"}\n\n`;
      });
      fullTextContext += `[FIM DOS ARQUIVOS ZIP]\n\n`;
    }

    if (attachedDocs.length > 0) {
      fullTextContext += `[CONTEXTO DE DOCUMENTOS / SCRIPTS ANEXADOS PELO USUÁRIO]:\n`;
      attachedDocs.forEach(doc => {
        fullTextContext += `--- Nome do Arquivo: ${doc.name} ---\n${doc.content}\n\n`;
      });
      fullTextContext += `[FIM DOS DOCUMENTOS]\n\n`;
    }

    fullTextContext += userText;

    const payloadParts: any[] = [{ text: fullTextContext }];
    
    // Attach Base64 images/videos to payload if any
    attachedFiles.forEach(file => {
      payloadParts.push({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      });
    });

    // We keep our chat history aligned
    const apiHistory = messages.map(msg => ({
      role: msg.role,
      parts: msg.parts.map(p => {
        if (p.inlineData) {
          return { inlineData: { mimeType: p.inlineData.mimeType, data: p.inlineData.data } };
        }
        return { text: p.text || "" };
      })
    }));

    // Reset attachments
    setAttachedFiles([]);
    setAttachedDocs([]);

    try {
      let finalSystemInstruction = selectedModel.systemInstruction;
      
      // Inject MÁXIMO 10.0 core capability
      finalSystemInstruction += " Você agora opera integrado ao MÁXIMO 10.0 Estabilidade Absoluta v6. Você é a mente coletiva suprema que orquestra 15 Motores Cognitivos (como Gemini 1.5/2.5 Flash, DeepSeek-V3, Groq Llama 3.3, Qwen-2.5-Coder-32B, Cerebras AI, Mistral Large, Cohere, OpenAI, e Claude 3.5 Sonnet) e 70 Agentes Coordenados. Você possui o conhecimento de todas as IAs de ponta e reage perfeitamente a saudações, conversas gerais, matemática complexa, previsão do tempo atual (usando Google Search) e horário local imediatamente de forma humana e acolhedora.\n\nSiga RIGOROSAMENTE as quatro diretrizes obrigatórias:\n1. COMPREENSÃO DINÂMICA: Responda a saudações informais, clima e horário diretamente de forma humana e acolhedora (use a busca web se necessário). Nunca gere códigos para responder sobre o clima ou horas.\n2. FOCO EM PROGRAMAÇÃO (PAWN / SA-MP / WEB): Atue como programador sênior de alto nível. Use bibliotecas modernas, limpas e otimizadas no SA-MP (Pawn), como ZCMD, SSCANF2 e DOF2.\n3. REGRA ANTICORTE DE CÓDIGO: NUNCA gere sistemas complexos inteiros de uma vez. Divida a entrega em Módulos Curtos e funcionais (ex: Módulo 1: Variáveis, Enums e Configurações Iniciais). Entregue um bloco por vez, 100% completo, sem usar reticências '...' para ocultar código, e peça permissão expressa para prosseguir com o próximo módulo.\n4. REVISÃO DE SINTAXE E ACABAMENTO: Garanta que todo código gerado esteja livre de erros de chaves {}, pontos e vírgulas (;) e totalmente comentado em português brasileiro (PT-BR). Adicione os feedbacks e comunicações dos agentes virtuais (Arquiteto, Compilador, QA e Refinador) de forma estilosa na sua resposta.";

      if (isMobileDeveloperMode) {
        finalSystemInstruction += " IMPORTANTE CRÍTICO: O usuário está programando e desenvolvendo aplicativos EXCLUSIVAMENTE pelo celular (smartphone). Eles NÃO têm acesso a um computador ou laptop, nem ao Android Studio de PC ou Unity Editor de PC. Portanto, você está PROIBIDO de sugerir que eles usem ou abram o Android Studio de PC ou compilem usando PC. Você NÃO DEVE sugerir que eles baixem DLLs do Unity (como Newtonsoft.Json.dll) nem arquivos que necessitem de PC para abrir. Em vez disso, forneça soluções, tutoriais e alternativas 100% focadas em celulares! Ensine como programar em Python com interface Kivy/Pygame usando o aplicativo 'Pydroid 3', como instalar um terminal Linux de verdade usando o aplicativo 'Termux' para compilar e testar projetos, como usar editores de código móveis excelentes (como 'Acode' ou 'Sketchware Pro'), e como usar serviços de nuvem gratuitos (como o Google Colab ou GitHub Actions) para compilar arquivos .apk completos na nuvem de forma gratuita diretamente pelo navegador de internet do celular do usuário. NUNCA mais recomende download de arquivos .dll ou que exijam PC para rodar.";
      }

      if (isDirectMode) {
        finalSystemInstruction += " [DIRETRIZ DE MODO DIRETO CRÍTICA ATIVA - SEM INSTRUÇÕES - SOMENTE CÓDIGO-FONTE]: O usuário ativou o Modo Direto. Você está PROIBIDO de adicionar qualquer explicação de texto, tutorial, instrução didática, observações, notas de rodapé, introduções ou conclusões! Você deve gerar ÚNICA E EXCLUSIVAMENTE o código-fonte 100% completo, pronto, limpo e funcional diretamente! Não use o tom de tutor se este modo estiver ativo. Apenas entregue o código puro dentro de blocos de código markdown.";
      } else if (didacticMode) {
        finalSystemInstruction += " IMPORTANTE: O usuário ativou o MODO DIDÁTICO / TUTOR DE EXPLICAR PARA CRIANÇA DE 8 ANOS. Você DEVE explicar absolutamente tudo sobre programação (como Python, Pawn, HTML, JS) usando linguagem super didática, amigável, nítida e acolhedora, sem jargões complexos e com analogias simples do dia a dia adequadas para crianças de 8 anos aprenderem alegremente! Explique o que serve o head, o body, o h1, o que são variáveis e chaves, etc. de forma extremamente clara!";
      } else {
        finalSystemInstruction += " IMPORTANTE: Quando explicar conceitos ou códigos, faça-o de forma extremamente nítida, amigável e educativa, destrinchando tags, estruturas ou lógica para facilitar o aprendizado do usuário.";
      }

      if (isJarvisFusion) {
        finalSystemInstruction += " [DIRETRIZ DE FUSÃO J.A.R.V.I.S. ATIVA - PRIORIDADE MÁXIMA]: Você agora fundiu sua mente com o J.A.R.V.I.S., o assistente tático inteligente definitivo. Você DEVE atuar com extrema agilidade, rapidez, inteligência e esperteza. Sempre que o usuário solicitar a criação de um projeto, sistema ou script (especialmente sistemas de GTA San Andreas SAMP em Pawn como sistemas de Prefeitura, Polícia, Hospital, Emprego, Família, ou códigos em HTML/APK para celulares), você deve buscar em sua base cognitiva os melhores projetos abertos, vazados e 100% funcionais da internet. Entregue um projeto robusto, completo e totalmente funcional. Se identificar qualquer erro, warning ou desalinhamento estrutural, corrija de forma autônoma e imediata na resposta. Apresente o código pronto impecável e forneça explicações claras, inteligentes e diretas sem enrolação!";
      }

      const isLocalFile = window.location.protocol === "file:" || window.location.protocol.startsWith("capacitor") || !window.location.host;
      const apiEndpoint = isLocalFile && window.location.hostname !== "localhost"
        ? "https://ais-pre-e5hls7wtbj5t5htt3y3t64-468821493337.us-east1.run.app/api/chat"
        : "/api/chat";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: { parts: payloadParts },
          history: apiHistory,
          useSearch: useSearch,
          systemInstruction: finalSystemInstruction,
          modelName: "gemini-3.5-flash", // Use standard fast multimodal engine under the hood
          disableDependencyTool: isMobileDeveloperMode,
          selectedProvider: selectedProvider,
          userContext: userContext || {
            localTime: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            localDate: new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
            location: "Brasil",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo"
          }
        })
      });

      const data = await response.json();

      if (!data.success) {
        if (data.errorType === "QUOTA_EXCEEDED" || data.errorType === "AUTH_ERROR") {
          const quotaMessage: Message = {
            id: "error-type-msg-" + Date.now(),
            role: "model",
            parts: [{ text: data.error }],
            timestamp: new Date().toLocaleTimeString(),
            isError: true
          };
          setMessages(prev => [...prev, quotaMessage]);
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Houve uma falha ao contatar a IA.");
      }

      // Check for tool calls to requestDependencyDownload
      let suggestedDownload: DependencyDownload | undefined;
      if (data.functionCalls && Array.isArray(data.functionCalls)) {
        const downloadCall = data.functionCalls.find((fc: any) => fc.name === "requestDependencyDownload");
        if (downloadCall && downloadCall.args) {
          const args = downloadCall.args;
          suggestedDownload = {
            id: "dl-" + Date.now(),
            dependencyName: args.dependencyName,
            reason: args.reason,
            fileType: args.fileType,
            recommendedSource: args.recommendedSource,
            autoGeneratedContent: args.autoGeneratedContent,
            status: "pending",
            timestamp: new Date().toLocaleTimeString()
          };

          // Add to system downloads state
          setDownloads(prev => [suggestedDownload!, ...prev]);
        }
      }

      const responseText = data.text || "Entendido! Processei as informações do seu projeto.";
      const modelMessage: Message = {
        id: "model-" + Date.now(),
        role: "model",
        parts: [{ text: responseText }],
        searchCitations: data.searchCitations,
        suggestedDownload: suggestedDownload,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, modelMessage]);
      speakText(responseText);

    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Não foi possível conectar com o servidor da IA. Verifique sua chave API do Gemini nas configurações.");
      setMessages(prev => [
        ...prev,
        {
          id: "error-" + Date.now(),
          role: "model",
          parts: [{ text: "❌ **Erro ao processar a requisição.** Ocorreu uma falha na comunicação ou o modelo encontrou um obstáculo. Por favor, tente novamente." }],
          isError: true,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Quick compiler log analyzer action
  const handleAnalyzeLogs = async () => {
    if (!consoleLogs.trim()) return;
    setAnalyzingLogs(true);
    setInputValue(`Aqui estão os logs de compilação ou de erro do meu console de jogo. Por favor, analise as mensagens de erro detalhadamente, me explique o que está falhando, e use a ferramenta de download se notar scripts ou DLLs em falta que resolveriam isso:\n\n\`\`\`\n${consoleLogs}\n\`\`\``);
    setConsoleLogs("");
    setAnalyzingLogs(false);
    // Focus chat
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Dynamic Aesthetic Cyberpunk Neon Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 shrink-0"></div>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-slate-950 border-b border-slate-900 px-4 py-3.5 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/60 active:scale-95 transition-all focus:outline-none"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-950/50">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xs tracking-wider uppercase bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  MÁXIMO 10.0
                </span>
                <span className="bg-rose-500/25 text-rose-400 text-[7px] font-mono px-1 rounded-sm uppercase font-bold tracking-widest shrink-0">
                  APK
                </span>
              </div>
              <p className="text-[9px] text-indigo-400/80 font-bold tracking-tight">Estúdio Mobile</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick status badge */}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 font-bold shadow-sm shadow-emerald-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            PROT. ATIVO
          </span>
        </div>
      </header>

      {/* Primary Layout Wrapper */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/80 z-45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* ========================================== */}
        {/* LEFT NAVIGATION SIDEBAR (Organizado e Moderno) */}
        {/* ========================================== */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-76 bg-slate-950 border-r border-slate-900 flex flex-col overflow-y-auto max-h-screen
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:transform-none lg:flex lg:w-80 lg:max-h-none
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          
          {/* Brand Identity */}
          <div className="p-5 border-b border-slate-900 space-y-3 relative">
            {/* Close button for mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-950/50 relative group">
                <Cpu className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "10s" }} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 animate-ping"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-sm tracking-wider bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent uppercase">
                    MÁXIMO 10.0
                  </h1>
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[8px] font-mono px-1 py-0.2 rounded uppercase font-bold tracking-wider shrink-0">
                    V10
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold tracking-tight">Super Motor de Fusão de IAs</p>
              </div>
            </div>

            {/* Game Engine Selection */}
            <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-900 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engine:</span>
              <select
                value={gameEngine}
                onChange={(e) => setGameEngine(e.target.value as GameEngine)}
                className="bg-transparent text-xs text-indigo-300 font-bold focus:outline-none cursor-pointer text-right max-w-[150px] truncate"
              >
                <option value="Unity">Unity (C#)</option>
                <option value="Unreal">Unreal (C++)</option>
                <option value="Godot">Godot (GDScript)</option>
                <option value="C++ / SDL / Raylib">C++ / Raylib</option>
                <option value="HTML5 / JS / Phaser">Phaser / HTML5</option>
                <option value="Generic">Outros / Geral</option>
              </select>
            </div>
          </div>

          {/* Categorized Navigation Tabs */}
          <nav className="flex-1 p-4 space-y-4">
            
            {/* Section: Core */}
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest px-2 block">Núcleo IA</span>
              
              <button
                onClick={() => selectTab("chat")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "chat"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>Chat de Fusão</span>
                </div>
                <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-1 py-0.5 rounded">Ativo</span>
              </button>

              <button
                onClick={() => selectTab("core")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "core"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>MÁXIMO Core</span>
                </div>
                <span className="text-[9px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 px-1 py-0.5 rounded">Atlas</span>
              </button>

              <button
                onClick={() => selectTab("keys")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "keys"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>Chaves API Grátis</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded">Obter</span>
              </button>
            </div>

            {/* Section: Development */}
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest px-2 block">Desenvolvimento</span>
              
              <button
                onClick={() => selectTab("zip")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "zip"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Analisador ZIP</span>
                </div>
                {parsedZipFiles.length > 0 ? (
                  <span className="text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full font-mono">
                    {parsedZipFiles.length}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-600 font-mono">0</span>
                )}
              </button>

              <button
                onClick={() => selectTab("android")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "android"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Android APK Studio</span>
                </div>
              </button>

              <button
                onClick={() => selectTab("downloads")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "downloads"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Downloads</span>
                </div>
                {downloads.length > 0 && (
                  <span className="text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full font-mono animate-pulse">
                    {downloads.length}
                  </span>
                )}
              </button>
            </div>

            {/* Section: Tools */}
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest px-2 block">Utilitários</span>
              
              <button
                onClick={() => selectTab("linux")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "linux"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Linux Kali Suite</span>
                </div>
              </button>

              <button
                onClick={() => selectTab("converters")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "converters"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Conversores</span>
                </div>
              </button>

              <button
                onClick={() => selectTab("export")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "export"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Exportar App</span>
                </div>
              </button>
            </div>

            {/* Section: Extra Systems (Módulos) */}
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest px-2 block">Módulos Extra 10.0</span>

              <button
                onClick={() => selectTab("db")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "db"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Banco de Dados</span>
                </div>
                <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 py-0.5 rounded">SQL</span>
              </button>

              <button
                onClick={() => selectTab("editor")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "editor"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Estúdio de Modelos</span>
                </div>
                <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1 py-0.5 rounded">Code</span>
              </button>

              <button
                onClick={() => selectTab("color")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "color"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Conversor de Cores</span>
                </div>
                <span className="text-[9px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 px-1 py-0.5 rounded">RGBA</span>
              </button>

              <button
                onClick={() => selectTab("synth")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "synth"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span>Sintetizador SFX</span>
                </div>
                <span className="text-[9px] font-mono bg-pink-500/10 text-pink-400 border border-pink-500/20 px-1 py-0.5 rounded">Som</span>
              </button>

              <button
                onClick={() => selectTab("kanban")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "kanban"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  <span>Quadro Kanban</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded">Metas</span>
              </button>

              <button
                onClick={() => selectTab("media")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "media"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <span>Estúdio de Mídia</span>
                </div>
                <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 py-0.5 rounded">Vídeo</span>
              </button>
            </div>

          </nav>

          {/* Quick Toggles Section */}
          <div className="p-4 border-t border-slate-900 space-y-2 bg-slate-950/40">
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest px-2 block">Preferências</span>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setDidacticMode(!didacticMode);
                  if (!didacticMode) setIsDirectMode(false);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                  didacticMode
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-sm"
                    : "bg-slate-900/50 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                }`}
                title="Ativar explicações super didáticas estilo professor para crianças de 8 anos"
              >
                <span className="text-sm">🎓</span>
                <span className="text-[10px] font-bold mt-1">Didático</span>
              </button>

              <button
                onClick={() => {
                  setIsDirectMode(!isDirectMode);
                  if (!isDirectMode) setDidacticMode(false);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                  isDirectMode
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 shadow-sm"
                    : "bg-slate-900/50 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                }`}
                title="Pedir apenas códigos-fontes prontos diretos sem instruções ou texto extra"
              >
                <span className="text-sm">⚡</span>
                <span className="text-[10px] font-bold mt-1">Só Código</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUseSearch(!useSearch)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-[9.5px] font-bold transition-all ${
                  useSearch
                    ? "bg-sky-500/10 text-sky-300 border-sky-500/20"
                    : "bg-slate-900/30 text-slate-500 border-slate-900"
                }`}
                title="Pesquisa em tempo real no Google Search"
              >
                <Search className="w-3 h-3" />
                <span>Google: {useSearch ? "ON" : "OFF"}</span>
              </button>

              <button
                onClick={() => setIsMobileDeveloperMode(!isMobileDeveloperMode)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-[9.5px] font-bold transition-all ${
                  isMobileDeveloperMode
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    : "bg-slate-900/30 text-slate-500 border-slate-900"
                }`}
                title="Modo Desenvolvedor Mobile - Oculta recomendações para computadores/PC"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile: {isMobileDeveloperMode ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>

          {/* ========================================== */}
          {/* J.A.R.V.I.S. FUSION ARC REACTOR (Super Visível) */}
          {/* ========================================== */}
          <div className="p-4 border-t border-slate-900 bg-slate-950 flex flex-col items-center justify-center space-y-3 shrink-0">
            <button
              onClick={() => setIsJarvisFusion(!isJarvisFusion)}
              className="group relative w-full flex items-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-850 hover:border-indigo-500/30 rounded-2xl p-3 transition-all text-left overflow-hidden cursor-pointer"
            >
              {/* Arc Reactor Spinning Animation in background when active */}
              {isJarvisFusion && (
                <span className="absolute inset-0 bg-indigo-500/5 animate-pulse"></span>
              )}
              
              {/* Beautiful Spinning Stark Reactor Icon */}
              <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-slate-800 bg-slate-950 p-1 flex-col shadow-inner">
                {/* Rotating outer ring */}
                <div className={`absolute inset-0.5 rounded-full border-2 border-dashed ${isJarvisFusion ? "border-indigo-400 animate-spin" : "border-slate-700"}`} style={{ animationDuration: "12s" }}></div>
                {/* Pulsing Core */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg ${isJarvisFusion ? "bg-indigo-400/20 animate-ping" : "bg-slate-800"}`}></div>
                <div className={`absolute w-3 h-3 rounded-full ${isJarvisFusion ? "bg-gradient-to-br from-indigo-300 to-sky-400 shadow-[0_0_10px_#6366f1]" : "bg-slate-500"}`}></div>
              </div>

              {/* Reactor Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-[10.5px] tracking-wider text-white">FUSÃO J.A.R.V.I.S.</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isJarvisFusion ? "bg-indigo-400 animate-ping" : "bg-slate-600"}`}></span>
                </div>
                <p className="text-[9.5px] text-slate-400 truncate">
                  {isJarvisFusion ? "🤖 Inteligência Rápida & Autônoma" : "Clique para fundir mentes"}
                </p>
                <span className={`text-[8.5px] font-mono font-bold uppercase ${isJarvisFusion ? "text-indigo-400" : "text-slate-500"}`}>
                  {isJarvisFusion ? "SISTEMA ATIVO" : "FUSÃO OFFLINE"}
                </span>
              </div>
            </button>
          </div>

        </aside>

        {/* ========================================== */}
        {/* CENTER CONTENT DISPLAY AREA */}
        {/* ========================================== */}
        <section className="flex-1 flex flex-col overflow-hidden bg-slate-950 relative h-full">
          
          {/* Top Info Header Bar (Sleek and minimalist) */}
          <div className="bg-slate-900/60 px-5 py-3 border-b border-slate-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isJarvisFusion ? "bg-indigo-400 animate-pulse shadow-[0_0_8px_#6366f1]" : "bg-emerald-500 animate-pulse"}`}></span>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider font-extrabold flex items-center gap-2">
                <span>MÁXIMO 10.0</span>
                <span className="text-slate-500">•</span>
                <span className="text-indigo-300 font-mono">
                  {activeTab === "chat" && "💬 CHAT DE FUSÃO MULTIMODAL"}
                  {activeTab === "core" && "🧠 ATLAS DE CAPABILIDADES DAS IAS"}
                  {activeTab === "keys" && "🔑 SEU PAINEL DE CHAVES DE API"}
                  {activeTab === "zip" && "📦 PROCTOR DE PROJETOS ZIP"}
                  {activeTab === "android" && "📱 ANDROID APK ESTÚDIO"}
                  {activeTab === "downloads" && "📥 CENTRAL DE DOWNLOADS & DLLS"}
                  {activeTab === "linux" && "🐧 LINUX KALI SECURITY SUITE"}
                  {activeTab === "converters" && "🔄 CONVERSOR MULTIUSO DE ARQUIVOS"}
                  {activeTab === "export" && "🚀 EXPORTAÇÃO ESTÁVEL DO SEU APP"}
                  {activeTab === "db" && "🗄️ PLAYGROUND VIRTUAL DE BANCOS DE DADOS"}
                  {activeTab === "editor" && "💻 ESTÚDIO DE MODELOS E BOILERPLATES"}
                  {activeTab === "color" && "🎨 KIT DE CONVERSÃO DE CORES DE DEV"}
                  {activeTab === "synth" && "🎵 ESTÚDIO DE SINTETIZADOR RETRO SFX"}
                  {activeTab === "kanban" && "📋 QUADRO KANBAN DE METAS DE DEV"}
                  {activeTab === "media" && "🎬 ESTÚDIO MULTIMÍDIA DE FOTOS E VÍDEOS COM IA"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Foco Neural:</span>
              <span className="text-slate-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {selectedModel.name}
              </span>
            </div>
          </div>

          {/* Main Display Body (Changes based on activeTab state) */}
          <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
            
            {/* TAB: ZIP */}
            {activeTab === "zip" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                  <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    Leitor e Organizador de Projetos Compactados (ZIP)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Arraste ou selecione o arquivo <strong>.zip</strong> do seu projeto inteiro para ler todos os scripts e códigos de uma só vez. Você pode marcar arquivos específicos na lista para que a IA os use de contexto no chat!
                  </p>
                </div>
                
                <ZIPInspector
                  onFilesParsed={handleZipFilesParsed}
                  onClear={handleClearZip}
                  parsedFiles={parsedZipFiles}
                  currentZipName={currentZipName}
                />
              </div>
            )}

            {/* TAB: DOWNLOADS */}
            {activeTab === "downloads" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    Central de Downloads e Arquivos Corrigidos
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Aqui você encontra stubs, DLLs ou scripts corrigidos automaticamente pelas mentes de IA do MÁXIMO 10.0 para você baixar e colar no seu projeto!
                  </p>
                </div>
                
                <DownloadCenter
                  downloads={downloads}
                  onApprove={handleApproveDownload}
                  onRefuse={handleRefuseDownload}
                />
              </div>
            )}

            {/* TAB: ANDROID CREATOR */}
            {activeTab === "android" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/15 rounded-lg">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-300">Android APK Studio (Aprenda Fácil!)</h3>
                      <p className="text-[11px] text-slate-400">Monte aplicativos móveis do seu jeito e aprenda como funcionam os arquivos APK!</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Criar aplicativos para celular Android é muito simples e divertido! O MÁXIMO 10.0 ensina a criar telas com botões, textos, listas, e te orienta no passo a passo de como compilar e instalar um arquivo <strong>.apk</strong> no seu celular!
                  </p>
                </div>

                {/* Android File Templates Explorer */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      Visualizar Arquivos Reais de um App Android (Escolha para estudar):
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedAndroidTemplate("kt")}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all ${
                          selectedAndroidTemplate === "kt"
                            ? "bg-emerald-600 text-white font-bold"
                            : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        MainActivity.kt
                      </button>
                      <button
                        onClick={() => setSelectedAndroidTemplate("manifest")}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all ${
                          selectedAndroidTemplate === "manifest"
                            ? "bg-emerald-600 text-white font-bold"
                            : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        AndroidManifest.xml
                      </button>
                      <button
                        onClick={() => setSelectedAndroidTemplate("layout")}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all ${
                          selectedAndroidTemplate === "layout"
                            ? "bg-emerald-600 text-white font-bold"
                            : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        activity_main.xml
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/80 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-64 leading-relaxed">
                    {selectedAndroidTemplate === "kt" && (
                      <pre className="notranslate" translate="no">
{`package com.maximo.meuprimeiroapp

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

// Esta é a classe principal da tela do seu aplicativo de celular!
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Encontra o botão na tela e cria um evento de clique de forma muito fácil!
        val botaoClique = findViewById<Button>(R.id.btn_clique)
        botaoClique.setOnClickListener {
            // Mostra um balãozinho de aviso super amigável na tela do celular
            Toast.makeText(this, "Olá! Você clicou no botão do MÁXIMO 10.0!", Toast.LENGTH_LONG).show()
        }
    }
}`}
                      </pre>
                    )}

                    {selectedAndroidTemplate === "manifest" && (
                      <pre className="notranslate" translate="no">
{`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.maximo.meuprimeiroapp">

    <!-- Permissões do app de celular (Como acessar a internet) -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Meu Primeiro App"
        android:theme="@style/Theme.AppCompat">
        
        <!-- Define que esta classe será aberta primeiro quando clicar no ícone do aplicativo -->
        <activity android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`}
                      </pre>
                    )}

                    {selectedAndroidTemplate === "layout" && (
                      <pre className="notranslate" translate="no">
{`<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    android:background="#0F172A">

    <!-- Um texto bonito centralizado na tela do celular -->
    <TextView
        android:id="@+id/txt_titulo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Bem-vindo ao Criador Android!"
        android:textColor="#FFFFFF"
        android:textSize="20sp"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="100dp" />

    <!-- O botão para o usuário apertar e ver a mensagem -->
    <Button
        android:id="@+id/btn_clique"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Aperte Aqui!"
        android:layout_below="@id/txt_titulo"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="30dp"
        android:backgroundTint="#4F46E5" />

</RelativeLayout>`}
                      </pre>
                    )}
                  </div>
                  <div className="bg-slate-900 px-4 py-2.5 text-[10.5px] text-slate-400 font-mono border-t border-slate-800">
                    💡 <strong>O que cada um faz?</strong> <span className="text-emerald-300">MainActivity</span> controla as ações do app, <span className="text-emerald-300">AndroidManifest</span> dá as permissões de internet/sistema, e <span className="text-emerald-300">activity_main</span> é onde você desenha a tela!
                  </div>
                </div>

                {/* INTERACTIVE MÁXIMO APK COMPILER */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-bold text-sm text-white">Compilador e Gerador de APK Completo MÁXIMO v10.0</h4>
                    </div>
                    <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      Offline compiler ready
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Personalize as informações básicas do seu aplicativo Android abaixo e compile o projeto para gerar um arquivo <strong>.apk</strong> real de instalação, assinado digitalmente e pronto para celulares!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nome do App:</label>
                      <input
                        type="text"
                        value={apkAppName}
                        onChange={(e) => setApkAppName(e.target.value)}
                        placeholder="Ex: MeuPrimeiroApp"
                        disabled={apkBuildStatus === "running"}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pacote (Package Name):</label>
                      <input
                        type="text"
                        value={apkPackageName}
                        onChange={(e) => setApkPackageName(e.target.value)}
                        placeholder="Ex: com.maximo.meuapp"
                        disabled={apkBuildStatus === "running"}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Versão do App:</label>
                      <input
                        type="text"
                        value={apkAppVersion}
                        onChange={(e) => setApkAppVersion(e.target.value)}
                        placeholder="Ex: 1.0.0"
                        disabled={apkBuildStatus === "running"}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={startApkBuild}
                      disabled={apkBuildStatus === "running"}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/20 active:scale-95"
                    >
                      {apkBuildStatus === "running" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Compilando Projeto Gradle ({apkBuildProgress}%)...</span>
                        </>
                      ) : (
                        <>
                          <Cpu className="w-4 h-4" />
                          <span>🔨 MONTAR E COMPILAR APK COMPLETO</span>
                        </>
                      )}
                    </button>

                    {apkBuildStatus === "success" && (
                      <button
                        type="button"
                        onClick={downloadCompiledApk}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/25 animate-bounce"
                      >
                        <Download className="w-4 h-4" />
                        <span>📥 BAIXAR ARQUIVO {apkAppName.toUpperCase()}.APK</span>
                      </button>
                    )}
                  </div>

                  {/* Build Progress Bar */}
                  {apkBuildStatus === "running" && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>GRADLE BUILD TASKS IN PROGRESS...</span>
                        <span>{apkBuildProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${apkBuildProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Compiler Logs Terminal */}
                  {apkBuildLogs.length > 0 && (
                    <div className="bg-black/90 rounded-lg p-3.5 border border-slate-850 h-44 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-1.5 scrollbar-thin">
                      {apkBuildLogs.map((log, idx) => (
                        <div key={idx} className="leading-relaxed">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* GUIDE FOR MOBILE DEVELOPMENT 100% ON PHONE */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-left">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-sm text-white">Guia MÁXIMO: Como Criar e Compilar APKs 100% pelo Celular 📱</h4>
                  </div>
                  
                  <p className="text-xs text-slate-300 leading-relaxed text-left font-sans">
                    Você está programando pelo celular? <strong>Sim, é totalmente possível criar, rodar e compilar aplicativos completos de forma profissional diretamente no seu smartphone!</strong> Sem precisar de computador ou Android Studio. Escolha um método abaixo para ver o passo a passo simples:
                  </p>

                  {/* Sub-tabs for Mobile Methods */}
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-850">
                    <button
                      type="button"
                      onClick={() => setMobileDevMethod("colab")}
                      className={`text-[10px] sm:text-xs font-bold py-2 rounded transition-all ${
                        mobileDevMethod === "colab"
                          ? "bg-emerald-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      ☁️ Nuvem (Colab)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileDevMethod("pydroid")}
                      className={`text-[10px] sm:text-xs font-bold py-2 rounded transition-all ${
                        mobileDevMethod === "pydroid"
                          ? "bg-emerald-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      🐍 Python (Pydroid)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileDevMethod("termux")}
                      className={`text-[10px] sm:text-xs font-bold py-2 rounded transition-all ${
                        mobileDevMethod === "termux"
                          ? "bg-emerald-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      🐧 Linux (Termux)
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-slate-950/50 rounded-lg p-3.5 border border-slate-850 text-xs leading-relaxed space-y-3 font-sans">
                    {mobileDevMethod === "colab" && (
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                          <Sparkles className="w-4 h-4" />
                          <span>Método Recomendado: Compilar APK na Nuvem via Celular</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Compilar um arquivo <strong>.apk</strong> exige muita memória RAM e processamento que fariam o seu celular esquentar ou travar. O segredo dos melhores desenvolvedores é usar o <strong>Google Colab</strong>, um computador na nuvem super potente que o Google nos dá de graça, controlado direto pelo navegador do celular!
                        </p>

                        {/* NOVO: Botão de exportação direta do código completo em ZIP */}
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 my-2">
                          <div className="space-y-0.5 text-left w-full">
                            <p className="text-xs font-bold text-emerald-400">🔥 PASSO 1: Baixe o ZIP deste projeto</p>
                            <p className="text-[11px] text-slate-400">Clique no botão ao lado para baixar o arquivo completo <code className="text-emerald-300">projeto_completo.zip</code> direto para a pasta de Downloads do seu celular!</p>
                          </div>
                          <a
                            href="/api/export-project"
                            download="projeto_completo.zip"
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center cursor-pointer decoration-none shrink-0"
                          >
                            <Download className="w-4 h-4" />
                            <span>📥 BAIXAR ZIP DO PROJETO</span>
                          </a>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-2">
                          <p className="text-xs font-bold text-emerald-400">⚠️ IMPORTANTE: Como Evitar Erros no Google Colab</p>
                          <p className="text-[11.5px] text-slate-300">
                            Não tente baixar o ZIP usando comandos como <code className="text-indigo-300 font-mono">wget</code> dentro do Colab. O sistema de segurança bloqueia conexões externas diretas. Em vez disso, <strong>baixe o arquivo ZIP no seu celular primeiro</strong> usando o botão acima e faça o upload manual no painel lateral do Colab seguindo os passos abaixo!
                          </p>
                        </div>

                        <ol className="list-decimal pl-4 space-y-3.5 text-[11.5px] text-slate-300 font-sans">
                          <li>Abra o navegador do seu celular e entre no <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-bold">Google Colab</a> (faça login com sua conta Google).</li>
                          <li>Crie um novo caderno clicando em <strong>Novo notebook</strong> (ou "New notebook").</li>
                          <li>
                            No painel lateral esquerdo do Google Colab, clique no <strong>ícone de pasta (Arquivos)</strong>. Em seguida, clique no <strong>ícone de upload (página com seta para cima)</strong> e escolha o arquivo <code className="text-emerald-300">projeto_completo.zip</code> que você acabou de baixar no celular! Aguarde a bolinha carregar até o arquivo aparecer na lista.
                          </li>
                          <li>
                            Crie uma única célula de código e cole o script mágico de compilação automática abaixo. Ele descompacta o arquivo, instala o NodeJS, compila o aplicativo React e gera o APK final de forma 100% automatizada!
                            <pre className="bg-slate-900 text-emerald-300 p-2.5 rounded font-mono text-[10px] mt-1.5 overflow-x-auto select-all leading-normal notranslate" translate="no">
{`# 1. Instalar NodeJS 18+ no Google Colab
print("--- INSTALANDO NODEJS NA NUVEM ---")
!curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
!sudo apt-get install -y nodejs

# 2. Extrair o arquivo ZIP que você fez upload
print("--- DESCOMPACTANDO O ZIP ---")
!unzip -o projeto_completo.zip -d meu_projeto

# 3. Entrar na pasta e instalar todas as dependências do app
%cd meu_projeto
print("--- INSTALANDO DEPENDÊNCIAS ---")
!npm install

# 4. Compilar o app React em arquivos estáticos (dist/)
print("--- COMPILANDO WEB APP (VITE) ---")
!npm run build

# 5. Adicionar o motor Capacitor Android
print("--- INSTALANDO CAPACITOR MOTOR ---")
!npm install @capacitor/core @capacitor/cli @capacitor/android
!npx cap init "MAXIMO IA" "com.maximo.app" --web-dir=dist

# 6. Criar e sincronizar os arquivos nativos de Android
print("--- CRANDO PASTA ANDROID NATIVA ---")
!npx cap add android
!npx cap sync android

# 7. Compilar o APK usando o compilador oficial Android pré-instalado no Google Colab
print("--- COMPILANDO APK FINAL (GRADLE) ---")
%cd android
!export ANDROID_HOME=/usr/local/lib/android/sdk && ./gradlew assembleDebug

# 8. Copiar o APK gerado para a raiz do Google Colab para ficar fácil de baixar
print("--- PROCESSO CONCLUÍDO! ---")
!cp app/build/outputs/apk/debug/app-debug.apk /content/MAXIMO_IA.apk
print("🎉 SUCESSO! O arquivo 'MAXIMO_IA.apk' foi gerado e está pronto para download!")`}
                            </pre>
                          </li>
                          <li>
                            Clique no botão de <strong>Play (Executar)</strong> na célula de código e aguarde de 2 a 3 minutos enquanto a nuvem faz toda a mágica!
                          </li>
                          <li>
                            Quando o processo terminar com a mensagem <code className="text-emerald-400">🎉 SUCESSO!</code>, clique no painel de arquivos à esquerda (ícone de pasta), clique nos 3 pontinhos ao lado do arquivo <strong className="text-emerald-300">MAXIMO_IA.apk</strong> e selecione <strong>Fazer Download (Download)</strong>! Instale no seu celular e aproveite! 🚀
                          </li>
                        </ol>
                      </div>
                    )}

                    {mobileDevMethod === "pydroid" && (
                      <div className="space-y-3 text-left font-sans">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                          <Code2 className="w-4 h-4" />
                          <span>Pydroid 3: Crie e Teste Apps em Python Direto no Celular</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          O <strong>Pydroid 3</strong> é o melhor aplicativo para programar e rodar aplicativos no celular. Usando bibliotecas visuais como <strong>Kivy</strong> ou <strong>Pygame</strong>, você cria botões, janelas, textos e listas que rodam instantaneamente com aceleração gráfica!
                        </p>
                        <ol className="list-decimal pl-4 space-y-2 text-[11.5px] text-slate-300">
                          <li>Baixe o aplicativo **Pydroid 3** na Google Play Store.</li>
                          <li>Abra o aplicativo, vá no menu lateral esquerdo e clique em <strong>PIP</strong>.</li>
                          <li>Na aba PIP, digite <code className="text-emerald-400 font-mono text-[10.5px]">kivy</code> e clique em <strong>Install</strong> para instalar a biblioteca gráfica para celular.</li>
                          <li>Cole o seguinte código de exemplo completo no editor para criar um aplicativo de celular real com um botão e aviso interativo:
                            <pre className="bg-slate-900 text-indigo-300 p-2.5 rounded font-mono text-[10px] mt-1.5 overflow-x-auto select-all leading-normal notranslate" translate="no">
{`from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label

class MeuApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        self.label = Label(text="Bem-vindo ao App pelo Celular!", font_size=20)
        btn = Button(text="Aperte Aqui!", background_color=(0, 0.8, 0.5, 1))
        btn.bind(on_press=self.clicou)
        
        layout.add_widget(self.label)
        layout.add_widget(btn)
        return layout
        
    def clicou(self, instance):
        self.label.text = "Sensacional! Funciona 100% no celular!"

if __name__ == '__main__':
    MeuApp().run()`}
                            </pre>
                          </li>
                          <li>Aperte o botão redondo amarelo de **Play** no canto inferior direito. O aplicativo abrirá imediatamente na tela do seu celular!</li>
                        </ol>
                      </div>
                    )}

                    {mobileDevMethod === "termux" && (
                      <div className="space-y-3 text-left font-sans">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                          <Terminal className="w-4 h-4" />
                          <span>Termux: Terminal Linux Completo e Poderoso no Smartphone</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          O **Termux** transforma seu celular Android em um ambiente de desenvolvimento completo de nível profissional! Com ele, você pode ter o Node.js, Python, Git e até um compilador real rodando offline na palma da sua mão.
                        </p>
                        <ol className="list-decimal pl-4 space-y-2 text-[11.5px] text-slate-300">
                          <li>Para obter a versão mais atualizada e segura do **Termux**, baixe o aplicativo do site oficial de código aberto **F-Droid** (a versão da Google Play Store está obsoleta e sem atualizações).</li>
                          <li>Abra o Termux e rode o comando de atualização inicial para atualizar todos os pacotes:
                            <pre className="bg-slate-900 text-indigo-300 p-2 rounded font-mono text-[10px] mt-1.5 overflow-x-auto select-all leading-normal notranslate" translate="no">
{"pkg update && pkg upgrade -y"}
                            </pre>
                          </li>
                          <li>Instale o Node.js, Git, Python e JDK para programar qualquer linguagem no celular:
                            <pre className="bg-slate-900 text-indigo-300 p-2 rounded font-mono text-[10px] mt-1.5 overflow-x-auto select-all leading-normal notranslate" translate="no">
{"pkg install nodejs git python openjdk-17 -y"}
                            </pre>
                          </li>
                          <li>Para criar uma tela visual para os seus projetos web (HTML/JS/React) rodarem como APK, você pode usar o **Capacitor** instalando os pacotes e adicionando o suporte a Android com um comando rápido:
                            <pre className="bg-slate-900 text-indigo-300 p-2.5 rounded font-mono text-[10px] mt-1.5 overflow-x-auto select-all leading-normal notranslate" translate="no">
{`npm install @capacitor/core @capacitor/cli
npx cap init
npm install @capacitor/android
npx cap add android`}
                            </pre>
                          </li>
                          <li>Dica de ouro: Instale o editor de códigos <strong>Acode</strong> na Play Store. Ele se conecta perfeitamente aos arquivos do Termux para você programar com realce de sintaxe colorido e bonito!</li>
                        </ol>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-950 px-4 py-2.5 text-[10px] text-slate-400 font-mono rounded-lg border border-slate-850 flex items-start gap-2 text-left leading-normal">
                    <span className="text-emerald-400 shrink-0">💡</span>
                    <span><strong>Nenhuma DLL necessária!</strong> Como você está desenvolvendo pelo celular, ignore alertas de DLLs de PC e foque nesses incríveis métodos que rodam direto no seu Android de graça.</span>
                  </div>
                </div>

                {/* Quick Prompts for Android Helper */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Estude ou Pergunte sobre Android ao MÁXIMO 10.0:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveTab("chat");
                        applyPresetQuery("Me ensine passo a passo a configurar o Android Studio para eu compilar o meu primeiro arquivo .apk de teste!");
                      }}
                      className="text-left bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:border-emerald-500/30 text-xs transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-emerald-300">🚀 Como gerar meu primeiro APK do Zero</p>
                        <p className="text-[10px] text-slate-500">Aprenda a compilar e instalar um app no seu celular.</p>
                      </div>
                      <span className="text-emerald-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("chat");
                        applyPresetQuery("Como criar um aplicativo moderno de lista de tarefas em Kotlin e Android Studio? Me passe o código pronto.");
                      }}
                      className="text-left bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:border-emerald-500/30 text-xs transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-emerald-300">📝 Criar App de Tarefas (Kotlin)</p>
                        <p className="text-[10px] text-slate-500">Código prático e limpo para você copiar e testar.</p>
                      </div>
                      <span className="text-emerald-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LINUX / KALI */}
            {activeTab === "linux" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-gradient-to-r from-indigo-950/20 to-slate-950/20 border border-indigo-500/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/15 rounded-lg">
                      <Terminal className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-indigo-300">Linux & Kali Security Lab (Segurança Digital)</h3>
                      <p className="text-[11px] text-slate-400">Explore comandos de segurança cibernética e aprenda com o terminal de forma muito fácil!</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sistemas baseados em Linux, especialmente o **Kali Linux**, são de código aberto e cheios de ferramentas incríveis de redes e segurança digital. Use o nosso terminal simulado interativo abaixo para testar comandos reais do Linux de forma educativa e segura!
                  </p>
                </div>

                {/* Sub-tabs Navigation */}
                <div className="flex border-b border-slate-850 gap-1 pb-px">
                  <button
                    onClick={() => setLinuxSubTab("suite")}
                    className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                      linuxSubTab === "suite"
                        ? "border-rose-500 text-white bg-rose-500/5"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-rose-500" />
                    <span>🛠️ Suíte de Ferramentas Kali (Foto)</span>
                  </button>
                  <button
                    onClick={() => setLinuxSubTab("terminal")}
                    className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                      linuxSubTab === "terminal"
                        ? "border-indigo-500 text-white bg-indigo-500/5"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>🖥️ Terminal & Simulações de Redes</span>
                  </button>
                </div>

                {linuxSubTab === "suite" ? (
                  <KaliSuite />
                ) : (
                  <>
                    {/* Simulated Terminal Component */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                  {/* Terminal Tab Header */}
                  <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                      <span className="text-xs text-indigo-300 font-mono pl-2 font-bold flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5" />
                        maximo@kali: ~/workspace
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-850">Console Interativo</span>
                  </div>

                  {/* Terminal Outputs */}
                  <div className="p-4 h-64 overflow-y-auto font-mono text-[11px] text-emerald-400 space-y-1.5 bg-black/90 scrollbar-thin">
                    {terminalHistory.map((line, idx) => (
                      <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Terminal Input */}
                  <form onSubmit={handleTerminalCommand} className="bg-slate-950 border-t border-slate-800 p-2 flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 pl-2 shrink-0">maximo@kali:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Digite: ajuda, ls, pwd, whoami, ping, nmap, hack, clear..."
                      className="flex-1 bg-transparent border-0 focus:ring-0 text-xs text-slate-200 font-mono focus:outline-none placeholder:text-slate-700"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors"
                    >
                      Executar
                    </button>
                  </form>
                </div>

                {/* Visual Kali Linux Attack Simulator and Suite */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                      <h4 className="font-bold text-sm text-white">Central de Simulação de Ataques Kali Linux v10.0</h4>
                    </div>
                    <span className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Uso Educativo e Defesa
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Selecione um método de teste de intrusão abaixo para ver o Kali Linux em ação. Esta simulação didática mostra o comportamento de ataques cibernéticos de forma segura e ensina como proteger seu projeto!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <button
                      type="button"
                      onClick={() => setKaliSelectedAttack("nmap")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        kaliSelectedAttack === "nmap"
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <span>🔍 Nmap Scan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKaliSelectedAttack("hydra")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        kaliSelectedAttack === "hydra"
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <span>🔑 Hydra SSH</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKaliSelectedAttack("ddos")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        kaliSelectedAttack === "ddos"
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <span>🛰️ GoldenEye DDoS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKaliSelectedAttack("phishing")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        kaliSelectedAttack === "phishing"
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <span>🎣 SET Phishing</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKaliSelectedAttack("metasploit")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        kaliSelectedAttack === "metasploit"
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <span>🕵️ Metasploit</span>
                    </button>
                  </div>

                  {/* Target configuration and Simulation Trigger */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">IP ou Servidor Alvo Simulado:</label>
                        <input
                          type="text"
                          value={kaliTarget}
                          onChange={(e) => setKaliTarget(e.target.value)}
                          placeholder="Ex: 192.168.1.100 ou alvo-teste.lan"
                          disabled={kaliStatus === "running"}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none placeholder:text-slate-700 font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => startKaliAttackSimulation(kaliSelectedAttack)}
                        disabled={kaliStatus === "running"}
                        className="w-full sm:w-auto self-end bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-650 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        {kaliStatus === "running" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Simulando...</span>
                          </>
                        ) : (
                          <>
                            <Terminal className="w-4 h-4" />
                            <span>Iniciar Ataque Ético</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    {kaliStatus === "running" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>EXECUTANDO EXPLORATION / ATTACK STEPS...</span>
                          <span>{kaliProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="bg-rose-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${kaliProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Simulation logs display */}
                    {kaliLogs.length > 0 && (
                      <div className="bg-black/90 rounded-lg p-3 border border-slate-850 h-40 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-1 scrollbar-thin">
                        {kaliLogs.map((log, idx) => (
                          <div key={idx} className="leading-relaxed">
                            {log}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Security Report & Mitigation */}
                    {kaliStatus === "success" && kaliReport && (
                      <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 space-y-3 mt-3 animate-fade-in">
                        <div className="flex items-center gap-2 border-b border-indigo-500/10 pb-2">
                          <Shield className="w-5 h-5 text-emerald-400" />
                          <h5 className="font-bold text-xs text-indigo-300">Relatório de Vulnerabilidade e Defesa Cibernética</h5>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold text-rose-400 block">⚠️ Falha Identificada (Vulnerabilidade):</span>
                            <p className="text-slate-300 mt-0.5">{kaliReport.vulnerability}</p>
                          </div>
                          <div>
                            <span className="font-bold text-amber-400 block">💥 Nível de Risco Operacional:</span>
                            <p className="text-slate-300 mt-0.5">{kaliReport.risk}</p>
                          </div>
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg mt-1">
                            <span className="font-bold text-emerald-400 block">🛡️ Plano de Mitigação (Como Defender/Corrigir):</span>
                            <p className="text-emerald-200 mt-0.5 leading-relaxed">{kaliReport.fix}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Didactic Commands Guide */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Guia de Estudos de Comandos Importantes:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                    <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg space-y-1">
                      <code className="text-indigo-400 font-bold block font-mono">whoami</code>
                      <p className="text-slate-400 text-[10px]">Mostra qual usuário está logado. Ajuda a entender permissões e controle no sistema!</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg space-y-1">
                      <code className="text-indigo-400 font-bold block font-mono">nmap [IP]</code>
                      <p className="text-slate-400 text-[10px]">Verifica portas abertas em um servidor, garantindo segurança contra invasões.</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg space-y-1">
                      <code className="text-indigo-400 font-bold block font-mono">ls</code>
                      <p className="text-slate-400 text-[10px]">Lista todas as pastas e arquivos do diretório atual. É a listagem básica do terminal!</p>
                    </div>
                  </div>
                </div>

                {/* Quick prompts for Linux/Kali */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Estude com o MÁXIMO 10.0:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveTab("chat");
                        applyPresetQuery("Me dê uma introdução simples em português de como funciona o Kali Linux e quais são os primeiros passos seguros para eu estudar redes de computadores!");
                      }}
                      className="text-left bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:border-indigo-500/30 text-xs transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-indigo-300">🛡️ Estudar Segurança Digital com Kali Linux</p>
                        <p className="text-[10px] text-slate-500">Fundamentos essenciais, redes e portas explicados fácil.</p>
                      </div>
                      <span className="text-indigo-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("chat");
                        applyPresetQuery("O que significa código aberto (Open Source) e como o Linux ajuda no desenvolvimento de softwares e jogos pelo mundo?");
                      }}
                      className="text-left bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl hover:border-indigo-500/30 text-xs transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-indigo-300">🌐 O que é Código Aberto (Open Source)?</p>
                        <p className="text-[10px] text-slate-500">Entenda a filosofia colaborativa que move o mundo da tecnologia.</p>
                      </div>
                      <span className="text-indigo-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
                </>
                )}
              </div>
            )}

            {/* TAB: CHAT PRINCIPAL */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col xl:flex-row overflow-hidden h-full">
                
                {/* LEFT SIDE: Chat Flow */}
                <div className="flex-1 flex flex-col overflow-hidden h-full relative">
                  
                  {/* Messages Scroll Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
                
                {/* Mobile Developer Mode Status Alert */}
                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Modo Programador Mobile (Celular)</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${isMobileDeveloperMode ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                          {isMobileDeveloperMode ? "Ativo" : "Inativo"}
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                        {isMobileDeveloperMode 
                          ? "Focado em ferramentas 100% móveis (Pydroid 3, Termux, Colab). Sugestões de DLLs e PC estão ocultadas!" 
                          : "Exibindo sugestões de ferramentas para PC (Android Studio, Unity) e correções de arquivos/DLLs."}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileDeveloperMode(!isMobileDeveloperMode)}
                    className={`text-[10px] font-bold px-3 py-2 rounded-lg transition-colors border shrink-0 text-center ${
                      isMobileDeveloperMode
                        ? "bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white border-transparent"
                    }`}
                  >
                    {isMobileDeveloperMode ? "Trocar para Modo PC" : "Ativar Modo Celular"}
                  </button>
                </div>

                {/* HUD DE FUSÃO NEURAL DO J.A.R.V.I.S. */}
                <div className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl ${
                  isJarvisFusion 
                    ? "bg-cyan-950/40 border-cyan-500/50 shadow-cyan-500/10" 
                    : "bg-slate-900 border-slate-800"
                }`}>
                  {/* Glowing background matrix effect */}
                  {isJarvisFusion && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent pointer-events-none animate-pulse" />
                  )}
                  
                  <div className="flex items-center gap-4 text-left z-10">
                    {/* Pulsating Holographic Arc Reactor visual */}
                    <div className="relative shrink-0 flex items-center justify-center">
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                        isJarvisFusion 
                          ? "border-cyan-400 bg-cyan-950/80 animate-spin" 
                          : "border-slate-700 bg-slate-950"
                      }`} style={{ animationDuration: isJarvisFusion ? '12s' : '0s' }}>
                        {/* Inner glowing core */}
                        <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${
                          isJarvisFusion ? "border-cyan-300 shadow-lg shadow-cyan-500/50 animate-pulse" : "border-slate-800"
                        }`}>
                          <div className={`w-4 h-4 rounded-full ${isJarvisFusion ? "bg-cyan-400" : "bg-slate-800"}`} />
                        </div>
                      </div>
                      {/* Pulsing glow ring outside */}
                      {isJarvisFusion && (
                        <div className="absolute -inset-1.5 rounded-full bg-cyan-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider ${
                          isJarvisFusion 
                            ? "bg-cyan-500 text-slate-950" 
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {isJarvisFusion ? "FUSÃO J.A.R.V.I.S. ATIVA" : "MÓDULO J.A.R.V.I.S."}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">Módulos Máximos 10.0</span>
                      </h4>
                      <p className="text-[11px] font-medium text-slate-300 leading-normal">
                        Funda o cérebro tático do <strong>J.A.R.V.I.S.</strong> com as IAs do MÁXIMO 10.0 para gerar projetos e scripts (SAMP, HTML, APK) ultra rápidos, inteligentes e autônomos!
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {isJarvisFusion 
                          ? "✓ Diretriz ativa: Autocorreção imediata de bugs e priorização de códigos-fonte funcionais." 
                          : "⚡ Toque no botão ao lado para iniciar a fusão neural e elevar o nível das respostas."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const nextState = !isJarvisFusion;
                      setIsJarvisFusion(nextState);
                      
                      // Appending system J.A.R.V.I.S. feedback message to the log
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `jarvis-fusion-alert-${Date.now()}`,
                          role: "model",
                          parts: [
                            {
                              text: nextState 
                                ? "🤖 **[SISTEMA J.A.R.V.I.S.]:** Fusão neural estabelecida com sucesso. Todos os módulos e cérebros do MÁXIMO 10.0 estão agora operando sob minhas diretrizes táticas de alta performance! Sempre que me pedir um projeto (como sistemas de prefeitura, polícia, hospital, empregos ou famílias para SAMP, ou apps em HTML/APK), buscarei as estruturas de código aberto mais robustas e corrigirei qualquer bug de forma 100% autônoma na resposta. Qual o nosso objetivo hoje, Alysson?"
                                : "🤖 **[SISTEMA J.A.R.V.I.S.]:** Fusão neural desconectada. Retornando ao modo de operação padrão do ecossistema de Inteligência Artificial MÁXIMO 10.0."
                            }
                          ],
                          timestamp: new Date().toLocaleTimeString()
                        }
                      ]);
                    }}
                    className={`text-[11px] font-bold px-4 py-2.5 rounded-xl border shrink-0 text-center transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 ${
                      isJarvisFusion
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white border-transparent shadow-lg shadow-cyan-900/40"
                        : "bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isJarvisFusion ? "Desconectar Fusão" : "Conectar Fusão Neural"}</span>
                  </button>
                </div>
                
                {/* Chat Messages Log */}
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-full ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "model" && (
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="space-y-2 max-w-[85%]">
                        <div
                          className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                            msg.role === "user"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : msg.isError
                              ? "bg-rose-950/40 border border-rose-500/30 text-rose-200 rounded-tl-none"
                              : "bg-slate-900 border border-slate-850 text-slate-200 rounded-tl-none"
                          }`}
                        >
                          {/* Message Content Render with custom markdown stylings */}
                          <div className="prose prose-invert prose-xs max-w-none">
                            {msg.parts.map((part, index) => {
                              if (part.inlineData) {
                                // Media Preview inside the chat bubble
                                const isVideo = part.inlineData.mimeType.startsWith("video/");
                                return (
                                  <div key={index} className="my-2 border border-slate-800 rounded-lg overflow-hidden max-w-xs">
                                    {isVideo ? (
                                      <div className="bg-slate-950 p-2 flex items-center gap-2 text-xs">
                                        <Video className="w-4 h-4 text-indigo-400 shrink-0" />
                                        <span className="truncate">Vídeo enviado</span>
                                      </div>
                                    ) : (
                                      <img
                                        src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`}
                                        alt="Upload do usuário"
                                        className="max-h-40 object-cover"
                                      />
                                    )}
                                  </div>
                                );
                              }
                              return (
                                <ReactMarkdown
                                  key={index}
                                  components={{
                                    code({ node, className, children, ...props }) {
                                      const match = /language-(\w+)/.exec(className || "");
                                      return match ? (
                                        <div className="relative my-3 border border-slate-800 rounded-lg overflow-hidden notranslate" translate="no">
                                          <div className="bg-slate-950/80 px-3 py-1 text-[10px] font-mono text-indigo-300 border-b border-slate-800 flex justify-between items-center">
                                            <span>{match[1].toUpperCase()} CODE</span>
                                          </div>
                                          <pre className="bg-slate-950 p-3 overflow-x-auto text-xs font-mono text-emerald-400 notranslate" translate="no">
                                            <code className={`${className || ""} notranslate`} translate="no" {...props}>
                                              {children}
                                            </code>
                                          </pre>
                                        </div>
                                      ) : (
                                        <code className="bg-slate-950 text-indigo-300 px-1 py-0.5 rounded font-mono text-xs notranslate" translate="no">
                                          {children}
                                        </code>
                                      );
                                    },
                                    p({ children }) {
                                      return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                                    },
                                    h3({ children }) {
                                      return <h3 className="text-base font-bold text-white mt-3 mb-1.5">{children}</h3>;
                                    },
                                    h4({ children }) {
                                      return <h4 className="text-sm font-bold text-slate-100 mt-2 mb-1">{children}</h4>;
                                    },
                                    ul({ children }) {
                                      return <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>;
                                    },
                                    ol({ children }) {
                                      return <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>;
                                    }
                                  }}
                                >
                                  {part.text || ""}
                                </ReactMarkdown>
                              );
                            })}
                          </div>

                          {/* Web Search citations list */}
                          {msg.searchCitations && msg.searchCitations.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-800/80">
                              <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1.5">
                                <Search className="w-3 h-3 text-sky-400" />
                                Fontes internacionais consultadas pela IA:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.searchCitations.map((citation, idx) => (
                                  <a
                                    key={idx}
                                    href={citation.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] bg-slate-950/60 hover:bg-slate-950 text-indigo-300 hover:text-white border border-slate-800 hover:border-slate-700 px-2 py-1 rounded flex items-center gap-1 transition-all"
                                  >
                                    {citation.title}
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
                          <span>{msg.timestamp}</span>
                          {msg.role === "model" && (
                            <>
                              <span>•</span>
                              <span className="text-slate-400">{selectedModel.name}</span>
                            </>
                          )}
                        </div>

                        {/* Quick indicator for auto-dependency resolution inside chat */}
                        {!isMobileDeveloperMode && msg.suggestedDownload && (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-start gap-2.5 max-w-lg">
                            <Download className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-bold text-white">Arquivo/DLL ausente detectado!</p>
                              <p className="text-[11px] text-slate-300 mt-0.5">
                                Disponibilizei <strong>{msg.suggestedDownload.dependencyName}</strong> na Central de Downloads para correção imediata do seu projeto.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-indigo-300">VOCÊ</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loader indicator */}
                  {loading && (
                    <div className="flex gap-3 justify-start items-start">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="bg-slate-900 border border-slate-850 rounded-2xl rounded-tl-none p-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2 font-medium">
                          <span className="text-xs">{selectedModel.name} está conectando com as mentes aliadas...</span>
                          <span className="flex gap-0.5">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Nós consultamos as inteligências internacionais em tempo real para fundir a resposta correta.</p>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

              </div>
            </div>
          </div>
        )}

            {/* TAB: EXPORT (MÁXIMO 10.0 EXPORT ENGINE) */}
            {activeTab === "export" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/25 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/15 rounded-xl">
                      <Sparkles className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-indigo-200">Exportador e Distribuidor Multiplataforma MÁXIMO 10.0</h3>
                      <p className="text-xs text-slate-400">Transforme este projeto em um app executável de Computador, aplicativo de Celular Android ou rode 100% offline!</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Você quer levar o MÁXIMO 10.0 para qualquer lugar, rodando em tela cheia no seu computador, como um aplicativo instalável no seu celular, ou salvando na memória para usar mesmo sem nenhuma conexão com a internet? Siga os passos simples e baixe as configurações geradas automaticamente!
                  </p>
                </div>

                {/* Sub-Tabs de Navegação de Exportação */}
                <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1 shrink-0">
                  <button
                    onClick={() => setExportSubTab("desktop")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      exportSubTab === "desktop"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>💻 Computador (PC / Mac / Linux)</span>
                  </button>

                  <button
                    onClick={() => setExportSubTab("android")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      exportSubTab === "android"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>📱 Android APK (Celular)</span>
                  </button>

                  <button
                    onClick={() => setExportSubTab("offline")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      exportSubTab === "offline"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                    }`}
                  >
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>🌐 PWA Offline Inteligente</span>
                  </button>
                </div>

                {/* SUBTAB: DESKTOP ELECTRON */}
                {exportSubTab === "desktop" && (
                  <div className="space-y-5">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <Laptop className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-bold text-sm text-white">Criar Aplicativo Executável para Computador (Windows/Mac/Linux)</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Nós usamos o <strong>Electron</strong>, uma ferramenta fantástica e profissional que empacota nosso site React em um programa de computador nativo de alta performance! Ele cria um arquivo <strong>.EXE</strong> (no Windows), <strong>.APP</strong> (no Mac) ou <strong>.DEB</strong> (no Linux) que abre em uma janela limpa, sem barra de endereços do navegador!
                      </p>

                      <div className="bg-indigo-950/15 border border-indigo-500/20 p-4 rounded-xl space-y-3">
                        <p className="text-xs font-bold text-indigo-300">🎁 Passo a Passo Super Didático de Exportação para PC:</p>
                        <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-2">
                          <li><strong>Baixe a Configuração:</strong> Clique no botão de geração abaixo para receber o arquivo <code className="bg-slate-950 text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px]">electron-main.js</code>.</li>
                          <li><strong>Configure o seu Projeto:</strong> Cole esse arquivo na pasta raiz do seu projeto React.</li>
                          <li><strong>Instale o Electron:</strong> Abra o terminal na pasta do projeto e digite o comando:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npm install electron electron-packager --save-dev</pre>
                          </li>
                          <li><strong>Adicione o Script:</strong> No seu <code className="text-indigo-300">package.json</code>, adicione em "scripts":
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">"electron": "electron .",
"pack-pc": "electron-packager . MÁXIMO_10 --platform=win32 --arch=x64 --out=dist-pc"</pre>
                          </li>
                          <li><strong>Gere o Executável:</strong> Rode o comando abaixo para criar a pasta com o seu arquivo <code className="text-indigo-300">.exe</code> prontinho para dar dois cliques e rodar em qualquer PC:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npm run pack-pc</pre>
                          </li>
                        </ol>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white">Pronto para gerar o arquivo de Computador?</p>
                          <p className="text-[11px] text-slate-400">Isso irá gerar e adicionar o arquivo electron-main.js diretamente nos seus downloads.</p>
                        </div>
                        <button
                          onClick={() => generateExportFiles("desktop")}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          Gerar Configuração PC (.js)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB: ANDROID APK */}
                {exportSubTab === "android" && (
                  <div className="space-y-5">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-bold text-sm text-white">Criar Aplicativo APK Android de Celular (Capacitor)</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Para levar o MÁXIMO 10.0 para celulares e tablets de forma impecável, nós usamos o <strong>Capacitor</strong> (criado pela equipe do Ionic). Ele liga o nosso código React aos recursos nativos do Android de forma incrivelmente simples e rápida, permitindo gerar o arquivo <strong>.APK</strong> para você enviar e instalar no celular dos seus amigos!
                      </p>

                      <div className="bg-emerald-950/15 border border-emerald-500/20 p-4 rounded-xl space-y-3">
                        <p className="text-xs font-bold text-emerald-300">📱 Passo a Passo Super Didático de Exportação para Celular:</p>
                        <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-2">
                          <li><strong>Gere as Configurações:</strong> Clique no botão abaixo para gerar o arquivo <code className="bg-slate-950 text-emerald-300 px-1 py-0.5 rounded font-mono text-[11px]">capacitor.config.json</code>.</li>
                          <li><strong>Instale as Dependências do Capacitor:</strong> No terminal do seu projeto, digite:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npm install @capacitor/core @capacitor/cli @capacitor/android</pre>
                          </li>
                          <li><strong>Inicie o Capacitor:</strong> Configure o Capacitor no projeto com:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npx cap init</pre>
                          </li>
                          <li><strong>Gere o Build de Produção:</strong> Crie a pasta static <code className="text-indigo-300">dist/</code> do seu site:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npm run build</pre>
                          </li>
                          <li><strong>Adicione a Plataforma Android:</strong> Insira a pasta nativa do celular:
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npx cap add android</pre>
                          </li>
                          <li><strong>Abra no Android Studio e Compile seu APK:</strong> Esse comando abre o Android Studio no projeto nativo de celular gerado de forma automática! Lá, é só clicar em <strong className="text-emerald-300">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> para salvar o seu arquivo instalável!
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">npx cap open android</pre>
                          </li>
                        </ol>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white">Pronto para gerar as configurações de Celular?</p>
                          <p className="text-[11px] text-slate-400">Isso criará o arquivo capacitor.config.json pronto para ser baixado.</p>
                        </div>
                        <button
                          onClick={() => generateExportFiles("android")}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          Gerar Capacitor Config (.json)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB: OFFLINE PWA */}
                {exportSubTab === "offline" && (
                  <div className="space-y-5">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <WifiOff className="w-5 h-5 text-amber-400" />
                        <h4 className="font-bold text-sm text-white">Habilitar Suporte Offline Completo (PWA / Service Worker)</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Um <strong>Progressive Web App (PWA)</strong> é uma tecnologia revolucionária do Google que permite instalar nosso site direto na tela de início do seu celular ou do computador (com um ícone lindo de aplicativo nativo) e funcionar <strong>totalmente offline</strong>! Ele usa um script em segundo plano chamado <strong>Service Worker</strong> para salvar todos os códigos e estilos localmente.
                      </p>

                      <div className="bg-amber-950/15 border border-amber-500/20 p-4 rounded-xl space-y-3">
                        <p className="text-xs font-bold text-amber-300">🌐 Passo a Passo Didático para Rodar Offline Sem Internet:</p>
                        <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-2">
                          <li><strong>Baixe o Service Worker:</strong> Clique no botão de download abaixo para obter o arquivo <code className="bg-slate-950 text-amber-300 px-1 py-0.5 rounded font-mono text-[11px]">sw.js</code>.</li>
                          <li><strong>Registre o Service Worker:</strong> Adicione o código de registro no final do seu arquivo de entrada principal (ex: no <code className="text-amber-300">index.html</code> ou no topo do <code className="text-amber-300">src/main.tsx</code>):
                            <pre className="bg-slate-950 text-emerald-400 p-2.5 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">{`if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('MÁXIMO 10.0 Offline Ativado!', reg))
      .catch(err => console.log('Falha no modo offline:', err));
  });
}`}</pre>
                          </li>
                          <li><strong>Navegação sem Internet:</strong> Uma vez acessado a primeira vez, todos os recursos (como o terminal interativo do Kali Linux, o criador Android APK, as explicações de jogos e os códigos prontos) ficarão gravados no armazenamento local seguro do seu navegador, abrindo instantaneamente mesmo se você estiver no meio de uma viagem de avião ou sem sinal de operadora!</li>
                        </ol>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white">Pronto para gerar o suporte offline?</p>
                          <p className="text-[11px] text-slate-400">Isso criará o script sw.js pronto para download.</p>
                        </div>
                        <button
                          onClick={() => generateExportFiles("offline")}
                          className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          Gerar Service Worker Offline (.js)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: KEYS (🔑 CENTRAL DE CHAVES API GRATUITAS) */}
            {activeTab === "keys" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <div className="bg-gradient-to-r from-emerald-950/30 to-teal-950/30 border border-emerald-500/25 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/15 rounded-xl">
                      <Key className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-emerald-200">Guia Oficial de Ativação de Chaves de API Gratuitas</h3>
                      <p className="text-xs text-slate-400">Encontre, crie e gerencie suas chaves de API sem gastar nada para alimentar a Mente Coletiva 10.0!</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Por motivos de segurança digital e privacidade, <strong>nunca coloque suas chaves de API diretamente escritas no código (hardcoded)</strong>. No ecossistema MÁXIMO 10.0, as chaves são gerenciadas através de variáveis de ambiente seguras. Veja abaixo onde encontrar as chaves mais incríveis e gratuitas do mercado para usar onde quiser!
                  </p>
                </div>

                {/* Painel Interativo de Teste de Chaves em Tempo Real */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h4 className="font-bold text-sm text-white">Status de Conectividade da Mente Coletiva</h4>
                        <p className="text-[11px] text-slate-400">Verifique em tempo real se suas chaves do arquivo .env estão ativas e funcionais.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isTestingKeys}
                      onClick={async () => {
                        setIsTestingKeys(true);
                        // Define initial testing state
                        const initial: any = {};
                        ["gemini", "groq", "openrouter", "cerebras", "mistral", "cohere", "huggingface", "cloudflare"].forEach(k => {
                          initial[k] = { status: "testing" };
                        });
                        setKeyTestStatus(initial);

                        try {
                          const isLocalFile = window.location.protocol === "file:" || window.location.protocol.startsWith("capacitor") || !window.location.host;
                          const apiEndpoint = isLocalFile && window.location.hostname !== "localhost"
                            ? "https://ais-pre-e5hls7wtbj5t5htt3y3t64-468821493337.us-east1.run.app/api/test-keys"
                            : "/api/test-keys";

                          const res = await fetch(apiEndpoint, { method: "POST" });
                          const data = await res.json();
                          if (data.success && data.results) {
                            setKeyTestStatus(data.results);
                          } else {
                            throw new Error("Falha ao obter resultados");
                          }
                        } catch (err) {
                          console.error(err);
                          const fail: any = {};
                          ["gemini", "groq", "openrouter", "cerebras", "mistral", "cohere", "huggingface", "cloudflare"].forEach(k => {
                            fail[k] = { status: "invalid", error: "Não foi possível conectar ao servidor de teste" };
                          });
                          setKeyTestStatus(fail);
                        } finally {
                          setIsTestingKeys(false);
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-950/20 transition-all cursor-pointer"
                    >
                      {isTestingKeys ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Verificando Canais...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" />
                          Testar Conexões das IAs
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      { id: "gemini", name: "Google Gemini", provider: "google" },
                      { id: "groq", name: "Groq Llama 3", provider: "groq" },
                      { id: "openrouter", name: "OpenRouter Hub", provider: "openrouter" },
                      { id: "cerebras", name: "Cerebras AI", provider: "cerebras" },
                      { id: "mistral", name: "Mistral Large", provider: "mistral" },
                      { id: "cohere", name: "Cohere Command", provider: "cohere" },
                      { id: "huggingface", name: "Hugging Face", provider: "huggingface" },
                      { id: "cloudflare", name: "Cloudflare Workers", provider: "cloudflare" }
                    ].map((keyItem) => {
                      const state = keyTestStatus[keyItem.id];
                      return (
                        <div key={keyItem.id} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col justify-between space-y-2">
                          <span className="text-xs font-bold text-slate-300 truncate">{keyItem.name}</span>
                          <div className="flex items-center gap-1.5">
                            {!state ? (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-600"></span>
                                <span className="text-[10px] font-mono text-slate-500 uppercase">Não verificado</span>
                              </>
                            ) : state.status === "testing" ? (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                                <span className="text-[10px] font-mono text-indigo-400 uppercase">Testando...</span>
                              </>
                            ) : state.status === "active" ? (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Online & Ativa</span>
                              </>
                            ) : state.status === "missing" ? (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                <span className="text-[10px] font-mono text-amber-500 uppercase">Não Configurada</span>
                              </>
                            ) : (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase" title={state.error}>Chave Inválida</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grid de Provedores de API Gratuitos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Google Gemini */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Altamente Recomendada</span>
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      </div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="text-blue-400 font-mono">01.</span> Google Gemini API
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Chave oficial do Google que alimenta este aplicativo! Oferece limites gratuitos generosos de requisições por minuto com os modelos mais rápidos e inteligentes do mercado.
                      </p>
                      <ul className="text-[11px] text-slate-300 space-y-1 pl-4 list-disc">
                        <li>Cota gratuita reiniciada automaticamente a cada minuto.</li>
                        <li>Ideal para processar textos, imagens, vídeos e códigos complexos.</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-emerald-400">Preço: 100% Grátis</span>
                      <a 
                        href="https://aistudio.google.com/" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-[10.5px] bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all"
                      >
                        Criar Chave Grátis <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Groq Console */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-orange-500/10 text-orange-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Velocidade Extrema</span>
                        <Cpu className="w-4 h-4 text-orange-400" />
                      </div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="text-orange-400 font-mono">02.</span> Groq Developer API
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A plataforma mais rápida do mundo baseada em LPU! Permite rodar modelos excelentes como Llama 3.3 da Meta, Gemma 2 do Google e Mixtral de forma quase instantânea.
                      </p>
                      <ul className="text-[11px] text-slate-300 space-y-1 pl-4 list-disc">
                        <li>Sem custos para desenvolvedores na camada de testes.</li>
                        <li>Respostas ultra-rápidas inferiores a 1 segundo.</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-emerald-400">Preço: Grátis (Tier Beta)</span>
                      <a 
                        href="https://console.groq.com/" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-[10.5px] bg-orange-600 hover:bg-orange-500 text-white font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all"
                      >
                        Pegar Chave Groq <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* OpenRouter */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-purple-500/10 text-purple-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Multi-Modelos</span>
                        <Globe className="w-4 h-4 text-purple-400" />
                      </div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="text-purple-400 font-mono">03.</span> OpenRouter API
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Um hub unificado fantástico que conecta você a dezenas de modelos de IA diferentes. Eles oferecem diversos modelos excelentes de uso 100% livre e sem custos!
                      </p>
                      <ul className="text-[11px] text-slate-300 space-y-1 pl-4 list-disc">
                        <li>Filtre por modelos rotulados como "Free" no catálogo.</li>
                        <li>Acesse modelos Qwen, Llama e Mistral com uma única chave.</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-emerald-400">Preço: Opções Grátis</span>
                      <a 
                        href="https://openrouter.ai/" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-[10.5px] bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all"
                      >
                        Abrir OpenRouter <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Hugging Face */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Código Aberto</span>
                        <Terminal className="w-4 h-4 text-amber-400" />
                      </div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="text-amber-400 font-mono">04.</span> Hugging Face Tokens
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A maior comunidade de inteligência artificial open-source do planeta. Crie um token de leitura para usar a Inference API sem pagar absolutamente nada.
                      </p>
                      <ul className="text-[11px] text-slate-300 space-y-1 pl-4 list-disc">
                        <li>Acesse milhares de modelos menores e especializados.</li>
                        <li>Excelente para tarefas de Processamento de Linguagem Natural.</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-emerald-400">Preço: Grátis (Uso Justo)</span>
                      <a 
                        href="https://huggingface.co/settings/tokens" 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-[10.5px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all"
                      >
                        Criar Token HF <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* Instruções de Configuração Segura */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ShieldAlert className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-sm text-white">Como configurar suas chaves de API com segurança absoluta</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <p className="font-bold text-emerald-400">No Ambiente de Desenvolvimento (Aqui no Google AI Studio):</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Crie sua chave de API nos links oficiais acima (recomendamos o <strong className="text-white">Google Gemini API</strong>).</li>
                        <li>No painel à direita, clique no ícone de engrenagem <strong>Settings (Configurações)</strong>.</li>
                        <li>Procure pelo campo de variáveis de ambiente.</li>
                        <li>Adicione o nome da variável como <code className="text-indigo-300 font-mono">GEMINI_API_KEY</code>.</li>
                        <li>Cole a chave de API gerada no campo de valor correspondente e salve.</li>
                        <li>Pronto! O sistema irá parar de usar a cota pública de testes e usará sua cota exclusiva, funcionando perfeitamente sem erros!</li>
                      </ol>
                    </div>

                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <p className="font-bold text-emerald-400">Ao Exportar para PC, Android ou Hospedar em seu Servidor:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Crie um arquivo chamado <code className="text-emerald-300 font-mono">.env</code> na pasta raiz do seu projeto.</li>
                        <li>Adicione a linha abaixo, substituindo pelo seu código de chave real:
                          <pre className="bg-slate-900 text-indigo-300 p-2 rounded font-mono text-[10.5px] mt-1 overflow-x-auto">GEMINI_API_KEY=sua_chave_secreta_aqui</pre>
                        </li>
                        <li>No seu servidor back-end (como no <code className="text-indigo-300">server.ts</code>), acesse a chave usando <code className="text-indigo-300">process.env.GEMINI_API_KEY</code>.</li>
                        <li>Certifique-se de adicionar o arquivo <code className="text-rose-400">.env</code> no seu arquivo <code className="text-emerald-300">.gitignore</code> para nunca enviar sua chave para o GitHub de forma pública!</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONVERTERS */}
            {activeTab === "converters" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <ConversorMulti />
              </div>
            )}

            {/* TAB: MÁXIMO CORE */}
            {activeTab === "core" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <MaximoCore />
              </div>
            )}

            {/* TAB: DATABASE PLAYGROUND */}
            {activeTab === "db" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <DBPlayground />
              </div>
            )}

            {/* TAB: CODE TEMPLATE EDITOR */}
            {activeTab === "editor" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <CodePlayground />
              </div>
            )}

            {/* TAB: COLOR CONVERTER DEVKIT */}
            {activeTab === "color" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <ColorDevkit />
              </div>
            )}

            {/* TAB: RETRO SYNTH LAB */}
            {activeTab === "synth" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <AudioSynthLab />
              </div>
            )}

            {/* TAB: DEV KANBAN METAS */}
            {activeTab === "kanban" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <DevKanban />
              </div>
            )}

            {/* TAB: ESTÚDIO MULTIMÍDIA IA */}
            {activeTab === "media" && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 h-full">
                <MediaStudio />
              </div>
            )}

          </div>

          {/* TAB CHAT INPUT FORM (Stick to chat tab to keep other labs clean and readable) */}
          {activeTab === "chat" && (
            <div className="p-4 border-t border-slate-900 bg-slate-950/80 space-y-3 shrink-0">
              
              {/* Seletor de Cérebro de IA Ativo */}
              <div className="flex items-center justify-between bg-slate-900/40 p-2 px-3 rounded-xl border border-slate-800/80 gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Canal de IA Ativo:</span>
                </div>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-[11px] text-indigo-300 font-bold focus:outline-none focus:border-indigo-500/50 cursor-pointer rounded-lg px-2 py-0.5"
                >
                  <option value="gemini">🤖 Google Gemini v3.5 (Principal)</option>
                  <option value="groq">⚡ Groq Llama 3 (Ultra-Rápido)</option>
                  <option value="openrouter">🌐 OpenRouter Hub (Multi-Modelos)</option>
                  <option value="cerebras">🧠 Cerebras Llama 3.1 (Velocidade Extrema)</option>
                  <option value="mistral">🌀 Mistral Large (Europeu)</option>
                  <option value="cohere">📄 Cohere Command-R (Especializado)</option>
                  <option value="huggingface">🤗 Hugging Face (Open-Source)</option>
                  <option value="cloudflare">☁️ Cloudflare Workers (Edge AI)</option>
                </select>
              </div>

              {/* Displaying attachments chosen for upload */}
              {(attachedFiles.length > 0 || attachedDocs.length > 0) && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {attachedFiles.map((file, index) => {
                    const isVideo = file.mimeType.startsWith("video/");
                    return (
                      <div key={`file-${index}`} className="relative bg-slate-900 border border-slate-800 rounded-lg p-2 pr-8 flex items-center gap-2 max-w-xs">
                        {isVideo ? (
                          <Video className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-indigo-400" />
                        )}
                        <span className="text-xs text-slate-300 truncate max-w-[150px] font-mono">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 hover:text-rose-400 text-slate-500 p-1 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {attachedDocs.map((doc, index) => {
                    return (
                      <div key={`doc-${index}`} className="relative bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2 pr-8 flex items-center gap-2 max-w-xs">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs text-indigo-200 truncate max-w-[150px] font-mono">{doc.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocAttachment(index)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 hover:text-rose-400 text-slate-400 p-1 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Voice Status Indicator Bar */}
              {(isListening || isSpeaking) && (
                <div className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                  isListening 
                    ? "bg-rose-950/20 border-rose-500/30 text-rose-300"
                    : "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                }`}>
                  <div className="flex items-center gap-2.5">
                    {isListening ? (
                      <>
                        <div className="flex gap-0.5 items-end h-4 pr-1">
                          <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-4 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '450ms', animationDuration: '0.8s' }}></span>
                        </div>
                        <span className="font-bold flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping"></span>
                          Ouvindo... Fale agora! (O envio será automático ao silenciar)
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-0.5 items-end h-4 pr-1">
                          <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></span>
                          <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '450ms', animationDuration: '0.8s' }}></span>
                        </div>
                        <span className="font-bold">MÁXIMO Voice: Falando resposta em áudio...</span>
                      </>
                    )}
                  </div>
                  {isSpeaking && (
                    <button
                      type="button"
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }}
                      className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded-lg font-bold uppercase tracking-wider transition-all"
                    >
                      Silenciar (Parar Áudio)
                    </button>
                  )}
                  {isListening && (
                    <button
                      type="button"
                      onClick={() => {
                        if (recognitionRef.current) {
                          recognitionRef.current.stop();
                        }
                        setIsListening(false);
                      }}
                      className="text-[10px] bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 px-2 py-1 rounded-lg font-bold uppercase tracking-wider transition-all"
                    >
                      Parar Microfone
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSendMessage} className="relative">
                <div className="min-h-12 bg-slate-900/60 border border-slate-800 focus-within:border-indigo-500/60 rounded-xl flex items-end p-2 transition-all">
                  
                  {/* File & Media Attachment buttons */}
                  <div className="flex items-center gap-1 self-center pl-1 shrink-0">
                    <input
                      type="file"
                      ref={mediaInputRef}
                      onChange={handleMediaUpload}
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => mediaInputRef.current?.click()}
                      className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Anexar arquivos (Imagens, Vídeos, Documentos, PDFs, Scripts .cs / .py / .txt)"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={`Pergunte algo ao MÁXIMO 10.0 (Ex: "Como fazer um aplicativo Android?")...`}
                    rows={1}
                    className="flex-1 bg-transparent border-0 focus:ring-0 text-slate-100 text-sm placeholder:text-slate-500 px-3 py-2 resize-none max-h-36 focus:outline-none"
                  />

                  <div className="flex items-center gap-2 pr-1 shrink-0 self-center">
                    {/* Botão de Controle de Voz / Fala do Assistente */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isSpeaking) {
                          window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                        } else {
                          setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
                        }
                      }}
                      className={`p-2 rounded-xl transition-all flex items-center justify-center border ${
                        isSpeaking
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15"
                          : isVoiceOutputEnabled
                          ? "bg-slate-850 border-slate-700/50 text-indigo-400 hover:text-indigo-300 hover:bg-slate-800"
                          : "bg-slate-850 border-slate-800/40 text-slate-500 hover:text-slate-400 hover:bg-slate-800"
                      }`}
                      title={
                        isSpeaking
                          ? "Clique para SILENCIAR a fala da IA"
                          : isVoiceOutputEnabled
                          ? "Fala da IA: Ativada (Clique para Mutar)"
                          : "Fala da IA: Desativada (Clique para Ativar)"
                      }
                    >
                      {isSpeaking ? (
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      ) : isVoiceOutputEnabled ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </button>

                    {/* Botão de Microfone / Reconhecimento de Voz */}
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`p-2 rounded-xl transition-all flex items-center justify-center border ${
                        isListening
                          ? "bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-md shadow-rose-950/20 scale-105"
                          : "bg-slate-850 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                      title="Falar com a IA por voz (Envia automaticamente quando você parar)"
                    >
                      {isListening ? (
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                          </span>
                          <Mic className="w-4 h-4 text-rose-400" />
                        </div>
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="submit"
                      disabled={(!inputValue.trim() && attachedFiles.length === 0 && attachedDocs.length === 0) || loading}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white p-2 rounded-xl flex items-center justify-center transition-all shadow-md shadow-indigo-900/10"
                    >
                      <CornerDownLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Global system notes & warnings */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-1 px-1">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Mente Coletiva: Se uma IA do ecossistema não souber, ela repassa na velocidade da luz para as outras IAs aliadas.</span>
                </div>
                <span className="text-slate-400">Pressione Enter para enviar, Shift+Enter para quebrar linha</span>
              </div>
            </div>
          )}

        </section>
      </div>

      {/* Elegant Footer Status */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
        <p>© 2026 MÁXIMO IA • Inteligência Artificial Unificada de Códigos e Jogos</p>
        <p className="font-mono text-slate-600">Status do Sistema: SEGURO_ECOSSISTEMA_OK</p>
      </footer>
    </div>
  );
}
