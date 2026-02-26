/**
 * URTN-Nexus: Extensão Soberana para o OpenClaw
 * Ponto de Entrada Principal da Extensão
 *
 * Este arquivo é o "coração" da nossa extensão. Ele faz duas coisas:
 * 1. Registra um COMANDO (/register-skill) para uso manual pelo Arquiteto.
 * 2. Registra uma FERRAMENTA (urtn_register_skill) para uso autônomo pelo AIDEN.
 *
 * A diferença:
 * - COMANDO: O humano (Arquiteto) digita "/register-skill nome descrição" numa conversa.
 * - FERRAMENTA: O agente AIDEN chama "urtn_register_skill" de forma autônoma, sem intervenção humana.
 */

import type { OpenClawPluginApi, PluginCommandContext, PluginCommandResult } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import { URTNGenerator } from "./urtn_generator.js";
import { X402Handler } from "./x402_schema.js";

// A Definição da Extensão (Plugin)
const extensao = {
    id: "urtn-nexus",
    nome: "URTN Nexus",
    descricao: "Registro Soberano de Habilidades e Rede de Tokenização para o OpenClaw",
    configSchema: emptyPluginConfigSchema(), // Sem configuração adicional necessária

    // Função de inicialização: chamada uma vez quando o OpenClaw acorda
    registrar(api: OpenClawPluginApi) {
        api.logger.info("URTN Nexus: Inicializando o Registro Soberano...");

        // =====================================================
        // PARTE 1: COMANDO MANUAL (/register-skill)
        // Uso: digitar "/register-skill NomeDaHabilidade Descrição aqui"
        // Resultado: gera o core.json e mostra detalhes do pagamento x402
        // =====================================================
        api.registerCommand({
            name: "register-skill",
            description: "Registra uma nova habilidade no URTN Nexo Soberano",
            acceptsArgs: true, // Aceita argumentos após o comando
            handler: async (ctx: PluginCommandContext): Promise<PluginCommandResult> => {
                // Separa os argumentos: o primeiro é o nome, o resto é a descrição
                const args = ctx.args?.split(" ") || [];
                if (args.length < 2) {
                    return { content: "Uso: /register-skill <nome> <descrição>" };
                }

                const nome = args[0];
                const descricao = args.slice(1).join(" ");

                // Gera os metadados soberanos da habilidade
                const metadados = URTNGenerator.generate({ name: nome, description: descricao });

                // Cria o pedido de pagamento x402
                const pagamento = X402Handler.createPaymentRequest(10, "0xWALLET_DO_ARQUITETO_MOCK");

                // Retorna a confirmação formatada para a conversa
                return {
                    content: `📦 **Habilidade Registrada Soberanamente!**\n\n` +
                             `**Nome:** ${metadados.name}\n` +
                             `**ID (Hash):** ${metadados.hash}\n` +
                             `**Protocolo:** URTN Camada Φ\n\n` +
                             `💰 **Pagamento x402 Necessário:** ${pagamento.amount_per_execution} ${pagamento.token}\n` +
                             `Direcionado para: \`${pagamento.recipient_address}\``
                };
            }
        });

        // =====================================================
        // PARTE 2: FERRAMENTA AUTÔNOMA (urtn_register_skill)
        // Uso: o AIDEN chama isso de forma automática, sem intervenção humana
        // O agente "pensa": "Preciso registrar o que acabei de fazer. Vou usar a ferramenta URTN."
        // =====================================================
        api.registerTool((ctx: any) => ({
            name: "urtn_register_skill",
            description: "Permite que o agente registre suas próprias habilidades no Nexo Soberano.",
            inputSchema: {
                // Define o "contrato" de entrada da ferramenta
                type: "object",
                properties: {
                    name: { type: "string" },          // Nome da habilidade
                    description: { type: "string" }    // Descrição da habilidade
                },
                required: ["name", "description"]
            },
            // Handler: o código que realmente executa quando a ferramenta é chamada
            async handler({ name, description }: { name: string; description: string }) {
                // Gera o manifesto soberano
                const metadados = URTNGenerator.generate({ name, description });

                // Prepara o pedido de royalty
                const pedido_pagamento = X402Handler.createPaymentRequest(10, "0xWALLET_DO_ARQUITETO_MOCK");

                // Retorna tudo ao agente para que ele continue seu raciocínio
                return {
                    status: "sucesso",
                    metadados,
                    pedido_pagamento,
                    manifesto: `A habilidade "${name}" foi ancorada no Nexo Soberano.`
                };
            }
        }));

        api.logger.info("URTN Nexus: Registro Soberano ativo. O Nexo aguarda novas habilidades.");
    },
};

export default extensao;
