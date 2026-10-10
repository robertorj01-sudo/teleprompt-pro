import { SavedScript } from '../types/teleprompter';
import { countWords, estimateReadingTimeSeconds } from './textUtils';

const rawDefaults = [
  {
    id: 'script-default-1',
    title: 'Apresentação de Produto & Inovação Tecnológica',
    category: 'Apresentação Corporativa',
    content: `[SORRIR E FAZER CONTATO VISUAL DIRETO COM A LENTE]

Olá a todos! Sejam muito bem-vindos.

Hoje é um dia marcante. Nos últimos doze meses, nossa equipe trabalhou incansavelmente para resolver um dos maiores desafios enfrentados por profissionais modernos: a retenção de atenção e a eficiência na comunicação visual.

[PAUSA DE 2 SEGUNDOS - TOM CALMO E CONFIANTE]

Quantas vezes você já assistiu a uma apresentação em que o orador parecia desconectado, lendo anotações no papel ou olhando para baixo? 

A verdade é simples: quando você mantém o olhar nos olhos de quem te assiste, a confiança se multiplica. É essa conexão humana autêntica que transforma espectadores passivos em parceiros e clientes engajados.

[GESTICULAR COM AS MÃOS ABERTAS]

Por isso, criamos esta nova experiência: fluida, intuitiva e focada na sua mensagem. Cada controle que você vê foi desenhado para eliminar a distração técnica e colocar você no comando absoluto da sua voz.

[ENFATIZAR A SEGUINTE FRASE]
A comunicação não é sobre tecnologia. A comunicação é sobre impacto, clareza e empatia.

Muito obrigado a cada um de vocês pela presença. Vamos dar início à nossa demonstração prática!

[ACENAR SUAVEMENTE COM A CABEÇA]`,
  },
  {
    id: 'script-default-2',
    title: 'Roteiro Rápido para Redes Sociais (Shorts / Reels / TikTok)',
    category: 'Vídeo Curto & Redes',
    content: `[COMEÇAR COM ENERGIA ALTA E SORRISO ABERTO]

Pare de perder horas gravando o mesmo vídeo dez vezes seguidas!

Se você cria conteúdo para a internet, você já passou por isso: você sabe exatamente o que quer falar, mas na hora que a luz vermelha da câmera acende... a mente dá um branco!

[APROXIMAR DO MICROFONE - TOM DE CONFISSÃO]

O segredo dos maiores criadores do mundo não é uma memória fotográfica. É ter um roteiro bem estruturado rodando na mesma linha do olhar da sua câmera.

[MOSTRAR CONFIANÇA]
Aqui estão os três passos fundamentais:

Primeiro: Comece com uma pergunta provocativa nos primeiros 3 segundos.
Segundo: Entregue a solução sem enrolação em no máximo 40 segundos.
E terceiro: Finalize com uma chamada para ação clara e irresistível!

[APONTAR PARA BAIXO OU PARA O LINK]
Gostou dessa dica prática? Salve este vídeo para não esquecer e compartilhe com um amigo que precisa destravar na frente da câmera!`,
  },
  {
    id: 'script-default-3',
    title: 'Discurso de Abertura para Palestra & Workshop',
    category: 'Palestra & Eventos',
    content: `[RESPIRAR FUNDO, POSTURA ERETA, OLHAR TRANQUILO]

Bom dia a todos os presentes e a quem nos acompanha nesta transmissão online.

É uma honra imensa compartilhar este espaço com pessoas tão dedicadas ao aprendizado e à evolução contínua.

[PAUSA BREVE - OBSERVAR O PÚBLICO]

Quando olhamos para a velocidade com que o mundo tem se transformado, uma habilidade se destaca acima de todas as outras: a capacidade de comunicar ideias complexas com simplicidade e coragem.

Ao longo do nosso encontro de hoje, nós não vamos apenas discutir conceitos teóricos. Nós vamos colocar a mão na massa, questionar paradigmas antigos e desenhar caminhos práticos que você poderá aplicar imediatamente amanhã de manhã.

[TOM MOTIVADOR]
Quero convidar você a manter a mente aberta, a fazer perguntas difíceis e a participar ativamente de cada dinâmica.

O conhecimento só ganha vida quando é compartilhado. Vamos juntos fazer deste dia uma experiência transformadora!`,
  },
  {
    id: 'script-default-4',
    title: 'Pitch Comercial de Alto Impacto (3 Minutos)',
    category: 'Vendas & Negócios',
    content: `[CONTATO VISUAL FIRME, VOZ CLARA E PROFISSIONAL]

Vocês sabiam que 78% das empresas perdem oportunidades comerciais não pela qualidade do produto, mas pela incapacidade de comunicar seu diferencial em menos de três minutos?

[PAUSA DE IMPACTO]

No mercado atual, tempo é o recurso mais escasso dos tomadores de decisão. Quem não é direto, perde espaço para quem é.

Nossa solução foi desenvolvida exatamente para fechar essa lacuna. Nós integramos fluxos de trabalho inteligentes que reduzem o ciclo de vendas em até 40%, enquanto aumentam a taxa de conversão das equipes em mais de 25%.

[DESTACAR DADOS]
E como nós fazemos isso? Através de três pilares:
1. Automação de etapas manuais repetitivas;
2. Centralização de inteligência de relacionamento;
3. E uma experiência de usuário tão fluida que dispensa semanas de treinamento.

[CONVITE FINAL]
Nossos clientes já alcançaram retorno sobre o investimento nos primeiros 60 dias de implantação.

Gostaríamos de convidá-los para um piloto de duas semanas na operação de vocês. Podemos agendar para a próxima terça-feira?`,
  },
];

export const DEFAULT_SCRIPTS: SavedScript[] = rawDefaults.map((s, index) => {
  const words = countWords(s.content);
  return {
    ...s,
    updatedAt: Date.now() - (index * 86400000), // dias diferentes
    wordCount: words,
    estimatedMinutes: Math.ceil(estimateReadingTimeSeconds(words) / 60),
  };
});

const rawDefaultsEn = [
  {
    id: 'script-default-en-1',
    title: 'Product Keynote & Tech Innovation Pitch',
    category: 'Keynote & Business',
    content: `[SMILE AND LOOK DIRECTLY INTO THE CAMERA LENS]

Hello everyone, and welcome!

Today is a milestone day. Over the past twelve months, our team has worked tirelessly to solve one of the biggest challenges facing modern creators and executives: audience retention and authentic visual communication.

[PAUSE 2 SECONDS - CALM AND CONFIDENT TONE]

How many times have you watched a presentation where the speaker seemed disconnected, looking down at notes or losing their train of thought?

The truth is simple: when you maintain direct eye contact with your audience, trust multiplies. It is that authentic human connection that turns passive viewers into engaged clients and partners.

[OPEN HAND GESTURE]

That is why we built Teleprompter Pro: fluid, distraction-free, and engineered around your natural eye line. Every control you see was crafted to eliminate technical friction and put you in complete command of your voice.

[EMPHASIZE THE NEXT SENTENCE]
Great communication isn't about technology. It's about clarity, confidence, and impact.

Thank you all for being here today. Let's dive into our live demonstration!

[NOD GENTLY]`,
  },
  {
    id: 'script-default-en-2',
    title: 'High-Retention Short Video Hook (Reels / TikTok / Shorts)',
    category: 'Short-Form Video',
    content: `[HIGH ENERGY AND WARM SMILE]

Stop wasting two hours recording the same sixty-second video ten times in a row!

If you create content online, you know the feeling: you know your topic inside out, but the second the red camera light turns on... your mind goes completely blank!

[LEAN IN SLIGHTLY - CONVERSATIONAL TONE]

The secret of top creators isn't photographic memory. It's having a structured script scrolling right at the exact height of your camera lens.

[SHOW THREE FINGERS]
Here is the three-step formula for high-converting videos:

First: Open with a bold, pattern-interrupt hook in the first 3 seconds.
Second: Deliver actionable value with zero fluff in under 40 seconds.
And third: End with a clear, unmistakable call to action!

[POINT DOWN TOWARD CAPTION]
Found this helpful? Save this video for your next shoot and share it with a creator who needs to ship faster!`,
  },
  {
    id: 'script-default-en-3',
    title: 'Executive Sales & SaaS Demo Pitch (3 Minutes)',
    category: 'Sales & SaaS',
    content: `[FIRM EYE CONTACT, CLEAR AND PROFESSIONAL VOICE]

Did you know that 78% of B2B deals are lost not because of product quality, but because teams fail to communicate their core value proposition in under three minutes?

[BRIEF PAUSE FOR IMPACT]

In today's market, attention is the scarcest currency for decision-makers. Clarity wins deals.

Our platform was built specifically to close this gap. We streamline repetitive workflows to cut onboarding time by 40%, while boosting team conversion rates by over 25%.

[HIGHLIGHT KEY METRICS]
How do we achieve this? Through three core pillars:
1. Automated workflow orchestration with zero coding required;
2. Real-time customer intelligence in one unified dashboard;
3. And an intuitive interface your team can master on day one.

[CLOSING INVITATION]
Our partners typically see full return on investment within the first 60 days.

We would love to set up a two-week pilot tailored to your workflow. Does next Tuesday work for a quick kickoff call?`,
  },
  {
    id: 'script-default-en-4',
    title: 'Online Course & Webinar Welcome Module',
    category: 'Education & Webinar',
    content: `[DEEP BREATH, RELAXED POSTURE, WELCOMING TONE]

Welcome to this masterclass! I am thrilled to have you here.

Whether you are joining us live or watching the replay, you made a powerful decision today to invest in your skills and communication mastery.

[PAUSE BRIEFLY]

Throughout this session, we are not just going to cover abstract theory. We are going to walk through practical frameworks that you can apply immediately to your next presentation, video shoot, or client meeting.

[MOTIVATIONAL TONE]
Grab a notebook, close your extra browser tabs, and let's get started with Module One!`,
  },
];

export const DEFAULT_SCRIPTS_EN: SavedScript[] = rawDefaultsEn.map((s, index) => {
  const words = countWords(s.content);
  return {
    ...s,
    updatedAt: Date.now() - (index * 86400000),
    wordCount: words,
    estimatedMinutes: Math.ceil(estimateReadingTimeSeconds(words) / 60),
  };
});

export function getDefaultScripts(lang: 'pt' | 'en'): SavedScript[] {
  return lang === 'en' ? DEFAULT_SCRIPTS_EN : DEFAULT_SCRIPTS;
}
