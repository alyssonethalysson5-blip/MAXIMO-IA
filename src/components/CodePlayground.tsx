import React, { useState } from "react";
import { motion } from "motion/react";
import { Code2, Play, Copy, Check, FileCode, Terminal, HelpCircle, Loader2, RefreshCw } from "lucide-react";

interface CodePreset {
  id: string;
  name: string;
  language: string;
  extension: string;
  category: string;
  code: string;
}

const PRESETS: CodePreset[] = [
  {
    id: "pawn-register",
    name: "Sistema de Registro e Login (MySQL)",
    language: "Pawn (.pwn)",
    extension: "pwn",
    category: "SA-MP / GTA RP",
    code: `// Sistema de Registro em MySQL para SA-MP
#include <a_samp>
#include <a_mysql>
#include <bcrypt>

#define SQL_HOST "localhost"
#define SQL_USER "root"
#define SQL_PASS "senha123"
#define SQL_DB   "samp_server"

new MySQL:g_SqlHandle;

public OnGameModeInit()
{
    g_SqlHandle = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS, SQL_DB);
    if(mysql_errno(g_SqlHandle) != 0) {
        print("❌ [MySQL] Falha ao conectar ao banco de dados!");
    } else {
        print("✅ [MySQL] Conectado ao banco de dados com sucesso!");
    }
    return 1;
}

public OnPlayerConnect(playerid)
{
    new query[128], nome[MAX_PLAYER_NAME];
    GetPlayerName(playerid, nome, sizeof(nome));
    mysql_format(g_SqlHandle, query, sizeof(query), "SELECT id FROM contas_jogadores WHERE nome = '%e' LIMIT 1", nome);
    mysql_tquery(g_SqlHandle, query, "VerificarConta", "d", playerid);
    return 1;
}`
  },
  {
    id: "pawn-teleport",
    name: "Comando de Teleporte Rápido (ZCMD)",
    language: "Pawn (.pwn)",
    extension: "pwn",
    category: "SA-MP / GTA RP",
    code: `// Comando de Teleporte Rápido (/irpara) usando ZCMD
#include <a_samp>
#include <zcmd>
#include <sscanf2>

CMD:irpara(playerid, params[])
{
    if(!IsPlayerAdmin(playerid)) {
        return SendClientMessage(playerid, -1, "❌ Erro: Apenas administradores do servidor podem usar este comando!");
    }

    new targetid;
    if(sscanf(params, "u", targetid)) {
        return SendClientMessage(playerid, -1, "ℹ️ Uso: /irpara [ID do Jogador ou Nome]");
    }

    if(!IsPlayerConnected(targetid)) {
        return SendClientMessage(playerid, -1, "❌ Erro: O jogador especificado está offline!");
    }

    new Float:x, Float:y, Float:z;
    GetPlayerPos(targetid, x, y, z);
    
    if(IsPlayerInAnyVehicle(playerid)) {
        new veh = GetPlayerVehicleID(playerid);
        SetVehiclePos(veh, x + 1.0, y + 1.0, z + 0.5);
    } else {
        SetPlayerPos(playerid, x + 1.0, y + 1.0, z + 0.5);
    }

    SendClientMessage(playerid, 0x33CC33FF, "✈️ Você foi teleportado até o jogador com sucesso!");
    return 1;
}`
  },
  {
    id: "unity-controller",
    name: "Movimentação em Grid 2D / TopDown",
    language: "C# (Unity)",
    extension: "cs",
    category: "Unity Engine",
    code: `using UnityEngine;

public class PlayerTopDownMovement : MonoBehaviour
{
    [Header("Configurações de Movimento")]
    [Range(2f, 15f)] public float moveSpeed = 5f;
    
    private Rigidbody2D rb;
    private Vector2 movement;
    private Animator animator;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        // Captura o input do teclado ou controle analógico
        movement.x = Input.GetAxisRaw("Horizontal");
        movement.y = Input.GetAxisRaw("Vertical");

        // Atualiza parâmetros do animator (se houver)
        if (animator != null && movement.sqrMagnitude > 0.01f) {
            animator.SetFloat("Horizontal", movement.x);
            animator.SetFloat("Vertical", movement.y);
            animator.SetFloat("Speed", movement.sqrMagnitude);
        }
    }

    void FixedUpdate()
    {
        // Move o RigidBody com física estável e suavizada
        rb.MovePosition(rb.position + movement.normalized * moveSpeed * Time.fixedDeltaTime);
    }
}`
  },
  {
    id: "godot-signal",
    name: "Sistema de Coleta de Itens (Signals)",
    language: "GDScript (Godot)",
    extension: "gd",
    category: "Godot Engine",
    code: `extends Area2D

# GDScript 2.0 para Godot 4.x - Coleta de moedas/itens
class_name CoinCollectable

signal coin_collected(value: int)

@export var coin_value: int = 10
@export var rotation_speed: float = 3.0

func _process(delta: float) -> void:
	# Rotaciona a moeda visualmente de forma suave
	rotation += rotation_speed * delta

func _on_body_entered(body: Node2D) -> void:
	if body.is_in_group("Player"):
		# Emite o sinal para o gerenciador do jogo
		coin_collected.emit(coin_value)
		
		# Cria um efeito de som ou partícula antes de destruir
		queue_free()`
  }
];

export default function CodePlayground() {
  const [selectedPreset, setSelectedPreset] = useState<CodePreset>(PRESETS[0]);
  const [currentCode, setCurrentCode] = useState<string>(PRESETS[0].code);
  const [copied, setCopied] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [compilationLogs, setCompilationLogs] = useState<string[]>([]);
  const [compileStatus, setCompileStatus] = useState<"idle" | "success" | "failed">("idle");

  const handleSelectPreset = (p: CodePreset) => {
    setSelectedPreset(p);
    setCurrentCode(p.code);
    setCompileStatus("idle");
    setCompilationLogs([]);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateCompile = () => {
    setCompiling(true);
    setCompileStatus("idle");
    setCompilationLogs([
      `Iniciando Compilação Virtual MÁXIMO 10.0 [Alvo: ${selectedPreset.language}]...`,
      "Carregando pacotes, includes e referências do projeto...",
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setCompilationLogs(prev => [...prev, "Analisando árvore de tokens sintáticos (Syntax AST)..."]);
      } else if (step === 2) {
        setCompilationLogs(prev => [...prev, "Verificando imports/includes no diretório virtual..."]);
        // Check for common errors in code
        if (!currentCode.includes("#include") && selectedPreset.extension === "pwn") {
          setCompilationLogs(prev => [...prev, "⚠️ Aviso: Nenhum include padrão encontrado. O compilador Pawn pode ter falhas de linkagem."]);
        }
        if (currentCode.includes("IsPlayerAdmin") && !currentCode.includes("playerid")) {
          setCompilationLogs(prev => [...prev, "❌ ERRO: Callback 'playerid' não declarado na função de checagem admin!"]);
        }
      } else if (step === 3) {
        setCompilationLogs(prev => [...prev, "Otimizando bytecode e alocando registradores internos..."]);
      } else if (step === 4) {
        clearInterval(interval);
        setCompiling(false);
        
        // Decide if compile succeeds based on contents
        const hasError = currentCode.includes("ERROR_SIMULATE") || (currentCode.includes("IsPlayerAdmin") && !currentCode.includes("playerid"));
        
        if (hasError) {
          setCompileStatus("failed");
          setCompilationLogs(prev => [
            ...prev,
            "❌ Erro de Linkagem: Compilação mal sucedida com 1 erro e 0 avisos.",
            "Dica: Verifique os parâmetros passados para as funções do SA-MP."
          ]);
        } else {
          setCompileStatus("success");
          setCompilationLogs(prev => [
            ...prev,
            "✨ Otimização de Código concluída (Size: 14KB)",
            "✅ SUCESSO! Código compilado sem erros ou avisos.",
            `Arquivo gerado: compiled_bundle.${selectedPreset.extension === "pwn" ? "amx" : selectedPreset.extension === "cs" ? "dll" : "gdc"}`
          ]);
        }
      }
    }, 800);
  };

  return (
    <div className="space-y-6" id="code-playground-main">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Code2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Estúdio e Gerador de Modelos de Código</h3>
            <p className="text-xs text-slate-400">Gere códigos profissionais estruturados para SAMP (Pawn), Unity (C#) e Godot (GDScript) e teste sua validade.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar templates selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
              📚 Modelos Disponíveis
            </span>
            <div className="space-y-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`w-full text-left p-3 rounded-lg transition-all border flex flex-col gap-1 cursor-pointer ${
                    selectedPreset.id === p.id
                      ? "bg-indigo-600/15 border-indigo-500/40 text-white"
                      : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{p.name}</span>
                    <span className="text-[8.5px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 py-0.5 rounded">
                      {p.language}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{p.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick instructions */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-2 text-xs text-slate-400 leading-relaxed">
            <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" /> Dica de Desenvolvimento:
            </h4>
            <p>
              Você pode alterar livremente os modelos diretamente no editor ao lado. Caso queira forçar um erro de compilação de testes, insira a palavra-chave <code className="text-rose-400 font-mono">ERROR_SIMULATE</code> no código e clique em Compilar.
            </p>
          </div>
        </div>

        {/* Code Editor frame */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            {/* Header frame */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono text-slate-300 font-bold">
                  workspace/script.{selectedPreset.extension}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copiar Código"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10.5px]">{copied ? "Copiado!" : "Copiar"}</span>
                </button>

                <button
                  onClick={handleSimulateCompile}
                  disabled={compiling}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
                >
                  {compiling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{compiling ? "Compilando..." : "Compilar"}</span>
                </button>
              </div>
            </div>

            {/* Code Field */}
            <div className="relative font-mono text-xs flex-1 bg-slate-950 p-4 min-h-[350px]">
              <textarea
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                className="w-full h-[350px] bg-transparent text-slate-200 outline-none border-none resize-none overflow-y-auto leading-relaxed"
                style={{ tabSize: 4 }}
              />
            </div>
          </div>

          {/* Compilation Logs Screen */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Console de Diagnóstico do Compilador Virtual
            </span>

            {compilationLogs.length > 0 ? (
              <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 space-y-1.5 font-mono text-[10.5px]">
                {compilationLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("❌") || log.includes("Erro")
                        ? "text-rose-400"
                        : log.includes("⚠️") || log.includes("Aviso")
                        ? "text-amber-400"
                        : log.includes("✅") || log.includes("SUCESSO")
                        ? "text-emerald-400 font-bold"
                        : "text-slate-400"
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-850 rounded-lg p-6 text-center text-slate-600 font-mono text-xs">
                Nenhum relatório de compilação ativo. Altere seu código e clique em Compilar acima.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
