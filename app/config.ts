import dotenv from "dotenv"
dotenv.config()

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN
export const RPC_URL = process.env.RPC_URL;

export const PROMPT_CONTRACT_ABI = []
export const PROMPT_CONTRACT_ADDRESS = "" 
export const CHAIN_ID = ""

export const EXPLORERS = {
  "" : "", // 'chain_id' : 'explorer_url',
  '11155111' : 'https://sepolia.etherscan.io/',
}