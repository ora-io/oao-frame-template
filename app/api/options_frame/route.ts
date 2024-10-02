import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL} from '../../config';
import { getExecutionFrameHtml } from '../../lib/getFrameHtml';
import { allowedOrigin } from '../../lib/origin';
import { kv } from "@vercel/kv";


export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Not a POST request', { status: 401 });
  }
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid || !allowedOrigin(message)) {
    return new NextResponse('Unauthorized', { status: 402 });
  }

  const bid = message?.button as number;

  let option = "";
  if (bid == 1) {
    option = "Option 1"
  } else if (bid == 2) {
    option = "Option 2"
  } else if (bid == 3) {
    option = "Option 3"
  } else if (bid == 4) {
    option = "Option 4"
  }

  const jsonData = {
    option: option
  }

  //store data to kv (redis) database for later use
  const fid = message?.interactor.fid || ""

  try {
    if(!fid){
      throw Error("Fid is undefined")
    }
    await kv.set(fid.toString(), JSON.stringify(jsonData));
  } catch (error) {
    console.log("Error while storing to kv")
    throw new Error("Error while storing to kv")
  }

  return new NextResponse(
    getExecutionFrameHtml({
      image: `${NEXT_PUBLIC_URL}/execution_frame.png`,
    }),
  );

}
