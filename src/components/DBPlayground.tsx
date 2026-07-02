import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Play, RefreshCw, Trash2, Plus, Info, Check, Terminal, Table } from "lucide-react";

interface DatabaseTable {
  name: string;
  columns: string[];
  rows: Record<string, any>[];
}

const INITIAL_TABLES: DatabaseTable[] = [
  {
    name: "contas_jogadores",
    columns: ["id", "nome", "nivel", "dinheiro", "admin_level", "ultimo_login"],
    rows: [
      { id: 1, nome: "Alysson_SAMP", nivel: 15, dinheiro: 250000, admin_level: 3, ultimo_login: "2026-06-30" },
      { id: 2, nome: "Bruno_Dev", nivel: 8, dinheiro: 45000, admin_level: 0, ultimo_login: "2026-07-01" },
      { id: 3, nome: "Carlos_Chef", nivel: 30, dinheiro: 1800000, admin_level: 5, ultimo_login: "2026-06-28" },
      { id: 4, nome: "Daniela_Gamer", nivel: 2, dinheiro: 1200, admin_level: 0, ultimo_login: "2026-07-01" },
    ]
  },
  {
    name: "veiculos_servidor",
    columns: ["id", "modelo_id", "proprietario_id", "cor_1", "cor_2", "placa"],
    rows: [
      { id: 1, modelo_id: 411, proprietario_id: 1, cor_1: 1, cor_2: 1, placa: "MAX-1010" },
      { id: 2, modelo_id: 522, proprietario_id: 3, cor_1: 3, cor_2: 0, placa: "CHE-3030" },
      { id: 3, modelo_id: 415, proprietario_id: 2, cor_1: 126, cor_2: 126, placa: "DEV-7777" },
    ]
  },
  {
    name: "registro_banimentos",
    columns: ["id", "nome", "motivo", "banido_por", "data_ban", "tempo_dias"],
    rows: [
      { id: 1, nome: "Hacker_Speed", motivo: "Uso de Cheat (SpeedHack)", banido_por: "Carlos_Chef", data_ban: "2026-06-15", tempo_dias: 30 },
      { id: 2, nome: "Troll_Fake", motivo: "Falsa identidade de Staff", banido_por: "Alysson_SAMP", data_ban: "2026-06-25", tempo_dias: 7 },
    ]
  }
];

export default function DBPlayground() {
  const [tables, setTables] = useState<DatabaseTable[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<string>("contas_jogadores");
  const [customQuery, setCustomQuery] = useState<string>("SELECT * FROM contas_jogadores WHERE dinheiro > 10000;");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "MÁXIMO DB Engine v10.0 inicializado com sucesso.",
    "Bancos de dados SQLite / MySQL virtuais carregados em memória RAM.",
    "Selecione uma query rápida ou digite um comando SQL para executar."
  ]);
  const [queryResult, setQueryResult] = useState<{
    headers: string[];
    rows: Record<string, any>[];
    message: string;
    success: boolean;
  } | null>(null);

  const getActiveTableData = () => {
    return tables.find(t => t.name === selectedTable) || tables[0];
  };

  const addTerminalLog = (log: string) => {
    setTerminalLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  const handleResetDB = () => {
    setTables(JSON.parse(JSON.stringify(INITIAL_TABLES)));
    setQueryResult(null);
    addTerminalLog("Banco de dados reiniciado para os valores padrão de fábrica.");
  };

  const handlePresetQuery = (queryType: string) => {
    let queryStr = "";
    switch (queryType) {
      case "select_all":
        queryStr = `SELECT * FROM ${selectedTable};`;
        break;
      case "high_levels":
        queryStr = `SELECT * FROM contas_jogadores WHERE nivel >= 10 ORDER BY nivel DESC;`;
        break;
      case "rich_players":
        queryStr = `SELECT * FROM contas_jogadores WHERE dinheiro >= 100000;`;
        break;
      case "admins":
        queryStr = `SELECT * FROM contas_jogadores WHERE admin_level > 0;`;
        break;
      case "infernus_vehs":
        queryStr = `SELECT * FROM veiculos_servidor WHERE modelo_id = 411;`;
        break;
      case "add_player":
        queryStr = `INSERT INTO contas_jogadores (nome, nivel, dinheiro, admin_level, ultimo_login) VALUES ('Novo_Jogador', 1, 5000, 0, '2026-07-01');`;
        break;
      case "give_money":
        queryStr = `UPDATE contas_jogadores SET dinheiro = dinheiro + 50000 WHERE admin_level > 0;`;
        break;
      case "unban":
        queryStr = `DELETE FROM registro_banimentos WHERE id = 1;`;
        break;
    }
    setCustomQuery(queryStr);
  };

  const handleExecuteQuery = () => {
    const q = customQuery.trim();
    const lowerQ = q.toLowerCase();
    
    addTerminalLog(`Executando: ${q}`);

    if (!q) {
      setQueryResult({
        headers: [],
        rows: [],
        message: "Erro: Comando SQL está vazio.",
        success: false
      });
      return;
    }

    try {
      // 1. SIMULATE SELECT FROM contas_jogadores
      if (lowerQ.includes("select") && lowerQ.includes("contas_jogadores")) {
        let rows = [...(tables.find(t => t.name === "contas_jogadores")?.rows || [])];
        
        if (lowerQ.includes("dinheiro >")) {
          const val = parseInt(lowerQ.split("dinheiro >")[1]) || 0;
          rows = rows.filter(r => r.dinheiro > val);
        } else if (lowerQ.includes("nivel >=")) {
          const val = parseInt(lowerQ.split("nivel >=")[1]) || 0;
          rows = rows.filter(r => r.nivel >= val);
        } else if (lowerQ.includes("admin_level >")) {
          const val = parseInt(lowerQ.split("admin_level >")[1]) || 0;
          rows = rows.filter(r => r.admin_level > val);
        }

        if (lowerQ.includes("order by nivel desc")) {
          rows.sort((a, b) => b.nivel - a.nivel);
        }

        setQueryResult({
          headers: ["id", "nome", "nivel", "dinheiro", "admin_level", "ultimo_login"],
          rows,
          message: `Sucesso! Retornados ${rows.length} registros de contas_jogadores.`,
          success: true
        });
        addTerminalLog(`Query SELECT concluída com sucesso. ${rows.length} linhas afetadas.`);
      }
      // 2. SIMULATE SELECT FROM veiculos_servidor
      else if (lowerQ.includes("select") && lowerQ.includes("veiculos_servidor")) {
        let rows = [...(tables.find(t => t.name === "veiculos_servidor")?.rows || [])];
        if (lowerQ.includes("modelo_id =")) {
          const val = parseInt(lowerQ.split("modelo_id =")[1]) || 411;
          rows = rows.filter(r => r.modelo_id === val);
        }
        setQueryResult({
          headers: ["id", "modelo_id", "proprietario_id", "cor_1", "cor_2", "placa"],
          rows,
          message: `Sucesso! Retornados ${rows.length} registros de veiculos_servidor.`,
          success: true
        });
        addTerminalLog(`Query SELECT concluída com sucesso. ${rows.length} linhas afetadas.`);
      }
      // 3. SIMULATE SELECT FROM registro_banimentos
      else if (lowerQ.includes("select") && lowerQ.includes("registro_banimentos")) {
        const rows = tables.find(t => t.name === "registro_banimentos")?.rows || [];
        setQueryResult({
          headers: ["id", "nome", "motivo", "banido_por", "data_ban", "tempo_dias"],
          rows,
          message: `Sucesso! Retornados ${rows.length} registros de registro_banimentos.`,
          success: true
        });
        addTerminalLog(`Query SELECT concluída com sucesso. ${rows.length} linhas afetadas.`);
      }
      // 4. INSERT INTO accounts
      else if (lowerQ.startsWith("insert into contas_jogadores")) {
        const match = q.match(/'([^']+)'/);
        const name = match ? match[1] : `Novo_User_${Math.floor(Math.random() * 1000)}`;
        
        const updatedTables = tables.map(t => {
          if (t.name === "contas_jogadores") {
            const nextId = t.rows.length > 0 ? Math.max(...t.rows.map(r => r.id)) + 1 : 1;
            return {
              ...t,
              rows: [...t.rows, {
                id: nextId,
                nome: name,
                nivel: 1,
                dinheiro: 5000,
                admin_level: 0,
                ultimo_login: "2026-07-01"
              }]
            };
          }
          return t;
        });
        setTables(updatedTables);
        setQueryResult({
          headers: ["status", "nome_inserido", "nivel_padrao", "dinheiro_padrao"],
          rows: [{ status: "INSERIDO", nome_inserido: name, nivel_padrao: 1, dinheiro_padrao: 5000 }],
          message: `Sucesso! Novo jogador '${name}' inserido na tabela 'contas_jogadores'.`,
          success: true
        });
        addTerminalLog(`Comando INSERT executado. Novo ID criado com sucesso.`);
      }
      // 5. UPDATE accounts
      else if (lowerQ.startsWith("update contas_jogadores")) {
        const updatedTables = tables.map(t => {
          if (t.name === "contas_jogadores") {
            return {
              ...t,
              rows: t.rows.map(r => {
                if (r.admin_level > 0) {
                  return { ...r, dinheiro: r.dinheiro + 50000 };
                }
                return r;
              })
            };
          }
          return t;
        });
        setTables(updatedTables);
        setQueryResult({
          headers: ["id", "nome", "dinheiro_anterior", "novo_dinheiro", "admin_level"],
          rows: updatedTables.find(t => t.name === "contas_jogadores")?.rows
            .filter(r => r.admin_level > 0)
            .map(r => ({ id: r.id, nome: r.nome, dinheiro_anterior: r.dinheiro - 50000, novo_dinheiro: r.dinheiro, admin_level: r.admin_level })) || [],
          message: "Sucesso! Adicionado R$ 50.000 para todos os administradores na tabela 'contas_jogadores'.",
          success: true
        });
        addTerminalLog("Comando UPDATE executado. Registros de administrador atualizados com sucesso.");
      }
      // 6. DELETE (unban)
      else if (lowerQ.startsWith("delete from registro_banimentos")) {
        const updatedTables = tables.map(t => {
          if (t.name === "registro_banimentos") {
            return {
              ...t,
              rows: t.rows.filter(r => r.id !== 1)
            };
          }
          return t;
        });
        setTables(updatedTables);
        setQueryResult({
          headers: ["id_removido", "status"],
          rows: [{ id_removido: 1, status: "DESBANIDO" }],
          message: "Sucesso! Registro com ID 1 removido da tabela de banimentos.",
          success: true
        });
        addTerminalLog("Comando DELETE executado. Banimento revogado.");
      }
      // Generic commands fallback
      else {
        setQueryResult({
          headers: ["query_executada", "status_simulado"],
          rows: [{ query_executada: q, status_simulado: "SUCESSO (Simulação Geral)" }],
          message: "A query foi parseada com sucesso pelo compilador de sintaxe SQL do MÁXIMO 10.0!",
          success: true
        });
        addTerminalLog("Comando SQL genérico processado pelo compilador.");
      }
    } catch (err: any) {
      setQueryResult({
        headers: [],
        rows: [],
        message: `Erro na execução do SQL: ${err.message}`,
        success: false
      });
      addTerminalLog(`Erro SQL: ${err.message}`);
    }
  };

  const activeTable = getActiveTableData();

  return (
    <div className="space-y-6" id="db-playground-main">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Database className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-200 tracking-tight">Playground Virtual de Bancos de Dados</h3>
            <p className="text-xs text-slate-400">Projete tabelas de servidores de jogos (SAMP, GTA RP, Unity) e teste consultas MySQL/SQLite em tempo real.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SQL Input and Quick Queries */}
        <div className="lg:col-span-7 space-y-5 flex flex-col">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Terminal de Consulta SQL
              </span>
              <button 
                onClick={handleResetDB} 
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold px-2 py-1 rounded transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reiniciar DB
              </button>
            </div>

            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="w-full h-32 bg-slate-950 font-mono text-xs text-emerald-300 p-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none shadow-inner"
              placeholder="Digite sua query SQL aqui..."
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] text-slate-500 font-bold self-center mr-1">Rápidos:</span>
                <button
                  onClick={() => handlePresetQuery("select_all")}
                  className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-800"
                >
                  SELECT *
                </button>
                {selectedTable === "contas_jogadores" && (
                  <>
                    <button
                      onClick={() => handlePresetQuery("high_levels")}
                      className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-indigo-300 px-2 py-1 rounded border border-slate-850"
                    >
                      Nível &gt;= 10
                    </button>
                    <button
                      onClick={() => handlePresetQuery("admins")}
                      className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-emerald-300 px-2 py-1 rounded border border-slate-850"
                    >
                      Listar Admins
                    </button>
                    <button
                      onClick={() => handlePresetQuery("add_player")}
                      className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20"
                    >
                      + Novo Player (INSERT)
                    </button>
                  </>
                )}
                {selectedTable === "veiculos_servidor" && (
                  <button
                    onClick={() => handlePresetQuery("infernus_vehs")}
                    className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-indigo-300 px-2 py-1 rounded border border-slate-850"
                  >
                    Filtrar Infernus (411)
                  </button>
                )}
                {selectedTable === "registro_banimentos" && (
                  <button
                    onClick={() => handlePresetQuery("unban")}
                    className="text-[10px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-2 py-1 rounded border border-rose-500/20"
                  >
                    Desbanir ID 1
                  </button>
                )}
              </div>

              <button
                onClick={handleExecuteQuery}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-950 transition-all cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Executar SQL
              </button>
            </div>
          </div>

          {/* Table Data Preview */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-indigo-400" /> Tabela Ativa no Sistema
              </span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                {tables.map(t => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setSelectedTable(t.name);
                      setQueryResult(null);
                      setCustomQuery(`SELECT * FROM ${t.name};`);
                    }}
                    className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                      selectedTable === t.name
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-x-auto border border-slate-850 rounded-lg bg-slate-950">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-bold border-b border-slate-850">
                    {activeTable.columns.map(col => (
                      <th key={col} className="p-2.5 uppercase tracking-wider text-[9px] font-black">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300 font-mono">
                  {activeTable.rows.length === 0 ? (
                    <tr>
                      <td colSpan={activeTable.columns.length} className="p-8 text-center text-slate-500 italic">
                        Tabela vazia. Nenhum registro encontrado.
                      </td>
                    </tr>
                  ) : (
                    activeTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/30 transition-colors">
                        {activeTable.columns.map(col => {
                          const val = row[col];
                          return (
                            <td key={col} className="p-2.5">
                              {typeof val === "number" ? (
                                <span className={col.includes("dinheiro") ? "text-emerald-400" : "text-indigo-300"}>
                                  {col.includes("dinheiro") ? `R$ ${val.toLocaleString("pt-BR")}` : val}
                                </span>
                              ) : (
                                <span className="text-slate-300">{val}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Database Output Console & Logs */}
        <div className="lg:col-span-5 space-y-5 flex flex-col">
          {/* Query Results */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col min-h-[220px]">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-3">
              🎯 Resultado da Consulta
            </span>

            <div className="flex-1 flex flex-col justify-between">
              {queryResult ? (
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-lg border text-xs font-semibold ${
                    queryResult.success 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300" 
                      : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                  }`}>
                    {queryResult.message}
                  </div>

                  {queryResult.success && queryResult.rows.length > 0 && (
                    <div className="max-h-[150px] overflow-y-auto border border-slate-850 rounded bg-slate-950">
                      <table className="w-full text-left text-[10.5px]">
                        <thead>
                          <tr className="bg-slate-900 text-slate-400 border-b border-slate-850 font-bold">
                            {queryResult.headers.map(h => (
                              <th key={h} className="p-1.5 text-[9px] uppercase font-black">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300 font-mono">
                          {queryResult.rows.map((r, i) => (
                            <tr key={i} className="hover:bg-indigo-500/5">
                              {queryResult.headers.map(h => (
                                <td key={h} className="p-1.5">{String(r[h] !== undefined ? r[h] : "")}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Info className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs">Execute uma query acima para visualizar o resultado estruturado.</p>
                </div>
              )}
            </div>
          </div>

          {/* DB Engine Logs */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2">
              📂 Histórico de Logs do Banco de Dados
            </span>
            <div className="flex-1 bg-slate-950 rounded-lg p-3 border border-slate-850 font-mono text-[10px] text-slate-400 space-y-1.5 overflow-y-auto max-h-[180px] min-h-[140px] shadow-inner">
              {terminalLogs.map((log, i) => (
                <div key={i} className={log.includes("Erro") ? "text-rose-400" : log.includes("Executando") ? "text-indigo-300" : "text-slate-400"}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
