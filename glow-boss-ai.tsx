import { useState, useEffect } from "react";

// ─── PALETTE & TOKENS ────────────────────────────────────────────────────────
const C = {
  cream: "#FDF8F5",
  rose: "#F2C4CE",
  roseDark: "#D4899A",
  nude: "#E8D5C4",
  nudeDark: "#C4A882",
  gold: "#C9A96E",
  goldLight: "#E8D5A3",
  white: "#FFFFFF",
  charcoal: "#2C2C2C",
  muted: "#9B8B7E",
  soft: "#F7EEE9",
  softGreen: "#D4E8D4",
  softRed: "#F2D4D4",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:${C.cream}; font-family:'DM Sans',sans-serif; color:${C.charcoal}; min-height:100vh; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:${C.soft}; }
  ::-webkit-scrollbar-thumb { background:${C.roseDark}; border-radius:2px; }
  input, textarea, select { outline:none; font-family:'DM Sans',sans-serif; }
  button { cursor:pointer; font-family:'DM Sans',sans-serif; }
`;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SCRIPTS = [
  {
    id: 1, category: "Confirmação", icon: "✨",
    title: "Confirmação de Horário Premium",
    text: `Olá, [Nome]! 🌸\n\nPassando para confirmar nosso horário amanhã às [hora] — mal posso esperar para te ver!\n\nVou separar tudo com carinho especialmente para você. Se precisar reagendar, me avisa com pelo menos 24h de antecedência, tá bem?\n\nTe espero linda! 💛`,
  },
  {
    id: 2, category: "Reativação", icon: "💌",
    title: "Cliente Sumida — Volta com Mimo",
    text: `[Nome], quanto tempo! 🥺\n\nFiquei na saudade e resolvi te mandar uma mensagem. Você sabe que adoro te atender e sei o quanto você ama o resultado.\n\nEssa semana tenho uma janelinha especial para clientes antigas — e como te valorizo muito, quero que você seja a primeira a saber.\n\nVamos marcar? Me fala uma data boa pra você 🌷`,
  },
  {
    id: 3, category: "Pós-atendimento", icon: "🪞",
    title: "Pós-atendimento Sensorial",
    text: `[Nome]! Amei te ver hoje 🥰\n\nEspero que esteja amando seu novo visual tanto quanto eu amei fazer em você!\n\nLembra: evite molhar nas próximas [X horas], nada de oleoso perto da área e, se tiver qualquer dúvida, pode me chamar.\n\nE quando postar, me marca! Adoro ver vocês brilhando 💛✨`,
  },
  {
    id: 4, category: "Cobrança", icon: "💎",
    title: "Cobrança Elegante",
    text: `Oi [Nome], tudo bem? 🌸\n\nPassando aqui de forma delicada — percebi que o pagamento da nossa sessão do dia [data] ainda está em aberto.\n\nSei que às vezes esquece no agito do dia a dia! Pode me enviar via Pix [chave] quando tiver um momento?\n\nConto com você. Um beijo 💛`,
  },
  {
    id: 5, category: "Objeção de Preço", icon: "👑",
    title: "Resposta para Quem Achou Caro",
    text: `Entendo, [Nome]! E vou ser honesta com você 💛\n\nMeu valor reflete anos de treinamento, produtos de alta qualidade e um resultado que dura — sem assimetria, sem desconforto, sem retrabalho.\n\nVocê não está pagando só pelo procedimento. Está investindo em se sentir incrível por semanas.\n\nSe quiser, posso te mostrar o antes e depois de clientes que pensaram igual a você e hoje não trocam por nada! Me fala o que você busca exatamente e encontro a melhor opção pra você 🌷`,
  },
  {
    id: 6, category: "Venda de Pacote", icon: "🎀",
    title: "Pacote com Proposta Irresistível",
    text: `[Nome], você faz manutenção todo mês mesmo, né? 😍\n\nEntão preciso te falar de algo que vai mudar o jogo pra você!\n\nEstou abrindo uma turma fechada do meu Pacote VIP — [X sessões] por [valor], que além de economizar [Y%], te garante agenda prioritária e um mimo surpresa na última sessão.\n\nAs vagas são limitadas e vão pra quem me responder primeiro. Você topa? 💛`,
  },
  {
    id: 7, category: "Indicação", icon: "🌟",
    title: "Pedido de Indicação Magnético",
    text: `[Nome]! Adoro te ver chegando aqui toda confiante 💛\n\nTem alguma amiga, colega ou familiar que também merece esse cuidado? Se você me indicar e ela vier, você ganha [benefício] na sua próxima visita.\n\nÉ minha forma de agradecer por confiar no meu trabalho. Você merece ser reconhecida também 🌸`,
  },
  {
    id: 8, category: "Boas-vindas", icon: "🌺",
    title: "Boas-vindas para Nova Cliente",
    text: `[Nome], seja muito bem-vinda! 🌸✨\n\nFico feliz demais que você escolheu confiar no meu trabalho!\n\nPara preparar tudo com carinho para você, me conta: já fez esse procedimento antes? Tem alguma alergia ou sensibilidade?\n\nAqui você está em ótimas mãos. Me manda esses detalhes e já te explico tudinho sobre como funciona nossa sessão juntas 💛`,
  },
  {
    id: 9, category: "Promoção", icon: "🎉",
    title: "Lançamento de Promoção Exclusiva",
    text: `Segredo entre a gente, [Nome]! 🤫💛\n\nEssa semana estou liberando [X vagas] com um valor especial que não divulgo em feed — só pras minhas preferidas.\n\n[Procedimento] por [valor] com [benefício extra].\n\nResposta aqui serve como reserva — agenda voa! Me fala se quer garantir 🌷`,
  },
];

const CONTENT_IDEAS = [
  { tag: "Autoridade", idea: "Mostre o processo do seu setup: organize sua mesa ao vivo e explique por que cada produto que você usa foi escolhido — isso transmite profissionalismo sem precisar falar nada.", reel: "Transição: mesa bagunçada → setup impecável. Áudio trending + legenda 'meu ritual antes de cada cliente'.", cta: "Salva pra usar de inspiração no seu studio 🌸", story: "Enquete: 'você sabia que o jeito que organizo minha mesa afeta o resultado?' SIM / UAU, não sabia." },
  { tag: "Prova Social", idea: "Crie um 'álbum de transformações' em formato de antes e depois lado a lado — mas conta a história da cliente, não só o resultado visual.", reel: "Antes e depois com música emocional. Texto: 'ela me disse que chorou quando olhou no espelho'.", cta: "Me manda DM se você também quer essa transformação 💛", story: "Sticker de reação: 'esse é o resultado depois de só UMA sessão comigo 👇'" },
  { tag: "Bastidores", idea: "Mostre sua rotina de preparação de produtos — esterilização, organização, seleção. As clientes amam saber que você é meticulosa.", reel: "POV: o que acontece antes de você chegar no meu studio.", cta: "Comenta 'quero saber mais' e te mando os detalhes da sessão 💌", story: "Caixinha de perguntas: 'o que você sempre quis saber sobre o processo?'" },
  { tag: "Dica Educativa", idea: "Desmistifique um mito comum da sua área — ex: 'extensão de cílio prejudica o natural' ou 'a sobrancelha perfeita tem que ser simétrica'.", reel: "Talking head direto: 'Mito ou verdade? Vou te contar o que ninguém fala'.", cta: "Salva esse vídeo e manda pra uma amiga que precisa saber disso 🔖", story: "Quiz: 'Mito ou Verdade? Extensão de cílio cai em qualquer olho?'" },
  { tag: "Engajamento", idea: "Crie uma votação de looks: mostre 3 variações de make/cílios/sobrancelha e peça pra audiência votar no favorito.", reel: "Transição rápida entre 3 looks. 'Qual você escolheria? Comenta o número!'", cta: "Comenta 1, 2 ou 3! Quero saber o favorito de vocês 💬", story: "Enquete com foto dos looks. 'Você seria A, B ou C?'" },
  { tag: "Fidelização", idea: "Faça um 'obrigada' especial de fim de mês reconhecendo as clientes que foram mais frequentes — sem citar nomes, mas de forma que elas se sintam vistas.", reel: "Texto na tela: 'Pra quem marcou comigo esse mês, esse vídeo é pra vocês'.", cta: "Se você foi minha cliente esse mês, manda um 💛 nos comentários!", story: "Caixinha: 'me conta o que você amou na sua última sessão aqui'" },
  { tag: "Oferta", idea: "Lance uma oferta de 'agenda de terça surpresa' — vagas que 'abriram' com condição especial. Cria urgência sem parecer desesperado.", reel: "POV: você verificando sua agenda e descobrindo 3 vagas disponíveis. Texto: 'preenchi mais rápido do que esperava 👀'", cta: "Se quer uma dessas vagas, me manda DM com 'TERÇA' agora ⚡", story: "Contagem regressiva: 'Essas vagas somem em 24h'" },
];

const CALENDAR_TYPES = ["Autoridade", "Prova Social", "Bastidores", "Oferta", "Dica Educativa", "Engajamento", "Fidelização"];
const TYPE_COLORS = {
  "Autoridade": "#C9A96E",
  "Prova Social": "#D4899A",
  "Bastidores": "#C4A882",
  "Oferta": "#9B8B7E",
  "Dica Educativa": "#A8C4D4",
  "Engajamento": "#D4A8C4",
  "Fidelização": "#B8D4A8",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function generateCalendar() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const type = CALENDAR_TYPES[i % CALENDAR_TYPES.length];
    const idea = CONTENT_IDEAS[i % CONTENT_IDEAS.length];
    days.push({
      id: i + 1,
      date: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      type,
      task: idea.idea.slice(0, 80) + "…",
      fullIdea: idea,
      done: false,
      note: "",
      photo: null,
    });
  }
  return days;
}

function formatCurrency(v) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.gold}, ${C.roseDark})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: C.white, fontWeight: 600,
      }}>G</div>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: C.charcoal, letterSpacing: 0.5 }}>
        Glow Boss <span style={{ color: C.gold }}>AI</span>
      </span>
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: C.white, borderRadius: 20, padding: "20px 22px",
      boxShadow: "0 2px 16px rgba(196,168,130,0.10)",
      border: `1px solid rgba(196,168,130,0.15)`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "22", color: color, border: `1px solid ${color}44`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 500, letterSpacing: 0.3,
    }}>{label}</span>
  );
}

function PrimaryButton({ children, onClick, style = {}, small }) {
  return (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg, ${C.gold}, ${C.roseDark})`,
      color: C.white, border: "none", borderRadius: 14,
      padding: small ? "8px 18px" : "13px 28px",
      fontSize: small ? 13 : 14, fontWeight: 500, letterSpacing: 0.3,
      transition: "opacity 0.2s", ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >{children}</button>
  );
}

function GhostButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent", color: C.muted,
      border: `1px solid ${C.nude}`, borderRadius: 12,
      padding: "10px 20px", fontSize: 13, fontWeight: 400,
      transition: "all 0.2s", ...style,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.nude; e.currentTarget.style.color = C.muted; }}
    >{children}</button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, options }) {
  const base = {
    width: "100%", padding: "12px 14px", borderRadius: 12,
    border: `1.5px solid ${C.nude}`, background: C.soft,
    fontSize: 14, color: C.charcoal, transition: "border-color 0.2s",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, color: C.muted, fontWeight: 500, letterSpacing: 0.3 }}>{label}</label>}
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={base}>
          <option value="">Selecione…</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ ...base, minHeight: 80, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={base}
          onFocus={e => e.target.style.borderColor = C.gold}
          onBlur={e => e.target.style.borderColor = C.nude}
        />
      )}
    </div>
  );
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────

// LOGIN SCREEN
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit() {
    if (!email || !pass) { setErr("Preencha todos os campos 🌸"); return; }
    if (mode === "register" && !name) { setErr("Qual é o seu nome? 🌸"); return; }
    const users = JSON.parse(localStorage.getItem("gb_users") || "{}");
    if (mode === "register") {
      if (users[email]) { setErr("Este e-mail já está cadastrado."); return; }
      const id = "u_" + Date.now();
      users[email] = { id, name, email, pass, created: Date.now() };
      localStorage.setItem("gb_users", JSON.stringify(users));
      localStorage.setItem("gb_session", JSON.stringify({ id, email, name }));
      onLogin({ id, email, name });
    } else {
      const u = users[email];
      if (!u || u.pass !== pass) { setErr("E-mail ou senha incorretos."); return; }
      localStorage.setItem("gb_session", JSON.stringify({ id: u.id, email: u.email, name: u.name }));
      onLogin({ id: u.id, email: u.email, name: u.name });
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(160deg, ${C.cream} 0%, ${C.soft} 50%, ${C.rose}33 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.gold}, ${C.roseDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, margin: "0 auto 14px", boxShadow: `0 6px 24px ${C.roseDark}44`,
          }}>✦</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 500, color: C.charcoal, marginBottom: 4 }}>
            Glow Boss <span style={{ color: C.gold }}>AI</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 14 }}>Sua assistente de crescimento profissional</p>
        </div>

        <Card style={{ padding: 28 }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 24, background: C.soft, borderRadius: 12, padding: 4 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{
                flex: 1, padding: "9px", borderRadius: 10, border: "none",
                background: mode === m ? C.white : "transparent",
                color: mode === m ? C.charcoal : C.muted,
                fontWeight: mode === m ? 500 : 400, fontSize: 13,
                boxShadow: mode === m ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}>{m === "login" ? "Entrar" : "Criar Conta"}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && <Input label="NOME PROFISSIONAL" value={name} onChange={setName} placeholder="Ex: Fernanda Lash" />}
            <Input label="E-MAIL" value={email} onChange={setEmail} type="email" placeholder="seu@email.com" />
            <Input label="SENHA" value={pass} onChange={setPass} type="password" placeholder="••••••••" />
            {err && <p style={{ color: C.roseDark, fontSize: 13, textAlign: "center" }}>{err}</p>}
            <PrimaryButton onClick={submit} style={{ marginTop: 4 }}>
              {mode === "login" ? "Entrar" : "Criar minha conta"} ✨
            </PrimaryButton>
          </div>
        </Card>

        <p style={{ textAlign: "center", color: C.muted, fontSize: 12, marginTop: 20 }}>
          Seus dados são 100% privados e seguros 🔒
        </p>
      </div>
    </div>
  );
}

// ONBOARDING SCREEN
function OnboardingScreen({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    area: "", city: "", level: "", difficulty: "", avgTicket: "", goal: "", style: ""
  });

  const steps = [
    {
      title: "Qual é a sua especialidade?",
      subtitle: "Vou personalizar tudo para a sua área 💛",
      field: "area",
      options: [
        { value: "lash", label: "💎 Lash Designer" },
        { value: "sobrancelha", label: "🪄 Designer de Sobrancelhas" },
        { value: "nail", label: "💅 Nail Designer" },
      ]
    },
    {
      title: "Qual é o seu nível de experiência?",
      subtitle: "Sem julgamentos — cada fase tem sua beleza ✨",
      field: "level",
      options: [
        { value: "iniciante", label: "🌱 Iniciante (até 1 ano)" },
        { value: "intermediaria", label: "🌸 Intermediária (1–3 anos)" },
        { value: "avancada", label: "👑 Avançada (3+ anos)" },
      ]
    },
    {
      title: "Qual é o seu maior desafio agora?",
      subtitle: "Vou priorizar conteúdo para resolver isso 🎯",
      field: "difficulty",
      options: [
        { value: "atrair", label: "🧲 Atrair novas clientes" },
        { value: "vender", label: "💸 Vender mais e melhor" },
        { value: "conteudo", label: "📲 Criar conteúdo consistente" },
        { value: "fidelizar", label: "💛 Fidelizar quem já atendo" },
        { value: "organizar", label: "📋 Me organizar financeiramente" },
      ]
    },
    {
      title: "Qual é o seu tom de voz?",
      subtitle: "Seus scripts e conteúdos vão refletir esse estilo 🌺",
      field: "style",
      options: [
        { value: "delicada", label: "🌸 Delicada e acolhedora" },
        { value: "luxuosa", label: "✦ Luxuosa e sofisticada" },
        { value: "divertida", label: "🎉 Divertida e descontraída" },
        { value: "profissional", label: "💼 Profissional e direta" },
        { value: "motivacional", label: "🔥 Motivacional e inspiradora" },
      ]
    },
  ];

  const cur = steps[step];

  function select(val) {
    const nd = { ...data, [cur.field]: val };
    setData(nd);
    if (step < steps.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  }

  function finish() {
    if (!data.avgTicket || !data.goal || !data.city) return;
    const profile = { ...data, name: user.name, setupDone: true, joinDate: Date.now() };
    localStorage.setItem(`gb_profile_${user.id}`, JSON.stringify(profile));
    localStorage.setItem(`gb_calendar_${user.id}`, JSON.stringify(generateCalendar()));
    localStorage.setItem(`gb_finance_${user.id}`, JSON.stringify({ entries: [], assistants: [] }));
    onComplete(profile);
  }

  const isLastQuestions = step === steps.length - 1;

  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(160deg, ${C.cream}, ${C.soft})`,
      display: "flex", flexDirection: "column", padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? C.gold : C.nude,
              transition: "background 0.4s",
            }} />
          ))}
        </div>

        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 12, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>
            Passo {step + 1} de {steps.length + 1}
          </p>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 500, marginBottom: 8, color: C.charcoal, lineHeight: 1.2 }}>
          {cur.title}
        </h2>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>{cur.subtitle}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cur.options.map(opt => (
            <button key={opt.value} onClick={() => select(opt.value)} style={{
              padding: "16px 20px", borderRadius: 16, textAlign: "left", fontSize: 15,
              border: `1.5px solid ${data[cur.field] === opt.value ? C.gold : C.nude}`,
              background: data[cur.field] === opt.value ? C.gold + "18" : C.white,
              color: C.charcoal, transition: "all 0.2s", fontWeight: data[cur.field] === opt.value ? 500 : 400,
            }}>{opt.label}</button>
          ))}
        </div>

        {isLastQuestions && data[cur.field] && (
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.charcoal }}>
              Últimas informações 💛
            </p>
            <Input label="SUA CIDADE" value={data.city} onChange={v => setData(d => ({ ...d, city: v }))} placeholder="Ex: São Paulo" />
            <Input label="TICKET MÉDIO (R$)" value={data.avgTicket} onChange={v => setData(d => ({ ...d, avgTicket: v }))} type="number" placeholder="Ex: 150" />
            <Input label="META DE FATURAMENTO MENSAL (R$)" value={data.goal} onChange={v => setData(d => ({ ...d, goal: v }))} type="number" placeholder="Ex: 5000" />
            <PrimaryButton onClick={finish} style={{ marginTop: 8 }}>Começar minha jornada ✨</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

// MAIN APP
function MainApp({ user, profile, onLogout }) {
  const [tab, setTab] = useState("home");
  const [calendar, setCalendar] = useState(() => {
    const s = localStorage.getItem(`gb_calendar_${user.id}`);
    return s ? JSON.parse(s) : generateCalendar();
  });
  const [finance, setFinance] = useState(() => {
    const s = localStorage.getItem(`gb_finance_${user.id}`);
    return s ? JSON.parse(s) : { entries: [], assistants: [] };
  });
  const [selectedScript, setSelectedScript] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [selectedCalDay, setSelectedCalDay] = useState(null);
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [finForm, setFinForm] = useState({ type: "receita", desc: "", value: "", category: "atendimento", assistant: "" });
  const [showAssistantForm, setShowAssistantForm] = useState(false);
  const [assistantForm, setAssistantForm] = useState({ name: "", percent: "" });
  const [scriptFilter, setScriptFilter] = useState("Todos");

  const todayIdea = CONTENT_IDEAS[new Date().getDate() % CONTENT_IDEAS.length];
  const doneTasks = calendar.filter(d => d.done).length;
  const activeToday = true;
  const streak = Math.min(doneTasks + 1, 30);
  const progress = Math.round((doneTasks / 30) * 100);

  function saveCalendar(cal) {
    setCalendar(cal);
    localStorage.setItem(`gb_calendar_${user.id}`, JSON.stringify(cal));
  }

  function saveFinance(fin) {
    setFinance(fin);
    localStorage.setItem(`gb_finance_${user.id}`, JSON.stringify(fin));
  }

  function toggleTask(id) {
    saveCalendar(calendar.map(d => d.id === id ? { ...d, done: !d.done } : d));
  }

  function addFinanceEntry() {
    if (!finForm.desc || !finForm.value) return;
    const entry = { ...finForm, id: Date.now(), date: new Date().toLocaleDateString("pt-BR"), value: parseFloat(finForm.value) };
    const updated = { ...finance, entries: [entry, ...finance.entries] };
    saveFinance(updated);
    setFinForm({ type: "receita", desc: "", value: "", category: "atendimento", assistant: "" });
    setShowFinanceForm(false);
  }

  function addAssistant() {
    if (!assistantForm.name || !assistantForm.percent) return;
    const a = { ...assistantForm, id: Date.now(), percent: parseFloat(assistantForm.percent) };
    saveFinance({ ...finance, assistants: [...finance.assistants, a] });
    setAssistantForm({ name: "", percent: "" });
    setShowAssistantForm(false);
  }

  function removeEntry(id) {
    saveFinance({ ...finance, entries: finance.entries.filter(e => e.id !== id) });
  }

  // Finance calculations
  const receitas = finance.entries.filter(e => e.type === "receita").reduce((s, e) => s + e.value, 0);
  const gastos = finance.entries.filter(e => e.type === "gasto").reduce((s, e) => s + e.value, 0);
  const comissoes = finance.entries
    .filter(e => e.type === "receita" && e.assistant)
    .reduce((s, e) => {
      const a = finance.assistants.find(a => a.id === parseInt(e.assistant));
      return s + (a ? e.value * (a.percent / 100) : 0);
    }, 0);
  const lucro = receitas - gastos - comissoes;

  const TABS = [
    { id: "home", icon: "✦", label: "Início" },
    { id: "calendar", icon: "📅", label: "Calendário" },
    { id: "scripts", icon: "💬", label: "Scripts" },
    { id: "finance", icon: "💰", label: "Finanças" },
    { id: "progress", icon: "🌟", label: "Progresso" },
  ];

  const areaLabel = { lash: "Lash Designer", sobrancelha: "Designer de Sobrancelhas", nail: "Nail Designer" }[profile.area] || "Profissional";

  return (
    <div style={{ minHeight: "100vh", background: C.cream, paddingBottom: 80 }}>
      {/* TOP BAR */}
      <div style={{
        background: C.white, padding: "16px 20px 14px",
        borderBottom: `1px solid ${C.nude}44`,
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, color: C.muted }}>Olá,</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.charcoal }}>{user.name.split(" ")[0]} ✨</p>
          </div>
          <button onClick={onLogout} style={{ background: C.soft, border: "none", borderRadius: 10, padding: "6px 10px", fontSize: 12, color: C.muted }}>Sair</button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px 16px", maxWidth: 520, margin: "0 auto" }}>

        {/* HOME */}
        {tab === "home" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Welcome */}
            <div style={{
              background: `linear-gradient(135deg, ${C.gold}22, ${C.roseDark}22)`,
              border: `1px solid ${C.gold}33`, borderRadius: 20, padding: "20px 22px",
            }}>
              <p style={{ fontSize: 12, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Hoje é seu dia</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: C.charcoal, marginBottom: 2 }}>
                Bom dia, {user.name.split(" ")[0]}! 🌸
              </h2>
              <p style={{ fontSize: 13, color: C.muted }}>{areaLabel} · {profile.city}</p>
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Sequência", value: `${streak}d`, icon: "🔥" },
                { label: "Concluídas", value: doneTasks, icon: "✅" },
                { label: "Evolução", value: `${progress}%`, icon: "📈" },
              ].map(s => (
                <Card key={s.label} style={{ padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: C.charcoal }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>{s.label}</p>
                </Card>
              ))}
            </div>

            {/* Today's content idea */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 11, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Ideia do Dia</p>
                  <Badge label={todayIdea.tag} color={TYPE_COLORS[todayIdea.tag] || C.gold} />
                </div>
                <span style={{ fontSize: 22 }}>💡</span>
              </div>
              <p style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.6, marginBottom: 12 }}>{todayIdea.idea}</p>
              <div style={{ background: C.soft, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: C.gold, marginBottom: 4, fontWeight: 500 }}>🎬 ROTEIRO REELS</p>
                <p style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.5 }}>{todayIdea.reel}</p>
              </div>
              <div style={{ background: C.rose + "44", borderRadius: 12, padding: "10px 14px", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: C.roseDark, marginBottom: 4, fontWeight: 500 }}>📝 LEGENDA + CTA</p>
                <p style={{ fontSize: 13, color: C.charcoal }}>{todayIdea.cta}</p>
              </div>
              <div style={{ background: C.nudeDark + "22", borderRadius: 12, padding: "10px 14px" }}>
                <p style={{ fontSize: 11, color: C.nudeDark, marginBottom: 4, fontWeight: 500 }}>📱 STORIES</p>
                <p style={{ fontSize: 13, color: C.charcoal }}>{todayIdea.story}</p>
              </div>
            </Card>

            {/* Tarefa comercial */}
            <Card style={{ background: `linear-gradient(135deg, ${C.charcoal}, #3C3C3C)` }}>
              <p style={{ fontSize: 11, color: C.gold, letterSpacing: 1, marginBottom: 6 }}>✦ TAREFA COMERCIAL</p>
              <p style={{ fontSize: 14, color: C.white, lineHeight: 1.6 }}>
                Envie uma mensagem para 3 clientes que não aparecem há mais de 30 dias. Use o script de reativação da sua biblioteca — o retorno tende a ser alto quando a abordagem é certa. 💌
              </p>
            </Card>

            {/* Meta */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: 13, color: C.charcoal, fontWeight: 500 }}>Meta do mês</p>
                <p style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>{formatCurrency(receitas)} / {formatCurrency(profile.goal)}</p>
              </div>
              <div style={{ background: C.soft, borderRadius: 10, height: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 10,
                  background: `linear-gradient(90deg, ${C.gold}, ${C.roseDark})`,
                  width: `${Math.min((receitas / (profile.goal || 1)) * 100, 100)}%`,
                  transition: "width 0.6s",
                }} />
              </div>
            </Card>
          </div>
        )}

        {/* CALENDAR */}
        {tab === "calendar" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.charcoal }}>Calendário 30 Dias</p>
              <p style={{ fontSize: 13, color: C.muted }}>{doneTasks} de 30 tarefas concluídas</p>
            </div>

            {selectedCalDay ? (
              <div>
                <button onClick={() => setSelectedCalDay(null)} style={{ background: "none", border: "none", color: C.gold, fontSize: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
                  ← Voltar ao calendário
                </button>
                <Card>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5 }}>DIA {selectedCalDay.id} · {selectedCalDay.date}</p>
                      <Badge label={selectedCalDay.type} color={TYPE_COLORS[selectedCalDay.type] || C.gold} />
                    </div>
                    <button onClick={() => toggleTask(selectedCalDay.id)} style={{
                      background: selectedCalDay.done ? C.softGreen : C.soft,
                      border: "none", borderRadius: 12, padding: "8px 14px", fontSize: 13,
                      color: selectedCalDay.done ? "#4A8C4A" : C.muted,
                    }}>
                      {selectedCalDay.done ? "✓ Feita" : "Marcar feita"}
                    </button>
                  </div>
                  <p style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.6, marginBottom: 14 }}>{selectedCalDay.fullIdea.idea}</p>
                  <div style={{ background: C.soft, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                    <p style={{ fontSize: 11, color: C.gold, fontWeight: 500, marginBottom: 6 }}>🎬 ROTEIRO</p>
                    <p style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.5 }}>{selectedCalDay.fullIdea.reel}</p>
                  </div>
                  <div style={{ background: C.rose + "33", borderRadius: 12, padding: 14 }}>
                    <p style={{ fontSize: 11, color: C.roseDark, fontWeight: 500, marginBottom: 6 }}>📱 STORIES</p>
                    <p style={{ fontSize: 13, color: C.charcoal }}>{selectedCalDay.fullIdea.story}</p>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <label style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>OBSERVAÇÃO</label>
                    <textarea
                      value={selectedCalDay.note || ""}
                      onChange={e => {
                        const updated = calendar.map(d => d.id === selectedCalDay.id ? { ...d, note: e.target.value } : d);
                        saveCalendar(updated);
                        setSelectedCalDay(prev => ({ ...prev, note: e.target.value }));
                      }}
                      placeholder="Como foi? O que você aprendeu?"
                      style={{ width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.nude}`, background: C.soft, fontSize: 13, resize: "vertical", minHeight: 70, color: C.charcoal }}
                    />
                  </div>
                </Card>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {calendar.map(day => (
                  <div key={day.id} onClick={() => setSelectedCalDay(day)} style={{
                    background: day.done ? C.softGreen + "99" : C.white,
                    border: `1px solid ${day.done ? "#B8D4B8" : C.nude}44`,
                    borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.15s",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: day.done ? "#B8D4B8" : C.soft,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, color: day.done ? "#4A8C4A" : C.charcoal, fontWeight: 600, flexShrink: 0,
                    }}>{day.done ? "✓" : day.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <Badge label={day.type} color={TYPE_COLORS[day.type] || C.gold} />
                        <span style={{ fontSize: 11, color: C.muted }}>{day.date}</span>
                      </div>
                      <p style={{ fontSize: 13, color: day.done ? "#5A8C5A" : C.charcoal, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{day.task}</p>
                    </div>
                    <span style={{ color: C.muted, fontSize: 16 }}>›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SCRIPTS */}
        {tab === "scripts" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.charcoal, marginBottom: 4 }}>Biblioteca de Scripts</p>
              <p style={{ fontSize: 13, color: C.muted }}>Scripts prontos para copiar e usar 💌</p>
            </div>

            {/* Filter */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {["Todos", ...new Set(SCRIPTS.map(s => s.category))].map(cat => (
                <button key={cat} onClick={() => setScriptFilter(cat)} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, border: "none",
                  background: scriptFilter === cat ? C.gold : C.soft,
                  color: scriptFilter === cat ? C.white : C.muted,
                  fontWeight: scriptFilter === cat ? 500 : 400,
                }}>{cat}</button>
              ))}
            </div>

            {selectedScript ? (
              <div>
                <button onClick={() => { setSelectedScript(null); setCopiedScript(false); }} style={{ background: "none", border: "none", color: C.gold, fontSize: 14, marginBottom: 16 }}>
                  ← Voltar aos scripts
                </button>
                <Card>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <Badge label={selectedScript.category} color={C.gold} />
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginTop: 6, color: C.charcoal }}>{selectedScript.title}</p>
                    </div>
                    <span style={{ fontSize: 24 }}>{selectedScript.icon}</span>
                  </div>
                  <div style={{ background: C.soft, borderRadius: 14, padding: 16, marginBottom: 16, whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: C.charcoal }}>
                    {selectedScript.text}
                  </div>
                  <PrimaryButton onClick={() => {
                    navigator.clipboard?.writeText(selectedScript.text);
                    setCopiedScript(true);
                    setTimeout(() => setCopiedScript(false), 2000);
                  }}>
                    {copiedScript ? "✓ Copiado!" : "Copiar script 📋"}
                  </PrimaryButton>
                </Card>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SCRIPTS.filter(s => scriptFilter === "Todos" || s.category === scriptFilter).map(s => (
                  <Card key={s.id} onClick={() => setSelectedScript(s)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: C.soft, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <Badge label={s.category} color={C.roseDark} />
                      <p style={{ fontSize: 14, color: C.charcoal, fontWeight: 500, marginTop: 4 }}>{s.title}</p>
                    </div>
                    <span style={{ color: C.muted }}>›</span>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FINANCE */}
        {tab === "finance" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.charcoal, marginBottom: 4 }}>Calculadora Financeira</p>
              <p style={{ fontSize: 13, color: C.muted }}>Acompanhe cada centavo do seu negócio 💛</p>
            </div>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Receitas", value: receitas, color: "#4A8C4A", bg: C.softGreen },
                { label: "Gastos", value: gastos, color: "#8C4A4A", bg: C.softRed },
                { label: "Comissões", value: comissoes, color: C.nudeDark, bg: C.nude + "55" },
                { label: "Lucro Líquido", value: lucro, color: lucro >= 0 ? "#4A8C4A" : "#8C4A4A", bg: lucro >= 0 ? C.softGreen : C.softRed },
              ].map(s => (
                <Card key={s.label} style={{ background: s.bg, border: "none", padding: "14px 16px" }}>
                  <p style={{ fontSize: 11, color: s.color, fontWeight: 500, marginBottom: 4 }}>{s.label.toUpperCase()}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{formatCurrency(s.value)}</p>
                </Card>
              ))}
            </div>

            {/* Meta progress */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontSize: 13, color: C.charcoal, fontWeight: 500 }}>Progresso da meta</p>
                <p style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>
                  {Math.round(Math.min((receitas / (parseFloat(profile.goal) || 1)) * 100, 100))}%
                </p>
              </div>
              <div style={{ background: C.soft, borderRadius: 10, height: 10, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 10,
                  background: `linear-gradient(90deg, ${C.gold}, ${C.roseDark})`,
                  width: `${Math.min((receitas / (parseFloat(profile.goal) || 1)) * 100, 100)}%`,
                }} />
              </div>
              <p style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>
                Meta: {formatCurrency(profile.goal)} · Falta: {formatCurrency(Math.max(0, (parseFloat(profile.goal) || 0) - receitas))}
              </p>
            </Card>

            {/* Assistants */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.charcoal }}>Profissionais parceiras</p>
                <button onClick={() => setShowAssistantForm(v => !v)} style={{ background: C.soft, border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: C.gold }}>+ Adicionar</button>
              </div>
              {showAssistantForm && (
                <div style={{ background: C.soft, borderRadius: 12, padding: 14, marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                  <Input label="NOME" value={assistantForm.name} onChange={v => setAssistantForm(f => ({ ...f, name: v }))} placeholder="Ex: Juliana" />
                  <Input label="% DE COMISSÃO" value={assistantForm.percent} onChange={v => setAssistantForm(f => ({ ...f, percent: v }))} type="number" placeholder="Ex: 40" />
                  <PrimaryButton onClick={addAssistant} small>Salvar</PrimaryButton>
                </div>
              )}
              {finance.assistants.length === 0
                ? <p style={{ fontSize: 13, color: C.muted }}>Nenhuma profissional cadastrada ainda.</p>
                : finance.assistants.map(a => (
                  <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.nude}44` }}>
                    <p style={{ fontSize: 14, color: C.charcoal }}>{a.name}</p>
                    <Badge label={`${a.percent}%`} color={C.gold} />
                  </div>
                ))
              }
            </Card>

            {/* Add entry */}
            <div style={{ marginBottom: 12 }}>
              <PrimaryButton onClick={() => setShowFinanceForm(v => !v)} style={{ width: "100%" }}>
                {showFinanceForm ? "✕ Cancelar" : "+ Registrar movimento"}
              </PrimaryButton>
            </div>

            {showFinanceForm && (
              <Card style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["receita", "gasto"].map(t => (
                      <button key={t} onClick={() => setFinForm(f => ({ ...f, type: t }))} style={{
                        flex: 1, padding: 10, borderRadius: 10, border: "none",
                        background: finForm.type === t ? (t === "receita" ? C.softGreen : C.softRed) : C.soft,
                        color: finForm.type === t ? (t === "receita" ? "#4A8C4A" : "#8C4A4A") : C.muted,
                        fontWeight: 500, fontSize: 13,
                      }}>{t === "receita" ? "💚 Receita" : "🔴 Gasto"}</button>
                    ))}
                  </div>
                  <Input label="DESCRIÇÃO" value={finForm.desc} onChange={v => setFinForm(f => ({ ...f, desc: v }))} placeholder="Ex: Atendimento Fernanda" />
                  <Input label="VALOR (R$)" value={finForm.value} onChange={v => setFinForm(f => ({ ...f, value: v }))} type="number" placeholder="0,00" />
                  {finForm.type === "receita" && finance.assistants.length > 0 && (
                    <Input label="PROFISSIONAL (para calcular comissão)"
                      value={finForm.assistant}
                      onChange={v => setFinForm(f => ({ ...f, assistant: v }))}
                      options={[{ value: "", label: "Atendimento próprio" }, ...finance.assistants.map(a => ({ value: a.id.toString(), label: `${a.name} (${a.percent}%)` }))]}
                    />
                  )}
                  <Input label="CATEGORIA"
                    value={finForm.category}
                    onChange={v => setFinForm(f => ({ ...f, category: v }))}
                    options={[
                      { value: "atendimento", label: "Atendimento" },
                      { value: "produto", label: "Produto/Insumo" },
                      { value: "aluguel", label: "Aluguel/Studio" },
                      { value: "curso", label: "Curso/Capacitação" },
                      { value: "marketing", label: "Marketing" },
                      { value: "outro", label: "Outro" },
                    ]}
                  />
                  <PrimaryButton onClick={addFinanceEntry}>Salvar registro</PrimaryButton>
                </div>
              </Card>
            )}

            {/* Entries */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {finance.entries.length === 0
                ? <Card><p style={{ fontSize: 13, color: C.muted, textAlign: "center" }}>Nenhum registro ainda. Comece registrando seu primeiro atendimento! 💛</p></Card>
                : finance.entries.map(e => {
                  const assistant = finance.assistants.find(a => a.id === parseInt(e.assistant));
                  const commission = assistant ? e.value * (assistant.percent / 100) : 0;
                  return (
                    <div key={e.id} style={{
                      background: C.white, border: `1px solid ${C.nude}44`, borderRadius: 14, padding: "12px 16px",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                          <Badge label={e.type === "receita" ? "Receita" : "Gasto"} color={e.type === "receita" ? "#4A8C4A" : "#8C4A4A"} />
                          <Badge label={e.category} color={C.muted} />
                        </div>
                        <p style={{ fontSize: 14, color: C.charcoal }}>{e.desc}</p>
                        <p style={{ fontSize: 12, color: C.muted }}>{e.date}</p>
                        {assistant && <p style={{ fontSize: 11, color: C.nudeDark }}>Comissão {assistant.name}: {formatCurrency(commission)}</p>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 16, fontWeight: 600, color: e.type === "receita" ? "#4A8C4A" : "#8C4A4A" }}>
                          {e.type === "receita" ? "+" : "-"}{formatCurrency(e.value)}
                        </p>
                        <button onClick={() => removeEntry(e.id)} style={{ background: "none", border: "none", color: C.muted, fontSize: 11, marginTop: 4 }}>remover</button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {tab === "progress" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.charcoal }}>Seu Progresso</p>
              <p style={{ fontSize: 13, color: C.muted }}>Você está evoluindo todo dia 🌸</p>
            </div>

            <Card style={{ background: `linear-gradient(135deg, ${C.charcoal}, #3C3C3C)`, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.roseDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>✦</div>
                <div>
                  <p style={{ color: C.gold, fontSize: 12, letterSpacing: 1, marginBottom: 2 }}>NÍVEL</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.white }}>
                    {profile.level === "iniciante" ? "Rising Star" : profile.level === "intermediaria" ? "Glow Pro" : "Boss Lady"}
                  </p>
                  <p style={{ color: C.nude, fontSize: 12 }}>{areaLabel}</p>
                </div>
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Dias de Sequência", value: `${streak} 🔥`, desc: "Continue assim!" },
                { label: "Tarefas Feitas", value: `${doneTasks} ✅`, desc: "de 30 no calendário" },
                { label: "Evolução do Mês", value: `${progress}%`, desc: "do calendário concluído" },
                { label: "Registros Financeiros", value: `${finance.entries.length} 📊`, desc: "entradas registradas" },
              ].map(s => (
                <Card key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: C.charcoal, marginBottom: 2 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: C.muted }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: C.nude, marginTop: 2 }}>{s.desc}</p>
                </Card>
              ))}
            </div>

            {/* Completed tasks */}
            <Card>
              <p style={{ fontSize: 14, fontWeight: 500, color: C.charcoal, marginBottom: 12 }}>
                Tarefas concluídas ✅
              </p>
              {calendar.filter(d => d.done).length === 0
                ? <p style={{ fontSize: 13, color: C.muted }}>Você ainda não marcou nenhuma tarefa como concluída. Abra o calendário e comece hoje! 🌸</p>
                : calendar.filter(d => d.done).map(day => (
                  <div key={day.id} style={{
                    display: "flex", gap: 10, padding: "8px 0",
                    borderBottom: `1px solid ${C.nude}33`,
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.softGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>✓</div>
                    <div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge label={day.type} color={TYPE_COLORS[day.type] || C.gold} />
                        <span style={{ fontSize: 11, color: C.muted }}>{day.date}</span>
                      </div>
                      <p style={{ fontSize: 13, color: C.charcoal, marginTop: 2 }}>{day.task}</p>
                      {day.note && <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>📝 {day.note}</p>}
                    </div>
                  </div>
                ))
              }
            </Card>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: C.white, borderTop: `1px solid ${C.nude}44`,
        display: "flex", padding: "8px 0 12px",
        boxShadow: "0 -4px 20px rgba(196,168,130,0.10)",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: "none", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0",
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 10, color: tab === t.id ? C.gold : C.muted, fontWeight: tab === t.id ? 600 : 400, letterSpacing: 0.3 }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("gb_session");
    return s ? JSON.parse(s) : null;
  });
  const [profile, setProfile] = useState(() => {
    const s = localStorage.getItem("gb_session");
    if (!s) return null;
    const u = JSON.parse(s);
    const p = localStorage.getItem(`gb_profile_${u.id}`);
    return p ? JSON.parse(p) : null;
  });

  function handleLogin(u) {
    setUser(u);
    const p = localStorage.getItem(`gb_profile_${u.id}`);
    setProfile(p ? JSON.parse(p) : null);
  }

  function handleLogout() {
    localStorage.removeItem("gb_session");
    setUser(null);
    setProfile(null);
  }

  return (
    <>
      <style>{globalStyle}</style>
      {!user && <LoginScreen onLogin={handleLogin} />}
      {user && !profile && <OnboardingScreen user={user} onComplete={setProfile} />}
      {user && profile && <MainApp user={user} profile={profile} onLogout={handleLogout} />}
    </>
  );
}
