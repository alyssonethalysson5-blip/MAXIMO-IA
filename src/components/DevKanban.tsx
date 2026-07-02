import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListTodo, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Check, Bookmark } from "lucide-react";

interface KanbanCard {
  id: string;
  title: string;
  category: "bug" | "feature" | "refactor" | "docs";
  priority: "high" | "medium" | "low";
  column: "todo" | "progress" | "done";
}

const DEFAULT_CARDS: KanbanCard[] = [
  { id: "1", title: "Configurar banco de dados MySQL para tabelas de jogadores", category: "feature", priority: "high", column: "todo" },
  { id: "2", title: "Corrigir erro de estouro de memória no callback OnPlayerUpdate", category: "bug", priority: "high", column: "progress" },
  { id: "3", title: "Refatorar comandos de administração usando a biblioteca ZCMD", category: "refactor", priority: "medium", column: "done" },
  { id: "4", title: "Escrever guia de compilação rápida de arquivos APK", category: "docs", priority: "low", column: "todo" },
];

export default function DevKanban() {
  const [cards, setCards] = useState<KanbanCard[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<KanbanCard["category"]>("feature");
  const [newPriority, setNewPriority] = useState<KanbanCard["priority"]>("medium");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("maximo_kanban_cards");
    if (saved) {
      try {
        setCards(JSON.parse(saved));
      } catch (e) {
        setCards(DEFAULT_CARDS);
      }
    } else {
      setCards(DEFAULT_CARDS);
    }
  }, []);

  // Save to local storage
  const saveCards = (updated: KanbanCard[]) => {
    setCards(updated);
    localStorage.setItem("maximo_kanban_cards", JSON.stringify(updated));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCard: KanbanCard = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      column: "todo"
    };

    const updated = [newCard, ...cards];
    saveCards(updated);
    setNewTitle("");
  };

  const handleDeleteCard = (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    saveCards(updated);
  };

  const handleMoveCard = (id: string, direction: "left" | "right") => {
    const columns: KanbanCard["column"][] = ["todo", "progress", "done"];
    const updated = cards.map(c => {
      if (c.id === id) {
        const currentIdx = columns.indexOf(c.column);
        let nextIdx = currentIdx + (direction === "right" ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < columns.length) {
          return { ...c, column: columns[nextIdx] };
        }
      }
      return c;
    });
    saveCards(updated);
  };

  // Metrics
  const total = cards.length;
  const doneCount = cards.filter(c => c.column === "done").length;
  const progressCount = cards.filter(c => c.column === "progress").length;
  const todoCount = cards.filter(c => c.column === "todo").length;
  const percentage = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const renderColumn = (colName: KanbanCard["column"], title: string, themeColor: string) => {
    const filtered = cards.filter(c => c.column === colName);
    return (
      <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col h-full min-h-[400px]">
        {/* Column header */}
        <div className="flex items-center justify-between mb-3 shrink-0 pb-2 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${themeColor}`} />
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">{title}</h4>
          </div>
          <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-slate-400">
            {filtered.length}
          </span>
        </div>

        {/* Card list */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-[350px]">
          {filtered.length === 0 ? (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-900 rounded-lg text-center text-slate-600 text-[10.5px]">
              Arraste ou crie uma tarefa nesta coluna.
            </div>
          ) : (
            filtered.map((card) => (
              <div
                key={card.id}
                className="bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-2.5">
                  <span className={`text-[8px] font-mono uppercase font-extrabold px-1.5 py-0.5 rounded-md border ${
                    card.category === "bug"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : card.category === "feature"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : card.category === "refactor"
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {card.category}
                  </span>

                  <span className={`text-[8.5px] font-bold ${
                    card.priority === "high"
                      ? "text-rose-400"
                      : card.priority === "medium"
                      ? "text-amber-400"
                      : "text-slate-400"
                  }`}>
                    {card.priority === "high" ? "▲ ALTA" : card.priority === "medium" ? "■ MÉDIA" : "▼ BAIXA"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-200 leading-relaxed break-words">{card.title}</p>

                {/* Card controls */}
                <div className="flex items-center justify-between border-t border-slate-900 pt-2.5">
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex gap-1">
                    {colName !== "todo" && (
                      <button
                        onClick={() => handleMoveCard(card.id, "left")}
                        className="text-slate-500 hover:text-indigo-400 p-1 bg-slate-900 hover:bg-slate-850 rounded border border-slate-850 transition-all cursor-pointer"
                        title="Mover Esquerda"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                    {colName !== "done" && (
                      <button
                        onClick={() => handleMoveCard(card.id, "right")}
                        className="text-slate-500 hover:text-indigo-400 p-1 bg-slate-900 hover:bg-slate-850 rounded border border-slate-850 transition-all cursor-pointer"
                        title="Mover Direita"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="dev-kanban-main">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <ListTodo className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Gerenciador de Metas Kanban de Desenvolvedores</h3>
            <p className="text-xs text-slate-400">Organize suas demandas de programação e acompanhe as taxas de progresso de conclusão do seu projeto.</p>
          </div>
        </div>
      </div>

      {/* Progress Metric Gauge */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block">Metas Concluídas</span>
            <p className="text-xs font-bold text-slate-200">{doneCount} de {total} tarefas ({percentage}%)</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 max-w-md bg-slate-950 h-2 rounded-full border border-slate-850 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Grid: Task Form & Kanban columns */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Task Form */}
        <div className="xl:col-span-3">
          <form onSubmit={handleAddCard} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 space-y-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block border-b border-slate-900 pb-2">
              ➕ Nova Meta de Dev
            </span>

            <div className="space-y-3">
              {/* Title input */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Descrição da Tarefa</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Corrigir bug no login..."
                  className="w-full bg-slate-950 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Category selector */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Categoria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as KanbanCard["category"])}
                  className="w-full bg-slate-950 text-xs text-slate-300 p-2.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="feature">Módulo / Recurso (Feature)</option>
                  <option value="bug">Correção (Bug Fix)</option>
                  <option value="refactor">Otimização (Refactor)</option>
                  <option value="docs">Documentação / Tutoriais</option>
                </select>
              </div>

              {/* Priority selector */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Prioridade</label>
                <div className="grid grid-cols-3 gap-1">
                  {(["high", "medium", "low"] as KanbanCard["priority"][]).map(pri => (
                    <button
                      type="button"
                      key={pri}
                      onClick={() => setNewPriority(pri)}
                      className={`text-[9.5px] font-bold p-1.5 rounded-md border capitalize transition-colors cursor-pointer ${
                        newPriority === pri
                          ? pri === "high"
                            ? "bg-rose-500/10 border-rose-500/50 text-rose-400"
                            : pri === "medium"
                            ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                            : "bg-slate-800 border-slate-600 text-slate-300"
                          : "bg-slate-950 border-slate-900 text-slate-500"
                      }`}
                    >
                      {pri === "high" ? "Alta" : pri === "medium" ? "Média" : "Baixa"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950 transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" /> Criar Meta
              </button>
            </div>
          </form>
        </div>

        {/* Kanban Board columns */}
        <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
          {renderColumn("todo", "A Fazer", "bg-indigo-500")}
          {renderColumn("progress", "Em Progresso", "bg-amber-400")}
          {renderColumn("done", "Concluído", "bg-emerald-500")}
        </div>
      </div>
    </div>
  );
}
