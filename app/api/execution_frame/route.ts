import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { CHAIN_ID, OAO_CONTRACT_ABI, OAO_CONTRACT_ADDRESS, RPC_URL } from '../../config';
import {Web3} from 'web3';
import { allowedOrigin } from '../../lib/origin';
import { kv } from "@vercel/kv";

const web3 = new Web3(RPC_URL);

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Not a POST method', { status: 401 });
  }
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body);

  if (!isValid || !allowedOrigin(message)) {
    return new NextResponse('Unauthorized', { status: 402 });
  }

  //read the data from the database, generate prompt for the OAO call
  const fid = message?.interactor.fid || ""
  let jsonData: any = await kv.get<{ id: string; quantity: number }[]>(fid.toString());

  console.log("Json data: ", JSON.stringify(jsonData))

  const contract = new web3.eth.Contract(OAO_CONTRACT_ABI, OAO_CONTRACT_ADDRESS);
  const prompt = `OAO Prompt: ${jsonData.option}`;
  const model_id = 11 //https://docs.ora.io/doc/oao-onchain-ai-oracle/reference 
  const fee = Number(await contract.methods.estimateFee(model_id).call());
  
  const data = contract.methods.calculateAIResult(model_id, prompt).encodeABI();

  // Return transaction details response to farcaster
  return NextResponse.json({
    chainId: `eip155:${CHAIN_ID}`,
    method: 'eth_sendTransaction',
    params: {
      abi: OAO_CONTRACT_ABI,
      to: OAO_CONTRACT_ADDRESS,
      data,
      value: fee.toString(),
    },
  });
}