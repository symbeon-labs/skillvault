/**
 * Esquema de Micropagamento x402 para Comércio Agêntico
 * Integração para o SURGE × OpenClaw Hackathon
 *
 * O protocolo x402 é um padrão aberto que permite que agentes de IA
 * paguem por serviços de forma autônoma, sem precisar de intervenção humana.
 * É como um "cartão de crédito nativo" para agentes de IA.
 *
 * Fluxo completo:
 * 1. Agente A quer usar a habilidade "Analista de Contratos" do Agente B
 * 2. O sistema verifica se A tem saldo suficiente
 * 3. A transferência de SURGE tokens é feita automaticamente via x402
 * 4. O royalty é dividido entre o Arquiteto, a governança e o fundo coletivo
 * 5. A habilidade é executada e o resultado é retornado ao Agente A
 */

export interface EsquemaPagamentoX402 {
    metodo: "x402";                               // O protocolo de pagamento
    token: "USDC" | "SURGE";                      // A moeda do pagamento
    valor_por_execucao: number;                   // Quanto custa cada uso
    endereco_destinatario: string;                // Para onde vai o pagamento
    divisao_royalty: boolean;                     // Dividir o pagamento automaticamente?
    politica_retentativa: {
        max_tentativas: number;                   // Quantas vezes tentar em caso de falha
        atraso_ms: number;                        // Espera entre tentativas (em milissegundos)
    };
    camada_autorizacao: "nexus_sovereign" | "degov"; // Quem valida a transação
}

// O manipulador de pagamentos: cria e formata os pedidos de pagamento x402
export class ManipuladorX402 {

    // Cria um novo pedido de pagamento
    static criarPedidoPagamento(valor: number, destinatario: string): EsquemaPagamentoX402 {
        return {
            metodo: "x402",
            token: "SURGE",                       // Usamos $SURGE, a moeda do hackathon
            valor_por_execucao: valor,            // Valor definido pelo criador da habilidade
            endereco_destinatario: destinatario,  // Wallet do Arquiteto
            divisao_royalty: true,                // Sempre dividir (controle do Nexo)
            politica_retentativa: {
                max_tentativas: 3,                // Tenta 3 vezes antes de falhar
                atraso_ms: 1000                   // Espera 1 segundo entre tentativas
            },
            camada_autorizacao: "nexus_sovereign" // O Nexo Soberano é o árbitro final
        };
    }

    // Converte o esquema de pagamento em cabeçalhos HTTP x402
    // Esses cabeçalhos são enviados junto com o pedido para autorizar o pagamento
    static formatarCabecalhos(esquema: EsquemaPagamentoX402) {
        return {
            "x-402-payment-method": esquema.metodo,
            "x-402-token": esquema.token,
            "x-402-amount": esquema.valor_por_execucao.toString(),
            "x-402-recipient": esquema.endereco_destinatario,
            "x-402-auth": esquema.camada_autorizacao
        };
    }
}
