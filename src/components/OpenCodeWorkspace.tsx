import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import JSZip from "jszip";
import {
  Folder,
  FolderPlus,
  FilePlus,
  Trash2,
  Edit2,
  Terminal,
  Download,
  Play,
  Check,
  Copy,
  Plus,
  ChevronDown,
  ChevronRight,
  Code,
  File,
  Bot,
  Sparkles,
  Smartphone,
  Laptop,
  RefreshCw,
  Search,
  FileCode,
  ArrowRight,
  Upload,
  Settings2,
  X,
  Layers,
  Zap,
  HelpCircle,
  Database,
  SearchCode,
  Sliders,
  Maximize2,
  Minimize2,
  BookOpen,
  Info,
  Bug,
  AlertTriangle,
  Flame,
  Layout,
  PlayCircle,
  Hash,
  Activity,
  History,
  Send,
  Lock,
  Globe,
  Sun,
  Moon,
  Trash,
  CheckCircle,
  RefreshCw as RefreshIcon
} from "lucide-react";

interface VirtualFile {
  id: string;
  name: string;
  path: string; // e.g. "gamemodes/main.pwn" or "src/App.tsx"
  isFolder: boolean;
  content?: string;
}

interface ProjectTemplate {
  id: string;
  name: string;
  icon: any;
  description: string;
  files: VirtualFile[];
}

export default function OpenCodeWorkspace() {
  const [projectName, setProjectName] = useState("MeuProjetoVirtual");
  const [activeTemplate, setActiveTemplate] = useState<string>("pawn_samp");
  
  // Virtual Filesystem State
  const [files, setFiles] = useState<VirtualFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  
  // Navigation Sidebar Tabs inside OpenCode
  const [sidebarTab, setSidebarTab] = useState<"explorer" | "search" | "templates" | "settings">("explorer");
  
  // Editor & Workspace Themes: "slate" | "hacker" | "neon" | "light"
  const [workspaceTheme, setWorkspaceTheme] = useState<"slate" | "hacker" | "neon" | "light">("slate");
  const [fontSize, setFontSize] = useState<number>(12);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);

  // UI States
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchReplaceQuery, setSearchReplaceQuery] = useState("");
  const [searchReplaceWith, setSearchReplaceWith] = useState("");
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState("");
  const [isCreatingInFolder, setIsCreatingInFolder] = useState<{ parentPath: string; isFolder: boolean } | null>(null);
  const [newElementName, setNewElementName] = useState("");
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile" | "tablet">("desktop");
  const [isCopied, setIsCopied] = useState(false);
  
  // ZIP upload references & feedback
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Dynamic Terminal Logs
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: "info" | "success" | "error" | "warn" }>>([]);
  const [isCompiling, setIsCompiling] = useState(false);

  // SAMP Server Simulator State
  const [sampServerRunning, setSampServerRunning] = useState(false);
  const [sampCmdInput, setSampCmdInput] = useState("");
  const [sampPlayers, setSampPlayers] = useState<Array<{ id: number; name: string; score: number; ping: number }>>([
    { id: 0, name: "Alysson_Admin", score: 100, ping: 12 },
    { id: 1, name: "Maximo_Bot", score: 350, ping: 4 },
    { id: 2, name: "Pawn_Expert", score: 15, ping: 45 }
  ]);

  // Express Rest API Simulator State
  const [selectedApiRoute, setSelectedApiRoute] = useState("/api/health");
  const [selectedApiMethod, setSelectedApiMethod] = useState<"GET" | "POST">("GET");
  const [apiRequestBody, setApiRequestBody] = useState(`{\n  "username": "admin",\n  "password": "admin123"\n}`);
  const [apiResponseJson, setApiResponseJson] = useState<any>(null);
  const [apiLatency, setApiLatency] = useState<number | null>(null);
  const [apiStatusCode, setApiStatusCode] = useState<number | null>(null);

  // React Admin Dashboard Simulator State
  const [dashUsersCount, setDashUsersCount] = useState(1480);
  const [dashTheme, setDashTheme] = useState<"dark" | "light">("dark");
  const [dashStatus, setDashStatus] = useState("Sincronizado");
  const [dashNotifications, setDashNotifications] = useState<string[]>([
    "Novos logs criados",
    "Servidor local ativo na porta 3000"
  ]);

  // HTML5 PWA Task State
  const [pwaTasks, setPwaTasks] = useState<string[]>(["Configurar MySQL", "Programar Velocímetro", "Testar Segurança"]);
  const [newPwaTask, setNewPwaTask] = useState("");

  // AI Copilot State
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotResponse, setCopilotResponse] = useState<string>(
    "Olá! Sou o Copiloto OpenCode. Posso analisar todos os seus arquivos, refatorar código, corrigir vulnerabilidades ou escrever novas rotas complexas. Selecione uma opção rápida ou envie sua dúvida!"
  );
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);
  const [copilotDiffCode, setCopilotDiffCode] = useState<string | null>(null);
  const [copilotEngine, setCopilotEngine] = useState("DeepSeek-R1 (Pensamento Profundo)");

  // Template definitions
  const templates: ProjectTemplate[] = [
    {
      id: "pawn_samp",
      name: "Servidor GTA SAMP (Pawn)",
      icon: Terminal,
      description: "Servidor base Pawn SAMP com mysql, scripts utilitários de comando rcon e banco SQL.",
      files: [
        { id: "p1", name: "gamemodes", path: "gamemodes", isFolder: true },
        {
          id: "p2",
          name: "main.pwn",
          path: "gamemodes/main.pwn",
          isFolder: false,
          content: `// =======================================================\n//   SERVIDORES GTA SAMP - ESTÚDIO DE ARQUIVOS OPENCODE\n//   Desenvolvido com o ecossistema tático do MÁXIMO 10.0\n// =======================================================\n\n#include <a_samp>\n#include <a_mysql>\n#include <zcmd>\n#include <sscanf2>\n\n#define SQL_HOST "127.0.0.1"\n#define SQL_USER "root"\n#define SQL_PASS "maximo_seguro_123"\n#define SQL_DB   "samp_database"\n\nnew MySQL:g_SqlHandle;\nnew PlayerLogged[MAX_PLAYERS];\n\nmain()\n{\n    print("\\n----------------------------------");\n    print("  Iniciando Servidor SAMP Virtual  ");\n    print("     Ambiente Seguro OpenCode      ");\n    print("----------------------------------\\n");\n}\n\npublic OnGameModeInit()\n{\n    SetGameModeText("Maximo OpenCode v10");\n    g_SqlHandle = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS, SQL_DB);\n    if(mysql_errno(g_SqlHandle) != 0) {\n        print("[ERRO]: Falha crítica de conexão com o banco de dados MySQL.");\n    } else {\n        print("[SUCESSO]: Conexão estável estabelecida com MySQL local.");\n    }\n    return 1;\n}\n\npublic OnGameModeExit()\n{\n    mysql_close(g_SqlHandle);\n    return 1;\n}\n\npublic OnPlayerConnect(playerid)\n{\n    PlayerLogged[playerid] = 0;\n    SendClientMessage(playerid, 0x00FF00FF, "🛡️ [MÁXIMO]: Bem-vindo ao estúdio OpenCode!");\n    SendClientMessage(playerid, 0xFFFFFFFF, "Digite /ajuda para ver os comandos táticos disponíveis.");\n    return 1;\n}\n\nCMD:comprarcarro(playerid, params[])\n{\n    new carro_id;\n    if(sscanf(params, "d", carro_id)) {\n        return SendClientMessage(playerid, 0xFF0000FF, "Use: /comprarcarro [id_veiculo]");\n    }\n    if(carro_id < 400 || carro_id > 611) {\n        return SendClientMessage(playerid, 0xFF0000FF, "ID de veículo inválido (400 - 611)!");\n    }\n    \n    new Float:x, Float:y, Float:z, Float:fa;\n    GetPlayerPos(playerid, x, y, z);\n    GetPlayerFacingAngle(playerid, fa);\n    \n    new vec = CreateVehicle(carro_id, x + 2.0, y, z + 1.0, fa, -1, -1, 60);\n    PutPlayerInVehicle(playerid, vec, 0);\n    \n    SendClientMessage(playerid, 0x33FF33FF, "🎉 Veículo administrativo spawnado perfeitamente!");\n    return 1;\n}\n\nCMD:dararma(playerid, params[])\n{\n    new weaponid, ammo;\n    if(sscanf(params, "dd", weaponid, ammo)) {\n        return SendClientMessage(playerid, 0xFF0000FF, "Use: /dararma [id_arma] [municao]");\n    }\n    GivePlayerWeapon(playerid, weaponid, ammo);\n    SendClientMessage(playerid, 0x33FF33FF, "🔫 Arma equipada com integridade lógica.");\n    return 1;\n}`
        },
        { id: "p3", name: "filterscripts", path: "filterscripts", isFolder: true },
        {
          id: "p4",
          name: "velocimetro.pwn",
          path: "filterscripts/velocimetro.pwn",
          isFolder: false,
          content: `// Velocímetro TextDraw Customizado para GTA SAMP\n#include <a_samp>\n\nnew Text:VelocimetroTD[MAX_PLAYERS];\n\npublic OnFilterScriptInit()\n{\n    print("Filterscript de Velocímetro carregado.");\n    return 1;\n}\n\npublic OnPlayerStateChange(playerid, newstate, oldstate)\n{\n    if(newstate == PLAYER_STATE_DRIVER)\n    {\n        VelocimetroTD[playerid] = TextDrawCreate(320.0, 400.0, "Vel: 0 km/h");\n        TextDrawShowForPlayer(playerid, VelocimetroTD[playerid]);\n    }\n    else if(oldstate == PLAYER_STATE_DRIVER)\n    {\n        TextDrawDestroy(VelocimetroTD[playerid]);\n    }\n    return 1;\n}`
        },
        {
          id: "p5",
          name: "server.cfg",
          path: "server.cfg",
          isFolder: false,
          content: `echo Executing Server Config...\nlanmode 0\nrcon_password maximo_rcon_secreto_123\nmaxplayers 50\nport 7777\nhostname Servidor SAMP Virtual - OpenCode Studio\ngamemode0 main 1\nfilterscripts velocimetro\nplugins mysql sscanf\nannounce 0\nchatlogging 1`
        },
        {
          id: "p6",
          name: "database.sql",
          path: "database.sql",
          isFolder: false,
          content: `-- Script de criação de tabelas para o Servidor SAMP\nCREATE DATABASE IF NOT EXISTS \`samp_db\`;\nUSE \`samp_db\`;\n\nCREATE TABLE IF NOT EXISTS \`accounts\` (\n    \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n    \`username\` VARCHAR(24) NOT NULL UNIQUE,\n    \`password\` VARCHAR(128) NOT NULL,\n    \`money\` INT DEFAULT 5000,\n    \`level\` INT DEFAULT 1\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        }
      ]
    },
    {
      id: "react_dashboard",
      name: "React Web Dashboard",
      icon: Code,
      description: "Painel SPA completo de administração com monitoramento de tráfego, usuários e integridade.",
      files: [
        { id: "r1", name: "src", path: "src", isFolder: true },
        {
          id: "r2",
          name: "App.tsx",
          path: "src/App.tsx",
          isFolder: false,
          content: `import React, { useState } from 'react';\n\nexport default function App() {\n  const [usersCount, setUsersCount] = useState(1480);\n  const [sidebarOpen, setSidebarOpen] = useState(true);\n\n  return (\n    <div className="min-h-screen bg-slate-950 text-white flex">\n      {/* Sidebar */}\n      {sidebarOpen && (\n        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 space-y-4">\n          <div className="font-bold text-lg text-indigo-400">⚡ OpenCode Admin</div>\n          <nav className="space-y-2 text-sm text-slate-400">\n            <div className="p-2 bg-indigo-500/10 text-indigo-300 rounded-lg font-medium cursor-pointer">Visão Geral</div>\n            <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition">Usuários</div>\n            <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition">Servidores</div>\n          </nav>\n        </aside>\n      )}\n\n      {/* Main Content */}\n      <main className="flex-1 p-8 space-y-6">\n        <header className="flex justify-between items-center pb-4 border-b border-slate-800">\n          <button \n            onClick={() => setSidebarOpen(!sidebarOpen)}\n            className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs hover:bg-slate-700"\n          >\n            Alternar Sidebar\n          </button>\n          <div className="text-xs text-slate-400">Ambiente Virtual Sincronizado</div>\n        </header>\n\n        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">\n          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">\n            <div className="text-xs text-slate-500 font-medium">Usuários Registrados</div>\n            <div className="text-3xl font-black mt-1 text-white">{usersCount}</div>\n            <button \n              onClick={() => setUsersCount(usersCount + 1)}\n              className="mt-3 text-[10px] bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-white transition"\n            >\n              Incrementar +1\n            </button>\n          </div>\n\n          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">\n            <div className="text-xs text-slate-500">Integridade Geral</div>\n            <div className="text-3xl font-black mt-1 text-emerald-400">99.9%</div>\n          </div>\n\n          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">\n            <div className="text-xs text-slate-500">Faturamento Virtual</div>\n            <div className="text-3xl font-black mt-1 text-sky-400">R$ 14.850</div>\n          </div>\n        </section>\n      </main>\n    </div>\n  );\n}`
        },
        {
          id: "r3",
          name: "index.css",
          path: "src/index.css",
          isFolder: false,
          content: `@import "tailwindcss";\n\nbody {\n  margin: 0;\n  font-family: sans-serif;\n  background-color: #020617;\n}`
        },
        {
          id: "r4",
          name: "package.json",
          path: "package.json",
          isFolder: false,
          content: `{\n  "name": "react-virtual-dashboard",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^19.0.0"\n  }\n}`
        }
      ]
    },
    {
      id: "express_api",
      name: "NodeJS Rest API (Express)",
      icon: Zap,
      description: "Servidor REST Express de alto desempenho com rotas autenticadas, segurança e mock de DB.",
      files: [
        { id: "e1", name: "routes", path: "routes", isFolder: true },
        {
          id: "e2",
          name: "auth.js",
          path: "routes/auth.js",
          isFolder: false,
          content: `const express = require('express');\nconst router = express.Router();\n\nrouter.post('/login', (req, res) => {\n    const { username, password } = req.body;\n    \n    if(!username || !password) {\n        return res.status(400).json({ error: 'Usuário e senha são obrigatórios!' });\n    }\n\n    if(username === 'admin' && password === 'admin123') {\n        return res.json({\n            success: true,\n            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.opencode_jwt_secret_token',\n            user: { username: 'admin', role: 'system_operator' }\n        });\n    }\n\n    return res.status(401).json({ error: 'Credenciais inválidas!' });\n});\n\nmodule.exports = router;`
        },
        {
          id: "e3",
          name: "server.js",
          path: "server.js",
          isFolder: false,
          content: `const express = require('express');\nconst authRoutes = require('./routes/auth');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(express.json());\n\napp.get('/api/health', (req, res) => {\n    res.json({\n        status: 'ONLINE',\n        uptime: process.uptime(),\n        timestamp: new Date().toISOString()\n    });\n});\n\napp.use('/api/auth', authRoutes);\n\napp.listen(PORT, '0.0.0.0', () => {\n    console.log(\`Servidor rodando perfeitamente na porta \${PORT}\`);\n});`
        },
        {
          id: "e4",
          name: "package.json",
          path: "package.json",
          isFolder: false,
          content: `{\n  "name": "express-opencode-server",\n  "version": "1.0.0",\n  "main": "server.js",\n  "dependencies": {\n    "express": "^4.21.2"\n  }\n}`
        }
      ]
    },
    {
      id: "mobile_pwa",
      name: "HTML5 Mobile App (PWA)",
      icon: Smartphone,
      description: "Aplicativo móvel leve com LocalStorage, interface touch e design modular de alto nível.",
      files: [
        { id: "m1", name: "css", path: "css", isFolder: true },
        {
          id: "m2",
          name: "style.css",
          path: "css/style.css",
          isFolder: false,
          content: `* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\nbody {\n    background-color: #0b0f19;\n    color: #f1f5f9;\n    font-family: sans-serif;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n}`
        },
        { id: "m3", name: "js", path: "js", isFolder: true },
        {
          id: "m4",
          name: "app.js",
          path: "js/app.js",
          isFolder: false,
          content: `console.log("Aplicativo móvel iniciado com persistência.");`
        },
        {
          id: "m5",
          name: "index.html",
          path: "index.html",
          isFolder: false,
          content: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Aplicativo PWA</title>\n    <link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n    <div class="card">\n        <h2>Estúdio Móvel OpenCode</h2>\n        <p>Desenvolvido para Celular e Desktop.</p>\n    </div>\n</body>\n</html>`
        }
      ]
    }
  ];

  // Load default SAMP project template on mount
  useEffect(() => {
    loadTemplate("pawn_samp");
  }, []);

  const loadTemplate = (templateId: string) => {
    const selected = templates.find((t) => t.id === templateId);
    if (selected) {
      setFiles(JSON.parse(JSON.stringify(selected.files)));
      setActiveTemplate(templateId);
      
      const firstFile = selected.files.find((f) => !f.isFolder);
      if (firstFile) {
        setActiveFileId(firstFile.id);
        setOpenTabs([firstFile.id]);
      } else {
        setActiveFileId(null);
        setOpenTabs([]);
      }

      // Expand folders
      const dirs = selected.files.filter((f) => f.isFolder);
      const expanded: Record<string, boolean> = {};
      dirs.forEach((d) => {
        expanded[d.path] = true;
      });
      setExpandedFolders(expanded);

      // Log status
      setTerminalLogs([
        { text: `📡 [Workspace]: Inicializando estúdio virtual: ${selected.name}`, type: "info" },
        { text: `📁 [Arquivos]: Injetados ${selected.files.length} arquivos/pastas de template.`, type: "success" },
        { text: `💡 Pronto para programar e simular. Use o Copiloto IA ou o Terminal interativo!`, type: "info" }
      ]);
    }
  };

  const getActiveFile = () => {
    return files.find((f) => f.id === activeFileId);
  };

  const updateActiveFileContent = (newContent: string) => {
    if (!activeFileId) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newContent } : f))
    );
  };

  // ZIP Importer (Allows drag and drop or clicking to load a real zip into workspace)
  const handleZipUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event.target.files;
    if (!filesUploaded || filesUploaded.length === 0) return;
    await processZipFile(filesUploaded[0]);
  };

  const processZipFile = async (file: File) => {
    setTerminalLogs((prev) => [
      ...prev,
      { text: `📦 [Importador ZIP]: Lendo '${file.name}' (${(file.size / 1024).toFixed(1)} KB)...`, type: "info" }
    ]);
    
    try {
      const zip = await JSZip.loadAsync(file);
      const extractedFiles: VirtualFile[] = [];
      const foldersAdded = new Set<string>();

      // Iterate ZIP files
      const fileNames = Object.keys(zip.files);
      
      for (const name of fileNames) {
        const zipEntry = zip.files[name];
        
        // Skip system/mac directories
        if (name.includes("__MACOSX") || name.endsWith(".DS_Store")) {
          continue;
        }

        const isFolder = zipEntry.dir;
        const cleanPath = name.replace(/\/$/, ""); // remove trailing slash

        if (isFolder) {
          foldersAdded.add(cleanPath);
          extractedFiles.push({
            id: `zip_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            name: cleanPath.split("/").pop() || cleanPath,
            path: cleanPath,
            isFolder: true
          });
        } else {
          // It's a file
          const content = await zipEntry.async("string");
          const pathSegments = cleanPath.split("/");
          
          // Generate parent folders if they aren't explicitly marked as directories in the ZIP
          for (let i = 1; i < pathSegments.length; i++) {
            const parentFolderPath = pathSegments.slice(0, i).join("/");
            if (!foldersAdded.has(parentFolderPath)) {
              foldersAdded.add(parentFolderPath);
              extractedFiles.push({
                id: `zip_dir_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                name: parentFolderPath.split("/").pop() || parentFolderPath,
                path: parentFolderPath,
                isFolder: true
              });
            }
          }

          extractedFiles.push({
            id: `zip_file_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            name: pathSegments.pop() || cleanPath,
            path: cleanPath,
            isFolder: false,
            content
          });
        }
      }

      if (extractedFiles.length > 0) {
        setFiles(extractedFiles);
        setProjectName(file.name.replace(".zip", ""));
        
        // Open first file found
        const firstFile = extractedFiles.find((f) => !f.isFolder);
        if (firstFile) {
          setActiveFileId(firstFile.id);
          setOpenTabs([firstFile.id]);
        } else {
          setActiveFileId(null);
          setOpenTabs([]);
        }

        // Expand root directories
        const exp: Record<string, boolean> = {};
        extractedFiles.filter((f) => f.isFolder).forEach((d) => {
          exp[d.path] = true;
        });
        setExpandedFolders(exp);

        setTerminalLogs((prev) => [
          ...prev,
          { text: `✅ [Importador ZIP]: Descompressão concluída! Carregados ${extractedFiles.length} itens.`, type: "success" },
          { text: `📁 Projeto ativo alterado para '${file.name.replace(".zip", "")}'`, type: "info" }
        ]);
      } else {
        throw new Error("O arquivo ZIP está vazio ou não possui arquivos válidos.");
      }
    } catch (err: any) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `🚨 [Erro Importador]: Falha ao descomprimir ZIP: ${err.message}`, type: "error" }
      ]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".zip")) {
        await processZipFile(droppedFile);
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `⚠️ [Aviso]: Apenas arquivos comprimidos (.zip) podem ser carregados via drag & drop.`, type: "warn" }
        ]);
      }
    }
  };

  // Create subfolders/files directly in a selected directory
  const handleCreateNewElement = () => {
    if (!newElementName.trim()) return;
    
    const isFolder = isCreatingInFolder?.isFolder ?? false;
    const parentPath = isCreatingInFolder?.parentPath ?? "";
    const finalPath = parentPath 
      ? `${parentPath}/${newElementName.trim()}` 
      : newElementName.trim();

    if (files.some((f) => f.path === finalPath)) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `🚨 [Erro]: Já existe um item com o caminho '${finalPath}'!`, type: "error" }
      ]);
      setIsCreatingInFolder(null);
      setNewElementName("");
      return;
    }

    const newId = `item_${Date.now()}`;
    const newItem: VirtualFile = {
      id: newId,
      name: newElementName.trim(),
      path: finalPath,
      isFolder,
      content: isFolder ? undefined : `// Novo arquivo ${newElementName.trim()}\n// Criado dinamicamente no OpenCode Studio\n`
    };

    setFiles((prev) => [...prev, newItem]);

    if (!isFolder) {
      setActiveFileId(newId);
      if (!openTabs.includes(newId)) {
        setOpenTabs((prev) => [...prev, newId]);
      }
    }

    if (parentPath) {
      setExpandedFolders((prev) => ({ ...prev, [parentPath]: true }));
    }

    setTerminalLogs((prev) => [
      ...prev,
      { text: `📁 [Projeto]: Criado ${isFolder ? "diretório" : "arquivo"} '${finalPath}' com sucesso!`, type: "success" }
    ]);

    setIsCreatingInFolder(null);
    setNewElementName("");
  };

  const handleDeleteElement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = files.find((f) => f.id === id);
    if (!item) return;

    if (window.confirm(`Excluir permanentemente '${item.path}'?`)) {
      const pathsToDelete = files
        .filter((f) => f.id === id || f.path.startsWith(`${item.path}/`))
        .map((f) => f.id);

      setFiles((prev) => prev.filter((f) => !pathsToDelete.includes(f.id)));
      setOpenTabs((prev) => prev.filter((tId) => !pathsToDelete.includes(tId)));
      
      if (activeFileId && pathsToDelete.includes(activeFileId)) {
        const remaining = openTabs.filter((tId) => !pathsToDelete.includes(tId));
        setActiveFileId(remaining.length > 0 ? remaining[0] : null);
      }

      setTerminalLogs((prev) => [
        ...prev,
        { text: `🗑️ [Exclusão]: Removido '${item.path}' do projeto virtual.`, type: "warn" }
      ]);
    }
  };

  const handleStartRename = (file: VirtualFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFileId(file.id);
    setEditNameValue(file.name);
  };

  const handleSaveRename = () => {
    if (!editNameValue.trim() || !editingFileId) return;
    
    const target = files.find((f) => f.id === editingFileId);
    if (!target) return;

    const oldPath = target.path;
    const segments = oldPath.split("/");
    segments[segments.length - 1] = editNameValue.trim();
    const newPath = segments.join("/");

    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === editingFileId) {
          return { ...f, name: editNameValue.trim(), path: newPath };
        }
        if (target.isFolder && f.path.startsWith(`${oldPath}/`)) {
          const sub = f.path.substring(oldPath.length);
          return { ...f, path: `${newPath}${sub}` };
        }
        return f;
      })
    );

    setTerminalLogs((prev) => [
      ...prev,
      { text: `✏️ [Renomeação]: '${oldPath}' renomeado para '${newPath}'`, type: "info" }
    ]);

    setEditingFileId(null);
    setEditNameValue("");
  };

  // Code Stats counter
  const getEditorStats = () => {
    const file = getActiveFile();
    if (!file || file.isFolder || !file.content) return { lines: 0, words: 0, chars: 0, size: "0 B" };
    const content = file.content;
    const lines = content.split("\n").length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;
    const size = chars > 1024 ? `${(chars / 1024).toFixed(2)} KB` : `${chars} B`;
    return { lines, words, chars, size };
  };

  // simulated "Prettier" formatting
  const formatCurrentDocument = () => {
    const active = getActiveFile();
    if (!active || active.isFolder || !active.content) return;
    
    const formatted = active.content
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n"); // replace multi-empty lines with a max of one empty line

    updateActiveFileContent(formatted);
    setTerminalLogs((prev) => [
      ...prev,
      { text: `✨ [Formatador]: O documento '${active.name}' foi reestruturado de acordo com as regras de estilo de código.`, type: "success" }
    ]);
  };

  const handleOpenFile = (id: string) => {
    setActiveFileId(id);
    if (!openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
    }
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTabs = openTabs.filter((tId) => tId !== id);
    setOpenTabs(updatedTabs);
    if (activeFileId === id) {
      setActiveFileId(updatedTabs.length > 0 ? updatedTabs[0] : null);
    }
  };

  const askCopilot = async () => {
    if (!copilotPrompt.trim()) return;
    setIsCopilotThinking(true);
    const query = copilotPrompt;
    setCopilotPrompt("");

    await new Promise((r) => setTimeout(r, 1400));

    const active = getActiveFile();
    let reply = "";
    
    if (copilotEngine.includes("DeepSeek-R1")) {
      // DeepSeek R1 Thinking Mode simulation
      reply = `<pensamento_profundo>
- Usuário solicitou ajuda com: "${query}"
- Analisando estrutura do arquivo ativo '${active ? active.name : "Nenhum"}'
- Identificando padrões clássicos de Pawn SAMP e alocação de memória no compilador AMX.
- Verificando consultas MySQL. Processando otimização com string limitadas (sscanf / zcmd).
- Gerando resposta analítica e precisa...
</pensamento_profundo>

Interpretei sua dúvida usando o **DeepSeek-R1 (Pensamento Profundo)**.

Para o que você pediu: "${query}", aqui está a solução estruturada no padrão ideal de Pawn:

\`\`\`pawn
// Exemplo de manipulação segura para SAMP
CMD:executaracao(playerid, params[]) {
    new Float:x, Float:y, Float:z;
    if(IsPlayerInAnyVehicle(playerid)) {
        new veh = GetPlayerVehicleID(playerid);
        GetVehiclePos(veh, x, y, z);
        // Otimização DeepSeek: Previne dessincronização de coordenadas MySQL
        printf("[DEEPSEEK OPT] Veículo %d salvo em %.2f, %.2f", veh, x, y);
    }
    return 1;
}
\`\`\``;
    } else if (copilotEngine.includes("Gemini")) {
      reply = `✨ **Google Gemini 2.5 Pro / Flash** (Janela de contexto ampliada de 2M tokens)

Analisei todos os arquivos do seu workspace para contextualizar sua pergunta: "${query}".

Como especialista em integrações, recomendo focar na portabilidade. Se você quer empacotar seu projeto para **celular Android (APK)** ou **desktop (EXE)**, o Gemini orienta a estruturação dos scripts usando o **Gradle** e **WebView2** do Windows.

Para automatizar a leitura de arquivos e criação de pastas no computador e celular, você pode utilizar funções nativas do Node.js ou os comandos do Termux:
- No computador: Use a biblioteca \`fs-extra\` para gerenciar arquivos de forma robusta.
- No celular: Configure o plugin nativo do **Capacitor Filesystem** no seu \`AndroidManifest.xml\` para obter permissões completas de gravação na memória.

*Dica do Gemini*: Acesse o nosso menu "Compilador APK & EXE" para gerar os pacotes nativos assinados de forma automática!`;
    } else if (copilotEngine.includes("GPT-4o") || copilotEngine.includes("ChatGPT")) {
      reply = `🤖 **ChatGPT / GPT-4o Studio** (OpenAI Enterprise Intelligence)

Processando solicitação com base em padrões modernos de engenharia de software.

Para sanar a dúvida: "${query}", podemos desenhar uma arquitetura limpa (Clean Architecture). Em servidores modernos (como GTA SAMP conectado com API Web em Express), a persistência de contas e arquivos deve ser assíncrona para evitar congelamentos (lags) no servidor principal.

Aqui está um modelo de injeção de dependências e gerenciamento de arquivos em JavaScript/TypeScript:
\`\`\`javascript
// Estrutura de Gerenciamento de Pastas recomendada pelo GPT-4o
import fs from 'fs';
import path from 'path';

export class ProjectManager {
    static createProjectFolder(projectName) {
        const targetPath = path.join(process.cwd(), 'projects', projectName);
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
            console.log(\`[GPT-4o] Direitório criado: \${targetPath}\`);
            return true;
        }
        return false;
    }
}
\`\`\``;
    } else if (copilotEngine.includes("Claude")) {
      reply = `✍️ **Claude 3.5 Sonnet Engine** (Anthropic Refactoring Specialist)

Realizei uma análise sintática completa e auditoria de segurança para a sua solicitação: "${query}".

Foco principal do Claude: **Segurança, Integridade e Prevenção de Falhas**.
Ao manusear pastas e arquivos compactados no celular e no PC, previna ataques de "Path Traversal" (onde usuários mal-intencionados tentam acessar pastas do sistema operacional usando sequências como \`../../\`).

Exemplo de sanitização rigorosa de arquivos:
\`\`\`typescript
// Algoritmo de segurança contra invasão de pastas (Path Traversal) - Claude 3.5
import path from 'path';

function sanitizePath(baseDir: string, userPath: string): string {
    const safePath = path.normalize(userPath).replace(/^(\\.\\.(\\/|\\\\))+/, '');
    const finalPath = path.join(baseDir, safePath);
    if (!finalPath.startsWith(baseDir)) {
        throw new Error("Acesso de diretório não autorizado detectado!");
    }
    return finalPath;
}
\`\`\``;
    } else if (copilotEngine.includes("NanoBanana")) {
      reply = `🍌🚀 **NanoBanana Mobile Engine** (Fast, Friendly & Energetic!)

*Banana Mode: Ativado!* 🍌💛
Vamos descascar essa dúvida bem rápido e acelerar o seu código de celular e computador para rodar liso!

Para sua pergunta: "${query}", o NanoBanana diz:
- No celular (Android), mantenha o tamanho dos arquivos e assets estáticos muito pequenos para não estourar a memória RAM!
- Use compactação ZIP com taxa máxima de redução (LZMA) antes de exportar o seu projeto.
- Crie caches para diminuir chamadas ao banco SQL.

Escrevi um utilitário super leve de LocalStorage simulado para você salvar suas preferências de pasta de forma instantânea:
\`\`\`javascript
// NanoBanana Ultralight LocalStorage Cache
const BananaCache = {
    save(key, val) {
        localStorage.setItem('banana_' + key, JSON.stringify(val));
    },
    get(key) {
        return JSON.parse(localStorage.getItem('banana_' + key)) || null;
    }
};
\`\`\`
Qualquer outra coisa, pode gritar! Foco na velocidade! 🏃⚡`;
    } else {
      reply = `Interpretei a solicitação "${query}" com as redes neurais do ${copilotEngine}. \n\nSeja para Pawn SAMP ou para o desenvolvimento full-stack com Express/React, as boas práticas indicam separar a lógica de persistência de dados. \n\nPara otimizar o arquivo ativo '${active ? active.name : "sem arquivo selecionado"}', você pode usar as ações rápidas "Fix Bugs" ou "Otimizar" localizadas no painel do copiloto.`;
    }

    setCopilotResponse(reply);
    setIsCopilotThinking(false);
  };

  // Export as ZIP file
  const exportProjectAsZip = async () => {
    try {
      const zip = new JSZip();
      files.forEach((f) => {
        if (!f.isFolder) {
          zip.file(f.path, f.content || "");
        } else {
          zip.folder(f.path);
        }
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTerminalLogs((prev) => [
        ...prev,
        { text: `💾 [Exportador ZIP]: Sincronizados todos os diretórios com sucesso em '${projectName}.zip'!`, type: "success" }
      ]);
    } catch (err: any) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `🚨 [Erro]: Falha ao criar compactado ZIP: ${err.message}`, type: "error" }
      ]);
    }
  };

  // Compile project simulation
  const handleCompileSimulation = async () => {
    setIsCompiling(true);
    setTerminalLogs((prev) => [
      ...prev,
      { text: `⚙️ [Compilador]: Compilando arquitetura do projeto '${projectName}'...`, type: "info" }
    ]);

    await new Promise((r) => setTimeout(r, 1200));

    if (activeTemplate === "pawn_samp") {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `[PAWN] Compilando '/gamemodes/main.pwn'...`, type: "info" },
        { text: `[PAWN] Lendo includes nativos (a_samp, a_mysql, zcmd, sscanf2)...`, type: "info" },
        { text: `[PAWN] Code size: 18400 bytes, Header size: 4010 bytes.`, type: "success" },
        { text: `[PAWN] Compilação completa com SUCESSO! 0 erros, 0 avisos.`, type: "success" },
        { text: `🎮 [SAMP Server]: Servidor compilado pronto para iniciar. Clique em "Iniciar Servidor Virtual"!`, type: "success" }
      ]);
    } else if (activeTemplate === "react_dashboard") {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `[VITE] Building for production...`, type: "info" },
        { text: `✓ 12 modules compiled into static client chunk.`, type: "success" },
        { text: `dist/index.html                     0.84 kB`, type: "success" },
        { text: `dist/assets/index-D7b3s8A9.js      48.10 kB │ gzip: 14.25 kB`, type: "success" },
        { text: `✨ [VITE]: Build concluído perfeitamente! Atualizado na sandbox de visualização.`, type: "success" }
      ]);
    } else if (activeTemplate === "express_api") {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `[NODE]: Executando 'node server.js'...`, type: "info" },
        { text: `[NODE]: Conectando aos roteadores Express integrados...`, type: "info" },
        { text: `🛡️ [Node API]: Servidor Express rodando na porta 3000 com blindagem ativa.`, type: "success" }
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `[PWA]: Lendo arquivo 'index.html' e folhas 'css/style.css'...`, type: "info" },
        { text: `[PWA]: Sincronizado armazenamento LocalStorage de tarefas offline.`, type: "success" }
      ]);
    }

    setIsCompiling(false);
  };

  // Run SAMP Terminal Commands
  const handleSampCmdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampCmdInput.trim()) return;

    const cmd = sampCmdInput.trim();
    setSampCmdInput("");

    setTerminalLogs((prev) => [
      ...prev,
      { text: `🎮 [SAMP Console]: Executando comando "${cmd}"...`, type: "info" }
    ]);

    setTimeout(() => {
      if (cmd.startsWith("/comprarcarro")) {
        const parts = cmd.split(" ");
        const id = parseInt(parts[1]) || 411;
        if (id < 400 || id > 611) {
          setTerminalLogs((prev) => [
            ...prev,
            { text: `[CONCURRENCY ERROR] OnPlayerCommandText: /comprarcarro -> Carro inválido (400-611).`, type: "error" }
          ]);
        } else {
          setTerminalLogs((prev) => [
            ...prev,
            { text: `[SAMP SERVER] Carro criado! ID veículo: ${id} na posição virtual do jogador.`, type: "success" }
          ]);
        }
      } else if (cmd.startsWith("/dararma")) {
        const parts = cmd.split(" ");
        const weaponId = parseInt(parts[1]) || 24;
        const ammo = parseInt(parts[2]) || 500;
        setTerminalLogs((prev) => [
          ...prev,
          { text: `[SAMP SERVER] GivePlayerWeapon: ID ${weaponId} concedida com ${ammo} de munição para Alysson_Admin.`, type: "success" }
        ]);
      } else if (cmd === "/players") {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `--- Jogadores Online (${sampPlayers.length}/50) ---`, type: "info" },
          ...sampPlayers.map(p => ({ text: `ID: ${p.id} | Nome: ${p.name} | Score: ${p.score} | Ping: ${p.ping}ms`, type: "success" as const }))
        ]);
      } else if (cmd === "/mysql-status") {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `[MYSQL STATUS] Conexões ativas: 1, Host: ${SQL_HOST_MOCK()}, Banco: samp_database, Latência: 5ms`, type: "success" }
        ]);
      } else if (cmd === "/uptime") {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `[SYSTEM] Servidor virtual rodando há 1 hora, 12 minutos e 45 segundos.`, type: "info" }
        ]);
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          { text: `[RCON ERROR] Comando desconhecido ou não registrado. Registrados: /comprarcarro, /dararma, /players, /mysql-status, /uptime`, type: "error" }
        ]);
      }
    }, 400);
  };

  const SQL_HOST_MOCK = () => "127.0.0.1";

  // REST API Client Simulator Command
  const testRestApiEndpoint = async () => {
    setApiLatency(null);
    setApiResponseJson(null);
    setApiStatusCode(null);
    
    const startTime = Date.now();
    await new Promise((r) => setTimeout(r, 600));
    const latency = Date.now() - startTime;
    setApiLatency(latency);

    if (selectedApiRoute === "/api/health") {
      setApiStatusCode(200);
      setApiResponseJson({
        status: "ONLINE",
        uptime: 1482.4,
        environment: "production",
        security_shield: "MÁXIMO_SHIELD_ACTIVE",
        services: {
          mysql_connection: "ESTÁVEL",
          jwt_validator: "ATIVO"
        }
      });
    } else if (selectedApiRoute === "/api/auth/login") {
      try {
        const body = JSON.parse(apiRequestBody);
        if (body.username === "admin" && body.password === "admin123") {
          setApiStatusCode(200);
          setApiResponseJson({
            success: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.opencode_jwt_secret_token",
            user: {
              username: "admin",
              role: "system_operator",
              last_login: new Date().toISOString()
            }
          });
        } else {
          setApiStatusCode(401);
          setApiResponseJson({
            error: "Credenciais inválidas! Use username: 'admin' e password: 'admin123'"
          });
        }
      } catch (e: any) {
        setApiStatusCode(400);
        setApiResponseJson({
          error: "Payload de requisição inválido. Certifique-se de usar JSON formatado.",
          details: e.message
        });
      }
    }
  };

  // AI Copilot operations
  const triggerCopilotAction = async (actionType: "bug" | "optimize" | "explain") => {
    setIsCopilotThinking(true);
    setCopilotDiffCode(null);
    const active = getActiveFile();

    if (!active || active.isFolder || !active.content) {
      setCopilotResponse("Por favor, selecione um arquivo no editor antes de solicitar essa ação do Copiloto.");
      setIsCopilotThinking(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 1500));

    let reply = "";
    let diff = "";

    if (actionType === "bug") {
      reply = `Escaneei o arquivo '${active.name}' com as redes profundas do ${copilotEngine}. Encontrei 2 vulnerabilidades críticas de concorrência e buffer overflow. Escrevi um rascunho corrigido que previne injeções, adiciona validações de limite e otimiza as declarações de strings locais. Veja as correções na comparação abaixo:`;
      
      if (active.name.endsWith(".pwn")) {
        diff = active.content.replace(
          `if(sscanf(params, "d", carro_id))`,
          `// 🛡️ Prevenção de Buffer Overflow adicionada pelo Copiloto Maximo\n    if(IsNull(params)) return SendClientMessage(playerid, 0xFF0000FF, "Use: /comprarcarro [id_veiculo]");\n    if(sscanf(params, "d", carro_id))`
        );
      } else {
        diff = active.content + `\n\n// ✨ Código blindado de forma assistida por Copiloto OpenCode v10.0\n`;
      }
    } else if (actionType === "optimize") {
      reply = `Otimização profunda de performance concluída! Removi loops redundantes, reduzi a alocação de memória na Heap e apliquei cache inteligente de consultas no banco MySQL local. O arquivo agora é 45% mais rápido no processamento de requisições paralelas.`;
      diff = active.content + `\n// [OTIMIZADO]: Adicionado cache em memória e tratamento assíncrono para melhorar o processamento.`;
    } else {
      reply = `Aqui está uma explicação detalhada da arquitetura deste arquivo: \n\n1. **Propósito**: O arquivo '${active.name}' atua como ponto de entrada para o processamento e acoplamento lógico da aplicação.\n2. **Dependências**: Usa as principais blibliotecas declaradas para criar chamadas eficientes.\n3. **Melhorias de Design**: O código está bem encapsulado, com baixo acoplamento e ideal para ser exportado em ZIP para deploy final.`;
    }

    setCopilotResponse(reply);
    if (diff) setCopilotDiffCode(diff);
    setIsCopilotThinking(false);
  };

  // Sincronize/Injetar custom copilot code
  const injectCopilotDiffCode = () => {
    if (!copilotDiffCode) return;
    updateActiveFileContent(copilotDiffCode);
    setCopilotDiffCode(null);
    setTerminalLogs((prev) => [
      ...prev,
      { text: `📥 [Injeção AI]: Sugestão do Copiloto aplicada com sucesso no arquivo ativo!`, type: "success" }
    ]);
  };

  // Search results finder
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    return files.filter(
      (f) =>
        !f.isFolder &&
        (f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.content?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Global search and replace
  const handleGlobalReplace = () => {
    if (!searchReplaceQuery.trim()) return;
    let occurrencesCount = 0;

    const updatedFiles = files.map((f) => {
      if (f.isFolder || !f.content) return f;
      const regex = new RegExp(searchReplaceQuery, "g");
      const match = f.content.match(regex);
      if (match) {
        occurrencesCount += match.length;
        const newContent = f.content.replace(regex, searchReplaceWith);
        return { ...f, content: newContent };
      }
      return f;
    });

    setFiles(updatedFiles);
    setTerminalLogs((prev) => [
      ...prev,
      {
        text: `✏️ [Substituição Global]: Substituído '${searchReplaceQuery}' por '${searchReplaceWith}' em ${occurrencesCount} locais do projeto.`,
        type: "success"
      }
    ]);
  };

  // Render file tree recursively
  const renderExplorerNode = (parentPath: string = "") => {
    const levelNodes = files.filter((f) => {
      const parts = f.path.split("/");
      if (parentPath === "") {
        return parts.length === 1;
      }
      return parts.length === parentPath.split("/").length + 1 && f.path.startsWith(`${parentPath}/`);
    });

    // Sort: Folders first, then files
    levelNodes.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return (
      <div className="space-y-0.5 pl-2 select-none">
        {levelNodes.map((node) => {
          const isFolder = node.isFolder;
          const isExpanded = expandedFolders[node.path] || false;
          const isActive = node.id === activeFileId;
          const isEditing = editingFileId === node.id;

          return (
            <div key={node.id} className="group/item">
              <div
                onClick={() => {
                  if (isFolder) {
                    setExpandedFolders((prev) => ({ ...prev, [node.path]: !isExpanded }));
                  } else {
                    setActiveFileId(node.id);
                    if (!openTabs.includes(node.id)) {
                      setOpenTabs((prev) => [...prev, node.id]);
                    }
                  }
                }}
                className={`flex items-center justify-between p-1 rounded-lg text-xs cursor-pointer transition ${
                  isActive 
                    ? "bg-indigo-600/20 text-indigo-400 font-bold border-l-2 border-indigo-500" 
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {isFolder ? (
                    isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    )
                  ) : (
                    <span className="w-3.5 h-3.5"></span>
                  )}

                  {isFolder ? (
                    <Folder className="w-4 h-4 shrink-0 text-indigo-400" />
                  ) : (
                    <FileCode className="w-4 h-4 shrink-0 text-sky-400" />
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={editNameValue}
                      onChange={(e) => setEditNameValue(e.target.value)}
                      onBlur={handleSaveRename}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveRename();
                        if (e.key === "Escape") setEditingFileId(null);
                      }}
                      className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-white outline-none w-28 font-mono"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="truncate">{node.name}</span>
                  )}
                </div>

                {/* Inline explorer Actions */}
                <div className="flex items-center gap-0.5 opacity-0 group-hover/item:opacity-100 transition shrink-0 ml-2">
                  {isFolder && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCreatingInFolder({ parentPath: node.path, isFolder: false });
                        }}
                        title="Novo Arquivo"
                        className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                      >
                        <FilePlus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCreatingInFolder({ parentPath: node.path, isFolder: true });
                        }}
                        title="Nova Pasta"
                        className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                      >
                        <FolderPlus className="w-3 h-3" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => handleStartRename(node, e)}
                    title="Renomear"
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteElement(node.id, e)}
                    title="Excluir"
                    className="p-1 hover:bg-slate-700 rounded text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Children Nodes recursion */}
              {isFolder && isExpanded && (
                <div className="border-l border-slate-800/80 ml-2 mt-0.5 pl-1">
                  {renderExplorerNode(node.path)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const activeFile = getActiveFile();
  const editorStats = getEditorStats();

  return (
    <div className={`space-y-6 ${
      workspaceTheme === "hacker" ? "font-mono" : ""
    }`}>
      
      {/* 🧭 TITULO E SUBPROJETOS BANNER */}
      <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-xl">
              <Layers className="w-5 h-5 text-white" />
            </span>
            <h2 className="text-sm font-black text-slate-200 tracking-wider uppercase font-mono">
              ESTÚDIO VIRTUAL OPENCODE MÁXIMO
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Navegue por diretórios, crie pastas e subprojetos em GTA SAMP (Pawn), React e Express. **Arraste e solte arquivos .zip reais** para editá-los e baixe a pasta inteira compactada em segundos!
          </p>
        </div>

        {/* Global Action items */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Real ZIP Importer */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-2 rounded-xl border border-dashed text-xs cursor-pointer flex items-center gap-2 transition ${
              isDraggingOver 
                ? "bg-indigo-500/10 border-indigo-500 text-indigo-400 scale-105" 
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-4 h-4 text-pink-500" />
            <span>{isDraggingOver ? "Solte o ZIP aqui!" : "Importar .zip Real"}</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleZipUpload}
              accept=".zip"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-850">
            <span className="text-[10px] text-slate-500 font-mono font-bold">PROJETO:</span>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
              className="bg-transparent border-none text-xs text-slate-200 outline-none w-28 font-mono font-bold focus:ring-1 focus:ring-indigo-500/20 rounded"
              placeholder="Nome"
            />
          </div>

          <button
            onClick={exportProjectAsZip}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-black tracking-wide uppercase transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar ZIP de Alta Performance</span>
          </button>
        </div>
      </div>

      {/* 🧭 DESKTOP GRID LAYOUT FOR THE WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: FILE EXPLORER / SEARCH SIDEBAR (xl:col-span-3) */}
        <div className="xl:col-span-3 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col min-h-[580px] overflow-hidden shadow-xl">
          
          {/* Sidebar Tabs Selectors */}
          <div className="flex bg-slate-950 border-b border-slate-850 p-1">
            <button
              onClick={() => setSidebarTab("explorer")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center justify-center gap-1 cursor-pointer ${
                sidebarTab === "explorer" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Folder className="w-3 h-3 text-indigo-400" />
              <span>Explorer</span>
            </button>
            <button
              onClick={() => setSidebarTab("search")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center justify-center gap-1 cursor-pointer ${
                sidebarTab === "search" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <SearchCode className="w-3 h-3 text-pink-400" />
              <span>Busca</span>
            </button>
            <button
              onClick={() => setSidebarTab("templates")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center justify-center gap-1 cursor-pointer ${
                sidebarTab === "templates" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>Modelos</span>
            </button>
            <button
              onClick={() => setSidebarTab("settings")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center justify-center gap-1 cursor-pointer ${
                sidebarTab === "settings" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Settings2 className="w-3 h-3 text-sky-400" />
              <span>Opções</span>
            </button>
          </div>

          {/* Tab content area */}
          <div className="p-4 flex-1 flex flex-col overflow-y-auto">
            
            {/* EXPLORER TAB */}
            {sidebarTab === "explorer" && (
              <div className="space-y-4 flex flex-col h-full">
                {/* Global File / Folder creations buttons */}
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ARQUIVOS DO PROJETO</span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsCreatingInFolder({ parentPath: "", isFolder: false })}
                      title="Novo Arquivo Raiz"
                      className="p-1 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded text-slate-400 hover:text-white"
                    >
                      <FilePlus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsCreatingInFolder({ parentPath: "", isFolder: true })}
                      title="Nova Pasta Raiz"
                      className="p-1 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded text-slate-400 hover:text-white"
                    >
                      <FolderPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Creation Input Field */}
                {isCreatingInFolder && (
                  <div className="p-2.5 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-2 animate-fadeIn">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      {isCreatingInFolder.isFolder ? <Folder className="w-3 h-3 text-indigo-400" /> : <FileCode className="w-3 h-3 text-sky-400" />}
                      <span>Criando {isCreatingInFolder.isFolder ? "Diretório" : "Arquivo"} {isCreatingInFolder.parentPath ? `em ${isCreatingInFolder.parentPath}` : "na Raiz"}</span>
                    </span>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newElementName}
                        onChange={(e) => setNewElementName(e.target.value)}
                        placeholder="Nome (Ex: script.pwn)"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white outline-none font-mono"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCreateNewElement();
                          if (e.key === "Escape") setIsCreatingInFolder(null);
                        }}
                      />
                      <button
                        onClick={handleCreateNewElement}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold"
                      >
                        OK
                      </button>
                      <button
                        onClick={() => {
                          setIsCreatingInFolder(null);
                          setNewElementName("");
                        }}
                        className="p-1 bg-slate-850 hover:bg-slate-800 rounded text-slate-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Files Tree list */}
                <div className="flex-1 overflow-y-auto max-h-[420px] pr-1">
                  {renderExplorerNode("")}
                  {files.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-xs">
                      <Folder className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>Nenhum arquivo virtual no projeto.</p>
                      <button
                        onClick={() => loadTemplate("pawn_samp")}
                        className="mt-3 text-xs text-indigo-400 underline hover:text-indigo-300"
                      >
                        Carregar Template Padrão
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SEARCH TAB */}
            {sidebarTab === "search" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">BUSCAR NOS ARQUIVOS</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquisar termo..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Global Search and Replace section */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-300 block">Substituição Global</span>
                  
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={searchReplaceQuery}
                      onChange={(e) => setSearchReplaceQuery(e.target.value)}
                      placeholder="Localizar palavra..."
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-2.5 py-1 text-[11px] text-white outline-none"
                    />
                    <input
                      type="text"
                      value={searchReplaceWith}
                      onChange={(e) => setSearchReplaceWith(e.target.value)}
                      placeholder="Substituir por..."
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-2.5 py-1 text-[11px] text-white outline-none"
                    />
                  </div>

                  <button
                    onClick={handleGlobalReplace}
                    className="w-full py-1.5 bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-bold rounded-lg transition"
                  >
                    Substituir Tudo no Projeto
                  </button>
                </div>

                {/* Search Results list */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto">
                  {searchQuery.trim() !== "" && (
                    <div className="text-[10px] text-slate-500">
                      Encontrados {getSearchResults().length} correspondências:
                    </div>
                  )}

                  {getSearchResults().map((res) => (
                    <div
                      key={res.id}
                      onClick={() => handleOpenFile(res.id)}
                      className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-lg text-left cursor-pointer transition"
                    >
                      <div className="text-[11px] font-bold text-sky-400 font-mono truncate">{res.path}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate italic font-mono">
                        {res.content?.substring(0, 40)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TEMPLATES TAB */}
            {sidebarTab === "templates" && (
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">SELECIONAR SUBPROJETO</span>
                <div className="space-y-2">
                  {templates.map((tpl) => {
                    const Icon = tpl.icon;
                    const isSelected = activeTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          if (window.confirm(`Isso irá substituir o projeto atual pelo template '${tpl.name}'. Deseja prosseguir?`)) {
                            loadTemplate(tpl.id);
                          }
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-500/10 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-900 text-slate-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold truncate">{tpl.name}</div>
                          <div className="text-[9px] text-slate-500 truncate mt-0.5">{tpl.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {sidebarTab === "settings" && (
              <div className="space-y-4 text-xs text-slate-300">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">PREFERÊNCIAS DO WORKSPACE</span>
                
                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 block">Tema do Editor</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "slate", name: "Estúdio Slate" },
                      { id: "hacker", name: "Green Hacker" },
                      { id: "neon", name: "Neon Cyber" },
                      { id: "light", name: "Polar Light" }
                    ].map((th) => (
                      <button
                        key={th.id}
                        onClick={() => setWorkspaceTheme(th.id as any)}
                        className={`p-1.5 rounded-lg border text-[10px] font-bold text-center transition cursor-pointer ${
                          workspaceTheme === th.id
                            ? "bg-indigo-500/10 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-850 text-slate-500 hover:bg-slate-900"
                        }`}
                      >
                        {th.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size adjustments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Tamanho da Fonte</span>
                    <span className="font-mono text-white">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="18"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Editor toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-850">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400">Exibir Linhas</span>
                    <input
                      type="checkbox"
                      checked={showLineNumbers}
                      onChange={(e) => setShowLineNumbers(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400">Apenas Leitura</span>
                    <input
                      type="checkbox"
                      checked={isReadOnly}
                      onChange={(e) => setIsReadOnly(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick instructions indicator */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-850 flex items-center gap-2">
            <Info className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="text-[9.5px] text-slate-500 leading-tight">
              Gerencie arquivos virtuais por pasta. Dê duplo clique em nomes ou utilize ações rápidas.
            </span>
          </div>

        </div>

        {/* MIDDLE COLUMN: THE LIVE CODE EDITOR (xl:col-span-5) */}
        <div className="xl:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl flex flex-col min-h-[580px]">
          
          {/* Editor Header / Open Tabs row */}
          <div className="bg-slate-950 border-b border-slate-850 p-2 flex items-center justify-between">
            {/* Open Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pr-2 scrollbar-none">
              {openTabs.map((tabId) => {
                const tabFile = files.find((f) => f.id === tabId);
                if (!tabFile) return null;
                const isTabActive = tabId === activeFileId;
                return (
                  <div
                    key={tabId}
                    onClick={() => setActiveFileId(tabId)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium flex items-center gap-1.5 cursor-pointer transition shrink-0 ${
                      isTabActive
                        ? "bg-slate-900 border border-slate-800 text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{tabFile.name}</span>
                    <button
                      onClick={(e) => handleCloseTab(tabId, e)}
                      className="p-0.5 hover:bg-slate-800 rounded text-slate-600 hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                );
              })}
              {openTabs.length === 0 && (
                <span className="text-xs text-slate-600 font-sans pl-2">Nenhum arquivo aberto</span>
              )}
            </div>

            {/* Editor Action keys */}
            <div className="flex items-center gap-1">
              {activeFile && !activeFile.isFolder && (
                <button
                  onClick={formatCurrentDocument}
                  title="Formatar Documento (Prettier)"
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-emerald-400" />
                  <span>Format</span>
                </button>
              )}
              
              <button
                onClick={handleCompileSimulation}
                disabled={isCompiling}
                className="px-3 py-1 bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-[10px] font-bold rounded-lg transition disabled:opacity-50 flex items-center gap-1 cursor-pointer"
              >
                {isCompiling ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                <span>{isCompiling ? "Compilando..." : "Compilar"}</span>
              </button>
            </div>
          </div>

          {/* Core Textarea / Editor Area */}
          <div className="flex-1 flex bg-slate-950 relative">
            
            {/* Editor Themes styling config */}
            {activeFile && !activeFile.isFolder ? (
              <div className="flex-1 flex overflow-hidden font-mono text-xs">
                
                {/* Simulated Line numbers sidebar */}
                {showLineNumbers && (
                  <div className="bg-slate-950/80 p-2.5 pr-2.5 text-right text-slate-700 select-none border-r border-slate-900/60 leading-normal font-mono shrink-0">
                    {Array.from({ length: (activeFile.content || "").split("\n").length }).map((_, i) => (
                      <div key={i} className="text-[11px] h-[18px]">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}

                <textarea
                  value={activeFile.content || ""}
                  readOnly={isReadOnly}
                  onChange={(e) => updateActiveFileContent(e.target.value)}
                  className={`flex-1 p-2.5 outline-none font-mono leading-normal resize-none h-[420px] bg-transparent ${
                    workspaceTheme === "hacker"
                      ? "text-emerald-400 selection:bg-emerald-800/60"
                      : workspaceTheme === "neon"
                      ? "text-pink-400 selection:bg-purple-800/60"
                      : workspaceTheme === "light"
                      ? "text-slate-800 bg-slate-50 selection:bg-indigo-100"
                      : "text-slate-300 selection:bg-indigo-900/50"
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="// Selecione ou adicione um arquivo virtual no explorer para programar..."
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-950/40">
                <Code className="w-12 h-12 text-slate-700 animate-pulse mb-3" />
                <h3 className="text-sm font-bold text-slate-400">Nenhum Arquivo Aberto para Edição</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1.5">
                  Dê um duplo clique ou selecione um arquivo no Explorer ao lado esquerdo para visualizar e modificar.
                </p>
              </div>
            )}

          </div>

          {/* Editor Footer HUD info stats */}
          <div className="bg-slate-950 border-t border-slate-850 px-4 py-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span>PROJETO: <strong>{projectName}</strong></span>
              {activeFile && (
                <span className="text-sky-400">ARQUIVO: {activeFile.name}</span>
              )}
            </div>

            {activeFile && !activeFile.isFolder && (
              <div className="flex items-center gap-3">
                <span>Linhas: <strong className="text-slate-300">{editorStats.lines}</strong></span>
                <span>Palavras: <strong className="text-slate-300">{editorStats.words}</strong></span>
                <span>Tamanho: <strong className="text-slate-300">{editorStats.size}</strong></span>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE SIMULATORS & COPILOT AI (xl:col-span-4) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* SANDBOX LIVE ENGINE SIMULATOR */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            
            {/* Sandbox Title bar */}
            <div className="bg-slate-950 p-3 border-b border-slate-850 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">
                  Sandbox de Execução Live
                </span>
              </div>

              {/* Viewport Selectors */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setDevicePreview("desktop")}
                  className={`p-1 rounded text-slate-500 hover:text-white transition cursor-pointer ${devicePreview === "desktop" ? "bg-indigo-600 text-white" : ""}`}
                  title="Visualização Computador"
                >
                  <Laptop className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setDevicePreview("mobile")}
                  className={`p-1 rounded text-slate-500 hover:text-white transition cursor-pointer ${devicePreview === "mobile" ? "bg-indigo-600 text-white" : ""}`}
                  title="Visualização Celular"
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Dynamic visual interface dependent on the Active Project Template */}
            <div className="p-4 bg-slate-950/60 min-h-[220px]">
              
              {/* GTA SAMP VIRTUAL CONSOLE SIMULATOR */}
              {activeTemplate === "pawn_samp" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Console de Eventos GTA SAMP</span>
                    </span>

                    <button
                      onClick={() => {
                        setSampServerRunning(!sampServerRunning);
                        setTerminalLogs((prev) => [
                          ...prev,
                          {
                            text: sampServerRunning 
                              ? `🛑 [SAMP]: Servidor local desligado.` 
                              : `🎮 [SAMP]: Servidor iniciado na porta 7777 com persistência MySQL.`,
                            type: sampServerRunning ? "warn" : "success"
                          }
                        ]);
                      }}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                        sampServerRunning 
                          ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30" 
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {sampServerRunning ? "Desligar Servidor" : "Iniciar Servidor Virtual"}
                    </button>
                  </div>

                  {/* Simulated terminal response stream */}
                  <div className="bg-slate-950 rounded-xl border border-slate-850 p-3 h-36 overflow-y-auto font-mono text-[10px] space-y-1">
                    {terminalLogs.length === 0 ? (
                      <span className="text-slate-600 italic">O console está aguardando conexões. Clique em "Iniciar Servidor Virtual" para testar comandos SAMP...</span>
                    ) : (
                      terminalLogs.map((log, index) => (
                        <div
                          key={index}
                          className={`${
                            log.type === "success"
                              ? "text-emerald-400 font-bold"
                              : log.type === "error"
                              ? "text-red-400 font-bold"
                              : log.type === "warn"
                              ? "text-amber-400"
                              : "text-slate-400"
                          }`}
                        >
                          {log.text}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Terminal input */}
                  <form onSubmit={handleSampCmdSubmit} className="flex gap-1.5">
                    <input
                      type="text"
                      value={sampCmdInput}
                      disabled={!sampServerRunning}
                      onChange={(e) => setSampCmdInput(e.target.value)}
                      placeholder={sampServerRunning ? "Digite: /comprarcarro 411 ou /players..." : "Inicie o servidor para interagir"}
                      className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white outline-none disabled:opacity-40 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!sampServerRunning}
                      className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition disabled:opacity-40"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              )}

              {/* REACT ADMIN DASHBOARD INTERACTIVE VIEW */}
              {activeTemplate === "react_dashboard" && (
                <div className={`space-y-4 p-3.5 border rounded-xl transition-all ${
                  devicePreview === "mobile" ? "max-w-[280px] mx-auto rounded-3xl border-slate-800" : "w-full bg-slate-950 border-slate-850"
                }`}>
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">⚡ OPENVIRTUAL ADMIN</span>
                    <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">● {dashStatus}</span>
                  </div>

                  {/* Dashboard metrics widgets */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block">Usuários Ativos</span>
                      <span className="text-base font-black text-white font-mono">{dashUsersCount}</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block">Banco de Dados</span>
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">MySQL Ativo</span>
                    </div>
                  </div>

                  {/* Live interactions on dashboard */}
                  <div className="space-y-1.5">
                    <button
                      onClick={() => {
                        setDashUsersCount(dashUsersCount + 1);
                        setDashNotifications(prev => [`Novo usuário adicionado: User_${dashUsersCount + 1}`, ...prev]);
                      }}
                      className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition"
                    >
                      Criar Novo Usuário Virtual (+1)
                    </button>
                  </div>

                  {/* Dashboard notifications feed */}
                  <div className="space-y-1 bg-slate-900 p-2.5 rounded-xl border border-slate-850">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Notificações da Sandbox:</span>
                    <div className="space-y-1">
                      {dashNotifications.slice(0, 2).map((not, idx) => (
                        <div key={idx} className="text-[10px] text-slate-300 leading-tight truncate">
                          💡 {not}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NODE EXPRESS REST API CLIENT SIMULATOR */}
              {activeTemplate === "express_api" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-pink-400" />
                      <span>REST API Client Simulator</span>
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 space-y-2.5">
                    {/* Method and Route bar */}
                    <div className="flex gap-1">
                      <select
                        value={selectedApiMethod}
                        onChange={(e) => setSelectedApiMethod(e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 text-[11px] font-bold text-pink-400 px-2 py-1 rounded-lg outline-none"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                      </select>

                      <select
                        value={selectedApiRoute}
                        onChange={(e) => {
                          setSelectedApiRoute(e.target.value);
                          if (e.target.value === "/api/auth/login") {
                            setSelectedApiMethod("POST");
                          } else {
                            setSelectedApiMethod("GET");
                          }
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 px-2.5 py-1 rounded-lg outline-none"
                      >
                        <option value="/api/health">/api/health</option>
                        <option value="/api/auth/login">/api/auth/login (JWT Auth)</option>
                      </select>

                      <button
                        onClick={testRestApiEndpoint}
                        className="px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                    </div>

                    {/* Conditional Body Input for POST requests */}
                    {selectedApiMethod === "POST" && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-500 block">Payload da Requisição (JSON Body):</span>
                        <textarea
                          value={apiRequestBody}
                          onChange={(e) => setApiRequestBody(e.target.value)}
                          className="w-full h-14 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10.5px] font-mono text-slate-300 outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* API Response Output frame */}
                  {apiResponseJson ? (
                    <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500">RESPOSTA DO SERVIDOR:</span>
                        <div className="flex gap-2">
                          <span className={`px-1.5 py-0.5 rounded font-bold ${apiStatusCode === 200 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            Status: {apiStatusCode}
                          </span>
                          <span className="text-slate-500">{apiLatency}ms</span>
                        </div>
                      </div>
                      <pre className="text-[10px] text-slate-300 font-mono max-h-[100px] overflow-y-auto whitespace-pre-wrap select-text">
                        {JSON.stringify(apiResponseJson, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                      Selecione um endpoint e clique em **Send** para monitorar as rotas da API Express.
                    </div>
                  )}
                </div>
              )}

              {/* HTML5 PWA INTERACTIVE MOBILE TASK LIST */}
              {activeTemplate === "mobile_pwa" && (
                <div className="max-w-[280px] mx-auto bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[280px] relative">
                  <div className="bg-gradient-to-r from-pink-600 to-indigo-600 p-2.5 text-center text-[10px] font-black text-white tracking-widest uppercase">
                    📱 PWA MOBILE WORKSPACE
                  </div>

                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-950">
                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                      Adicione tarefas de forma offline com LocalStorage simulado.
                    </div>

                    <div className="space-y-1.5">
                      {pwaTasks.map((t, idx) => (
                        <div key={idx} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[10.5px] flex justify-between items-center text-white font-medium">
                          <span>{t}</span>
                          <button
                            onClick={() => setPwaTasks(pwaTasks.filter((_, i) => i !== idx))}
                            className="text-red-400 text-[10px] font-bold hover:text-red-300 shrink-0"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input foot */}
                  <div className="p-2 bg-slate-900 border-t border-slate-800 flex gap-1.5">
                    <input
                      type="text"
                      value={newPwaTask}
                      onChange={(e) => setNewPwaTask(e.target.value)}
                      placeholder="Tarefa..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-white outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newPwaTask.trim()) {
                          setPwaTasks([...pwaTasks, newPwaTask.trim()]);
                          setNewPwaTask("");
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newPwaTask.trim()) {
                          setPwaTasks([...pwaTasks, newPwaTask.trim()]);
                          setNewPwaTask("");
                        }
                      }}
                      className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-[11px] text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* AI ASSISTANT / COPILOT ZONE */}
          <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 shadow-xl">
            
            <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="text-xs font-black text-slate-200 tracking-wider uppercase font-mono">
                  Copiloto OpenCode IA
                </span>
              </div>

              {/* Engine Switcher */}
              <select
                value={copilotEngine}
                onChange={(e) => setCopilotEngine(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-[9px] font-bold text-pink-400 px-2 py-0.5 rounded-md outline-none"
              >
                <option value="DeepSeek-R1 (Pensamento Profundo)">DeepSeek-R1</option>
                <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                <option value="GPT-4o Engine">GPT-4o Studio</option>
              </select>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => triggerCopilotAction("bug")}
                disabled={isCopilotThinking}
                className="py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-[10px] text-slate-300 font-bold hover:text-white transition flex flex-col items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <Bug className="w-3.5 h-3.5 text-red-400" />
                <span>Fix Bugs</span>
              </button>

              <button
                onClick={() => triggerCopilotAction("optimize")}
                disabled={isCopilotThinking}
                className="py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-[10px] text-slate-300 font-bold hover:text-white transition flex flex-col items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Otimizar</span>
              </button>

              <button
                onClick={() => triggerCopilotAction("explain")}
                disabled={isCopilotThinking}
                className="py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-[10px] text-slate-300 font-bold hover:text-white transition flex flex-col items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Explicar</span>
              </button>
            </div>

            {/* Copilot stream response bubble */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-400 min-h-[90px] max-h-[140px] overflow-y-auto leading-relaxed select-text">
              {isCopilotThinking ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-2">
                  <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                  <span className="text-[10px] text-slate-500 font-mono">Pensando de forma profunda...</span>
                </div>
              ) : (
                <p>{copilotResponse}</p>
              )}
            </div>

            {/* Side by side diff comparison screen before injection */}
            {copilotDiffCode && (
              <div className="bg-slate-950 p-3 rounded-xl border border-pink-500/30 space-y-2 animate-fadeIn">
                <div className="flex justify-between items-center text-[9.5px] font-mono">
                  <span className="text-pink-400 font-bold">RASCUNHO DISPONÍVEL (AI)</span>
                  <button
                    onClick={injectCopilotDiffCode}
                    className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    <span>Injetar no Editor</span>
                  </button>
                </div>
                <div className="max-h-[90px] overflow-y-auto bg-slate-900 p-2 rounded text-[9.5px] font-mono text-slate-300 whitespace-pre">
                  {copilotDiffCode}
                </div>
              </div>
            )}

            {/* Custom Input prompt */}
            <div className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                placeholder="Ex: Como salvar carros no MySQL em SAMP?"
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-pink-500 placeholder-slate-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") askCopilot();
                }}
              />
              <button
                onClick={askCopilot}
                className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Perguntar
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
