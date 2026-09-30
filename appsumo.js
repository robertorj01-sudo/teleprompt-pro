import crypto from 'crypto';

export default async function handler(req, res) {
  // O AppSumo aceita apenas requisições POST para o Webhook
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    const { event, license_key, prev_license_key, tier, test } = payload;

    // 1. Tratamento de Requisições de Teste do AppSumo (Validação no Painel)
    if (test) {
      return res.status(200).json({
        event: event || 'purchase',
        success: true
      });
    }

    // 2. Validação Opcional de Segurança via HMAC SHA256 (se tiveres a API Key definida)
    const apiKey = process.env.APPSUMO_API_KEY;
    const signature = req.headers['x-appsumo-signature'];
    const timestamp = req.headers['x-appsumo-timestamp'];

    if (apiKey && signature && timestamp) {
      const rawBody = JSON.stringify(payload);
      const expectedSignature = crypto
        .createHmac('sha256', apiKey)
        .update(timestamp + rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(403).json({ error: 'Invalid signature' });
      }
    }

    // 3. Processamento dos Eventos de Licença em Produção
    switch (event) {
      case 'purchase':
        // Cliente comprou na AppSumo
        console.log(`[AppSumo] Compra realizada. Licença: ${license_key}`);
        break;

      case 'activate':
        // Cliente iniciou a ativação do produto
        console.log(`[AppSumo] Ativação iniciada. Licença: ${license_key}, Tier: ${tier}`);
        // TODO: Registar/ativar a licença na tua base de dados
        break;

      case 'upgrade':
      case 'downgrade':
        // Cliente alterou o plano (recebe um novo license_key e desativa o prev_license_key)
        console.log(`[AppSumo] Mudança de Tier. Novo Key: ${license_key}, Antigo: ${prev_license_key}, Novo Tier: ${tier}`);
        // TODO: Atualizar o chave do utilizador de prev_license_key para license_key na tua base de dados
        break;

      case 'deactivate':
        // Reembolso ou cancelamento
        console.log(`[AppSumo] Licença desativada: ${license_key}`);
        // TODO: Remover ou suspender o acesso do utilizador associado a esta licença
        break;

      default:
        console.log(`[AppSumo] Evento não reconhecido: ${event}`);
    }

    // O AppSumo EXIGE estritamente este formato de resposta com HTTP STATUS 200
    return res.status(200).json({
      event: event,
      success: true
    });

  } catch (error) {
    console.error('[AppSumo Webhook Error]:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}