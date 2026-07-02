import React, { useState, useRef } from "react";
import JSZip from "jszip";
import { Folder, FileCode, FileText, Upload, FileArchive, Trash2, CheckCircle2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { ZipFileItem } from "../types";

interface ZIPInspectorProps {
  onFilesParsed: (files: ZipFileItem[], zipName: string) => void;
  onClear: () => void;
  parsedFiles: ZipFileItem[];
  currentZipName: string;
}

export default function ZIPInspector({ onFilesParsed, onClear, parsedFiles, currentZipName }: ZIPInspectorProps) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<ZipFileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processZipFile = async (file: File) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const zip = await JSZip.loadAsync(file);
      const items: ZipFileItem[] = [];

      // Iterate through zip contents
      for (const [filename, zipEntry] of Object.entries(zip.files)) {
        if (!zipEntry.dir) {
          // Check if it's a typical binary file (images, music, DLLs, assemblies, executables)
          const isBinary = /\.(png|jpg|jpeg|gif|wav|mp3|ogg|fbx|obj|dll|exe|lib|so|zip|tar|gz|rar|unitypackage|meta)$/i.test(filename);
          
          let content = "";
          let byteLength = 0;

          try {
            const dataUint8 = await zipEntry.async("uint8array");
            byteLength = dataUint8.length;
            
            if (!isBinary) {
              content = new TextDecoder("utf-8").decode(dataUint8);
            }
          } catch (e) {
            console.warn(`Erro ao ler arquivo ${filename} no ZIP:`, e);
          }

          // Smart auto-select scripts and configuration files
          const isCodeOrConfig = /\.(cs|cpp|h|js|ts|tsx|json|xml|ini|txt|log|cfg|gd|vs|fs)$/i.test(filename);

          items.push({
            name: filename,
            size: byteLength,
            content: isBinary ? undefined : content,
            binary: isBinary,
            selected: isCodeOrConfig && byteLength < 200000 // Auto-select scripts under 200KB
          });
        }
      }

      if (items.length === 0) {
        throw new Error("O arquivo ZIP está vazio ou não possui arquivos válidos.");
      }

      onFilesParsed(items, file.name);
    } catch (err: any) {
      console.error("Falha ao abrir o ZIP:", err);
      setErrorMsg(err.message || "Falha ao descompactar o arquivo ZIP. Certifique-se de que é um arquivo .zip válido.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".zip")) {
        await processZipFile(file);
      } else {
        setErrorMsg("Por favor, envie apenas arquivos compactados em formato ZIP (.zip).");
      }
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processZipFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleFileSelection = (index: number) => {
    const updated = [...parsedFiles];
    updated[index].selected = !updated[index].selected;
    onFilesParsed(updated, currentZipName);
  };

  const toggleSelectAll = (select: boolean) => {
    const updated = parsedFiles.map(f => ({
      ...f,
      selected: select ? !f.binary : false
    }));
    onFilesParsed(updated, currentZipName);
  };

  const selectedCount = parsedFiles.filter(f => f.selected).length;
  const totalCodeFiles = parsedFiles.filter(f => !f.binary).length;

  return (
    <div id="zip-inspector-container" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileArchive className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-sm text-slate-800">Inspetor de Projeto ZIP</h3>
        </div>
        {parsedFiles.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remover ZIP
          </button>
        )}
      </div>

      <div className="p-4">
        {parsedFiles.length === 0 ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
              dragActive ? "border-indigo-500 bg-indigo-50/50" : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".zip"
              className="hidden"
            />
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-slate-600 mt-2">Processando e descompactando arquivos do projeto...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Arraste seu projeto ZIP aqui ou clique para buscar</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Perfeito para analisar scripts de jogos (C#, C++, GDScript), logs de compilador e arquivos de configurações.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
              <div>
                <p className="text-xs font-semibold text-indigo-900 truncate max-w-md">📦 {currentZipName}</p>
                <p className="text-xs text-indigo-700 mt-0.5">
                  {parsedFiles.length} arquivos detectados • {totalCodeFiles} arquivos de texto editáveis
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSelectAll(true)}
                  className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-2.5 py-1.5 rounded-md transition-colors"
                >
                  Selecionar Todos
                </button>
                <button
                  type="button"
                  onClick={() => toggleSelectAll(false)}
                  className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-2.5 py-1.5 rounded-md transition-colors"
                >
                  Desmarcar Todos
                </button>
              </div>
            </div>

            {/* List and preview split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File list */}
              <div className="border border-slate-200 rounded-lg max-h-60 overflow-y-auto divide-y divide-slate-100">
                {parsedFiles.map((file, idx) => {
                  const FileIcon = file.binary ? FileText : FileCode;
                  return (
                    <div
                      key={file.name}
                      className={`flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors ${
                        file.selected ? "bg-indigo-50/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                        <input
                          type="checkbox"
                          checked={file.selected}
                          disabled={file.binary}
                          onChange={() => toggleFileSelection(idx)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 disabled:opacity-50"
                        />
                        <FileIcon className={`w-4 h-4 shrink-0 ${file.binary ? "text-slate-400" : "text-indigo-600"}`} />
                        <span className={`text-xs truncate ${file.selected ? "font-medium text-slate-800" : "text-slate-600"}`}>
                          {file.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      
                      {!file.binary && file.content && (
                        <button
                          type="button"
                          onClick={() => setPreviewFile(previewFile?.name === file.name ? null : file)}
                          className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors ml-2"
                          title="Visualizar arquivo"
                        >
                          {previewFile?.name === file.name ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Preview panel */}
              <div className="border border-slate-200 rounded-lg bg-slate-50 p-3 flex flex-col justify-between max-h-60 overflow-hidden">
                {previewFile ? (
                  <div className="flex flex-col h-full min-w-0">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2 shrink-0">
                      <span className="text-xs font-bold text-slate-700 truncate block max-w-xs">
                        📄 {previewFile.name.split("/").pop()}
                      </span>
                      <button
                        onClick={() => setPreviewFile(null)}
                        className="text-[10px] text-slate-400 hover:text-slate-600 font-medium"
                      >
                        Fechar Visualização
                      </button>
                    </div>
                    <pre className="text-[10px] font-mono text-slate-600 overflow-auto bg-white p-2 rounded border border-slate-100 flex-1 whitespace-pre-wrap">
                      {previewFile.content || "// Arquivo vazio"}
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-8 text-slate-400">
                    <FileCode className="w-8 h-8 mb-2 text-slate-300" />
                    <p className="text-xs font-medium">Selecione o ícone de olho para visualizar o código</p>
                    <p className="text-[10px] mt-1 max-w-[200px]">
                      Apenas arquivos marcados com check (<input type="checkbox" checked readOnly className="inline-block w-3 h-3 rounded" />) serão enviados ao assistente para análise profunda.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                ⚡ {selectedCount} arquivos selecionados para o contexto da conversa.
              </span>
              {selectedCount > 15 && (
                <div className="flex items-center gap-1 text-amber-600" title="Muitos arquivos selecionados podem aproximar o limite de tokens">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[10px] font-bold">Aviso de Contexto</span>
                </div>
              )}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
