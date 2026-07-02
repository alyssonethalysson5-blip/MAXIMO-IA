import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Search,
  Terminal,
  Zap,
  Lock,
  Wifi,
  Cpu,
  Eye,
  Key,
  FolderSync,
  AlertTriangle,
  Code,
  Network,
  Binary,
  Database,
  Globe,
  HelpCircle,
  Copy,
  Check,
  Play,
  ArrowRight,
  BookOpen,
  Settings,
  Edit,
  Trash2,
  List,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface KaliTool {
  name: string;
  desc: string;
  conceptCmd: string;
  simulatedOutput: string[];
  mitigation: string;
}

interface KaliCategory {
  id: string;
  number: string;
  name: string;
  icon: any;
  desc: string;
  tools: KaliTool[];
}

export default function KaliSuite() {
  const [suiteTab, setSuiteTab] = useState<"tools" | "scripts">("tools");
  const [selectedCategory, setSelectedCategory] = useState<string>("05"); // Default to Password Attacks as requested
  const [selectedTool, setSelectedTool] = useState<string>("hydra");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Parameter Configurations (Makes the simulations 100% reactive!)
  const [targetIP, setTargetIP] = useState<string>("192.168.1.100");
  const [targetUser, setTargetUser] = useState<string>("admin");
  const [targetPort, setTargetPort] = useState<string>("22");
  const [customWordlist, setCustomWordlist] = useState<string>("123456\nsenha123\nmaximo2026\nbatata\nsenha_secreta");
  const [correctPassword, setCorrectPassword] = useState<string>("maximo2026");

  // Terminal Manual Command Line inside Suite
  const [manualCmdInput, setManualCmdInput] = useState<string>("");

  // Scripts Lab State
  const [selectedScriptTemplate, setSelectedScriptTemplate] = useState<string>("password");
  const [scriptCode, setScriptCode] = useState<string>(`# Script Validador de Força de Senha (Python)
def testar_senha(senha):
    print(f"--- ANALISANDO FORÇA DA SENHA: '{senha}' ---")
    maiuscula = any(c.isupper() for c in senha)
    numero = any(c.isdigit() for c in senha)
    especial = any(not c.isalnum() for c in senha)
    comprimento = len(senha) >= 8
    
    pontos = sum([maiuscula, numero, especial, comprimento])
    print(f"Critério 1 - Letra Maiúscula: {'OK' if maiuscula else 'FALHOU'}")
    print(f"Critério 2 - Contém Número: {'OK' if numero else 'FALHOU'}")
    print(f"Critério 3 - Caractere Especial: {'OK' if especial else 'FALHOU'}")
    print(f"Critério 4 - Comprimento (>=8): {'OK' if comprimento else 'FALHOU'}")
    
    print(f"Pontuação Total de Segurança: {pontos}/4")
    if pontos == 4:
        print("🔥 RESULTADO: Senha Forte e Altamente Recomendada!")
    elif pontos >= 2:
        print("⚠️ RESULTADO: Senha Média. Recomendamos adicionar mais caracteres especiais.")
    else:
        print("❌ RESULTADO: Senha extremamente Fraca! Vulnerável a ataques de dicionário.")

testar_senha("maximo2026")`);

  const [scriptLogs, setScriptLogs] = useState<string[]>([]);
  const [isRunningScript, setIsRunningScript] = useState<boolean>(false);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const scriptTerminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  useEffect(() => {
    scriptTerminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scriptLogs]);

  const categories: KaliCategory[] = useMemo(() => [
    {
      id: "01",
      number: "01",
      name: "Information Gathering (Varredura)",
      icon: Search,
      desc: "Sistemas para mapear portas abertas, computadores conectados, serviços ativos e topologia de rede local ou remota.",
      tools: [
        {
          name: "nmap",
          desc: "O mais poderoso mapeador de redes. Descobre hosts ativos, portas de conexão abertas, sistemas operacionais e versões de serviços em execução.",
          conceptCmd: "nmap -sV -O -T4 192.168.1.100",
          mitigation: "Configure firewalls locais (IPTables/UFW) para bloquear ou limitar varreduras. Use sistemas de prevenção de intrusão (IPS) como o Snort para detectar pings de varreduras em massa.",
          simulatedOutput: []
        },
        {
          name: "dmitry",
          desc: "Deepmagic Information Gathering Tool. Coleta e-mails, subdomínios, dados Whois e portas abertas em segundos.",
          conceptCmd: "dmitry -winse exemplo.com.br",
          mitigation: "Oculte as informações de WHOIS de domínio utilizando proteção de privacidade de registro.",
          simulatedOutput: []
        },
        {
          name: "recon-ng",
          desc: "Estrutura web-recon modular baseada em Python. Automatiza consultas em dezenas de APIs públicas.",
          conceptCmd: "recon-ng -w meu_workspace",
          mitigation: "Mantenha a higiene cibernética da organização limitando as informações públicas expostas em redes sociais e fóruns por funcionários.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "02",
      number: "02",
      name: "Vulnerability Analysis (Auditoria)",
      icon: Shield,
      desc: "Sistemas para identificar falhas de configuração, versões desatualizadas de pacotes e vulnerabilidades conhecidas.",
      tools: [
        {
          name: "nikto",
          desc: "Scanner de servidor web que testa falhas perigosas em mais de 6700 arquivos/CGIs potencialmente perigosos.",
          conceptCmd: "nikto -h http://192.168.1.100",
          mitigation: "Mantenha o servidor Apache/Nginx sempre atualizado. Desative as assinaturas do servidor para ocultar versões de sistema operacionais e softwares nos cabeçalhos HTTP.",
          simulatedOutput: []
        },
        {
          name: "lynis",
          desc: "Ferramenta de auditoria de segurança profunda para sistemas Linux/Unix. Avalia o hardening do sistema operacional.",
          conceptCmd: "lynis audit system",
          mitigation: "Siga o checklist de sugestões de hardening gerado pelo Lynis após o escaneamento.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "03",
      number: "03",
      name: "Web Application Analysis",
      icon: Globe,
      desc: "Análise profunda de aplicações web, identificando brechas de XSS, CSRF e arquivos esquecidos.",
      tools: [
        {
          name: "burp suite",
          desc: "Proxy HTTP interativo. Permite interceptar, modificar e repetir requisições feitas entre o navegador e o servidor web.",
          conceptCmd: "burp-suite &",
          mitigation: "Valide todos os parâmetros enviados no lado do servidor. Nunca confie em validações feitas puramente no Javascript do cliente.",
          simulatedOutput: []
        },
        {
          name: "owasp zap",
          desc: "Zed Attack Proxy. Um scanner integrado automatizado e livre para achar brechas de segurança em páginas da internet.",
          conceptCmd: "zaproxy",
          mitigation: "Integre o OWASP ZAP ao seu fluxo de entrega de código contínuo (CI/CD) para testar o site antes de publicá-lo.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "04",
      number: "04",
      name: "Database Assessment (Bancos)",
      icon: Database,
      desc: "Ferramentas para detectar e injetar scripts de teste em bancos de dados mal protegidos (SQL Injection).",
      tools: [
        {
          name: "sqlmap",
          desc: "Motor automatizado de detecção e exploração de brechas de SQL Injection. Consegue extrair tabelas inteiras de servidores vulneráveis.",
          conceptCmd: "sqlmap -u \"http://site.com/artigo.php?id=1\" --dbs",
          mitigation: "Use exclusivamente Prepared Statements (consultas parametrizadas) para evitar que o banco interprete textos enviados por formulários como comandos SQL.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "05",
      number: "05",
      name: "Password Attacks (Força Bruta)",
      icon: Lock,
      desc: "Sistemas de quebra de hashes, dicionários, força bruta e ataques offline de senhas. Altamente interativo abaixo!",
      tools: [
        {
          name: "hydra",
          desc: "O mais famoso quebra-senhas de rede por força bruta. Tenta logins rápidos em dezenas de protocolos como SSH, FTP e HTTP.",
          conceptCmd: "hydra -l admin -P wordlist.txt ssh://192.168.1.100",
          mitigation: "Implemente limites de tentativas de login por IP e utilize softwares de banimento temporário como o Fail2Ban. Use autenticação de dois fatores (2FA).",
          simulatedOutput: []
        },
        {
          name: "hashcat",
          desc: "O quebra-hashes mais rápido do mundo, acelerado diretamente pela GPU (placa de vídeo) do computador.",
          conceptCmd: "hashcat -m 0 hash_da_senha.txt wordlist.txt",
          mitigation: "Nunca use algoritmos fracos como MD5 ou SHA1 para armazenar senhas. Sempre prefira BCrypt, Argon2 ou PBKDF2 com fatores de custo altos.",
          simulatedOutput: []
        },
        {
          name: "john",
          desc: "Tradicional quebra-hashes de senha offline de código aberto. Auto-detecta o tipo de criptografia de forma inteligente.",
          conceptCmd: "john --wordlist=wordlist.txt hash.txt",
          mitigation: "Crie senhas fortes misturando letras maiúsculas, minúsculas, números e caracteres especiais com tamanho mínimo de 12 caracteres.",
          simulatedOutput: []
        },
        {
          name: "cewl",
          desc: "Custom Wordlist Generator. Vasculha um site alvo e cria uma lista de palavras personalizada com base no conteúdo de texto extraído da página.",
          conceptCmd: "cewl -d 2 -m 5 https://site-alvo.com -w wordlist.txt",
          mitigation: "Limite as tentativas de login e impeça o uso de palavras comuns do negócio como senhas principais de administradores.",
          simulatedOutput: []
        },
        {
          name: "crunch",
          desc: "Gerador de listas de palavras de força bruta customizáveis baseado em tamanhos e caracteres definidos pelo usuário.",
          conceptCmd: "crunch 6 8 abcdef -o wordlist.txt",
          mitigation: "Sistemas protegidos por bloqueios progressivos de tentativas tornam wordlists gigantes de força bruta inúteis devido ao tempo de bloqueio.",
          simulatedOutput: []
        },
        {
          name: "medusa",
          desc: "Quebra-senhas paralelo modular rápido de rede, similar ao Hydra, mas otimizado para múltiplos alvos simultâneos.",
          conceptCmd: "medusa -h ips.txt -u root -P wordlist.txt -M ssh",
          mitigation: "Desative logins SSH por senha e use apenas chaves públicas.",
          simulatedOutput: []
        },
        {
          name: "ncrack",
          desc: "Ferramenta de força bruta de rede em alta velocidade focada em escanear redes e roteadores corporativos massivos.",
          conceptCmd: "ncrack -p rdp,ssh,telnet --user admin 192.168.1.0/24",
          mitigation: "Desative serviços legados e inseguros como Telnet em todos os roteadores corporativos.",
          simulatedOutput: []
        },
        {
          name: "ophcrack",
          desc: "Quebrador de senhas do Windows baseado em Tabelas Arco-Íris (Rainbow Tables). Decifra senhas LM/NTLM em segundos.",
          conceptCmd: "ophcrack -g -d /tabelas_rainbow/ -f hashes_sam.txt",
          mitigation: "Desative o armazenamento de hashes LM antigos em sistemas Windows corporativos via diretivas de grupo (GPO).",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "06",
      number: "06",
      name: "Wireless Attacks (Wi-Fi)",
      icon: Wifi,
      desc: "Sistemas para capturar pacotes de rádio, forçar desconexões e auditar senhas de redes Wi-Fi locais de forma simulada.",
      tools: [
        {
          name: "wifite",
          desc: "Script automatizado para auditoria de redes sem fio com WEP, WPA e WPA2. Gerencia a captura do handshake com um clique.",
          conceptCmd: "wifite --kill --dict wordlist.txt",
          mitigation: "Use protocolos de criptografia modernos como WPA3. Defina senhas de rede complexas de no mínimo 16 caracteres para resistir à quebra de dicionário offline.",
          simulatedOutput: []
        },
        {
          name: "fern wifi cracker",
          desc: "Interface gráfica em Python para facilitar ataques de injeção e quebra de senhas WEP/WPA/WPS em redes sem fio.",
          conceptCmd: "fern-wifi-cracker",
          mitigation: "Desative a funcionalidade WPS do seu roteador, pois é um ponto crítico de falha estrutural.",
          simulatedOutput: []
        },
        {
          name: "mdk3",
          desc: "Inunda canais Wi-Fi com redes falsas (Beacon Flood) ou força a desconexão em massa de todos os aparelhos conectados (Deauthentication).",
          conceptCmd: "mdk3 wlan0mon d -c 6",
          mitigation: "Habilite frames de gerenciamento protegido (PMF) nas configurações do seu roteador Wi-Fi para impedir desautenticações forçadas.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "07",
      number: "07",
      name: "Reverse Engineering (Reversa)",
      icon: Binary,
      desc: "Sistemas para desmontar aplicativos compilados (.exe, .apk), analisar o código de máquina e entender seu comportamento.",
      tools: [
        {
          name: "ghidra",
          desc: "Desenvolvido pela NSA. É o melhor descompilador de código executável binário do mundo para análise de vulnerabilidade reversa.",
          conceptCmd: "ghidra",
          mitigation: "Use ofuscadores de código avançados antes de publicar seus binários para dificultar que atacantes leiam a lógica interna do seu software.",
          simulatedOutput: []
        },
        {
          name: "apktool",
          desc: "Desmonta e reconstrói arquivos de aplicativos do Android (.apk), permitindo examinar as classes de código Java/Kotlin do celular.",
          conceptCmd: "apktool d meu-app.apk",
          mitigation: "Habilite o ProGuard ou R8 no Android Studio para ofuscar e comprimir o código de sua aplicação antes de exportá-la.",
          simulatedOutput: []
        }
      ]
    },
    {
      id: "08",
      number: "08",
      name: "Exploitation Tools (Exploits)",
      icon: Code,
      desc: "Motores de execução de cargas e exploits prontos para validar invasões autorizadas de teste em computadores.",
      tools: [
        {
          name: "metasploit",
          desc: "O maior banco de exploits do mundo. Permite automatizar a invasão simulada de sistemas desatualizados e obter acesso de terminal remoto.",
          conceptCmd: "msfconsole",
          mitigation: "Mantenha o Windows Update ativo e o sistema Linux atualizado. 99% dos exploits públicos falham contra softwares corrigidos.",
          simulatedOutput: []
        }
      ]
    }
  ], []);

  // Filtered Tools based on Search
  const filteredTools = useMemo(() => {
    const currentCategory = categories.find(c => c.id === selectedCategory);
    if (!currentCategory) return [];
    
    return currentCategory.tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.mitigation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [selectedCategory, searchQuery, categories]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  // Helper to check if string contains any specific pattern
  const anyCheck = (str: string, fn: (c: string) => boolean) => {
    return Array.from(str).some(fn);
  };

  // Generate reactive logs dynamically using the user's inputs!
  const triggerSimulation = (toolName: string) => {
    setIsSimulating(true);
    setTerminalLogs([]);

    const passwords = customWordlist.split("\n").map(p => p.trim()).filter(Boolean);
    let logs: string[] = [];

    if (toolName === "nmap") {
      logs = [
        `⚡ Iniciando Varredura Nmap Ética v7.93 no IP Alvo: ${targetIP}...`,
        `🔍 Configurações de tempo: Rápido (-T4), Análise de Versão (-sV), S.O. (-O)`,
        `🔍 Escaneando host ${targetIP} (Mapeando portas comuns)...`,
        `[+] Conexão bem-sucedida! Pacotes enviados com sucesso.`,
        `✓ Porta ${targetPort}/tcp aberta -> Serviço Ativo SSH (OpenSSH v8.4)`,
        `✓ Porta 80/tcp aberta   -> Serviço Ativo HTTP (Nginx Web Server)`,
        `✓ Porta 443/tcp aberta  -> Conexão Segura HTTPS (SSL/TLS v1.3)`,
        `✓ Porta 3306/tcp aberta -> Banco de Dados MySQL (MySQL Community Server)`,
        `🖥️ Sistema Operacional detectado: Linux Kernel 5.4 (Ubuntu Server LTS)`,
        `🛡️ [DEFESA RECOMENDADA]: O IP possui a porta sensível de banco de dados (3306) exposta para a internet. Configure um firewall local (ufw) ou feche-a imediatamente!`
      ];
    } else if (toolName === "dmitry") {
      logs = [
        `⚡ Iniciando Dmitry Deep Gathering no domínio: exemplo.com.br...`,
        `🔍 Buscando dados WHOIS nos registradores nacionais...`,
        `✓ Titular do Domínio: Alysson Segurança de Dados`,
        `✓ Servidores de Nomes de Domínio (NS): ns1.maximo.com.br`,
        `🔍 Escaneando portas comuns em busca de servidores de e-mail...`,
        `✓ Servidor MX Detectado: mail.exemplo.com.br (Porta 25 aberta)`,
        `✓ E-mails públicos encontrados indexados: contato@exemplo.com.br, suporte@exemplo.com.br`
      ];
    } else if (toolName === "recon-ng") {
      logs = [
        `⚡ Inicializando console recon-ng modular...`,
        `✓ Workspace ativa: maximo_audit`,
        `🔍 Buscando subdomínios expostos via APIs de busca pública...`,
        `✓ Subdomínio detectado: desenvolvedor.exemplo.com.br -> IP ${targetIP}`,
        `✓ Subdomínio detectado: homologacao.exemplo.com.br -> IP 192.168.1.102`,
        `✓ Varredura finalizada. 2 subdomínios mapeados com sucesso.`
      ];
    } else if (toolName === "nikto") {
      logs = [
        `⚡ Iniciando Nikto Vulnerability Scanner v2.5.0...`,
        `🔍 Alvo: http://${targetIP}:${targetPort}/`,
        `🔍 Analisando cabeçalhos de segurança HTTP...`,
        `⚠️ Alerta: Cabeçalho 'X-Content-Type-Options' está ausente nos dados de resposta.`,
        `⚠️ Alerta: Pasta sensível '/admin/' está exposta publicamente para o mundo!`,
        `⚠️ Alerta: Método HTTP inseguro habilitado: TRACE`,
        `🛡️ [DEFESA]: Adicione regras de cabeçalhos de segurança no arquivo de configuração do seu servidor web.`
      ];
    } else if (toolName === "lynis") {
      logs = [
        `⚡ Executando Lynis Enterprise System Audit...`,
        `🔍 Verificando permissões de arquivos estruturais do sistema...`,
        `✓ Arquivo de senhas /etc/passwd: Permissões seguras [OK]`,
        `⚠️ Alerta: O login direto do usuário 'root' via SSH está ativo no arquivo /etc/ssh/sshd_config!`,
        `⚙️ Hardening Index Global: 58/100 (Recomenda-se aumentar a segurança)`,
        `🛡️ [DEFESA]: Desative o login direto de root no arquivo sshd_config alterando 'PermitRootLogin' para 'no'.`
      ];
    } else if (toolName === "hydra" || toolName === "medusa" || toolName === "ncrack") {
      logs = [
        `⚡ Iniciando ataque de rede via dicionário de senhas (${toolName.toUpperCase()})...`,
        `🔍 Alvo configurado: ${targetIP} na porta ${targetPort}`,
        `👤 Usuário alvo para quebra: ${targetUser}`,
        `📖 Wordlist carregada: ${passwords.length} senhas cadastradas para teste.`,
        `------------------------------------------------------------`
      ];
      let found = false;
      for (let i = 0; i < passwords.length; i++) {
        const pwd = passwords[i];
        if (pwd === correctPassword) {
          logs.push(`🔑 [SUCESSO] CREDENCIAL ENCONTRADA! (Conexão estabelecida)`);
          logs.push(`👉 Usuário: ${targetUser} | Senha Válida: '${pwd}'`);
          found = true;
          break;
        } else {
          logs.push(`✗ Tentando credencial: (${targetUser} : ${pwd}) -> Falhou (Acesso Negado)`);
        }
      }
      if (!found) {
        logs.push(`------------------------------------------------------------`);
        logs.push(`⚠️ [FALHA]: Todas as ${passwords.length} senhas da wordlist foram testadas, mas nenhuma correspondeu à senha correta configurada.`);
        logs.push(`💡 Dica: Vá ao painel de configurações ao lado e adicione a senha '${correctPassword}' na sua Wordlist de teste!`);
      }
      logs.push(`------------------------------------------------------------`);
      logs.push(`🛡️ [DEFESA]: Utilize chaves criptográficas SSH (.pem) em vez de senhas de texto cru. Implemente limites de tentativas de login por IP usando o Fail2Ban.`);
    } else if (toolName === "hashcat" || toolName === "john" || toolName === "ophcrack") {
      // Create a mock md5-like hash based on correct password
      const mockHash = "827cc" + Array.from(correctPassword).map(c => c.charCodeAt(0).toString(16)).join("").substring(0, 16) + "e8b2";
      logs = [
        `⚡ Iniciando quebrador de hashes offline (${toolName.toUpperCase()})...`,
        `🔍 Algoritmo de Criptografia selecionado: MD5 / NTLM`,
        `📂 Hash de entrada para quebra: ${mockHash}`,
        `📖 Dicionário de senhas carregado: ${passwords.length} palavras disponíveis.`,
        `------------------------------------------------------------`
      ];
      let found = false;
      for (let i = 0; i < passwords.length; i++) {
        const pwd = passwords[i];
        if (pwd === correctPassword) {
          logs.push(`[+] Processando bloco de candidatos...`);
          logs.push(`🔑 [SUCESSO]: HASH DECIFRADO COM SUCESSO!`);
          logs.push(`👉 Hash Original: ${mockHash}`);
          logs.push(`👉 Senha Decifrada: '${pwd}'`);
          found = true;
          break;
        } else {
          logs.push(`✗ Candidato: '${pwd}' -> Hash incompatível`);
        }
      }
      if (!found) {
        logs.push(`------------------------------------------------------------`);
        logs.push(`⚠️ [FALHA]: O hash não foi quebrado. Nenhuma das ${passwords.length} senhas do seu dicionário de texto corresponde ao hash.`);
        logs.push(`💡 Dica: Insira a senha correspondente ao hash na Wordlist de teste para ver a quebra acontecer!`);
      }
      logs.push(`------------------------------------------------------------`);
      logs.push(`🛡️ [DEFESA]: Nunca armazene senhas usando algoritmos de hash fracos como MD5 ou SHA1. Substitua-os imediatamente por Argon2id ou Bcrypt com salt aleatório.`);
    } else if (toolName === "cewl") {
      logs = [
        `⚡ Cewl Wordlist Spider v5.4.3 ativo...`,
        `🔍 Navegando de forma inteligente no site do Alvo...`,
        `✓ Indexando palavras do conteúdo textual exposto...`,
        `✓ Processando termos mais repetidos relacionados ao negócio...`,
        `📂 Wordlist customizada gerada com sucesso! Salva em: wordlist_cewl.txt`,
        `📊 Total de senhas prováveis extraídas do site: 12 termos locais.`
      ];
    } else if (toolName === "crunch") {
      logs = [
        `⚡ Crunch Wordlist Generator ativo...`,
        `✓ Parâmetros: Tamanho mínimo: 6, Máximo: 8, Caracteres: 'abcdef'`,
        `⚙️ Calculando combinações matemáticas possíveis...`,
        `📝 Gerando 46.656 combinações possíveis de forma ordenada...`,
        `✓ Arquivo de wordlist personalizado criado com sucesso! Salvo em: wordlist.txt`
      ];
    } else if (toolName === "wifite" || toolName === "fern wifi cracker") {
      logs = [
        `⚡ Ativando modo monitor na placa de rede sem fio (wlan0mon)... [OK]`,
        `🔍 Escaneando o espectro de ondas de rádio locais...`,
        `✓ SSID encontrado: 'Rede_Corporativa_Wifi' (Canal 11, Sinal -42dBm)`,
        `🛰️ Enviando pacotes de deauth para desconectar dispositivos conectados temporariamente...`,
        `🔑 [SUCESSO] Handshake WPA2 capturado com sucesso!`,
        `📖 Iniciando ataque offline no Handshake capturado...`,
        `------------------------------------------------------------`
      ];
      let found = false;
      for (let i = 0; i < passwords.length; i++) {
        const pwd = passwords[i];
        if (pwd === correctPassword) {
          logs.push(`🔑 [SUCESSO]: SENHA WPA2 DESCOBERTA!`);
          logs.push(`👉 Rede SSID: Rede_Corporativa_Wifi`);
          logs.push(`👉 Senha de Acesso: ${pwd}`);
          found = true;
          break;
        } else {
          logs.push(`✗ Testando senha candidata WPA2: '${pwd}' -> Incorreta`);
        }
      }
      if (!found) {
        logs.push(`------------------------------------------------------------`);
        logs.push(`⚠️ [FALHA]: O handshake foi capturado, mas a senha correta não pôde ser revelada porque não consta na Wordlist atual.`);
      }
      logs.push(`------------------------------------------------------------`);
      logs.push(`🛡️ [DEFESA]: Utilize chaves WPA3 que protegem contra capturas offline de handshakes, ou use senhas robustas maiores de 16 caracteres.`);
    } else if (toolName === "mdk3") {
      logs = [
        `⚡ Inicializando MDK3 em modo Deauthentication Flood...`,
        `🛰️ Placa de rede: wlan0mon no Canal 6`,
        `🛰️ Inundando o roteador alvo com pacotes falsos de desconexão...`,
        `⚠️ Dispositivos conectados na rede perderam a sincronia e estão caindo temporariamente...`,
        `🛡️ [DEFESA]: Ative a proteção 'Protected Management Frames' (PMF) nas configurações avançadas do seu roteador Wi-Fi para ignorar esses comandos falsos.`
      ];
    } else if (toolName === "ghidra") {
      logs = [
        `⚡ Inicializando ambiente de Engenharia Reversa Ghidra...`,
        `📂 Importando arquivo binário compilado: app_servidor.exe...`,
        `🔍 Analisando arquitetura de máquina (x86_64, Windows PE)...`,
        `✓ Traduzindo blocos de código Assembly em pseudocódigo em C legível...`,
        `⚠️ ALERTA DE VULNERABILIDADE: Função strcmp() insegura detectada na checagem de privilégios de administrador!`
      ];
    } else if (toolName === "apktool") {
      logs = [
        `⚡ Executando descompilação de pacote Android com Apktool...`,
        `📂 Descompactando recursos visuais e imagens do aplicativo...`,
        `✓ Arquivo AndroidManifest.xml descompilado com sucesso.`,
        `🔍 Analisando classes compiladas traduzidas para arquivos Smali...`,
        `⚠️ ALERTA: Chave API_KEY exposta em texto limpo na classe de configuração global!`
      ];
    } else if (toolName === "metasploit") {
      logs = [
        `⚡ Inicializando MSFCONSOLE (Metasploit Framework) v6.2.0...`,
        `✓ Banco de dados conectado com sucesso (PostgreSQL)`,
        `🔍 Selecionando exploit: exploit/windows/smb/ms17_010_eternalblue`,
        `🛰️ Definindo parâmetros de IP e payloads reversos...`,
        `🛰️ Enviando payload de teste de integridade ao computador ${targetIP}...`,
        `✓ [SUCESSO]: Vulnerabilidade confirmada! Canal de comunicação Meterpreter 1 estabelecido com privilégios de SYSTEM!`,
        `🛡️ [DEFESA]: Aplique as atualizações pendentes do Windows Update (Patch MS17-010).`
      ];
    } else {
      logs = [
        `⚡ Iniciando ferramenta de segurança didática ${toolName.toUpperCase()}...`,
        `🔍 Executando comando de teste: ${toolName}`,
        `✓ Processamento concluído com sucesso.`
      ];
    }

    // Staggered logs output
    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsRunningScript(false);
          setIsSimulating(false);
        }
      }, delay);
      delay += 350;
    });
  };

  // Handle manual terminal commands typed by the user directly!
  const handleManualCmdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdClean = manualCmdInput.trim().toLowerCase();
    if (!cmdClean) return;

    setTerminalLogs(prev => [...prev, `maximo@kali:~$ ${manualCmdInput}`]);
    setManualCmdInput("");

    setIsSimulating(true);

    setTimeout(() => {
      if (cmdClean === "clear" || cmdClean === "limpar") {
        setTerminalLogs([]);
        setIsSimulating(false);
      } else if (cmdClean === "ajuda" || cmdClean === "help") {
        setTerminalLogs(prev => [
          ...prev,
          "Comandos disponíveis neste terminal do laboratório Kali:",
          "  ajuda           - Mostra esta lista explicativa de comandos.",
          "  limpar          - Limpa toda a tela de exibição do terminal.",
          "  nmap            - Executa varredura de portas no IP Alvo configurado.",
          "  hydra           - Executa teste de força bruta de login no IP Alvo.",
          "  hashcat         - Executa simulador de quebra de senhas offline.",
          "  wifite          - Inicia simulação de varredura e quebra de redes sem fio.",
          "  sqlmap          - Executa testes de injeção SQL contra servidores web.",
          "  show config     - Exibe suas variáveis e wordlist de senhas ativas.",
          ""
        ]);
        setIsSimulating(false);
      } else if (cmdClean === "show config") {
        setTerminalLogs(prev => [
          ...prev,
          `🛠️ PARÂMETROS ATIVOS NO LABORATÓRIO MÁXIMO:`,
          `  👉 IP do Computador Alvo (targetIP): ${targetIP}`,
          `  👉 Usuário de Login (targetUser): ${targetUser}`,
          `  👉 Porta de Conexão (targetPort): ${targetPort}`,
          `  👉 Senha Correta a Descobrir: '${correctPassword}'`,
          `  👉 Dicionário (Wordlist) com ${customWordlist.split("\n").length} senhas cadastradas:`,
          customWordlist.split("\n").map(p => `     - ${p}`).join("\n"),
          ""
        ]);
        setIsSimulating(false);
      } else if (cmdClean.includes("nmap")) {
        triggerSimulation("nmap");
      } else if (cmdClean.includes("hydra")) {
        triggerSimulation("hydra");
      } else if (cmdClean.includes("hashcat")) {
        triggerSimulation("hashcat");
      } else if (cmdClean.includes("wifite")) {
        triggerSimulation("wifite");
      } else if (cmdClean.includes("sqlmap")) {
        triggerSimulation("sqlmap");
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `⚠️ Comando '${cmdClean}' não suportado neste simulador seguro.`,
          "Digite 'ajuda' para ver a lista de comandos funcionais que você pode executar aqui!",
          ""
        ]);
        setIsSimulating(false);
      }
    }, 200);
  };

  const handleScriptTemplateChange = (template: string) => {
    setSelectedScriptTemplate(template);
    if (template === "portscan") {
      setScriptCode(`# Script de Port Scanner em Python
import socket

ip_alvo = "192.168.1.100"
portas = [21, 22, 80, 443, 3306]

print(f"--- INICIANDO ESCANEAMENTO EM {ip_alvo} ---")
for porta in portas:
    print(f"Testando conexao na porta {porta}...")
    # Simula conexao socket
    if porta in [22, 80, 443]:
        print(f"✓ Porta {porta} esta ABERTA (Servico Ativo)!")
    else:
        print(f"✗ Porta {porta} esta FECHADA (Time Out).")
print("--- VARREDURA FINALIZADA COM SUCESSO ---")`);
    } else if (template === "password") {
      setScriptCode(`# Script Validador de Força de Senha (Python)
def testar_senha(senha):
    print(f"--- ANALISANDO FORÇA DA SENHA: '{senha}' ---")
    maiuscula = any(c.isupper() for c in senha)
    numero = any(c.isdigit() for c in senha)
    especial = any(not c.isalnum() for c in senha)
    comprimento = len(senha) >= 8
    
    pontos = sum([maiuscula, numero, especial, comprimento])
    print(f"Critério 1 - Letra Maiúscula: {'OK' if maiuscula else 'FALHOU'}")
    print(f"Critério 2 - Contém Número: {'OK' if numero else 'FALHOU'}")
    print(f"Critério 3 - Caractere Especial: {'OK' if especial else 'FALHOU'}")
    print(f"Critério 4 - Comprimento (>=8): {'OK' if comprimento else 'FALHOU'}")
    
    print(f"Pontuação Total de Segurança: {pontos}/4")
    if pontos == 4:
        print("🔥 RESULTADO: Senha Forte e Altamente Recomendada!")
    elif pontos >= 2:
        print("⚠️ RESULTADO: Senha Média. Recomendamos adicionar mais caracteres especiais.")
    else:
        print("❌ RESULTADO: Senha extremamente Fraca! Vulnerável a ataques de dicionário.")

testar_senha("maximo2026")`);
    } else if (template === "sniffer") {
      setScriptCode(`# Script de Monitoramento de Tráfego (Sniffer)
import time

print("--- INICIANDO CAPTURA DE PACOTES NA PLACA ETH0 ---")
print("Aguardando conexoes na rede...")

pacotes = [
    {"origem": "192.168.1.10", "destino": "192.168.1.100", "proto": "HTTP", "dados": "POST /login user=admin pass=maximo2026"},
    {"origem": "192.168.1.100", "destino": "192.168.1.10", "proto": "TCP", "dados": "SSH Handshake (Acesso Estabelecido)"},
    {"origem": "192.168.1.12", "destino": "8.8.8.8", "proto": "DNS", "dados": "Consulta de DNS: google.com.br"}
]

for pkt in pacotes:
    print(f"[PACOTE DETECTADO] Protocolo {pkt['proto']} de {pkt['origem']} para {pkt['destino']}")
    print(f"  └─ Conteudo interceptado: {pkt['dados']}")
    
print("--- MONITORAMENTO CONCLUIDO (3 PACOTES CAPTURADOS) ---")`);
    }
  };

  const runScript = () => {
    setIsRunningScript(true);
    setScriptLogs([]);
    
    // Extrapolate custom values from the script text if edited by user!
    let ipValue = targetIP;
    const ipMatch = scriptCode.match(/ip_alvo\s*=\s*["']([^"']+)["']/);
    if (ipMatch) {
      ipValue = ipMatch[1];
    }

    let senhaValue = correctPassword;
    const senhaMatch = scriptCode.match(/testar_senha\s*\(\s*["']([^"']+)["']\s*\)/);
    if (senhaMatch) {
      senhaValue = senhaMatch[1];
    }

    let lines: string[] = [];
    if (selectedScriptTemplate === "portscan") {
      lines = [
        `>>> python3 security_scanner.py (Executando seu código modificado)`,
        `--- INICIANDO ESCANEAMENTO EM ${ipValue} ---`,
        "Testando conexao na porta 21...",
        "✗ Porta 21 esta FECHADA (Time Out).",
        "Testando conexao na porta 22...",
        "✓ Porta 22 esta ABERTA (Servico Ativo - SSH)!",
        "Testando conexao na porta 80...",
        "✓ Porta 80 esta ABERTA (Servico Ativo - HTTP)!",
        "Testando conexao na porta 443...",
        "✓ Porta 443 esta ABERTA (Servico Ativo - HTTPS)!",
        "Testando conexao na porta 3306...",
        "✗ Porta 3306 esta FECHADA (Time Out).",
        `--- VARREDURA EM ${ipValue} FINALIZADA COM SUCESSO ---`
      ];
    } else if (selectedScriptTemplate === "password") {
      const maiuscula = anyCheck(senhaValue, c => c === c.toUpperCase() && c !== c.toLowerCase());
      const numero = anyCheck(senhaValue, c => !isNaN(Number(c)));
      const especial = anyCheck(senhaValue, c => !c.match(/[a-zA-Z0-9]/));
      const comprimento = senhaValue.length >= 8;
      const pontos = (maiuscula ? 1 : 0) + (numero ? 1 : 0) + (especial ? 1 : 0) + (comprimento ? 1 : 0);
      
      lines = [
        `>>> python3 pwd_analyzer.py (Executando seu código modificado)`,
        `--- ANALISANDO FORÇA DA SENHA: '${senhaValue}' ---`,
        `Critério 1 - Letra Maiúscula: ${maiuscula ? 'OK' : 'FALHOU'}`,
        `Critério 2 - Contém Número: ${numero ? 'OK' : 'FALHOU'}`,
        `Critério 3 - Caractere Especial: ${especial ? 'OK' : 'FALHOU'}`,
        `Critério 4 - Comprimento (>=8): ${comprimento ? 'OK' : 'FALHOU'}`,
        `Pontuação Total de Segurança: ${pontos}/4`
      ];
      if (pontos === 4) {
        lines.push("🔥 RESULTADO: Senha Forte e Altamente Recomendada!");
      } else if (pontos >= 2) {
        lines.push("⚠️ RESULTADO: Senha Média. Recomendamos adicionar mais caracteres especiais.");
      } else {
        lines.push("❌ RESULTADO: Senha extremamente Fraca! Vulnerável a ataques de dicionário.");
      }
    } else {
      lines = [
        `>>> python3 sniffer.py (Executando seu código modificado)`,
        "--- INICIANDO CAPTURA DE PACOTES NA PLACA ETH0 ---",
        "Aguardando conexoes na rede...",
        `[PACOTE DETECTADO] Protocolo HTTP de 192.168.1.10 para ${ipValue}`,
        `  └─ Conteudo interceptado: POST /login user=${targetUser} pass=${senhaValue}`,
        `[PACOTE DETECTADO] Protocolo TCP de ${ipValue} para 192.168.1.10`,
        `  └─ Conteudo interceptado: SSH Handshake (Acesso Estabelecido)`,
        `[PACOTE DETECTADO] Protocolo DNS de 192.168.1.12 para 8.8.8.8`,
        `  └─ Conteudo interceptado: Consulta de DNS: google.com.br`,
        "--- MONITORAMENTO CONCLUIDO (3 PACOTES CAPTURADOS) ---"
      ];
    }

    let delay = 0;
    lines.forEach((line, index) => {
      setTimeout(() => {
        setScriptLogs(prev => [...prev, line]);
        if (index === lines.length - 1) {
          setIsRunningScript(false);
        }
      }, delay);
      delay += 300;
    });
  };

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col space-y-6">
      
      {/* Background radial effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

      {/* Title & Tab Switchers */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border-b border-slate-850 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600/10 border border-rose-500/30 text-rose-500 rounded-xl">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>🐧 LABORATÓRIO KALI LINUX & SEGURANÇA ÉTICA</span>
              <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                FALHAS & PROTEÇÃO v10.0
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Ambiente de simulação reativa e aprendizado de segurança cibernética com ferramentas de código aberto do Kali Linux.
            </p>
          </div>
        </div>

        {/* Custom Tab Selector */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-stretch sm:self-start">
          <button
            onClick={() => setSuiteTab("tools")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              suiteTab === "tools"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Módulos Kali</span>
          </button>
          <button
            onClick={() => setSuiteTab("scripts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              suiteTab === "scripts"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Editor de Scripts (Python)</span>
          </button>
        </div>
      </div>

      {suiteTab === "tools" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL: Categories List (Col span 3) */}
          <div className="lg:col-span-3 space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Selecione o Módulo Kali:
            </span>
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    // Select first tool in category automatically
                    if (cat.tools.length > 0) {
                      setSelectedTool(cat.tools[0].name);
                    }
                    setTerminalLogs([]);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-rose-950/25 border-rose-500/40 text-white shadow-md"
                      : "bg-slate-900/60 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-rose-600/20 text-rose-400" : "bg-slate-950 text-slate-500"}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">MÓDULO {cat.number}</p>
                    <p className="text-xs font-bold truncate text-slate-300">{cat.name}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* MIDDLE PANEL: Tools grid (Col span 5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Category Description */}
            {(() => {
              const activeCat = categories.find(c => c.id === selectedCategory);
              if (!activeCat) return null;
              return (
                <div className="bg-slate-900/50 border border-slate-850 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono font-black text-rose-500 uppercase tracking-wider">
                    Categoria {activeCat.number} ativada no circuito
                  </span>
                  <h3 className="text-xs font-extrabold text-white">{activeCat.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{activeCat.desc}</p>
                </div>
              );
            })()}

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar ferramentas do Kali (hydra, nmap, metasploit...)"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 placeholder:text-slate-600"
              />
            </div>

            {/* Tools List */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  onClick={() => {
                    setSelectedTool(tool.name);
                    setTerminalLogs([]);
                  }}
                  className={`bg-slate-900/50 border p-3 rounded-xl flex flex-col justify-between transition-all cursor-pointer ${
                    selectedTool === tool.name
                      ? "border-rose-500/50 bg-rose-950/5"
                      : "border-slate-850 hover:border-slate-750"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/20 border border-rose-500/20 px-2 py-0.5 rounded-md uppercase">
                        {tool.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">kali-tool</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{tool.desc}</p>
                    <div className="bg-slate-950/80 border border-slate-850/60 rounded p-1.5 text-[10px] font-mono text-indigo-400 flex items-center justify-between">
                      <span className="truncate">{tool.conceptCmd}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(tool.conceptCmd);
                        }}
                        className="text-slate-500 hover:text-white shrink-0 ml-1.5"
                        title="Copiar comando didático"
                      >
                        {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredTools.length === 0 && (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Nenhuma ferramenta encontrada para esta busca na categoria ativa.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Dynamic Target Configurator & Terminal Output (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Interactive Target configuration */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase border-b border-slate-800 pb-2">
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>⚙️ Configuração Reativa do Alvo</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-1">
                  <label className="text-slate-400 block">Computador Alvo (IP):</label>
                  <input
                    type="text"
                    value={targetIP}
                    onChange={(e) => setTargetIP(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block">Usuário de Login:</label>
                  <input
                    type="text"
                    value={targetUser}
                    onChange={(e) => setTargetUser(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-1">
                  <label className="text-slate-400 block">Porta do Alvo:</label>
                  <input
                    type="text"
                    value={targetPort}
                    onChange={(e) => setTargetPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block text-emerald-400">Senha Correta:</label>
                  <input
                    type="text"
                    value={correctPassword}
                    onChange={(e) => setCorrectPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 text-emerald-400 font-bold font-mono"
                  />
                </div>
              </div>

              {/* Password list editor ("ver senhas", "editar senhas") */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400">📖 Dicionário Wordlist (uma por linha):</label>
                  <span className="text-[10px] text-slate-500 font-mono">Ver/Editar Senhas</span>
                </div>
                <textarea
                  value={customWordlist}
                  onChange={(e) => setCustomWordlist(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 font-mono text-[10px] resize-none focus:outline-none focus:border-rose-500/50"
                  placeholder="Insira as senhas de teste..."
                />
              </div>
            </div>

            {/* Run button for Active Tool */}
            <button
              onClick={() => triggerSimulation(selectedTool)}
              disabled={isSimulating || !selectedTool}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20 cursor-pointer disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>PROCESSANDO VARREDURA NO CIRCUITO...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>EXECUTAR SIMULAÇÃO: {selectedTool?.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* SCRIPT LABORATORY TAB */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Script templates chooser and details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4" />
                <span>📝 Modelos de Automação Hacker Ético</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Selecione um script de segurança em Python abaixo. Você pode <strong>editar o código fonte diretamente</strong> no painel de edição ao lado e depois executá-lo para ver como o console responde à sua lógica de forma reativa!
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleScriptTemplateChange("password")}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedScriptTemplate === "password"
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🔑 Analisador de Senhas (Python)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>

                <button
                  onClick={() => handleScriptTemplateChange("portscan")}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedScriptTemplate === "portscan"
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🔍 Scanner de Portas de Rede (Python)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>

                <button
                  onClick={() => handleScriptTemplateChange("sniffer")}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedScriptTemplate === "sniffer"
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>🛰️ Monitor Sniffer de Tráfego (Python)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>
              </div>
            </div>

            <div className="bg-indigo-950/15 border border-indigo-500/20 rounded-xl p-4 text-[11px] text-slate-400 space-y-1.5">
              <p className="font-bold text-indigo-300">💡 Como manusear o código corretamente?</p>
              <p>Mude o parâmetro de teste no código à direita (ex: altere <code className="text-emerald-300">"maximo2026"</code> para outra palavra ou mude <code className="text-emerald-300">"192.168.1.100"</code> para outro IP), clique em <strong>Executar Código no Terminal</strong> e veja o resultado dinâmico!</p>
            </div>
          </div>

          {/* Code IDE Text Area Editor */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-72">
              <div className="bg-slate-950 border-b border-slate-850 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">editor_seguranca.py</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/10">
                  Modo Edição Livre
                </span>
              </div>
              <div className="flex flex-1 relative font-mono text-xs text-indigo-300 bg-slate-950 leading-relaxed overflow-hidden">
                {/* Line Numbers Simulation */}
                <div className="w-10 bg-slate-900 border-r border-slate-850 flex flex-col items-center py-3 select-none text-[10px] text-slate-600">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Free Code Editor Area */}
                <textarea
                  value={scriptCode}
                  onChange={(e) => setScriptCode(e.target.value)}
                  className="w-full bg-transparent outline-none p-3 resize-none text-[11px] text-slate-300 focus:ring-0 leading-5 scrollbar-thin"
                />
              </div>
            </div>

            <button
              onClick={runScript}
              disabled={isRunningScript}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 disabled:opacity-50"
            >
              {isRunningScript ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>COMPILANDO E EXECUTANDO SEU PYTHON SCRIPT...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>▶️ EXECUTAR SCRIPT EDITADO NO TERMINAL</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TERMINAL OUTPUT CONSOLE SCREEN */}
      <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-2xl flex flex-col space-y-3 p-4">
        
        {/* Terminal Header Info */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-rose-600/10 rounded-lg text-rose-500">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{suiteTab === "tools" ? "Console de Varreduras Kali Linux (Ações Reativas)" : "Saída do Interpretador Python (Script Logs)"}</span>
              </h4>
              <p className="text-[10px] text-slate-500 font-mono">Modo didático 100% monitorado e seguro</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTerminalLogs([]);
                setScriptLogs([]);
              }}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Tela</span>
            </button>
          </div>
        </div>

        {/* Console logs output */}
        <div className="bg-black/90 rounded-lg p-3 h-48 overflow-y-auto font-mono text-[11px] text-emerald-400 space-y-1.5 border border-slate-900 scrollbar-thin select-text">
          {suiteTab === "tools" ? (
            <>
              {terminalLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-1">
                  <p>💻 Terminal Pronto. Digite um comando abaixo ou clique em "Executar Simulação" em um dos módulos!</p>
                  <p className="text-[10px] text-slate-700">Comandos funcionais: nmap, hydra, hashcat, sqlmap, show config, limpar</p>
                </div>
              ) : (
                terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed animate-fade-in break-words whitespace-pre-wrap">
                    {log}
                  </div>
                ))
              )}
              <div ref={terminalBottomRef} />
            </>
          ) : (
            <>
              {scriptLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-600 text-center">
                  💻 Modifique o código Python acima e clique no botão verde para ver a saída da sua lógica interpretada aqui!
                </div>
              ) : (
                scriptLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed animate-fade-in break-words whitespace-pre-wrap">
                    {log}
                  </div>
                ))
              )}
              <div ref={scriptTerminalBottomRef} />
            </>
          )}
        </div>

        {/* MANUAL COMMAND INPUT - EXCLUSIVELY FOR TOOLS TAB */}
        {suiteTab === "tools" && (
          <form onSubmit={handleManualCmdSubmit} className="flex gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span className="text-rose-500 font-bold">maximo@kali:~$</span>
            </div>
            <input
              type="text"
              value={manualCmdInput}
              onChange={(e) => setManualCmdInput(e.target.value)}
              disabled={isSimulating}
              placeholder="Digite comandos aqui... (Ex: ajuda, hydra, nmap, show config, limpar)"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500/50 font-mono placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={isSimulating}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Enviar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        )}
      </div>

      {/* Footer Disclaimer & Regulatory Seals */}
      <div className="pt-4 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
          <span>Aviso: Todo conteúdo é estritamente de caráter didático e educativo. Não incentivamos nem disponibilizamos vetores reais de ataques.</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-mono shrink-0">
          <span>Selo de Integridade:</span>
          <span>APPROVED SEGURANÇA NACIONAL v10.0</span>
        </div>
      </div>

    </div>
  );
}
