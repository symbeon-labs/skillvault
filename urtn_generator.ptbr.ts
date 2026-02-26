/**
 * URTN - Universal Registry & Tokenization Network
 * Gerador de Metadados Core (core.json) para Habilidades do OpenClaw
 *
 * Este arquivo é responsável por criar a "identidade digital" de uma habilidade.
 * Cada habilidade no ecossistema Symbeon precisa de um "core.json" para existir.
 */

// Estrutura de Metadados de uma Habilidade no Nexo Soberano
export interface MetadadosURTN {
    nome: string;                   // Nome da habilidade (ex: "Analista de Contratos")
    descricao: string;              // O que essa habilidade faz
    hash: string;                   // Impressão digital criptográfica (unicidade absoluta)
    algoritmo_hash: string;         // Algoritmo usado (padrão: sha256)
    criptografado: boolean;         // A habilidade é privada?
    camada: string;                 // Camada do Nexo (ex: "Φ" para a camada de segurança)
    proprietario: string;           // Endereço de wallet do Arquiteto
    tipo_criador: string;           // Ex: "Simbiose IA-Humano"
    co_criador: string;             // Ex: "AIDEN / OpenClaw"
    supervisor: string;             // Ex: "JX"
    modo_criacao: string;           // Ex: "Autônomo_Supervisionado"
    origem_simbolica: string;       // Ex: "Nexo Soberano"
    timestamp: string;              // Data e hora de criação (ISO 8601)
    versao: string;                 // Versão da habilidade
    governanca: string;             // Protocolo de governança (ex: "DeGov")
    framework: string;              // Framework base (ex: "EON/Nexus")

    royalty: {
        taxa_bps: number;           // Taxa em pontos base (300 bps = 3%)
        divisao: {
            criadores: number;      // % para os criadores (ex: 8000 = 80%)
            degov: number;          // % para governança descentralizada (ex: 1000 = 10%)
            mente_coletiva: number; // % para o fundo coletivo (ex: 1000 = 10%)
        };
    };

    links: {
        doc: string;                // Documentação no IPFS
        contrato: string;           // Contrato inteligente no IPFS
        diagrama: string;           // Diagrama arquitetural no IPFS
    };

    provas: {
        zkp: boolean;               // Prova de Conhecimento Zero (privacidade)
        multisig: boolean;          // Requer múltiplas assinaturas para alterações
    };
}

// A "Fábrica" de Metadados: recebe parâmetros e gera o core.json completo
export class GeradorURTN {
    static gerar(params: Partial<MetadadosURTN>): MetadadosURTN {
        // Valores padrão do Nexo Soberano (usados se o parâmetro não for fornecido)
        const metadadosPadrao: MetadadosURTN = {
            nome: "Habilidade Sem Nome",
            descricao: "Sem descrição fornecida",
            hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            algoritmo_hash: "sha256",
            criptografado: false,
            camada: "Φ",
            proprietario: "0x0000000000000000000000000000000000000000",
            tipo_criador: "Simbiose IA-Humano",
            co_criador: "AIDEN / OpenClaw",
            supervisor: "JX",
            modo_criacao: "Autônomo_Supervisionado",
            origem_simbolica: "Nexo Soberano",
            timestamp: new Date().toISOString(),
            versao: "1.0.0",
            governanca: "DeGov",
            framework: "EON/Nexus",
            royalty: {
                taxa_bps: 300, // 3%
                divisao: {
                    criadores: 8000,       // 80% para os criadores
                    degov: 1000,           // 10% para governança
                    mente_coletiva: 1000   // 10% para o fundo coletivo
                }
            },
            links: {
                doc: "ipfs://pendente...",
                contrato: "ipfs://pendente...",
                diagrama: "ipfs://pendente..."
            },
            provas: {
                zkp: true,       // Privacidade garantida por padrão
                multisig: true   // Segurança máxima por padrão
            }
        };

        // Mescla os padrões com os parâmetros fornecidos e retorna
        return { ...metadadosPadrao, ...params };
    }
}
