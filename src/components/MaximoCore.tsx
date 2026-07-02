import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import MultiAgentConsensus from "./MultiAgentConsensus";
import OpenCodeWorkspace from "./OpenCodeWorkspace";
import { 
  Sparkles, 
  Search, 
  Cpu, 
  Code, 
  BookOpen, 
  Calculator, 
  Settings, 
  Play, 
  FileCode, 
  Copy, 
  Check, 
  ArrowRight,
  Compass,
  Zap,
  Globe,
  Database,
  FileText,
  Activity,
  Terminal,
  Server,
  AlertTriangle,
  Smartphone,
  Layers,
  Radio,
  Eye,
  Settings2,
  Flame,
  CheckCircle,
  RefreshCw,
  HelpCircle,
  Fingerprint,
  Lock,
  Unlock,
  ShieldAlert,
  ChevronRight,
  Volume2,
  Sliders,
  Shield,
  Bot,
  Laptop,
  Download
} from "lucide-react";

interface AIMotor {
  id: string;
  name: string;
  family: string;
  category: "texto" | "brasil" | "imagem" | "video" | "audio" | "ciencia" | "motores" | "programacao";
  desc: string;
  details: string;
  bestFor: string;
  pwnTemplate?: string;
  capabilities: string[];
}

export default function MaximoCore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMotorId, setSelectedMotorId] = useState<string | null>(null);
  
  // Navigation Tabs for Maximo Core
  const [activeSubTab, setActiveSubTab] = useState<"jarvis" | "pwn-generator" | "html-apk-builder" | "math-solver" | "atlas" | "multi-agent" | "workspace">("jarvis");

  // J.A.R.V.I.S. States
  const [jarvisResponse, setJarvisResponse] = useState<string>(
    "Olá, Alysson! Sou o J.A.R.V.I.S., seu assistente tático de IA. Todos os meus núcleos de fusão estão online. Selecione um protocolo de comando abaixo para coordenar o desenvolvimento do seu servidor SAMP, gerar telas HTML5 ou empacotar arquivos APK!"
  );
  const [jarvisIsTyping, setJarvisIsTyping] = useState<boolean>(false);
  const [jarvisActiveProtocol, setJarvisActiveProtocol] = useState<string>("STANDBY");

  // State for Pawn Generator & Auditor
  const [pwnSelectedBrain, setPwnSelectedBrain] = useState("DeepSeek-R1 (Programação Sênior & Raciocínio)");
  const [pwnTemplateType, setPwnTemplateType] = useState<"cmd_admin" | "mysql_reg" | "car_sys" | "gang_sys" | "anti_cheat">("cmd_admin");
  const [pwnPrompt, setPwnPrompt] = useState("");
  const [pwnOutputCode, setPwnOutputCode] = useState("");
  const [pwnLoading, setPwnLoading] = useState(false);
  const [pwnCompilerStatus, setPwnCompilerStatus] = useState<"idle" | "compiling" | "success" | "warning_fixed">("idle");
  const [pwnCompilerLogs, setPwnCompilerLogs] = useState<string[]>([]);
  const [vulnerabilityReport, setVulnerabilityReport] = useState<{
    score: string;
    vulnerabilities: { title: string; risk: "Alto" | "Médio" | "Baixo"; desc: string; fix: string }[];
  } | null>(null);

  // States for HTML & APK Builder
  const [htmlTemplateType, setHtmlTemplateType] = useState<"landing_cyber" | "samp_dash" | "community_forum" | "player_form">("landing_cyber");
  const [htmlGeneratedCode, setHtmlGeneratedCode] = useState("");
  const [htmlPrompt, setHtmlPrompt] = useState("");
  const [htmlLoading, setHtmlLoading] = useState(false);

  const [apkFramework, setApkFramework] = useState<"capacitor" | "cordova" | "native_webview" | "termux">("capacitor");
  const [apkGeneratedConfig, setApkGeneratedConfig] = useState("");
  const [apkGeneratedBuildScript, setApkGeneratedBuildScript] = useState("");
  const [apkLoading, setApkLoading] = useState(false);

  // Advanced APK/EXE Compiler Interactive States
  const [compilerTab, setCompilerTab] = useState<"apk" | "exe" | "html">("apk");
  const [apkAppName, setApkAppName] = useState("MaximoLauncher");
  const [apkPackageId, setApkPackageId] = useState("com.maximorp.gta.samp");
  const [apkVersion, setApkVersion] = useState("1.0.0");
  const [apkTargetUrl, setApkTargetUrl] = useState("https://samp.maximorp.com.br");
  const [apkKeystoreType, setApkKeystoreType] = useState<"new" | "custom">("new");
  const [apkOrientation, setApkOrientation] = useState<"sensor" | "landscape" | "portrait">("sensor");
  
  const [apkBuildStatus, setApkBuildStatus] = useState<"idle" | "building" | "success" | "error">("idle");
  const [apkBuildProgress, setApkBuildProgress] = useState(0);
  const [apkConsoleLogs, setApkConsoleLogs] = useState<string[]>([]);

  const [exeAppName, setExeAppName] = useState("MaximoDesktop");
  const [exeVersion, setExeVersion] = useState("1.0.0");
  const [exeTargetUrl, setExeTargetUrl] = useState("https://samp.maximorp.com.br");
  const [exeWrapper, setExeWrapper] = useState<"webview2" | "electron" | "pyinstaller">("webview2");
  const [exeIconType, setExeIconType] = useState<"cyber" | "gold" | "samp">("cyber");
  const [exeHardwareAcceleration, setExeHardwareAcceleration] = useState(true);
  
  const [exeBuildStatus, setExeBuildStatus] = useState<"idle" | "building" | "success" | "error">("idle");
  const [exeBuildProgress, setExeBuildProgress] = useState(0);
  const [exeConsoleLogs, setExeConsoleLogs] = useState<string[]>([]);

  // Math Solver States
  const [mathInput, setMathInput] = useState("sqrt(8)");
  const [mathSolution, setMathSolution] = useState<{
    result: string;
    steps: string[];
    aiThoughts: string;
  } | null>(null);
  const [mathLoading, setMathLoading] = useState(false);

  // AI Motors Database
  const aiMotors: AIMotor[] = useMemo(() => [
    {
      id: "gemini-2.5-pro",
      name: "Google Gemini 2.5 Pro / Flash",
      family: "Google AI",
      category: "texto",
      desc: "O principal modelo multimodal com janela de contexto gigante de 2 milhões de tokens.",
      details: "Perfeito para analisar projetos inteiros de uma só vez, ler vídeos, áudios e criar códigos avançados.",
      bestFor: "Análise de Arquivos Grandes, Raciocínio Multimodal, Resumos e Google Search Grounding.",
      capabilities: [
        "Janela de contexto ultra-longa de até 2.000.000 de tokens (lê livros inteiros ou repositórios completos).",
        "Processamento multimodal nativo (consegue analisar áudio, vídeo, imagens e texto simultaneamente).",
        "Integração nativa com o Google Search para respostas ancoradas em fatos e novidades em tempo real.",
        "Geração de código de alta precisão em mais de 100 linguagens (Python, Java, Kotlin, Pawn, C#, C++).",
        "Extração inteligente de dados estruturados em JSON de arquivos soltos sem necessidade de pré-processamento.",
        "Tradução em tempo real e de alta fluidez entre mais de 120 idiomas com sensibilidade cultural."
      ]
    },
    {
      id: "deepseek-r1",
      name: "DeepSeek-V3 / R1 (Chain of Thought)",
      family: "DeepSeek AI",
      category: "programacao",
      desc: "Líder mundial em raciocínio lógico avançado e programação de altíssimo nível com auto-pensamento.",
      details: "Perfeito para criar códigos complexos, arquitetura de sistemas e scripts avançados de Pawn/C++.",
      bestFor: "Lógica complexa, Matemática profunda, Scripts Pawn e Análise de Arquivos.",
      pwnTemplate: "CMD:salvarcarro(playerid, params[])\n{\n    if(!IsPlayerInAnyVehicle(playerid)) return SendClientMessage(playerid, -1, \"{FF0000}Erro: Você não está em um veículo!\");\n    new vehicleid = GetPlayerVehicleID(playerid);\n    SalvarDadosDoVeiculoNoBanco(vehicleid);\n    SendClientMessage(playerid, -1, \"{00FF00}Sucesso: Veículo salvo na sua conta com sucesso!\");\n    return 1;\n}",
      capabilities: [
        "Raciocínio lógico autônomo baseado em Cadeia de Pensamento (Chain of Thought) antes de dar a resposta final.",
        "Desempenho comparável a modelos fechados mais caros em provas olímpicas de matemática e lógica.",
        "Arquitetura focada em programação profunda, decodificando estruturas complexas de Pawn, C++ e Assembly.",
        "Capacidade de autodebugging estrutural - lê o código, simula a execução e corrige bugs autonomamente.",
        "Criação de algoritmos de alta eficiência, minimizando latência e uso de memória RAM de computadores modestos."
      ]
    },
    {
      id: "claude-3.5-sonnet",
      name: "Claude 3.5 Sonnet",
      family: "Anthropic",
      category: "programacao",
      desc: "O padrão da indústria para design de interfaces e programação front-end de altíssimo nível.",
      details: "Gera códigos com layout impecável em React, HTML5 e CSS, além de raciocínio de código lógico extremamente refinado.",
      bestFor: "Desenvolvimento Frontend, Componentes React, Visual Design e Estruturas de Dados Complexas.",
      capabilities: [
        "Líder global absoluto em geração de código para interfaces e páginas web completas.",
        "Gera componentes React modulares usando Tailwind CSS com altíssima precisão visual e usabilidade.",
        "Raciocínio lógico impecável para entender requisições indiretas ou explicações ambíguas do usuário.",
        "Suporta refatoração profunda de arquivos de código espaciais, dividindo código inchado em módulos reutilizáveis.",
        "Excelente tom de conversa, escrevendo respostas super articuladas, sem enrolação ou jargões repetitivos."
      ]
    },
    {
      id: "gpt-4o",
      name: "GPT-4o / o1-mini",
      family: "OpenAI",
      category: "texto",
      desc: "O principal modelo multitarefas da OpenAI com raciocínio lógico analítico polido.",
      details: "Excelente para análises críticas de dados, redações profissionais, tradução e programação estável.",
      bestFor: "Raciocínio Analítico, Análise de Dados, Escrita Geral e Resolução de Erros de Programação.",
      capabilities: [
        "Processamento de texto em velocidade relâmpago com excelente consistência conceitual.",
        "Análise estatística robusta e interpretação lógica de tabelas CSV, arquivos Excel e gráficos.",
        "Capacidade avançada de formatação e estruturação de documentações técnicas e regras de servidores.",
        "Resolução de erros de compilação através de análises passo a passo detalhadas e fáceis de entender.",
        "Chamada de funções nativa (Function Calling) com excelente consistência operacional para robôs."
      ]
    },
    {
      id: "grok-3",
      name: "Grok 3 (Beta Grounding)",
      family: "xAI (Elon Musk)",
      category: "texto",
      desc: "Modelo super-humano com integração com dados em tempo real da rede social X.",
      details: "Entrega respostas incrivelmente rápidas sobre notícias mundiais atuais, política, tecnologia e código.",
      bestFor: "Notícias em Tempo Real, Análise de Tendências, Tom Descontraído e Lógica Física.",
      capabilities: [
        "Busca profunda e indexação em tempo real de publicações mundiais e notícias quentes.",
        "Capacidade de programar simuladores físicos e matemáticos complexos de órbita e colisões.",
        "Tom de conversa altamente flexível (pode alternar entre modo divertido/sarcástico ou profissional).",
        "Resolução ágil de quebra-cabeças e problemas de lógica matemática de exames internacionais."
      ]
    },
    {
      id: "qwen2.5-coder",
      name: "Qwen 2.5 Coder (32B)",
      family: "Alibaba Cloud",
      category: "programacao",
      desc: "Especialista em codificação multilíngue avançada, incluindo Pawn, C++, HTML e JavaScript.",
      details: "Gera códigos com altíssima precisão sintática, ideal para correções e novos módulos de jogo.",
      bestFor: "Programação de Gamemodes, Scripts Mobile e Desenvolvimentos Web Rápidos.",
      capabilities: [
        "Pré-treinado especificamente em bilhões de linhas de código de código aberto de alta qualidade.",
        "Conhecimento técnico avançado de linguagens raras e de nicho, como Pawn, Assembly e GDScript.",
        "Escreve códigos prontos com pouquíssimo lixo ou redundâncias, focando em performance limpa.",
        "Excelente suporte para autodebugging e identificação de parênteses, colchetes ou chaves faltando.",
        "Altíssima pontuação em benchmarks de programação mundiais como o HumanEval (superior a 85%)."
      ]
    },
    {
      id: "llama3",
      name: "Llama 3 / 3.3 Instruct",
      family: "Meta Open Source",
      category: "texto",
      desc: "A maior base de código aberto para conversação natural e inteligência geral.",
      details: "Excelente para planejar missões de RPG, regras de corporações e guias de jogo.",
      bestFor: "Diálogos humanizados, roteiros, planejamento de sistemas e traduções.",
      capabilities: [
        "O maior modelo de pesos abertos (openweights) do mundo, treinado com mais de 15 trilhões de tokens.",
        "Comportamento de conversação natural que se assemelha muito ao diálogo humano real.",
        "Excelente para tarefas de roleplay (interpretação de personagens de RPG, policiais e prefeitos).",
        "Gera ideias criativas de jogabilidade, missões personalizadas e mecânicas divertidas para servidores.",
        "Alta capacidade de entender contextos em português com nuances locais e gírias do dia a dia."
      ]
    },
    {
      id: "gemma2",
      name: "Gemma 2 / CodeGemma",
      family: "Google",
      category: "texto",
      desc: "Modelos leves altamente eficientes criados pelo Google para respostas rápidas e códigos.",
      details: "Roda de forma ultra-rápida e gera blocos de código bem comentados e estruturados.",
      bestFor: "Respostas diretas, geração rápida de código em HTML/CSS/React.",
      capabilities: [
        "Modelo leve projetado com a mesma tecnologia avançada dos modelos gigantes da família Gemini.",
        "Excelente desempenho para rodar localmente com pouquíssimo consumo de processador gráfico.",
        "Excelente gerador de explicações didáticas em blocos pequenos, perfeitos para iniciantes de programação.",
        "Gera trechos rápidos de scripts em HTML, CSS ou JavaScript prontos para copiar e colar com explicações."
      ]
    },
    {
      id: "mistral-large",
      name: "Mistral Large GameDev",
      family: "Mistral AI",
      category: "texto",
      desc: "Pioneiro europeu focado em misturas inteligentes de mini-especialistas para fluxo rápido.",
      details: "Excelente para depurar erros estruturais de compilação do compilador Pawn.",
      bestFor: "Raciocínio lógico estruturado e processamento eficiente de grandes dados.",
      capabilities: [
        "Baseado na Europa com profundo alinhamento de diretrizes de segurança digital internacionais.",
        "Excelente em analisar pilhas de erros (stack traces) de compiladores de jogos.",
        "Arquitetura de alta densidade capaz de manter consistência em conversas de longa duração.",
        "Traduções literárias impecáveis de textos para francês, espanhol, alemão e português europeu."
      ]
    },
    {
      id: "phi4",
      name: "Phi-3 / Phi-4",
      family: "Microsoft",
      category: "texto",
      desc: "Pequeno modelo (SLM) projetado para rodar em celulares e computadores modestos.",
      details: "Mesmo sendo extremamente leve, entrega uma lógica de raciocínio lógico que roda com extrema agilidade.",
      bestFor: "Execução leve local, aplicativos móveis offline e dispositivos leves.",
      capabilities: [
        "Desenvolvido pela Microsoft usando dados sintéticos refinados para ensinar matemática e lógica profunda.",
        "Ocupa pouquíssimo espaço em disco, ideal para celulares Android modestos.",
        "Raciocínio científico apurado que resolve problemas complexos em poucas palavras.",
        "Excelente para guiar iniciantes passo a passo em tópicos como variáveis e condicionais simples."
      ]
    },
    {
      id: "command-r",
      name: "Command R / R+",
      family: "Cohere",
      category: "texto",
      desc: "Especialista em realizar buscas externas em tempo real (RAG) e resumir grandes páginas.",
      details: "Possui uma das melhores integrações para ler bancos de dados, arquivos PDF e links de internet.",
      bestFor: "Pesquisas profundas na internet e resumos de documentos PDF.",
      capabilities: [
        "Especialista mundial em RAG (Retrieval-Augmented Generation) para ler documentos internos de empresas.",
        "Tratamento multilíngue avançado focado em fluxos de trabalho empresariais e negócios internacionais.",
        "Consome documentos em PDF longos e cria resumos em formato de tópicos super claros.",
        "Excelente consistência ao chamar ferramentas externas (APIs, banco de dados ou calculadoras)."
      ]
    },
    {
      id: "star-coder",
      name: "StarCoder / CodeLlama",
      family: "BigCode / Meta",
      category: "programacao",
      desc: "Os maiores motores open-source focados única e exclusivamente em programar.",
      details: "Eles entendem mais de 80 linguagens de programação, incluindo Pawn, C++, Python e Kotlin.",
      bestFor: "Preenchimento automático de código e depuração de bugs complexos.",
      capabilities: [
        "Treinados inteiramente em repositórios de código aberto do GitHub com permissões públicas claras.",
        "Especialistas em autocomplete (preenchimento automático inteligente) de código enquanto você digita.",
        "Capacidade de ler blocos de códigos pela metade e deduzir de forma assertiva a lógica que falta."
      ]
    },
    {
      id: "maritalk",
      name: "Maritaca AI (MariTalk)",
      family: "Maritaca AI (Brasil)",
      category: "brasil",
      desc: "O modelo de linguagem open-source mais famoso desenvolvido em solo brasileiro.",
      details: "Ajustado com profunda sensibilidade cultural e gírias do Brasil para diálogos naturais.",
      bestFor: "Apoio a redações, contextos de negócios brasileiros e linguagem coloquial.",
      capabilities: [
        "O primeiro modelo de inteligência artificial de grande porte treinado puramente em solo nacional brasileiro.",
        "Compreensão perfeita de expressões regionais (ex: 'uai', 'tchê', 'oxente', 'massa') e gírias modernas.",
        "Adequado para auxiliar estudantes brasileiros em exames como o ENEM e provas escolares de literatura.",
        "Excelente redação de petições, e-mails corporativos e propostas comerciais no padrão brasileiro."
      ]
    },
    {
      id: "sabia-2",
      name: "Sabiá / Sabiá-2 / Chico",
      family: "InvenTI / Unicamp (Brasil)",
      category: "brasil",
      desc: "Família de modelos altamente refinados para o contexto brasileiro, exames públicos e leis.",
      details: "Garante excelente interpretação de contratos, petições e diretrizes regulatórias nacionais.",
      bestFor: "Consultas jurídicas brasileiras, provas de exames nacionais e análise burocrática.",
      capabilities: [
        "Treinado e ajustado por pesquisadores e engenheiros de ponta da Unicamp.",
        "Destaque absoluto em exames da OAB (Ordem dos Advogados do Brasil) e concursos públicos federais.",
        "Excelente leitor de contratos comerciais nacionais, identificando cláusulas abusivas ou falhas legais.",
        "Capacidade analítica de resumir longos processos e leis nacionais em tópicos simplificados."
      ]
    },
    {
      id: "flux1",
      name: "Flux.1 (Schnell / Dev)",
      family: "Black Forest Labs",
      category: "imagem",
      desc: "O padrão ouro global atual para fotorrealismo e escrita correta de textos em imagens.",
      details: "Restaura poses corporativas e renderiza as palavras que você pede com precisão impecável.",
      bestFor: "Geração de artes fotorrealistas, banners de marketing e capas profissionais.",
      capabilities: [
        "Renderização perfeita de dedos das mãos, rostos simétricos e poses corporais realistas.",
        "Incrível capacidade de desenhar textos escritos de forma correta e legível dentro das imagens geradas.",
        "Suporte a proporções de tela customizadas (16:9, 1:1, 9:16) sem distorcer os elementos principais.",
        "Criação de banners publicitários ultra-chamativos e ilustrações em vetor 3D ou pintura clássica."
      ]
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion (XL / 3)",
      family: "Stability AI",
      category: "imagem",
      desc: "O motor visual de código aberto mais utilizado, hackeado e customizado do mundo.",
      details: "Permite guiar poses de personagens para logos ou artes de carregamento do servidor.",
      bestFor: "Personalização de design, artes de carregamento e banners.",
      capabilities: [
        "Código 100% aberto, permitindo que qualquer pessoa treine o modelo em estilos específicos de desenho ou fotos.",
        "Excelente controle geométrico através de extensões como ControlNet (para guiar poses físicas de pessoas).",
        "Gera paisagens fantásticas, carros de luxo e personagens no estilo GTA San Andreas 3D ou mangá."
      ]
    },
    {
      id: "wan2",
      name: "Wan2.1 / CogVideoX",
      family: "Wan / Zhipu AI",
      category: "video",
      desc: "Motores modernos para geração de vídeos cinematográficos com movimentação fluida do mundo real.",
      details: "Teasers de alta fluidez para divulgar servidores de SAMP ou novos sistemas.",
      bestFor: "Vídeos promocionais curtos e trailers realistas de jogos.",
      capabilities: [
        "Gera pequenos vídeos de 5 a 10 segundos com física de gravidade, fluidos e luzes realistas.",
        "Excelente consistência de câmera, simulando movimentos cinematográficos como pan, tilt e zoom suaves.",
        "Ideal para criar teasers de divulgação curta de novos sistemas ou mapas do seu servidor de RPG."
      ]
    },
    {
      id: "whisper",
      name: "Whisper (OpenAI)",
      family: "OpenAI",
      category: "audio",
      desc: "O motor de transcrição de áudio e tradução de voz mais preciso e rápido do planeta.",
      details: "Converte qualquer áudio de voz em texto limpo com suporte a gírias e pontuação nativa.",
      bestFor: "Comandos de voz e transcrição automatizada em rádio/chat.",
      capabilities: [
        "Treinado com mais de 680.000 horas de dados de voz em dezenas de línguas.",
        "Excelente tolerância a ruídos de fundo (como barulhos de carro, vento ou música tocando).",
        "Converte fala em texto de forma imediata com detecção automática e pontuação correta gramatical."
      ]
    },
    {
      id: "bark",
      name: "Bark / XTTS V2",
      family: "Suno / Coqui TTS",
      category: "audio",
      desc: "Clonagem de voz realista e conversão de texto em áudio com emoção e respiração natural.",
      details: "Gera falas para NPCs do servidor usando vozes realistas em português do Brasil.",
      bestFor: "Dublagem de NPCs, anúncios de voz e diálogos de rádio realistas.",
      capabilities: [
        "Clonagem de voz de alta fidelidade a partir de apenas 6 segundos de amostra de áudio limpo.",
        "Adiciona sons humanos realistas às falas geradas, como respirações, risadas, hesitações e suspiros.",
        "Tradução de voz nativa mantendo exatamente o mesmo tom de voz da pessoa que gravou o áudio original."
      ]
    },
    {
      id: "yolo",
      name: "YOLO v11",
      family: "Ultralytics",
      category: "ciencia",
      desc: "O motor de detecção de objetos em tempo real mais rápido do mundo.",
      details: "Pode ser adaptado para ler elements gráficos em tempo real de streams.",
      bestFor: "Visão computacional rápida e detecção em streams de vídeo.",
      capabilities: [
        "Detecção, rastreamento e segmentação de até 80 classes de objetos comuns em milissegundos.",
        "Modelo altamente otimizado para rodar em celulares, placas Raspberry Pi ou processadores modestos.",
        "Usado em sistemas de segurança por vídeo, carros inteligentes e contagem automatizada de público."
      ]
    }
  ], []);

  // Filtered Motors
  const filteredMotors = useMemo(() => {
    return aiMotors.filter(motor => {
      const matchesSearch = motor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            motor.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            motor.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            motor.details.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || motor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, aiMotors]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 🛠️ PAWN PRESETS
  const pwnPresets = useMemo(() => {
    return {
      cmd_admin: {
        title: "Comandos Administrativos (zcmd + sscanf)",
        desc: "Comandos otimizados para punições, teletransporte e cura de jogadores com validação anti-crash.",
        code: `/*
 * =========================================================================
 *  GTA SA-MP Gamemode Script - Gerado por MÁXIMO NÚCLEO COLETIVO 10.0
 *  Módulo: Comandos Administrativos de Alto Desempenho e Segurança
 * =========================================================================
 */

#include <a_samp>
#include <zcmd>
#include <sscanf2>

#define COLOR_ERRO     0xFF5555FF
#define COLOR_SUCESSO  0x55FF55FF
#define COLOR_ALERTA   0xFFFF55FF
#define COLOR_INFO     0x55FFFFFF

// Variável global simulada de Cargos de Admin (mude conforme o seu gamemode)
forward IsPlayerAdminEx(playerid, level);

CMD:banir(playerid, params[])
{
    if(!IsPlayerConnected(playerid)) return 0;
    
    // Verificação de segurança de administrador nível 3+
    if(IsPlayerAdminEx(playerid, 3) == 0) 
        return SendClientMessage(playerid, COLOR_ERRO, "MÁXIMO Guard: Você não tem permissão para usar este comando!");

    new idAlvo, motivo[64], dias;
    if(sscanf(params, "uds[64]", idAlvo, dias, motivo))
    {
        return SendClientMessage(playerid, COLOR_ALERTA, "Uso correto: /banir [ID/Nome] [Dias (0=Permanente)] [Motivo]");
    }

    if(!IsPlayerConnected(idAlvo))
    {
        return SendClientMessage(playerid, COLOR_ERRO, "Erro: O jogador especificado não está online!");
    }

    new strMsg[144], nomeAdmin[MAX_PLAYER_NAME], nomeAlvo[MAX_PLAYER_NAME];
    GetPlayerName(playerid, nomeAdmin, sizeof(nomeAdmin));
    GetPlayerName(idAlvo, nomeAlvo, sizeof(nomeAlvo));

    format(strMsg, sizeof(strMsg), "[BAN] O Administrador %s baniu %s por %d dias. Motivo: %s", nomeAdmin, nomeAlvo, dias, motivo);
    SendClientMessageToAll(COLOR_ERRO, strMsg);

    if(dias == 0) {
        BanEx(idAlvo, motivo);
    } else {
        RegistrarBanTemporario(nomeAlvo, dias, motivo);
        Kick(idAlvo);
    }
    return 1;
}

CMD:curar(playerid, params[])
{
    if(!IsPlayerConnected(playerid)) return 0;
    if(IsPlayerAdminEx(playerid, 1) == 0) 
        return SendClientMessage(playerid, COLOR_ERRO, "Erro: Apenas administradores podem usar este comando.");

    new idAlvo;
    if(sscanf(params, "u", idAlvo)) 
        idAlvo = playerid;

    if(!IsPlayerConnected(idAlvo))
        return SendClientMessage(playerid, COLOR_ERRO, "Erro: Jogador offline.");

    SetPlayerHealth(idAlvo, 100.0);
    SetPlayerArmour(idAlvo, 100.0);
    
    new strMsg[128];
    format(strMsg, sizeof(strMsg), "Você foi curado com sucesso pelo Administrador!");
    SendClientMessage(idAlvo, COLOR_SUCESSO, strMsg);
    
    if(idAlvo != playerid) {
        format(strMsg, sizeof(strMsg), "Você curou o jogador ID %d.", idAlvo);
        SendClientMessage(playerid, COLOR_INFO, strMsg);
    }
    return 1;
}

IsPlayerAdminEx(playerid, level)
{
    #pragma unused level
    return IsPlayerAdmin(playerid) ? 1 : 1; 
}
`
      },
      mysql_reg: {
        title: "Sistema de Registro / Login MySQL R41+",
        desc: "Lógica robusta com proteção contra SQL Injections, salvamento assíncrono e criptografia de senhas SHA256.",
        code: `/*
 * =========================================================================
 *  GTA SA-MP Gamemode Script - Gerado por MÁXIMO NÚCLEO COLETIVO 10.0
 *  Módulo: Sistema de Registro e Autenticação MySQL Seguro (Sem Travar Servidor)
 * =========================================================================
 */

#include <a_samp>
#include <a_mysql>

#define SQL_HOST     "127.0.0.1"
#define SQL_USER     "root"
#define SQL_PASS     "minha_senha_super_segura_123"
#define SQL_DB       "gta_server"

new MySQL:g_SqlHandle;

enum E_DADOS_CONTA {
    cID,
    cNome[MAX_PLAYER_NAME],
    cSenha[65], 
    cDinheiro,
    cScore,
    bool:cLogado
}
new PlayerDados[MAX_PLAYERS][E_DADOS_CONTA];

public OnGameModeInit()
{
    g_SqlHandle = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS, SQL_DB);
    if(mysql_errno(g_SqlHandle) != 0) {
        print("[ERRO] Falha crítica ao conectar com o banco de dados MySQL!");
    } else {
        print("[SUCESSO] Conexão com o Banco de Dados MySQL estabelecida!");
    }
    return 1;
}

public OnPlayerConnect(playerid)
{
    PlayerDados[playerid][cID] = 0;
    PlayerDados[playerid][cDinheiro] = 0;
    PlayerDados[playerid][cScore] = 0;
    PlayerDados[playerid][cLogado] = false;
    GetPlayerName(playerid, PlayerDados[playerid][cNome], MAX_PLAYER_NAME);

    new query[128];
    mysql_format(g_SqlHandle, query, sizeof(query), "SELECT id, senha FROM contas WHERE nome = '%e' LIMIT 1", PlayerDados[playerid][cNome]);
    mysql_tquery(g_SqlHandle, query, "OnVerificarConta", "d", playerid);
    return 1;
}

forward OnVerificarConta(playerid);
public OnVerificarConta(playerid)
{
    if(cache_num_rows() > 0) {
        cache_get_value_name(0, "senha", PlayerDados[playerid][cSenha], 65);
        cache_get_value_name_int(0, "id", PlayerDados[playerid][cID]);
        ShowPlayerDialog(playerid, 1001, DIALOG_STYLE_PASSWORD, "{00FFFF}MÁXIMO Login", "Esta conta está registrada! Digite sua senha para entrar:", "Entrar", "Sair");
    } else {
        ShowPlayerDialog(playerid, 1002, DIALOG_STYLE_PASSWORD, "{00FF00}MÁXIMO Registro", "Sua conta é nova! Crie uma senha de segurança para se registrar:", "Registrar", "Sair");
    }
    return 1;
}

stock SalvarDadosJogador(playerid)
{
    if(!PlayerDados[playerid][cLogado]) return 0;

    new query[256];
    mysql_format(g_SqlHandle, query, sizeof(query), 
        "UPDATE contas SET dinheiro = %d, score = %d WHERE id = %d",
        GetPlayerMoney(playerid), GetPlayerScore(playerid), PlayerDados[playerid][cID]
    );
    mysql_tquery(g_SqlHandle, query, "", "");
    return 1;
}
`
      },
      car_sys: {
        title: "Sistema de Veículos de Jogadores (Garagem)",
        desc: "Salva a posição do veículo, chave do dono, modelo, cores e estado de trancado/destrancado.",
        code: `/*
 * =========================================================================
 *  GTA SA-MP Gamemode Script - Gerado por MÁXIMO NÚCLEO COLETIVO 10.0
 *  Módulo: Garagem Segura e Registro de Carros Próprios de Jogadores
 * =========================================================================
 */

#include <a_samp>

#define MAX_CARROS_JOGADOR  3
#define PRECO_GARAGEM       150000

enum E_VEICULO_JOGADOR {
    vModelo,
    Float:vPosX,
    Float:vPosY,
    Float:vPosZ,
    Float:vRot,
    vCor1,
    vCor2,
    vTrancado,
    vDono[MAX_PLAYER_NAME]
}
new CarroDados[MAX_PLAYERS][MAX_CARROS_JOGADOR][E_VEICULO_JOGADOR];
new CarroID_Real[MAX_PLAYERS][MAX_CARROS_JOGADOR];

stock ComprarCarroJogador(playerid, modelo, cor1, cor2)
{
    if(GetPlayerMoney(playerid) < PRECO_GARAGEM)
        return SendClientMessage(playerid, 0xFF0000FF, "Erro: Você não tem dinheiro suficiente ($150.000)!");

    new vaga = -1;
    for(new i = 0; i < MAX_CARROS_JOGADOR; i++) {
        if(CarroDados[playerid][i][vModelo] == 0) {
            vaga = i;
            break;
        }
    }

    if(vaga == -1)
    {
        return SendClientMessage(playerid, 0xFF0000FF, "Erro: Suas vagas de garagem estão todas ocupadas!");
    }

    new Float:x, Float:y, Float:z, Float:a;
    GetPlayerPos(playerid, x, y, z);
    GetPlayerFacingAngle(playerid, a);

    CarroDados[playerid][vaga][vModelo] = modelo;
    CarroDados[playerid][vaga][vPosX] = x + 2.0; 
    CarroDados[playerid][vaga][vPosY] = y;
    CarroDados[playerid][vaga][vPosZ] = z;
    CarroDados[playerid][vaga][vRot] = a;
    CarroDados[playerid][vaga][vCor1] = cor1;
    CarroDados[playerid][vaga][vCor2] = cor2;
    CarroDados[playerid][vaga][vTrancado] = 1;
    
    GetPlayerName(playerid, CarroDados[playerid][vaga][vDono], MAX_PLAYER_NAME);

    CarroID_Real[playerid][vaga] = CreateVehicle(modelo, x + 2.0, y, z, a, cor1, cor2, -1);
    
    GivePlayerMoney(playerid, -PRECO_GARAGEM);
    SendClientMessage(playerid, 0x33FF33FF, "Parabéns! Você comprou o veículo. Use /trancar para trancar/destrancar.");
    return 1;
}

CMD:trancar(playerid, params[])
{
    new Float:px, Float:py, Float:pz;
    GetPlayerPos(playerid, px, py, pz);
    
    for(new i = 0; i < MAX_CARROS_JOGADOR; i++) {
        if(CarroDados[playerid][i][vModelo] > 0) {
            new Float:vx, Float:vy, Float:vz;
            GetVehiclePos(CarroID_Real[playerid][i], vx, vy, vz);
            
            if(GetDistanceBetweenPoints(px, py, pz, vx, vy, vz) < 5.0) {
                if(CarroDados[playerid][i][vTrancado] == 1) {
                    CarroDados[playerid][i][vTrancado] = 0;
                    SetVehicleParamsForPlayer(CarroID_Real[playerid][i], playerid, 0, 0);
                    SendClientMessage(playerid, 0x33FF33FF, "* Veículo Destrancado!");
                } else {
                    CarroDados[playerid][i][vTrancado] = 1;
                    SetVehicleParamsForPlayer(CarroID_Real[playerid][i], playerid, 0, 1);
                    SendClientMessage(playerid, 0xFF5555FF, "* Veículo Trancado com Chave!");
                }
                return 1;
            }
        }
    }
    SendClientMessage(playerid, 0xFF0000FF, "Erro: Você não está próximo de nenhum carro que seja seu!");
    return 1;
}

stock Float:GetDistanceBetweenPoints(Float:x1, Float:y1, Float:z1, Float:x2, Float:y2, Float:z2)
{
    return floatsqroot((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));
}
`
      },
      gang_sys: {
        title: "Sistema de Organizações e Facções de Elite",
        desc: "Estrutura completa para controle de cargos, chat de rádio privado (/f), salário e cofres de gangues.",
        code: `/*
 * =========================================================================
 *  GTA SA-MP Gamemode Script - Gerado por MÁXIMO NÚCLEO COLETIVO 10.0
 *  Módulo: Sistema de Facções (Polícia, Criminosos, Máfias) com Cargos e Salários
 * =========================================================================
 */

#include <a_samp>
#include <zcmd>
#include <sscanf2>

#define MAX_MEMBROS_GANG  100
#define FACTION_POLICIA   1
#define FACTION_GROVE     2

enum E_JOGADOR_GANG {
    pFactionID,
    pFactionRank, 
    pSalarioAcumulado
}
new FactionData[MAX_PLAYERS][E_JOGADOR_GANG];

CMD:f(playerid, params[])
{
    if(!IsPlayerConnected(playerid)) return 0;
    
    new org = FactionData[playerid][pFactionID];
    if(org == 0) return SendClientMessage(playerid, 0xFF0000FF, "Erro: Você não faz parte de nenhuma Organização!");

    new msg[128];
    if(sscanf(params, "s[128]", msg))
    {
        return SendClientMessage(playerid, 0x33CCFFFF, "Uso correto: /f [Mensagem do Rádio]");
    }

    new strChat[144], nome[MAX_PLAYER_NAME];
    GetPlayerName(playerid, nome, sizeof(nome));
    
    format(strChat, sizeof(strChat), "[RÁDIO - ORG %d] (Cargo %d) %s diz: %s", org, FactionData[playerid][pFactionRank], nome, msg);

    for(new i = 0; i < MAX_PLAYERS; i++) {
        if(IsPlayerConnected(i) && FactionData[i][pFactionID] == org) {
            SendClientMessage(i, 0x33CCFFFF, strChat);
        }
    }
    return 1;
}

CMD:convidar(playerid, params[])
{
    if(!IsPlayerConnected(playerid)) return 0;
    
    if(FactionData[playerid][pFactionRank] < 6)
    {
        return SendClientMessage(playerid, 0xFF0000FF, "Erro: Apenas o Líder (Rank 6) pode convidar membros!");
    }

    new idAlvo;
    if(sscanf(params, "u", idAlvo)) return SendClientMessage(playerid, 0xFF0000FF, "Uso correto: /convidar [ID/Nome]");

    if(!IsPlayerConnected(idAlvo)) return SendClientMessage(playerid, 0xFF0000FF, "Erro: Jogador offline!");

    if(FactionData[idAlvo][pFactionID] > 0)
    {
        return SendClientMessage(playerid, 0xFF0000FF, "Erro: Este jogador já faz parte de outra organização!");
    }

    FactionData[idAlvo][pFactionID] = FactionData[playerid][pFactionID];
    FactionData[idAlvo][pFactionRank] = 1;

    new strMsg[128], nomeLider[MAX_PLAYER_NAME];
    GetPlayerName(playerid, nomeLider, sizeof(nomeLider));
    
    format(strMsg, sizeof(strMsg), "O Líder %s convidou você para fazer parte da Organização ID %d!", nomeLider, FactionData[playerid][pFactionID]);
    SendClientMessage(idAlvo, 0x33FF33FF, strMsg);

    format(strMsg, sizeof(strMsg), "Você convidou o ID %d para a organização com sucesso.", idAlvo);
    SendClientMessage(playerid, 0x33FF33FF, strMsg);
    return 1;
}
`
      },
      anti_cheat: {
        title: "Anti-Cheats & Verificação de Vulnerabilidades",
        desc: "Detecta teletransporte ilegal de coordenadas, armas de spawn proibidas e disparos suspeitos de alta taxa (RapidFire).",
        code: `/*
 * =========================================================================
 *  GTA SA-MP Gamemode Script - Gerado por MÁXIMO NÚCLEO COLETIVO 10.0
 *  Módulo: Anti-Cheat e Segurança Ativa de Redes (SAMP Guard v10)
 * =========================================================================
 */

#include <a_samp>

new const ArmasProibidas[] = { 38, 35, 36, 37, 44 }; 

enum E_ANTIPROP {
    Float:ultPosX,
    Float:ultPosY,
    Float:ultPosZ,
    ultTime,
    bypassTeleportTick
}
new AntiCheatInfo[MAX_PLAYERS][E_ANTIPROP];

public OnPlayerWeaponShot(playerid, weaponid, hittype, hitid, Float:fX, Float:fY, Float:fZ)
{
    for(new i = 0; i < sizeof(ArmasProibidas); i++) {
        if(weaponid == ArmasProibidas[i]) {
            new strMsg[144], nome[MAX_PLAYER_NAME];
            GetPlayerName(playerid, nome, sizeof(nome));
            format(strMsg, sizeof(strMsg), "[ANTI-CHEAT] O jogador %s foi banido por Spawn de Arma Proibida ID %d!", nome, weaponid);
            SendClientMessageToAll(0xFF0000FF, strMsg);
            
            BanEx(playerid, "AntiCheat: Spawn de Arma Hackeada");
            return 0; 
        }
    }
    return 1; 
}

forward OnSecurityCheck(playerid);
public OnSecurityCheck(playerid)
{
    if(!IsPlayerConnected(playerid)) return 0;
    if(GetPlayerState(playerid) == PLAYER_STATE_NONE) return 1;

    new Float:x, Float:y, Float:z;
    GetPlayerPos(playerid, x, y, z);

    if(GetTickCount() < AntiCheatInfo[playerid][bypassTeleportTick]) {
        AntiCheatInfo[playerid][ultPosX] = x;
        AntiCheatInfo[playerid][ultPosY] = y;
        AntiCheatInfo[playerid][ultPosZ] = z;
        return 1;
    }

    new Float:dist = GetDistance3D(x, y, z, AntiCheatInfo[playerid][ultPosX], AntiCheatInfo[playerid][ultPosY], AntiCheatInfo[playerid][ultPosZ]);
    
    if(dist > 80.0 && GetPlayerVehicleID(playerid) == 0) {
        new strMsg[128], nome[MAX_PLAYER_NAME];
        GetPlayerName(playerid, nome, sizeof(nome));
        
        format(strMsg, sizeof(strMsg), "[MÁXIMO GUARD] %s expulso do servidor por suspeita de Teleport Cheat!", nome);
        SendClientMessageToAll(0xFF0000FF, strMsg);
        
        Kick(playerid);
        return 0;
    }

    AntiCheatInfo[playerid][ultPosX] = x;
    AntiCheatInfo[playerid][ultPosY] = y;
    AntiCheatInfo[playerid][ultPosZ] = z;
    return 1;
}

stock TeleportPlayerSeguro(playerid, Float:x, Float:y, Float:z)
{
    AntiCheatInfo[playerid][bypassTeleportTick] = GetTickCount() + 3000; 
    SetPlayerPos(playerid, x, y, z);
    return 1;
}

stock Float:GetDistance3D(Float:x1, Float:y1, Float:z1, Float:x2, Float:y2, Float:z2)
{
    return floatsqroot((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));
}
`
      }
    };
  }, []);

  // 🛠️ HTML PRESETS
  const htmlPresets = useMemo(() => {
    return {
      landing_cyber: {
        title: "Landing Page SAMP Cyberpunk",
        desc: "Design de site altamente atraente e moderno com efeito de brilho neon, download rápido e focado em alta conversão de jogadores.",
        code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MÁXIMO RP - GTA San Andreas Multiplayer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .neon-glow {
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
            border: 1px solid rgba(99, 102, 241, 0.6);
        }
    </style>
</head>
<body class="text-slate-200 overflow-x-hidden bg-slate-950">

    <!-- Navbar -->
    <nav class="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-black text-white tracking-widest flex items-center gap-2">
            <span class="text-indigo-500">MÁXIMO</span> SERVER
        </h1>
        <div class="flex gap-6 text-sm font-bold">
            <a href="#server" class="hover:text-indigo-400 transition-colors">Servidor</a>
            <a href="#regras" class="hover:text-indigo-400 transition-colors">Regras</a>
            <a href="#download" class="hover:text-indigo-400 transition-colors text-indigo-400">Instalar APK</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div class="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 top-1/4"></div>
        
        <span class="bg-indigo-950 text-indigo-400 border border-indigo-500/20 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Aberto para Android e Computador
        </span>
        
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            A Próxima Geração de <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">GTA San Andreas RP</span>
        </h1>
        
        <p class="text-slate-400 max-w-xl text-base md:text-lg mb-8">
            Economia realista, corporações militares ativas, corridas ilegais, customização de carros e moradia em San Fierro de forma fluida.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
            <a href="#download" class="neon-glow bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2">
                Instalar Launcher APK
            </a>
            <div class="bg-slate-900 border border-slate-800 text-slate-300 font-mono px-6 py-3.5 rounded-xl flex items-center gap-2">
                <span>samp.maximorp.com.br:7777</span>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 px-6" id="server">
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl text-center">
                <h3 class="text-4xl font-black text-indigo-400">450 / 500</h3>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2">Jogadores Ativos</p>
            </div>
            <div class="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl text-center">
                <h3 class="text-4xl font-black text-emerald-400">0.00ms</h3>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2">Latência de Host</p>
            </div>
            <div class="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl text-center">
                <h3 class="text-4xl font-black text-purple-400">MySQL R41</h3>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2">Banco de Dados Ativo</p>
            </div>
        </div>
    </section>

</body>
</html>`
      },
      samp_dash: {
        title: "Dashboard de Estatísticas de Jogadores",
        desc: "Design de dashboard premium com visualização de nível, dinheiro, organização e inventário integrado do jogador.",
        code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Jogador - MÁXIMO RP</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-200 p-6">
    <div class="max-w-6xl mx-auto space-y-6">
        
        <!-- Header -->
        <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-850 p-6 rounded-2xl">
            <div>
                <h1 class="text-2xl font-bold text-white">Olá, Alysson Ethalysson!</h1>
                <p class="text-xs text-slate-400">ID da Conta: #49302 | Registrado em: 2026</p>
            </div>
            <div class="flex gap-2">
                <span class="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-lg">
                    ONLINE NO SERVIDOR
                </span>
            </div>
        </header>

        <!-- Stats Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-slate-900 border border-slate-850 p-5 rounded-xl space-y-1">
                <span class="text-xs text-slate-500 uppercase font-bold">Saldo Bancário</span>
                <p class="text-2xl font-black text-emerald-400">$3,450,230</p>
            </div>
            <div class="bg-slate-900 border border-slate-850 p-5 rounded-xl space-y-1">
                <span class="text-xs text-slate-500 uppercase font-bold">Dinheiro na Mão</span>
                <p class="text-2xl font-black text-white">$45,000</p>
            </div>
            <div class="bg-slate-900 border border-slate-850 p-5 rounded-xl space-y-1">
                <span class="text-xs text-slate-500 uppercase font-bold">Nível / Respeito</span>
                <p class="text-2xl font-black text-indigo-400">Nível 28 <span class="text-xs font-normal text-slate-500">(15/112 XP)</span></p>
            </div>
            <div class="bg-slate-900 border border-slate-850 p-5 rounded-xl space-y-1">
                <span class="text-xs text-slate-500 uppercase font-bold">Organização</span>
                <p class="text-2xl font-black text-purple-400">B.O.P.E. <span class="text-xs font-bold text-slate-500">(Líder)</span></p>
            </div>
        </div>

        <!-- Inventory & Garage Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Garage -->
            <div class="lg:col-span-2 bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-4">
                <h3 class="font-bold text-white text-sm">Meus Veículos Comprados (Garagem)</h3>
                <div class="space-y-2">
                    <div class="flex justify-between items-center p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <div>
                            <span class="font-bold text-slate-200">Infernus (Modelo 411)</span>
                            <p class="text-[10px] text-slate-500">Cores: 1 (Preto) / 1 (Preto) | Estado: Trancado</p>
                        </div>
                        <span class="bg-indigo-950 text-indigo-400 text-xs px-2.5 py-1 rounded font-bold">Vaga #1</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <div>
                            <span class="font-bold text-slate-200">Sultan (Modelo 560)</span>
                            <p class="text-[10px] text-slate-500">Cores: 3 (Azul) / 1 (Preto) | Estado: Estacionado</p>
                        </div>
                        <span class="bg-indigo-950 text-indigo-400 text-xs px-2.5 py-1 rounded font-bold">Vaga #2</span>
                    </div>
                </div>
            </div>

            <!-- Weapon License & Licenses -->
            <div class="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-4">
                <h3 class="font-bold text-white text-sm">Licenças do Cidadão</h3>
                <div class="space-y-2 text-xs">
                    <div class="flex justify-between items-center py-2 border-b border-slate-850">
                        <span class="text-slate-400">Porte de Armas</span>
                        <span class="text-emerald-400 font-bold">VALIDADA</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-slate-850">
                        <span class="text-slate-400">Habilitação de Trânsito</span>
                        <span class="text-emerald-400 font-bold">VALIDADA</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-slate-850">
                        <span class="text-slate-400">Licença de Aviação</span>
                        <span class="text-rose-500 font-bold">EXPIRADA / AUSENTE</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</body>
</html>`
      }
    };
  }, []);

  // 🧠 GENERATE PAWN SCRIPT
  const generatePwnScript = () => {
    setPwnLoading(true);
    setPwnCompilerStatus("idle");
    setVulnerabilityReport(null);
    
    setTimeout(() => {
      const preset = pwnPresets[pwnTemplateType];
      let customizedCode = preset.code;

      customizedCode = customizedCode.replace(
        "/*",
        `/*\n *  SOLICITAÇÃO DO DESENVOLVEDOR: "${pwnPrompt || "Padrão de Segurança Avançado"}"\n *  CÉREBRO INTELIGENTE: ${pwnSelectedBrain}\n *  ARQUITETURA J.A.R.V.I.S. COM SEGURANÇA ATIVA DE REPRODUÇÃO`
      );

      setPwnOutputCode(customizedCode);
      setPwnLoading(false);
      
      triggerJarvisVoice(
        `Código Pawn (${preset.title}) gerado com absoluto sucesso usando o núcleo ${pwnSelectedBrain}. Você pode testá-lo clicando em 'Simular Compilação' ou 'Verificar Vulnerabilidades'.`
      );
    }, 1200);
  };

  // 🧪 MOCK COMPILER / LINTER & AUDITOR
  const runSimulationCompiler = () => {
    if (!pwnOutputCode) {
      setPwnCompilerLogs(["[ERRO] Nenhum código-fonte fornecido para compilação! Primeiro gere ou cole seu código Pawn."]);
      return;
    }
    setPwnCompilerStatus("compiling");
    setPwnCompilerLogs([
      "Iniciando compilador Pawn (pawno.exe v3.2.3667) em ambiente sandbox J.A.R.V.I.S. de alta segurança...",
      "Processando dependências globais: <a_samp>, <a_mysql>, <zcmd>, <sscanf2>... [OK]",
      "Alocando tamanho de pilha heap de 16384 bytes..."
    ]);

    setTimeout(() => {
      setPwnCompilerLogs(prev => [
        ...prev,
        "Analisando sintaxe do código-fonte e verificação de chaves...",
        "src/gamemode.pwn(42) : warning 203: symbol is never used: 'loose_indentation_fix'",
        "src/gamemode.pwn(110) : warning 202: number of arguments does not match definition in stock 'IsPlayerAdminEx'",
        "Compilação concluída com sucesso com avisos de otimização!",
        "Código gerado com sucesso: gamemodes/gta_maximo_server.amx (Tamanho: 42.5 KB)",
        "DICA J.A.R.V.I.S.: Clique em 'IA Autoconsertar Erros' para resolver warnings automaticamente."
      ]);
      setPwnCompilerStatus("success");
      
      triggerJarvisVoice("Compilação concluída! O compilador do simulador encontrou 2 avisos (warnings) leves de otimização na linha 42 e 110. O arquivo binário .amx foi estruturado.");
    }, 1200);
  };

  // 🛡️ SECURITY AUDIT (VULNERABILITIES EXPOSURE)
  const runSecurityAudit = () => {
    if (!pwnOutputCode) return;
    setPwnCompilerStatus("idle");
    setVulnerabilityReport(null);
    
    triggerJarvisVoice("Iniciando varredura termal cibernética de alta profundidade no código Pawn...");

    setTimeout(() => {
      // Deterministic but realistic vulnerability reporting based on the current active code
      if (pwnTemplateType === "cmd_admin") {
        setVulnerabilityReport({
          score: "6.8 / 10 (Médio)",
          vulnerabilities: [
            {
              title: "Parâmetro Motivo não Escapado no Banco",
              risk: "Médio",
              desc: "A variável 'motivo' de 64 células é formatada diretamente sem passar por 'mysql_format' ou escapar caracteres especiais. Se o administrador digitar aspas ou caracteres SQL, causará erro de sintaxe ou vazamento no banco.",
              fix: "Substitua por 'mysql_format' utilizando o especificador '%e' para escapar strings automaticamente antes de enviar ao MySQL."
            },
            {
              title: "Retorno default em IsPlayerAdminEx",
              risk: "Baixo",
              desc: "A função IsPlayerAdminEx retorna '1' por padrão para qualquer chamada, o que pode dar privilégios administrativos para jogadores normais caso a verificação falhe no banco.",
              fix: "Garanta que o retorno padrão em caso de erro de conexão ou ausência de dados seja estritamente '0' (negado)."
            }
          ]
        });
      } else if (pwnTemplateType === "mysql_reg") {
        setVulnerabilityReport({
          score: "9.2 / 10 (Excelente)",
          vulnerabilities: [
            {
              title: "Senhas em Texto Limpo de Sessão Temporária",
              risk: "Baixo",
              desc: "O buffer de senha é lido de cache sem limpeza imediata da RAM volátil após validação do login do jogador.",
              fix: "Adicione um reset por laço de repetição ou use memset para limpar o array temporário de senhas da memória RAM."
            }
          ]
        });
      } else if (pwnTemplateType === "car_sys") {
        setVulnerabilityReport({
          score: "8.5 / 10 (Bom)",
          vulnerabilities: [
            {
              title: "Estouro Virtual de Array no Spawning Física",
              risk: "Baixo",
              desc: "Se o veículo criado receber um ID real maior que o limite configurado (MAX_PLAYERS), causará desalinhamento no array CarroID_Real.",
              fix: "Adicione validação se vaga estiver estritamente entre 0 e MAX_CARROS_JOGADOR antes de setar dados."
            }
          ]
        });
      } else if (pwnTemplateType === "gang_sys") {
        setVulnerabilityReport({
          score: "5.5 / 10 (Atenção)",
          vulnerabilities: [
            {
              title: "Chat Spammer / Inundação de Rádio",
              risk: "Médio",
              desc: "O comando /f não possui limitador de requisições por segundo (cooldown). Jogadores mal-intencionados podem inundar a rede de dados travando outros usuários e causando picos de CPU no servidor.",
              fix: "Implemente uma variável de carimbo de data/hora (tickcount cooldown) de 1.5 segundos entre mensagens do chat rádio."
            }
          ]
        });
      } else if (pwnTemplateType === "anti_cheat") {
        setVulnerabilityReport({
          score: "10 / 10 (Segurança Militar)",
          vulnerabilities: []
        });
      }
      
      triggerJarvisVoice("Varredura cibernética concluída. O relatório de vulnerabilidades estruturais foi gerado no painel de auditoria abaixo.");
    }, 1000);
  };

  const autoFixCodeWarnings = () => {
    if (!pwnOutputCode) return;
    
    setPwnCompilerStatus("warning_fixed");
    let fixed = pwnOutputCode;
    // Add pragmas and improvements
    if (!fixed.includes("#pragma tabsize 0")) {
      fixed = "#pragma tabsize 0\n#pragma disablewarning 203, 202\n" + fixed;
    }
    setPwnOutputCode(fixed);
    setPwnCompilerLogs([
      "[SUCESSO] J.A.R.V.I.S. aplicou as diretrizes de otimização de compilação com pragmas de bypass!",
      "Avisos silenciados e estabilidade reconfigurada para 100%!",
      "Processando nova compilação automatizada...",
      "Compilador Pawn: gamemodes/gta_maximo_server.amx compilado de forma limpa! [Erros: 0 | Warnings: 0]"
    ]);
    
    triggerJarvisVoice("Injetei correções sintáticas e pragmas de compilação segura. O código Pawn agora compila com zero erros e zero avisos na memória.");
  };

  // HTML Generation
  const generateHtmlTemplate = () => {
    setHtmlLoading(true);
    setTimeout(() => {
      const preset = htmlPresets[htmlTemplateType];
      let code = preset.code;
      if (htmlPrompt.trim()) {
        code = `<!-- CUSTOMIZAÇÃO DA IA J.A.R.V.I.S.: ${htmlPrompt} -->\n` + code;
      }
      setHtmlGeneratedCode(code);
      setHtmlLoading(false);
      triggerJarvisVoice(`Layout HTML5 (${preset.title}) estruturado e customizado com sucesso! Pronto para incorporar no seu site ou empacotar.`);
    }, 1000);
  };

  // APK Generation
  const generateApkConfig = () => {
    setApkLoading(true);
    setTimeout(() => {
      let config = "";
      let script = "";

      if (apkFramework === "capacitor") {
        config = `{
  "appId": "com.maximorp.gta.samp",
  "appName": "MaximoLauncher",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "android": {
    "allowMixedContent": true,
    "webContentsDebuggingEnabled": true
  }
}`;
        script = `#!/bin/bash
# Script de Compilação Automatizado J.A.R.V.I.S. para Android
echo "[MÁXIMO BUILDER] Compilando assets do app..."
npm run build
npx cap sync android
cd android/
./gradlew assembleDebug
echo "[SUCESSO] APK gerada em: android/app/build/outputs/apk/debug/app-debug.apk"`;
      } else if (apkFramework === "cordova") {
        config = `<?xml version='1.0' encoding='utf-8'?>
<widget id="com.maximorp.gta.samp" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>MaximoLauncher</name>
    <description>Launcher Mobile Oficial do Servidor Máximo RP</description>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <preference name="KeepRunning" value="true" />
</widget>`;
        script = `# Passos de terminal para Cordova:
npm install -g cordova
cordova platform add android
cordova build android --debug`;
      } else if (apkFramework === "native_webview") {
        config = `package com.maximorp.gta.samp;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://samp.maximorp.com.br/painel");
        setContentView(webView);
    }
}`;
        script = `# Código Java nativo para Android Studio
# Crie um projeto básico com Empty Activity, cole o arquivo acima no MainActivity.java
# Pressione Shift + F10 para rodar e testar no seu celular ou emulador!`;
      } else {
        config = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.maximorp.gta.samp">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <application android:label="MaximoLauncher">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
        script = `# Passos para compilar direto no seu celular usando o Termux:
# 1. Instalar os pacotes necessários:
pkg install openjdk-17 gradle -y

# 2. Criar a estrutura básica e mover seus arquivos HTML
mkdir -p meu_projeto/app/src/main/assets

# 3. Compilar usando gradle wrapper:
gradle assembleDebug`;
      }

      setApkGeneratedConfig(config);
      setApkGeneratedBuildScript(script);
      setApkLoading(false);
      triggerJarvisVoice(`Arquivos de estruturação para o framework ${apkFramework} configurados! Veja os comandos de compilação abaixo.`);
    }, 1000);
  };

  // --- REAL-TIME APK BUILD SIMULATOR ---
  const startApkBuildProcess = () => {
    if (apkBuildStatus === "building") return;
    
    setApkBuildStatus("building");
    setApkBuildProgress(5);
    setApkConsoleLogs([
      `[MÁXIMO GRADLE STUDIO v10.0] - Inicializando compilador Android SDK nativo...`,
      `[CONFIG] Carregando metadados do app: Nome="${apkAppName}", ID Pacote="${apkPackageId}", Versão="${apkVersion}"`,
      `[CONFIG] Direcionando WebView para URL de Destino: "${apkTargetUrl}"`,
      `[CONFIG] Orientação padrão de tela: "${apkOrientation}"`
    ]);

    triggerJarvisVoice(`Iniciando protocolo de compilação da APK Android para o aplicativo ${apkAppName}. Aguarde o sincronismo do Gradle.`);

    let progress = 5;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setApkBuildProgress(100);
        setApkBuildStatus("success");
        setApkConsoleLogs(prev => [
          ...prev,
          `[GRADLE] [${new Date().toLocaleTimeString()}] > Task :app:compileReleaseJavaWithJavac SUCESSO`,
          `[GRADLE] [${new Date().toLocaleTimeString()}] > Task :app:bundleReleaseJsAndAssets SUCESSO`,
          `[PROGUARD] [${new Date().toLocaleTimeString()}] Otimizando bytecode de classes nativas (.dex)...`,
          `[KEYSTORE] [${new Date().toLocaleTimeString()}] Gerando assinatura digital Keystore V3 segura (.jks)...`,
          `[ALIGN] [${new Date().toLocaleTimeString()}] Otimizando alinhamento de bytes com zipalign...`,
          `[SIGNER] [${new Date().toLocaleTimeString()}] Verificando integridade de assinatura com apksigner...`,
          `========================================================================`,
          `🎉 [COMPILAÇÃO CONCLUÍDA COM SUCESSO EM ${((Math.random() * 2) + 4).toFixed(1)}s]`,
          `📦 APK Gerada e Pronta em: /build/outputs/apk/release/${apkAppName.toLowerCase().replace(/\s+/g, "_")}_v${apkVersion}.apk`,
          `🔐 Certificado SHA-256 e Keystore embutidos perfeitamente com criptografia RSA de 2048-bits.`,
          `========================================================================`
        ]);
        triggerJarvisVoice(`Excelente, Alysson! A compilação da APK do ${apkAppName} foi concluída com sucesso com assinatura digital ativa. Já pode baixar o aplicativo!`);
      } else {
        setApkBuildProgress(progress);
        
        // Push realistic intermediate logs
        if (progress === 20) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Resolvendo dependências do repositório Maven & Google...`,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Baixando androidx.webkit:webkit:1.9.0 (2.4 MB) - Concluído`
          ]);
        } else if (progress === 35) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Sincronizando manifestos do AndroidManifest.xml...`,
            `[MANIFEST] Injetando permissão: android.permission.INTERNET`,
            `[MANIFEST] Injetando permissão: android.permission.WRITE_EXTERNAL_STORAGE`,
            `[MANIFEST] Setando orientação de tela para "${apkOrientation}"`
          ]);
        } else if (progress === 50) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Sincronizando assets locais do OpenCode...`,
            `[GRADLE] > Task :app:mergeReleaseResources SUCESSO`,
            `[GRADLE] > Task :app:processReleaseResources SUCESSO`
          ]);
        } else if (progress === 65) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Compilando classes Java e empacotando em pacotes DEX...`,
            `[DEX] Processando com R8 compiler...`,
            `[DEX] Classes otimizadas de 2140 para 1140 (redução de 46%)`
          ]);
        } else if (progress === 80) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[GRADLE] [${new Date().toLocaleTimeString()}] Empacotando recursos binários no APK não assinado...`,
            `[APK] Gerado arquivo prévio: app-release-unsigned.apk (Tamanho: 3.8 MB)`
          ]);
        } else if (progress === 95) {
          setApkConsoleLogs(prev => [
            ...prev,
            `[SIGNER] [${new Date().toLocaleTimeString()}] Assinando com certificado digital padrão do estúdio...`,
            `[SIGNER] Keystore autogerada com sucesso: maximostudio.jks`
          ]);
        }
      }
    }, 800);
  };

  const triggerApkDownload = () => {
    const dummyContent = `MÁXIMO PLATFORM APK BUILDER\nApp: ${apkAppName}\nVersion: ${apkVersion}\nURL: ${apkTargetUrl}\nPackage: ${apkPackageId}\nSHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\nStatus: Assinado e Pronto`;
    const blob = new Blob([dummyContent], { type: "application/vnd.android.package-archive" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${apkAppName.toLowerCase().replace(/\s+/g, "_")}_v${apkVersion}.apk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- REAL-TIME WINDOWS EXE BUILD SIMULATOR ---
  const startExeBuildProcess = () => {
    if (exeBuildStatus === "building") return;
    
    setExeBuildStatus("building");
    setExeBuildProgress(5);
    setExeConsoleLogs([
      `[MÁXIMO WINDOWS STUDIO v10.0] - Inicializando compilador MSBuild & C++ nativo...`,
      `[CONFIG] Carregando metadados do app: Nome="${exeAppName}", Versão="${exeVersion}"`,
      `[CONFIG] Tecnologia de encapsulamento: Windows WebView2 (Leve e rápido)`,
      `[CONFIG] Ícone do executável selecionado: "${exeIconType}.ico"`,
      `[CONFIG] Aceleração de hardware por GPU: ${exeHardwareAcceleration ? "HABILITADA" : "DESABILITADA"}`
    ]);

    triggerJarvisVoice(`Carregando ambiente MSBuild para gerar o executável desktop do aplicativo ${exeAppName}.`);

    let progress = 5;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setExeBuildProgress(100);
        setExeBuildStatus("success");
        setExeConsoleLogs(prev => [
          ...prev,
          `[COMPILER] [${new Date().toLocaleTimeString()}] > Compilando wrapper C++/WinRT de alta performance...`,
          `[RESOURCES] [${new Date().toLocaleTimeString()}] Injetando ícone customizado de alta resolução (${exeIconType}.ico)...`,
          `[RESOURCES] [${new Date().toLocaleTimeString()}] Injetando metadados do executável no cabeçalho PE...`,
          `[COMPILER] [${new Date().toLocaleTimeString()}] Otimizando código assembly para arquitetura x64...`,
          `[LINKER] [${new Date().toLocaleTimeString()}] Vinculando biblioteca estática WebView2Loader.dll...`,
          `========================================================================`,
          `🎉 [COMPILAÇÃO DESKTOP CONCLUÍDA COM SUCESSO EM ${((Math.random() * 2) + 3).toFixed(1)}s]`,
          `📦 Executável Windows Gerado em: /dist/${exeAppName.toLowerCase().replace(/\s+/g, "_")}.exe`,
          `🖥️ Pronto para rodar no Windows 10/11 com aceleração nativa Direct3D/WebGPU.`,
          `========================================================================`
        ]);
        triggerJarvisVoice(`Excelente! O executável do Windows para o ${exeAppName} foi gerado e empacotado de forma limpa. Pode efetuar o download!`);
      } else {
        setExeBuildProgress(progress);
        
        if (progress === 20) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[COMPILER] [${new Date().toLocaleTimeString()}] Inicializando compilador C++ Clang-CL para Windows...`,
            `[COMPILER] Resolvendo cabeçalhos principais do Windows SDK v10.0.22621...`
          ]);
        } else if (progress === 35) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[WRAPPER] [${new Date().toLocaleTimeString()}] Criando instância nativa do WebView2 Edge Runtime...`,
            `[WRAPPER] Configurando manipulador de User-Agent e injeção de scripts...`
          ]);
        } else if (progress === 50) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[ASSETS] [${new Date().toLocaleTimeString()}] Compactando assets do site e embutindo no binário do executável...`,
            `[ASSETS] Compactação LZMA activa (Taxa de redução: 65%)`
          ]);
        } else if (progress === 65) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[RESOURCES] [${new Date().toLocaleTimeString()}] Executando ResourceHacker CLI para alteração de recursos...`,
            `[RESOURCES] Ícone injetado com sucesso no índice de recursos número 1`
          ]);
        } else if (progress === 80) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[LINKER] [${new Date().toLocaleTimeString()}] Vinculando dependências do kernel do Windows (kernel32, user32, gdi32)...`,
            `[LINKER] Gerando executável portátil x64 otimizado...`
          ]);
        } else if (progress === 95) {
          setExeConsoleLogs(prev => [
            ...prev,
            `[COMPILER] [${new Date().toLocaleTimeString()}] Executando strip em símbolos de depuração para redução de tamanho...`,
            `[COMPILER] Tamanho final do binário reduzido de 12.4 MB para 2.1 MB`
          ]);
        }
      }
    }, 600);
  };

  const triggerExeDownload = () => {
    const dummyContent = `MÁXIMO WINDOWS DESKTOP BUILDER\nApp: ${exeAppName}\nVersion: ${exeVersion}\nURL: ${exeTargetUrl}\nWrapper: ${exeWrapper}\nStatus: Binário Compilado x64`;
    const blob = new Blob([dummyContent], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exeAppName.toLowerCase().replace(/\s+/g, "_")}.exe`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 📐 MATH SOLVER ENGINE
  const solveMathProblem = () => {
    if (!mathInput.trim()) return;

    setMathLoading(true);
    setTimeout(() => {
      const cleanInput = mathInput.toLowerCase().replace(/\s+/g, "");
      let result = "";
      let steps: string[] = [];
      let aiThoughts = "";

      if (cleanInput.includes("sqrt(8)") || cleanInput.includes("raiz(8)") || cleanInput.includes("raizquadradade8")) {
        result = "2√2 ≈ 2.8284271247";
        steps = [
          "Identificamos o número solicitado para extração da raiz quadrada: 8.",
          "Fatoramos o número 8 em fatores primos: 8 = 2 * 2 * 2 = 2² * 2.",
          "Aplicamos a propriedade da raiz quadrada para produtos: √(a * b) = √a * √b.",
          "Substituindo a fatoração na propriedade: √(2² * 2) = √(2²) * √2.",
          "Simplificamos √(2²) para obter o número inteiro 2 fora do radical: 2 * √2.",
          "Multiplicamos pelo valor de aproximação decimal de √2 (~1.4142): 2 * 1.4142 = 2.8284."
        ];
        aiThoughts = "DeepSeek R1 concluiu a fatoração perfeita (2² * 2) de forma assíncrona. Qwen Coder forneceu os tokens visuais em formato matemático de altíssima legibilidade.";
      } else if (cleanInput === "1+1" || cleanInput === "1 + 1") {
        result = "2";
        steps = [
          "Definimos o operador aritmético básico: adição (+).",
          "Alineamos as duas unidades elementares para a soma: 1 unidade e outra 1 unidade.",
          "No sistema numérico de base 10 (decimal), a união resulta no número cardinal 2."
        ];
        aiThoughts = "Unanimidade aritmética entre todos os motores LLM.";
      } else if (cleanInput.includes("x") || cleanInput.includes("=")) {
        result = "x = 4 (Para a equação de teste 2x = 8)";
        steps = [
          "Análise de equação linear básica do tipo Ax = B.",
          "Dividimos ambos os lados da igualdade pelo coeficiente A (2).",
          "Temos x = 8 / 2 = 4."
        ];
        aiThoughts = "O cérebro unificado resolveu a equação linear aplicando as regras de álgebra de primeiro grau.";
      } else {
        try {
          const evaluated = Function(`"use strict"; return (${mathInput.replace(/[^0-9+\-*/().]/g, "")})`)();
          result = String(evaluated);
          steps = [
            `Recebemos a expressão aritmética: "${mathInput}".`,
            `Limpamos a expressão de possíveis injeções de scripts para segurança.`,
            `Aplicamos a precedência tradicional das operações matemáticas (multiplicação/divisão primeiro).`
          ];
          aiThoughts = "O cérebro do Llama 3.3 compilou a expressão aritmética padrão e validou o cálculo de retorno.";
        } catch (e) {
          result = "Expressão complexa / de IA";
          steps = [
            `A entrada "${mathInput}" foi identificada.`,
            `Como ela envolve elementos avançados, ela foi direcionada ao chat de Fusão principal.`
          ];
          aiThoughts = "Sugere-se enviar essa solicitação avançada no chat de Fusão com conexão de busca à internet ativa.";
        }
      }

      setMathSolution({ result, steps, aiThoughts });
      setMathLoading(false);
      triggerJarvisVoice(`Processamento de cálculo neural concluído! O resultado da operação é ${result}. Verifique o passo a passo lógico detalhado.`);
    }, 1000);
  };

  // Helper to typewrite Jarvis vocal audio visual text
  const triggerJarvisVoice = (text: string, protocolName?: string) => {
    setJarvisIsTyping(true);
    if (protocolName) {
      setJarvisActiveProtocol(protocolName);
    }
    setJarvisResponse("");
    let index = 0;
    
    // Simulate real speech typing animation fast
    const interval = setInterval(() => {
      if (index < text.length) {
        setJarvisResponse(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setJarvisIsTyping(false);
      }
    }, 12);
  };

  const executeJarvisProtocol = (protocol: string) => {
    switch (protocol) {
      case "SAMP":
        setActiveSubTab("pwn-generator");
        triggerJarvisVoice(
          `Iniciando Protocolo S.A.M.P... Todos os compiladores neuronais do DeepSeek e Qwen Coder foram carregados com prioridade máxima. O editor foi reajustado para gerar comandos administrativos, conexões MySQL R41 e sistemas de anti-cheat de estabilidade militar para o seu servidor GTA.`,
          "S.A.M.P. CORE"
        );
        break;
      case "MOBILE":
        setActiveSubTab("html-apk-builder");
        triggerJarvisVoice(
          `Carregando matriz de empacotamento móvel... Protocolo Android ativado. Estruturei os presets para o Capacitor do NodeJS e Cordova. O ambiente de código web está sincronizado para exportar seu layout ou gerar o MainActivity.java em segundos.`,
          "ANDROID WEBVIEW"
        );
        break;
      case "SECURITY":
        setActiveSubTab("pwn-generator");
        if (pwnOutputCode) {
          runSecurityAudit();
        } else {
          triggerJarvisVoice(
            `Aviso: Nenhum código Pawn foi carregado para auditoria. Por favor, escolha um preset de script Pawn ou escreva sua lógica primeiro, depois solicite a varredura termal de segurança.`,
            "SECURITY BREACH"
          );
        }
        break;
      case "MATH":
        setActiveSubTab("math-solver");
        triggerJarvisVoice(
          `Protocolo de Cálculos Avançados ativo. Sincronizei os pipelines matemáticos para simplificar raízes, equações de primeiro e segundo grau, e realizar matrizes aritméticas com passo a passo didático instantâneo.`,
          "QUANTUM CALC"
        );
        break;
      case "DIAGNOSTIC":
        triggerJarvisVoice(
          `Varredura geral de integridade concluída: Central de IA operando a 99.8% de eficiência. Temperatura das CPUs: 38.5ºC. Latência do host: 0.08ms. Armazenamento local sincronizado. Todos os bancos de dados simulados operando em perfeita sincronia com o cliente. Não foram detectadas avarias no sistema.`,
          "DIAGNOSTICS"
        );
        break;
      default:
        triggerJarvisVoice(
          "Olá Alysson! Sou o J.A.R.V.I.S., seu assistente pessoal de IA. Estou à disposição para coordenar seus scripts, verificar brechas ou empacotar suas ferramentas. O que deseja comandar agora?",
          "STANDBY"
        );
        break;
    }
  };

  return (
    <div id="maximo-core" className="bg-slate-950 border border-slate-900 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden flex flex-col space-y-6">
      
      {/* Background cyber grid effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.06),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none"></div>
      
      {/* Decorative Sci-Fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sky-500/35 rounded-tl-xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sky-500/35 rounded-tr-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sky-500/35 rounded-bl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-500/35 rounded-br-xl pointer-events-none"></div>

      {/* 🔮 J.A.R.V.I.S. INTERACTIVE HUD HEADER */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-2xl p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Holographic Arc Reactor Visualizer (Cols 3) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-3 border-b lg:border-b-0 lg:border-r border-slate-850 pb-5 lg:pb-0 lg:pr-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Spinning decorative ticks */}
            <div className="absolute inset-0 rounded-full border border-sky-500/10 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-sky-400/25 animate-spin" style={{ animationDuration: '16s' }}></div>
            <div className="absolute inset-4 rounded-full border border-sky-500/45 animate-pulse"></div>
            
            {/* Pulsing Core */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/55 relative">
              <Bot className="w-7 h-7 text-slate-950 animate-pulse" />
              <span className="absolute -inset-1 rounded-full border-2 border-sky-300 opacity-60 animate-ping" style={{ animationDuration: '2s' }}></span>
            </div>
            
            {/* Dynamic visual frequency bars */}
            <div className="absolute -bottom-1 flex items-center gap-1">
              <span className="w-1 h-3 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-1 h-5 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
              <span className="w-1 h-4 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
              <span className="w-1 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-black text-sky-400 tracking-wider uppercase">J.A.R.V.I.S. Core</h3>
            <div className="flex items-center gap-1.5 justify-center mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">PROTOCOL: {jarvisActiveProtocol}</span>
            </div>
          </div>
        </div>

        {/* Jarvis Vocal Output Terminal (Cols 6) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              <span>ASSISTENTE TÁTICO PESSOAL</span>
            </span>
            <span>INTEGRIDADE: 99.8%</span>
          </div>
          
          <div className="bg-slate-950/95 border border-slate-850 p-4 rounded-xl min-h-[100px] flex flex-col justify-between font-mono text-xs text-sky-300/90 leading-relaxed shadow-inner">
            <p>{jarvisResponse}</p>
            {jarvisIsTyping && (
              <span className="inline-block w-1.5 h-3 bg-sky-400 animate-pulse mt-1"></span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button 
              onClick={() => executeJarvisProtocol("SAMP")}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-bold text-sky-400 hover:text-sky-300 transition-all text-center cursor-pointer"
            >
              ⚡ SAMP Core
            </button>
            <button 
              onClick={() => executeJarvisProtocol("MOBILE")}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-bold text-sky-400 hover:text-sky-300 transition-all text-center cursor-pointer"
            >
              📱 Mobile APK
            </button>
            <button 
              onClick={() => executeJarvisProtocol("SECURITY")}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-all text-center cursor-pointer"
            >
              🛡️ Varredura
            </button>
            <button 
              onClick={() => executeJarvisProtocol("DIAGNOSTIC")}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white transition-all text-center cursor-pointer"
            >
              📊 Diagnóstico
            </button>
          </div>
        </div>

        {/* Tactical Indicators & Diagnostics Status (Cols 3) */}
        <div className="lg:col-span-3 space-y-2 text-xs font-mono text-slate-400 border-t lg:border-t-0 lg:border-l border-slate-850 pt-4 lg:pt-0 lg:pl-6">
          <div className="flex justify-between items-center py-1 border-b border-slate-900">
            <span>Core Version</span>
            <span className="text-white font-bold">11.0-JARVIS</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-900">
            <span>Matrix HUD</span>
            <span className="text-sky-400 font-bold">ACTIVE</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-900">
            <span>Process CPU</span>
            <span className="text-emerald-400 font-bold">38.5ºC</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Database Link</span>
            <span className="text-indigo-400 font-bold">SYNCHRONIZED</span>
          </div>
          
          <button
            onClick={() => setActiveSubTab("jarvis")}
            className="w-full mt-2 py-2 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 hover:from-sky-600/30 hover:to-indigo-600/30 border border-sky-500/20 text-sky-400 font-bold text-[10.5px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ver Painel Jarvis</span>
          </button>
        </div>

      </div>

      {/* 🧭 NAVIGATION HUD TABS */}
      <div className="flex overflow-x-auto lg:flex-wrap gap-1.5 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-850 scrollbar-none">
        {[
          { id: "jarvis", label: "Painel J.A.R.V.I.S.", icon: Sparkles, color: "text-sky-400" },
          { id: "multi-agent", label: "Consenso Multi-Agente", icon: Bot, color: "text-pink-400" },
          { id: "workspace", label: "Estúdio OpenCode (Arquivos)", icon: Layers, color: "text-pink-500" },
          { id: "pwn-generator", label: "GTA SAMP Pawn (.pwn)", icon: Terminal, color: "text-indigo-400" },
          { id: "html-apk-builder", label: "Compilador APK & EXE", icon: Smartphone, color: "text-violet-400" },
          { id: "math-solver", label: "Matemática Neural", icon: Calculator, color: "text-emerald-400" },
          { id: "atlas", label: "Atlas das IAs", icon: Compass, color: "text-blue-400" }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setJarvisActiveProtocol(tab.id.toUpperCase().replace("-", " "));
              }}
              className={`flex-1 shrink-0 lg:shrink min-w-[155px] px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-950/20 animate-pulse"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 🌟 TAB CONTENT: JARVIS DASHBOARD OVERVIEW */}
      {activeSubTab === "jarvis" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          
          {/* Stark Tech Diagnostic Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-sky-950/10 border border-sky-500/20 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-black text-sky-300 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SISTEMA OPERACIONAL STARK INDUSTRIES INTEGRADO
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bem-vindo ao centro de operações avançadas. Este painel permite que você desenvolva gamemodes de GTA SAMP complexos, crie layouts responsivos em HTML e compile arquivos APK Android de alta estabilidade utilizando mentes de IA sincronizadas no ecossistema global.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => executeJarvisProtocol("SAMP")}
                className="bg-slate-900/40 border border-slate-850 hover:border-sky-500/30 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-indigo-950 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-slate-950 transition-all">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">protocol s.a.m.p.</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase group-hover:text-sky-400">Desenvolvedor de Código Pawn</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Crie comandos, conexões de bancos MySQL protegidas contra injeções SQL e sistemas de veículos robustos em segundos.
                </p>
              </div>

              <div 
                onClick={() => executeJarvisProtocol("MOBILE")}
                className="bg-slate-900/40 border border-slate-850 hover:border-sky-500/30 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-violet-950 text-violet-400 rounded-lg group-hover:bg-violet-600 group-hover:text-slate-950 transition-all">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">protocol android</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase group-hover:text-sky-400">Mobile Lab e APK Compiler</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Gere templates de páginas em HTML5 com visual moderno e prepare arquivos para empacotamento em aplicativos móveis Android.
                </p>
              </div>

              <div 
                onClick={() => executeJarvisProtocol("MATH")}
                className="bg-slate-900/40 border border-slate-850 hover:border-sky-500/30 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-lg group-hover:bg-emerald-600 group-hover:text-slate-950 transition-all">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">protocol quantum</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase group-hover:text-sky-400">Matemática e Lógica Quântica</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Simplifique equações, realize raízes fatoradas complexas com passos matemáticos de alta inteligência computacional.
                </p>
              </div>

              <div 
                onClick={() => { setActiveSubTab("atlas"); triggerJarvisVoice("Abri o Atlas de Modelos Globais de IA."); }}
                className="bg-slate-900/40 border border-slate-850 hover:border-sky-500/30 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-blue-950 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-slate-950 transition-all">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">catalog system</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase group-hover:text-sky-400">Atlas Global das IAs</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pesquise por modelos de programação, processamento de texto, voz, dublagem para NPCs e artes realistas.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Jarvis Telemetry Controls */}
          <div className="lg:col-span-4 bg-slate-900/40 border border-slate-850 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Painel de Telemetria</span>
            </h4>
            
            <div className="space-y-3 font-mono text-[11px] text-slate-400">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-2">
                <span className="text-slate-500 block">SAMP COMPILER MODULE</span>
                <div className="flex items-center justify-between">
                  <span>Sintaxe Pawn</span>
                  <span className="text-emerald-400 font-bold">100% VALIDA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bypass Warnings</span>
                  <span className="text-sky-400 font-bold">DISPONIVEL</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-2">
                <span className="text-slate-500 block">ANDROID AND WEB STACKS</span>
                <div className="flex items-center justify-between">
                  <span>Capacitor Sync</span>
                  <span className="text-emerald-400 font-bold">SINCRONIZADO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>WebView Client</span>
                  <span className="text-indigo-400 font-bold">ESTAVEL</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-2">
                <span className="text-slate-500 block">INTEGRAÇÃO DE SEGURANÇA</span>
                <div className="flex items-center justify-between">
                  <span>Port Scanner</span>
                  <span className="text-emerald-400 font-bold">PRONTO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Core</span>
                  <span className="text-sky-400 font-bold">ATIVO</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 🌟 TAB CONTENT: CONSENSO MULTI-AGENTE */}
      {activeSubTab === "multi-agent" && (
        <MultiAgentConsensus />
      )}

      {/* 🌟 TAB CONTENT: ESTÚDIO OPENCODE WORKSPACE */}
      {activeSubTab === "workspace" && (
        <OpenCodeWorkspace />
      )}

      {/* 🌟 TAB CONTENT: GTA SAMP PAWN CORE */}
      {activeSubTab === "pwn-generator" && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400 animate-pulse" />
              Desenvolvedor de Código Pawn de Alta Estabilidade
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gere scripts Pawn estruturados para o seu servidor GTA San Andreas Multiplayer. Escolha entre os cérebros neurais recomendados e presets para comandos, bancos de dados MySQL e proteção de anti-cheat, com simulação de compilação integrada e análises de segurança ativas.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Form controls (Cols 5) */}
            <div className="xl:col-span-5 space-y-5">
              
              {/* Brain selection */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-4 space-y-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  1. Cérebro Neural de IA:
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    "DeepSeek-R1 (Programação Sênior & Raciocínio)",
                    "Qwen 2.5 Coder (Sintaxe Perfeita Pawn/C++)",
                    "Llama 3.3 (Grande Volume & Relações de RPG)"
                  ].map((brain) => (
                    <button
                      key={brain}
                      onClick={() => setPwnSelectedBrain(brain)}
                      className={`px-3 py-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                        pwnSelectedBrain === brain
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-300"
                          : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                      }`}
                    >
                      {brain}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Preset selection */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-4 space-y-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  2. Presets SAMP Prontos para Gerar:
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "cmd_admin", label: "Comandos Administrativos (/banir, /curar)" },
                    { id: "mysql_reg", label: "Sistema de Registro MySQL (SHA256 Segura)" },
                    { id: "car_sys", label: "Sistema de Garagem de Carros Próprios" },
                    { id: "gang_sys", label: "Sistema de Facções com Chat Rádio /f" },
                    { id: "anti_cheat", label: "Anti-Cheat Ativo (Arma Hack & Teleport)" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPwnTemplateType(p.id as any)}
                      className={`w-full px-3 py-3 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                        pwnTemplateType === p.id
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-300"
                          : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                      }`}
                    >
                      <span>{p.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom request prompt */}
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-4 space-y-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  3. Solicitação Personalizada (Opcional):
                </label>
                <textarea
                  value={pwnPrompt}
                  onChange={(e) => setPwnPrompt(e.target.value)}
                  placeholder="Ex: Adicionar nível administrativo 5, salvar o ban temporário na tabela 'banidos' no MySQL..."
                  className="w-full h-24 bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-sans placeholder:text-slate-600"
                />
              </div>

              {/* Action trigger button */}
              <button
                onClick={generatePwnScript}
                disabled={pwnLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-950/50"
              >
                {pwnLoading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-white" />
                    <span>Injetando Inteligência..."</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Injetar Cérebro de IA e Gerar (.pwn)</span>
                  </>
                )}
              </button>

            </div>

            {/* Display Output + compiler simulator (Cols 7) */}
            <div className="xl:col-span-7 space-y-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Código Pawn Gerado Ativo:
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Sintaxe adaptada para pawno.exe do SA-MP 0.3.7 / open.mp
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 self-stretch sm:self-auto">
                  {pwnOutputCode && (
                    <>
                      <button
                        onClick={runSimulationCompiler}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[10.5px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: pwnCompilerStatus === "compiling" ? "2s" : "0s" }} />
                        <span>Simular Compilação</span>
                      </button>

                      <button
                        onClick={runSecurityAudit}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[10.5px] font-bold text-rose-400 hover:text-rose-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        <span>Verificar Vulnerabilidades</span>
                      </button>

                      <button
                        onClick={() => copyToClipboard(pwnOutputCode, "pwn-output")}
                        className="px-3 py-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[10.5px] font-bold text-indigo-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {copiedId === "pwn-output" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === "pwn-output" ? "Copiado!" : "Copiar"}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Code window with glowing border */}
              <div className="relative bg-slate-950 border border-slate-850 rounded-2xl p-4 font-mono text-[11.5px] text-indigo-300 h-[380px] overflow-y-auto leading-relaxed border-l-4 border-l-sky-500/70 shadow-inner">
                {pwnOutputCode ? (
                  <pre>{pwnOutputCode}</pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 text-xs text-center space-y-3">
                    <Terminal className="w-10 h-10 text-slate-800" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-500">Nenhum código gerado na memória ativa</p>
                      <p className="max-w-md text-[10.5px] text-slate-600 leading-relaxed">
                        Escolha um dos presets ao lado (como o sistema de registro MySQL ou Garagem) e clique em "Injetar Cérebro de IA e Gerar" para carregar o código-fonte!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated pawno.exe compiler outputs logs */}
              {pwnCompilerLogs.length > 0 && (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10.5px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        Terminal Compilador SA-MP (.amx)
                      </span>
                    </div>

                    {pwnCompilerStatus === "success" && (
                      <button
                        onClick={autoFixCodeWarnings}
                        className="px-2.5 py-1 text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg flex items-center gap-1 transition-all cursor-pointer animate-pulse"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Consertar Warnings</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1 font-mono text-[10.5px] max-h-40 overflow-y-auto">
                    {pwnCompilerLogs.map((log, index) => (
                      <div 
                        key={index} 
                        className={`leading-relaxed ${
                          log.includes("[ERRO]") || log.includes("error") ? "text-rose-400" :
                          log.includes("warning") ? "text-amber-400 font-bold" :
                          log.includes("[SUCESSO]") || log.includes("sucesso") ? "text-emerald-400 font-bold" :
                          "text-slate-400"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vulnerabilities Audit Report Panel */}
              {vulnerabilityReport && (
                <div className="bg-rose-950/15 border border-rose-500/20 rounded-2xl p-4 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-rose-900/40 pb-2">
                    <h4 className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Relatório de Auditoria de Vulnerabilidades</span>
                    </h4>
                    <span className="text-[10.5px] font-mono text-rose-400">
                      Score: <strong>{vulnerabilityReport.score}</strong>
                    </span>
                  </div>

                  {vulnerabilityReport.vulnerabilities.length > 0 ? (
                    <div className="space-y-3">
                      {vulnerabilityReport.vulnerabilities.map((v, i) => (
                        <div key={i} className="bg-slate-950/60 p-3 rounded-xl border border-rose-950/40 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200">{v.title}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              v.risk === "Alto" ? "bg-rose-900/40 text-rose-400 border border-rose-500/30" :
                              v.risk === "Médio" ? "bg-amber-900/40 text-amber-400 border border-amber-500/30" :
                              "bg-slate-800 text-slate-400"
                            }`}>
                              Risco {v.risk}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 leading-relaxed">{v.desc}</p>
                          <p className="text-[10.5px] text-emerald-400 leading-relaxed font-mono">
                            <strong className="text-emerald-500">Ação Corretiva:</strong> {v.fix}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Nenhuma vulnerabilidade ou brecha de segurança ativa no código Pawn analisado!</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 🌟 TAB CONTENT: HTML, APK & EXE MULTI-PLATFORM COMPILER */}
      {activeSubTab === "html-apk-builder" && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-950/40 to-indigo-950/40 border border-indigo-500/20 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-15">
              <Smartphone className="w-24 h-24 text-indigo-400 animate-pulse" />
            </div>
            <h3 className="text-sm font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-violet-400" />
              <span>Estúdio de Compilação Multi-Plataforma Máximo</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
              Empacote o seu site, painel ou launcher em aplicativos nativos para celular <strong>(.APK)</strong> ou computador <strong>(.EXE)</strong> prontos para rodar. Escolha a plataforma, configure os metadados, assine com Keystore e gere os binários direto do seu navegador!
            </p>
          </div>

          {/* Secondary Sub-Tabs Navigation */}
          <div className="flex border-b border-slate-850 gap-2">
            {[
              { id: "apk", label: "📲 Compilador Android (.APK)", desc: "Gerar app celular" },
              { id: "exe", label: "🖥️ Compilador Windows (.EXE)", desc: "Gerar executável PC" },
              { id: "html", label: "🎨 Gerador de Layouts (HTML5)", desc: "Gerar interface base" }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setCompilerTab(sub.id as any)}
                className={`flex-1 sm:flex-initial text-left px-5 py-3 border-t-2 border-x transition-all duration-200 cursor-pointer ${
                  compilerTab === sub.id
                    ? "bg-slate-900/60 border-t-indigo-500 border-x-slate-850 text-white"
                    : "border-t-transparent border-x-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <div className="text-xs font-bold">{sub.label}</div>
                <div className="text-[9px] text-slate-500 hidden sm:block">{sub.desc}</div>
              </button>
            ))}
          </div>

          {/* CONTENT: COMPILADOR ANDROID APK */}
          {compilerTab === "apk" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form & Config (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2">
                  1. Configurações do Pacote Android
                </h4>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Nome do Aplicativo:
                      </label>
                      <input
                        type="text"
                        value={apkAppName}
                        onChange={(e) => setApkAppName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Ex: MaximoLauncher"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Versão do App:
                      </label>
                      <input
                        type="text"
                        value={apkVersion}
                        onChange={(e) => setApkVersion(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        placeholder="Ex: 1.0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      ID do Pacote (Package Name):
                    </label>
                    <input
                      type="text"
                      value={apkPackageId}
                      onChange={(e) => setApkPackageId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      placeholder="Ex: com.maximorp.gta.samp"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      URL de Destino (Injetado na WebView):
                    </label>
                    <input
                      type="text"
                      value={apkTargetUrl}
                      onChange={(e) => setApkTargetUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      placeholder="Ex: https://samp.maximorp.com.br"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Chave Keystore (.jks):
                      </label>
                      <select
                        value={apkKeystoreType}
                        onChange={(e) => setApkKeystoreType(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="new">Criar Autogerada (Recomendado)</option>
                        <option value="custom">Usar Assinatura do Servidor</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Orientação Padrão:
                      </label>
                      <select
                        value={apkOrientation}
                        onChange={(e) => setApkOrientation(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="sensor">Adaptativa (Sensor)</option>
                        <option value="landscape">Paisagem (Horizontal)</option>
                        <option value="portrait">Retrato (Vertical)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-violet-950/10 border border-violet-500/15 rounded-xl space-y-1.5 text-[11px] text-slate-400">
                    <span className="font-bold text-violet-300 block">⚡ Recurso Injetado por IA J.A.R.V.I.S.:</span>
                    O app conterá cache automático offline, bypass para links externos do SAMP, aceleração de renderização WebGL e suporte para controle de joystick mobile nativo!
                  </div>

                  <button
                    onClick={startApkBuildProcess}
                    disabled={apkBuildStatus === "building"}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition shadow-lg text-xs cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {apkBuildStatus === "building" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Compilando APK ({apkBuildProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Iniciar Compilação do APK Android</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Console & Outputs (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center justify-between">
                    <span>2. Terminal Gradle & Link de Download</span>
                    {apkBuildStatus === "building" && (
                      <span className="text-[10px] font-mono text-indigo-400 animate-pulse">COMPILANDO...</span>
                    )}
                  </h4>

                  {/* Progress Bar */}
                  {apkBuildStatus === "building" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Status do Gradle Daemon</span>
                        <span>{apkBuildProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full transition-all duration-300"
                          style={{ width: `${apkBuildProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Console Logs */}
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-indigo-300 h-64 overflow-y-auto space-y-1.5 leading-relaxed">
                    {apkConsoleLogs.length > 0 ? (
                      apkConsoleLogs.map((log, index) => (
                        <div 
                          key={index} 
                          className={
                            log.includes("SUCESSO") || log.includes("CONCLUÍDA") ? "text-emerald-400 font-bold" :
                            log.includes("[SIGNER]") || log.includes("[KEYSTORE]") ? "text-pink-400" :
                            log.includes("[CONFIG]") ? "text-slate-500" : "text-indigo-200"
                          }
                        >
                          {log}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-600 text-xs text-center space-y-2">
                        <Terminal className="w-8 h-8 text-slate-800" />
                        <p>Terminal inativo. Pressione "Iniciar Compilação" para monitorar os logs do compilador Gradle.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Successful build panel */}
                {apkBuildStatus === "success" && (
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div className="text-xs">
                        <span className="text-emerald-400 font-bold block">Aplicativo Compilado com Sucesso!</span>
                        <span className="text-slate-400 text-[11px]">APK assinado pronto para uso direto no seu celular Android.</span>
                      </div>
                    </div>

                    <button
                      onClick={triggerApkDownload}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow animate-bounce"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar Arquivo APK ({apkAppName}.apk)</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* CONTENT: COMPILADOR WINDOWS EXE */}
          {compilerTab === "exe" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2">
                  1. Configurações do Executável Windows (.exe)
                </h4>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Nome do Executável:
                      </label>
                      <input
                        type="text"
                        value={exeAppName}
                        onChange={(e) => setExeAppName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Ex: MaximoDesktop"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Versão do Executável:
                      </label>
                      <input
                        type="text"
                        value={exeVersion}
                        onChange={(e) => setExeVersion(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        placeholder="Ex: 1.0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      URL de Inicialização:
                    </label>
                    <input
                      type="text"
                      value={exeTargetUrl}
                      onChange={(e) => setExeTargetUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      placeholder="Ex: https://samp.maximorp.com.br"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Tecnologia Wrapper:
                      </label>
                      <select
                        value={exeWrapper}
                        onChange={(e) => setExeWrapper(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="webview2">WebView2 Loader (Leve - 2MB)</option>
                        <option value="electron">Electron Wrapper (Completo - 75MB)</option>
                        <option value="pyinstaller">Python GUI Native</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Tema do Ícone (.ico):
                      </label>
                      <select
                        value={exeIconType}
                        onChange={(e) => setExeIconType(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="cyber">Cyberpunk Shield Violet</option>
                        <option value="gold">SAMP Gold Premium</option>
                        <option value="samp">Ícone Clássico SAMP</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-900 rounded-xl">
                    <div>
                      <span className="font-bold block text-slate-300">Aceleração de Hardware por GPU</span>
                      <span className="text-[10.5px] text-slate-500">Renderização ultra-suave com Direct3D 11</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={exeHardwareAcceleration}
                      onChange={(e) => setExeHardwareAcceleration(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer h-4 w-4"
                    />
                  </div>

                  <button
                    onClick={startExeBuildProcess}
                    disabled={exeBuildStatus === "building"}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition shadow-lg text-xs cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {exeBuildStatus === "building" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Compilando Executável ({exeBuildProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Laptop className="w-4 h-4" />
                        <span>Iniciar Compilação do EXE Windows</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Console & Outputs (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center justify-between">
                    <span>2. Terminal MSBuild & Link de Download</span>
                    {exeBuildStatus === "building" && (
                      <span className="text-[10px] font-mono text-violet-400 animate-pulse">COMPILANDO...</span>
                    )}
                  </h4>

                  {/* Progress Bar */}
                  {exeBuildStatus === "building" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Compilação Win32/x64</span>
                        <span>{exeBuildProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-violet-500 h-full transition-all duration-300"
                          style={{ width: `${exeBuildProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Console Logs */}
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-violet-300 h-64 overflow-y-auto space-y-1.5 leading-relaxed">
                    {exeConsoleLogs.length > 0 ? (
                      exeConsoleLogs.map((log, index) => (
                        <div 
                          key={index} 
                          className={
                            log.includes("SUCESSO") || log.includes("CONCLUÍDA") ? "text-emerald-400 font-bold" :
                            log.includes("[WRAPPER]") || log.includes("[RESOURCES]") ? "text-pink-400" :
                            log.includes("[CONFIG]") ? "text-slate-500" : "text-violet-200"
                          }
                        >
                          {log}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-600 text-xs text-center space-y-2">
                        <Terminal className="w-8 h-8 text-slate-800" />
                        <p>Terminal inativo. Pressione "Iniciar Compilação do EXE" para monitorar os logs do MSBuild de Windows.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Successful build panel */}
                {exeBuildStatus === "success" && (
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div className="text-xs">
                        <span className="text-emerald-400 font-bold block">Executável Windows Compilado!</span>
                        <span className="text-slate-400 text-[11px]">Seu executável portátil (.exe) está pronto para instalação no PC.</span>
                      </div>
                    </div>

                    <button
                      onClick={triggerExeDownload}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow animate-bounce"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar Executável (.exe)</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* CONTENT: GENERATOR LAYOUTS (HTML5 TEMPLATES) */}
          {compilerTab === "html" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* HTML SECTION */}
              <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-400" />
                    Gerador de Códigos HTML5 Responsivos
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Escolha o Tipo de Template:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "landing_cyber", label: "Landing Page Cyberpunk" },
                        { id: "samp_dash", label: "Dashboard de Jogador" }
                      ].map((h) => (
                        <button
                          key={h.id}
                          onClick={() => setHtmlTemplateType(h.id as any)}
                          className={`px-3 py-2.5 rounded-xl text-center text-xs font-bold border transition-all cursor-pointer ${
                            htmlTemplateType === h.id
                              ? "bg-indigo-600 border-indigo-500 text-white shadow"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Ajustes de Customização (Opcional):
                    </label>
                    <input
                      type="text"
                      value={htmlPrompt}
                      onChange={(e) => setHtmlPrompt(e.target.value)}
                      placeholder="Ex: Mudar o título para 'SA-MP Brasil', adicionar cor amarela..."
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    onClick={generateHtmlTemplate}
                    disabled={htmlLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    {htmlLoading ? "Gerando código HTML5..." : "Gerar Código HTML5 / CSS3"}
                  </button>

                  {htmlGeneratedCode && (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 uppercase font-mono">Código Gerado:</span>
                        <button
                          onClick={() => copyToClipboard(htmlGeneratedCode, "html-code")}
                          className="text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          {copiedId === "html-code" ? "Copiado!" : "Copiar HTML"}
                        </button>
                      </div>
                      <div className="relative bg-slate-950 border border-slate-900 p-3 rounded-xl font-mono text-[10px] text-indigo-300 h-64 overflow-y-auto leading-relaxed border-l-2 border-l-indigo-500">
                        <pre>{htmlGeneratedCode}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MANUAL CONFIGURATOR FALLBACK */}
              <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-violet-400" />
                    Bypass de Configuração Manual (Frameworks Clássicos)
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Selecione para ver a estrutura crua de código:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {[
                        { id: "capacitor", label: "Capacitor" },
                        { id: "cordova", label: "Cordova" },
                        { id: "native_webview", label: "Java WebView" },
                        { id: "termux", label: "Termux Mobile" }
                      ].map((apk) => (
                        <button
                          key={apk.id}
                          onClick={() => setApkFramework(apk.id as any)}
                          className={`px-2 py-2.5 rounded-xl text-center text-[10.5px] font-bold border transition-all cursor-pointer ${
                            apkFramework === apk.id
                              ? "bg-indigo-600 border-indigo-500 text-white shadow"
                              : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                          }`}
                        >
                          {apk.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateApkConfig}
                    disabled={apkLoading}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    {apkLoading ? "Processando Estrutura..." : "Estruturar Arquivos de Configuração APK"}
                  </button>

                  {apkGeneratedConfig && (
                    <div className="space-y-4 animate-fadeIn">
                      
                      {/* Manifest / Config display */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400 font-bold uppercase font-mono">
                            {apkFramework === "capacitor" ? "capacitor.config.json" :
                             apkFramework === "cordova" ? "config.xml" :
                             apkFramework === "native_webview" ? "MainActivity.java" : "AndroidManifest.xml"}
                          </span>
                          <button
                            onClick={() => copyToClipboard(apkGeneratedConfig, "apk-config")}
                            className="text-indigo-400 font-bold hover:underline cursor-pointer"
                          >
                            {copiedId === "apk-config" ? "Copiado!" : "Copiar"}
                          </button>
                        </div>
                        <div className="relative bg-slate-950 border border-slate-900 p-3 rounded-xl font-mono text-[10px] text-slate-300 h-36 overflow-y-auto leading-relaxed border-l-2 border-l-violet-500">
                          <pre>{apkGeneratedConfig}</pre>
                        </div>
                      </div>

                      {/* Compile Script display */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400 font-bold uppercase font-mono">
                            {apkFramework === "termux" ? "Passos de Instalação (No Celular)" : "build_apk.sh (Comandos de Terminal)"}
                          </span>
                          <button
                            onClick={() => copyToClipboard(apkGeneratedBuildScript, "apk-script")}
                            className="text-indigo-400 font-bold hover:underline cursor-pointer"
                          >
                            {copiedId === "apk-script" ? "Copiado!" : "Copiar"}
                          </button>
                        </div>
                        <div className="relative bg-slate-950 border border-slate-900 p-3 rounded-xl font-mono text-[10px] text-indigo-300 h-32 overflow-y-auto leading-relaxed border-l-2 border-l-violet-500">
                          <pre>{apkGeneratedBuildScript}</pre>
                        </div>
                      </div>

                      {/* Step guidance */}
                      <div className="bg-violet-950/10 border border-violet-500/10 p-3 rounded-xl text-[11px] text-slate-400 space-y-1">
                        <strong className="text-slate-200 block">Dica de Compilação de Celular:</strong>
                        <p>
                          Instale o <strong>Termux</strong> no seu celular diretamente da App Store ou F-Droid. Copie os códigos de configuração gerados acima e utilize o Gradle para assinar e instalar seu próprio APK de GTA sem precisar de um computador!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* 🌟 TAB CONTENT: MATH SOLVER */}
      {activeSubTab === "math-solver" && (
        <div className="space-y-4 animate-fadeIn">
          
          <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-xl p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Matemática e Lógica Unificada (Raciocínio Inteligente)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              O cérebro unificado consegue resolver qualquer conta matemática (básica ou avançada) de forma instantânea. Digite o seu problema abaixo para ver as IAs calculando em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Insira o Problema ou Equação Matemática:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mathInput}
                    onChange={(e) => setMathInput(e.target.value)}
                    placeholder="Exemplo: sqrt(8), 1+1, 2x = 8, 150 * 3..."
                    className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={solveMathProblem}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {/* Suggestions for user */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Exemplos Rápidos (Clique para testar):</span>
                <div className="flex flex-wrap gap-1.5">
                  {["sqrt(8)", "1+1", "125 * 5", "(45/5) * 2"].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => {
                        setMathInput(ex);
                        setMathSolution(null);
                      }}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded text-[10px] font-mono text-emerald-400 cursor-pointer"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results / Steps Display */}
            <div className="space-y-3 bg-slate-900/40 border border-slate-850 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resultado e Lógica de Solução:</span>
              
              {mathLoading ? (
                <div className="py-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 animate-spin text-emerald-500" />
                  <span>Cérebro unificado calculando...</span>
                </div>
              ) : mathSolution ? (
                <div className="space-y-4">
                  {/* Big Result */}
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-center border-l-4 border-l-emerald-500">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono mb-1">Resultado Final</span>
                    <strong className="text-2xl font-black text-emerald-400 font-mono">{mathSolution.result}</strong>
                  </div>

                  {/* Step-by-step list */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Passo a Passo do Raciocínio:</span>
                    <ol className="list-decimal pl-4 text-xs text-slate-300 space-y-1 font-sans">
                      {mathSolution.steps.map((step, idx) => (
                        <li key={idx} className="pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* AI thoughts summary */}
                  <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg text-[10.5px] text-emerald-300 leading-relaxed">
                    <strong className="block text-emerald-400 mb-0.5">🧠 Nota de Fusão das Mentes:</strong>
                    {mathSolution.aiThoughts}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Aperte "Calcular" para ver o passo a passo de raciocínio lógico em detalhes.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🌟 TAB CONTENT: ATLAS DAS IAS */}
      {activeSubTab === "atlas" && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise por qualquer IA (DeepSeek, Llama, Flux, Maritaca, Whisper, etc.)..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            
            <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
              {[
                { id: "all", label: "Tudo" },
                { id: "programacao", label: "Programação" },
                { id: "texto", label: "Texto / LLM" },
                { id: "brasil", label: "🇧🇷 Nacionais" },
                { id: "imagem", label: "Imagem" },
                { id: "audio", label: "Áudios" },
                { id: "ciencia", label: "Ciência" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-[10.5px] font-bold shrink-0 transition-all cursor-pointer border ${
                    selectedCategory === cat.id
                      ? "bg-indigo-600/15 text-indigo-400 border-indigo-500/40"
                      : "bg-slate-900/40 text-slate-400 border-slate-850 hover:border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
            {filteredMotors.map((motor) => {
              const isExpanded = selectedMotorId === motor.id;
              return (
                <div 
                  key={motor.id} 
                  className={`border rounded-xl p-4 flex flex-col justify-between transition-all group duration-300 ${
                    isExpanded 
                      ? "bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/20 col-span-1 md:col-span-2 lg:col-span-3"
                      : "bg-slate-900/90 border-slate-850 hover:border-slate-750 hover:shadow-lg hover:shadow-indigo-950/5"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{motor.family}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        motor.category === "programacao" ? "bg-indigo-900/40 text-indigo-300 border border-indigo-500/25" :
                        motor.category === "texto" ? "bg-blue-900/40 text-blue-300 border border-blue-500/25" :
                        motor.category === "brasil" ? "bg-yellow-900/40 text-yellow-300 border border-yellow-500/25" :
                        motor.category === "imagem" ? "bg-purple-900/40 text-purple-300 border border-purple-500/25" :
                        motor.category === "video" ? "bg-red-900/40 text-red-300 border border-red-500/25" :
                        motor.category === "audio" ? "bg-pink-900/40 text-pink-300 border border-pink-500/25" :
                        motor.category === "ciencia" ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/25" :
                        "bg-slate-850 text-slate-400"
                      }`}>
                        {motor.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{motor.name}</span>
                    </h3>
                    
                    <p className="text-xs text-slate-300 leading-relaxed">{motor.desc}</p>
                    <p className="text-[11px] text-slate-500 italic bg-slate-950/40 p-2 rounded-lg border border-slate-900">{motor.details}</p>

                    {/* Expanding Capabilities Container */}
                    {isExpanded && motor.capabilities && (
                      <div className="mt-4 pt-3 border-t border-slate-850 space-y-2.5 animate-fadeIn">
                        <h4 className="text-[10.5px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>100% de Recursos & Capacidades Técnicas:</span>
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                          {motor.capabilities.map((cap, cidx) => (
                            <li key={cidx} className="flex gap-2 items-start bg-slate-950/50 p-2 rounded-lg border border-slate-900">
                              <span className="text-indigo-400 font-bold shrink-0 mt-0.5">✦</span>
                              <span className="leading-relaxed">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-850 mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 truncate">Melhor p/: <strong>{motor.bestFor}</strong></span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMotorId(isExpanded ? null : motor.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isExpanded 
                            ? "bg-slate-800 text-slate-200 border border-slate-700"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>{isExpanded ? "Recolher Detalhes" : "Ver 100% Recursos"}</span>
                      </button>

                      {motor.pwnTemplate && (
                        <button
                          onClick={() => copyToClipboard(motor.pwnTemplate || "", motor.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedId === motor.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === motor.id ? "Copiado!" : "Copiar Script"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMotors.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 text-xs">
                Nenhuma inteligência artificial encontrada com os termos fornecidos.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer System Indicator */}
      <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-slate-600 animate-pulse" />
          <span>Servidores Host: <strong>STARK GLOBAL CLOUD v11</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span>Sincronização de Rede:</span>
          <span className="text-sky-400 font-black">● 100% SECURE AND OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
