import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, RPC_URL } from '../../config';
import { getFrameHtml } from '../../lib/getFrameHtml';
import {Web3} from 'web3';

const web3 = new Web3(RPC_URL);

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const url = await req.url;
  const idstring = url.split('=')[1];
  const txhash = idstring as string;

  const receipt = await web3.eth.getTransactionReceipt(txhash);
  console.log(receipt)
    
  return new NextResponse(
    getFrameHtml({
      image: `${NEXT_PUBLIC_URL}/result_frame.png`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
