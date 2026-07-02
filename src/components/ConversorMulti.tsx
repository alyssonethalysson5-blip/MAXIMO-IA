import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Check, 
  Upload, 
  AlertCircle,
  Code,
  FileCode,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { jsPDF } from "jspdf";

export default function ConversorMulti() {
  // Document Converter States
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("documento_maximo");
  const [docStatus, setDocStatus] = useState<string | null>(null);
  const docFileRef = useRef<HTMLInputElement>(null);

  // Image Converter States
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgName, setImgName] = useState("imagem_convertida");
  const [imgType, setImgType] = useState<string>("image/jpeg");
  const [imgFormatLabel, setImgFormatLabel] = useState("jpg");
  const [imgStatus, setImgStatus] = useState<string | null>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

  // Data/Code Converter States
  const [dataInput, setDataInput] = useState("");
  const [dataOutput, setDataOutput] = useState("");
  const [dataMode, setDataMode] = useState<"json2csv" | "csv2json" | "b64encode" | "b64decode" | "hexencode" | "hexdecode">("json2csv");
  const [dataStatus, setDataStatus] = useState<string | null>(null);

  // Document Upload Handler (TXT / DOC / Word)
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocName(file.name.substring(0, file.name.lastIndexOf(".")) || file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setDocText(content);
      setDocStatus(`Arquivo "${file.name}" carregado com sucesso! Pronto para converter.`);
    };
    reader.onerror = () => {
      setDocStatus("Erro ao ler o arquivo. Certifique-se de que é um arquivo de texto válido.");
    };
    reader.readAsText(file);
  };

  // Document to PDF conversion (using jsPDF)
  const handleConvertToPDF = () => {
    if (!docText.trim()) {
      setDocStatus("Por favor, digite ou carregue algum texto primeiro!");
      return;
    }

    try {
      setDocStatus("Convertendo para PDF...");
      const doc = new jsPDF();
      
      // Page styling / margin
      const margin = 15;
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      
      // Header
      doc.setFillColor(30, 41, 59); // slate-800
      doc.rect(0, 0, width, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("MÁXIMO IA - CONVERSOR DIGITAL", margin, 20);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Documento convertido com Inteligência Coordenada 10.0", margin, 30);
      
      // Divider
      doc.setDrawColor(99, 102, 241); // indigo-500
      doc.setLineWidth(1.5);
      doc.line(0, 40, width, 40);

      // Body Content
      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      
      // Split text into lines to fit page
      const splitLines = doc.splitTextToSize(docText, width - (margin * 2));
      let cursorY = 55;
      
      splitLines.forEach((line: string) => {
        if (cursorY > height - margin) {
          doc.addPage();
          cursorY = margin + 10;
        }
        doc.text(line, margin, cursorY);
        cursorY += 6;
      });

      // Footer on all pages
      const totalPages = (doc as any).internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(`Página ${i} de ${totalPages}`, width - margin - 20, height - margin);
        doc.text("Gerado por MÁXIMO IA - O Cérebro Unificado.", margin, height - margin);
      }

      const filename = `${docName.replace(/\s+/g, "_")}.pdf`;
      doc.save(filename);
      setDocStatus(`Sucesso! "${filename}" foi baixado.`);
    } catch (error) {
      console.error(error);
      setDocStatus("Ocorreu um erro ao converter para PDF.");
    }
  };

  // Image Upload Handler
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImgName(file.name.substring(0, file.name.lastIndexOf(".")) || file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImgSrc(event.target?.result as string);
      setImgStatus(`Imagem "${file.name}" carregada com sucesso! Escolha o formato de saída.`);
    };
    reader.onerror = () => {
      setImgStatus("Erro ao carregar a imagem.");
    };
    reader.readAsDataURL(file);
  };

  // Handle format change
  const handleFormatChange = (mime: string, label: string) => {
    setImgType(mime);
    setImgFormatLabel(label);
  };

  // Image conversion using Canvas (changes the actual file format/header)
  const handleConvertImage = () => {
    if (!imgSrc) {
      setImgStatus("Carregue uma imagem primeiro!");
      return;
    }

    setImgStatus("Convertendo formato da imagem...");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setImgStatus("Erro ao iniciar o processador gráfico da imagem.");
          return;
        }

        // Fill white background for JPG files (handles transparency perfectly)
        if (imgType === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);
        
        const convertedDataUrl = canvas.toDataURL(imgType, 0.92);
        
        // Download converted image
        const link = document.createElement("a");
        link.download = `${imgName.replace(/\s+/g, "_")}.${imgFormatLabel}`;
        link.href = convertedDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setImgStatus(`Sucesso! Imagem convertida para ${imgFormatLabel.toUpperCase()} e baixada com segurança.`);
      } catch (error) {
        console.error(error);
        setImgStatus("Erro na conversão da imagem. Verifique se o arquivo não está corrompido.");
      }
    };
    img.onerror = () => {
      setImgStatus("Erro ao renderizar a imagem.");
    };
  };

  // Code/Data Processing Handlers
  const handleDataProcess = () => {
    if (!dataInput.trim()) {
      setDataStatus("Por favor, cole os dados para converter!");
      return;
    }

    try {
      setDataStatus("Processando conversão de dados...");
      if (dataMode === "json2csv") {
        const json = JSON.parse(dataInput);
        const arr = Array.isArray(json) ? json : [json];
        if (arr.length === 0) {
          setDataOutput("");
          setDataStatus("JSON vazio.");
          return;
        }
        const keys = Object.keys(arr[0]);
        const csvRows = [];
        csvRows.push(keys.join(","));
        for (const row of arr) {
          const values = keys.map(key => {
            const val = row[key];
            return typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : String(val);
          });
          csvRows.push(values.join(","));
        }
        setDataOutput(csvRows.join("\n"));
        setDataStatus("JSON convertido para CSV com sucesso!");
      } 
      else if (dataMode === "csv2json") {
        const lines = dataInput.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) {
          setDataOutput("");
          setDataStatus("CSV vazio.");
          return;
        }
        const headers = lines[0].split(",");
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const obj: any = {};
          const currentline = lines[i].split(",");
          for (let j = 0; j < headers.length; j++) {
            let val = currentline[j]?.replace(/^"|"$/g, "") || "";
            obj[headers[j]] = isNaN(Number(val)) ? val : Number(val);
          }
          result.push(obj);
        }
        setDataOutput(JSON.stringify(result, null, 2));
        setDataStatus("CSV convertido para JSON com sucesso!");
      } 
      else if (dataMode === "b64encode") {
        setDataOutput(btoa(unescape(encodeURIComponent(dataInput))));
        setDataStatus("Texto codificado em Base64!");
      } 
      else if (dataMode === "b64decode") {
        setDataOutput(decodeURIComponent(escape(atob(dataInput))));
        setDataStatus("Base64 decodificado com sucesso!");
      } 
      else if (dataMode === "hexencode") {
        let hex = "";
        for (let i = 0; i < dataInput.length; i++) {
          hex += dataInput.charCodeAt(i).toString(16).padStart(2, "0");
        }
        setDataOutput(hex);
        setDataStatus("Texto convertido em Hexadecimal!");
      } 
      else if (dataMode === "hexdecode") {
        let str = "";
        for (let i = 0; i < dataInput.length; i += 2) {
          str += String.fromCharCode(parseInt(dataInput.substr(i, 2), 16));
        }
        setDataOutput(str);
        setDataStatus("Hexadecimal decodificado!");
      }
    } catch (e: any) {
      setDataOutput("");
      setDataStatus(`Erro: ${e.message || "Falha na conversão de dados. Verifique a sintaxe."}`);
    }
  };

  return (
    <div id="conversor-container" className="p-6 text-slate-100 flex-1 overflow-y-auto space-y-8 max-w-7xl mx-auto">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
            <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin-slow" />
            <span>MÁXIMO Conversores Inteligentes v10.0</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Ferramentas nativas do cérebro coletivo para converter arquivos, imagens e codificar dados instantaneamente no navegador.
          </p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/25 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 flex items-center gap-1.5 self-start">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Capacidade de Conversão 100% Liberada</span>
        </div>
      </div>

      {/* Grid of Converters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Converter 1: Document (TEXTO/WORD para PDF) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Conversor de Documentos (Texto/Word para PDF)</h3>
                <p className="text-xs text-slate-400">Cole seu texto, escreva ou envie um arquivo para transformá-lo em PDF com design profissional.</p>
              </div>
            </div>

            {/* Input area */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Texto do Documento:</label>
              <textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Cole o seu texto do Word, código, script de GTA RP (.pwn), anotações ou digite aqui..."
                className="w-full h-44 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-mono placeholder:text-slate-600"
              />
            </div>

            {/* File Upload / Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Nome do PDF Final:</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="documento_convertido"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="flex flex-col justify-end">
                <input
                  type="file"
                  ref={docFileRef}
                  onChange={handleDocUpload}
                  accept=".txt,.doc,.docx"
                  className="hidden"
                />
                <button
                  onClick={() => docFileRef.current?.click()}
                  className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Carregar TXT / Documento</span>
                </button>
              </div>
            </div>

            {/* Status Feedback */}
            {docStatus && (
              <div className="bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-lg text-xs flex items-start gap-2 text-indigo-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
                <span>{docStatus}</span>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-850 mt-6">
            <button
              onClick={handleConvertToPDF}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-900/30"
            >
              <Download className="w-4 h-4" />
              <span>Exportar como PDF Profissional</span>
            </button>
          </div>
        </div>

        {/* Converter 2: Image Format Changer (PNG, JPG, WebP) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Conversor de Formato de Imagem</h3>
                <p className="text-xs text-slate-400">Mude o formato físico da foto instantaneamente (ex: PNG para JPG ou vice-versa) mudando seus bytes.</p>
              </div>
            </div>

            {/* Image Box */}
            <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-lg p-4 bg-slate-950 flex flex-col items-center justify-center h-44 cursor-pointer relative overflow-hidden"
                 onClick={() => imgFileRef.current?.click()}
            >
              {imgSrc ? (
                <div className="flex flex-col items-center justify-center h-full relative z-10 w-full">
                  <img 
                    src={imgSrc} 
                    alt="Conversor Preview" 
                    className="max-h-28 object-contain rounded border border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs text-emerald-400 font-bold mt-2">Clique para trocar de imagem</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                  <Upload className="w-8 h-8 text-slate-600" />
                  <span className="text-xs font-bold text-slate-400">Arraste ou clique para carregar imagem</span>
                  <span className="text-[10px] text-slate-600">Suporta PNG, JPG, JPEG, WebP, GIF</span>
                </div>
              )}
              <input
                type="file"
                ref={imgFileRef}
                onChange={handleImgUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Target Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Formato de Saída (Converter Para):</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mime: "image/jpeg", label: "jpg", title: "JPEG (.jpg)" },
                  { mime: "image/png", label: "png", title: "PNG (.png)" },
                  { mime: "image/webp", label: "webp", title: "WebP (.webp)" }
                ].map((fmt) => (
                  <button
                    key={fmt.label}
                    onClick={() => handleFormatChange(fmt.mime, fmt.label)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      imgType === fmt.mime
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-950/20"
                        : "bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-700"
                    }`}
                  >
                    {fmt.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Nome do Arquivo Convertido:</label>
              <input
                type="text"
                value={imgName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="nome_imagem_saida"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            {/* Image Status feedback */}
            {imgStatus && (
              <div className="bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-lg text-xs flex items-start gap-2 text-emerald-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{imgStatus}</span>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-850 mt-6">
            <button
              onClick={handleConvertImage}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Mudar Formato da Imagem Agora</span>
            </button>
          </div>
        </div>

      </div>

      {/* Full Width Converter 3: Data / Encoding & Code Tools */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Conversor de Dados e Decodificador de Código</h3>
            <p className="text-xs text-slate-400">Ferramenta poderosa para converter formatos de dados (JSON, CSV) e codificações (Base64, Hexadecimal) cruciais para engenheiros.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Options / Select */}
          <div className="md:col-span-1 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Modo de Conversão:</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "json2csv", label: "JSON para CSV", desc: "Converter lista JSON em formato de tabela CSV" },
                  { id: "csv2json", label: "CSV para JSON", desc: "Converter planilha CSV em estrutura JSON" },
                  { id: "b64encode", label: "Texto para Base64", desc: "Codificar string padrão em Base64" },
                  { id: "b64decode", label: "Base64 para Texto", desc: "Decodificar string Base64 para texto limpo" },
                  { id: "hexencode", label: "Texto para Hexadecimal", desc: "Transformar texto comum em Hex/Bytes" },
                  { id: "hexdecode", label: "Hexadecimal para Texto", desc: "Decodificar bytes Hex de volta para texto" }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setDataMode(mode.id as any);
                      setDataStatus(`Modo alterado para: ${mode.label}`);
                    }}
                    className={`text-left px-3 py-2.5 rounded-lg border transition-all cursor-pointer flex flex-col gap-0.5 ${
                      dataMode === mode.id
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-900/20"
                        : "bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-800"
                    }`}
                  >
                    <span className="text-xs font-bold">{mode.label}</span>
                    <span className="text-[10px] opacity-75">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {dataStatus && (
              <div className="bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-lg text-xs text-indigo-300">
                {dataStatus}
              </div>
            )}

            <button
              onClick={handleDataProcess}
              className="w-full bg-slate-850 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>Processar Conversão</span>
            </button>
          </div>

          {/* Inputs/Outputs */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Entrada (Input):</label>
              <textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="Insira seus dados brutos para processar aqui..."
                className="w-full h-80 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-mono placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Resultado (Output):</label>
              <div className="relative">
                <textarea
                  value={dataOutput}
                  readOnly
                  placeholder="O resultado gerado aparecerá aqui..."
                  className="w-full h-80 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none resize-none font-mono placeholder:text-slate-600"
                />
                {dataOutput && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dataOutput);
                      setDataStatus("Resultado copiado para a área de transferência!");
                    }}
                    className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] py-1 px-2 rounded cursor-pointer transition-all"
                  >
                    Copiar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
