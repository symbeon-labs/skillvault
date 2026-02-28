// src/blockchain.ts
// Symbeon Labs — Sovereign Wallet & Blockchain Utility
// Reuses patterns from ecosystem-degov's BlockchainService.

import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.RPC_URL ?? 'https://rpc.sepolia.org';
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? '';
const SYMBEON_WALLET_ADDRESS = process.env.SYMBEON_WALLET_ADDRESS ?? '';

/**
 * Initializes the blockchain provider and signer (wallet).
 * Returns a { provider, signer } pair for use in tests and tools.
 */
export async function initWallet() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  if (!PRIVATE_KEY) {
    throw new Error('[SUDA-BLOCKCHAIN] PRIVATE_KEY not found in .env. Aborting.');
  }
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log(`[SUDA-BLOCKCHAIN] Wallet initialized: ${signer.address}`);
  return { provider, signer };
}

/**
 * Checks the native balance of the agent's wallet.
 */
export async function checkBalance(): Promise<void> {
  const { provider, signer } = await initWallet();
  const balance = await provider.getBalance(signer.address);
  const balanceEth = ethers.formatEther(balance);
  console.log(`[SUDA-BLOCKCHAIN] Agent Balance: ${balanceEth} ETH`);
  if (parseFloat(balanceEth) < 0.001) {
    console.warn('[SUDA-BLOCKCHAIN] ⚠️  Low balance! Fund the wallet before running live tests.');
  } else {
    console.log('[SUDA-BLOCKCHAIN] ✅ Sufficient balance for x402 micropayments.');
  }
}

/**
 * Simulates a micropayment to the Symbeon vault address.
 * Used in the x402 agent validation flow.
 */
export async function sendMicropayment(valueInEth: string): Promise<string> {
  const { signer } = await initWallet();
  if (!SYMBEON_WALLET_ADDRESS) {
    throw new Error('[SUDA-BLOCKCHAIN] SYMBEON_WALLET_ADDRESS not set in .env.');
  }
  console.log(`[SUDA-BLOCKCHAIN] Sending ${valueInEth} ETH to ${SYMBEON_WALLET_ADDRESS}...`);
  const tx = await signer.sendTransaction({
    to: SYMBEON_WALLET_ADDRESS,
    value: ethers.parseEther(valueInEth),
  });
  await tx.wait();
  console.log(`[SUDA-BLOCKCHAIN] ✅ payment tx_hash: ${tx.hash}`);
  return tx.hash;
}
