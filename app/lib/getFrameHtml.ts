import { FrameMetadataType, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { CHAIN_ID, EXPLORERS, NEXT_PUBLIC_URL } from '../config';

export function getFrameHtml(frameMetadata: FrameMetadataType) {
  const html = getFrameHtmlResponse(frameMetadata);

  const extraTags = [
    '<meta property="og:title" content="OAO: Farcaster">',
    '<meta property="og:description" content="Farcaster Protocol OAO">',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
  ];
  
  return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getOptionsFrameHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);
  
    const extraTags = [
      '<meta property="fc:frame" content="vNext" />',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Option 1" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/options_frame" />`,
      '<meta property="fc:frame:button:2" content="Option 2" />',
      `<meta property="fc:frame:button:2:target" content="${NEXT_PUBLIC_URL}/api/options_frame" />`,
      '<meta property="fc:frame:button:3" content="Option 3" />',
      `<meta property="fc:frame:button:3:target" content="${NEXT_PUBLIC_URL}/api/options_frame" />`,
      '<meta property="fc:frame:button:4" content="Option 4" />',
      `<meta property="fc:frame:button:4:target" content="${NEXT_PUBLIC_URL}/api/options_frame" />`,
    ];
  
    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getExecutionFrameHtml(frameMetadata: FrameMetadataType) {
  const html = getFrameHtmlResponse(frameMetadata);

  const extraTags = [
    '<meta property="fc:frame" content="vNext" />',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
    '<meta property="fc:frame:button:1" content="Execute Transaction" />',
    '<meta property="fc:frame:button:1:action" content="tx" />',
    `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/execution_frame" />`,
    `<meta property="fc:frame:button:1:post_url" content="${NEXT_PUBLIC_URL}/api/confirm_frame" />`,
  ];
  
  return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getResultPendingFrameHtml(txhash: string){
  const html = getFrameHtmlResponse({
    image: `${NEXT_PUBLIC_URL}/generating.png`,
  });

  const extraTags = [
    '<meta property="og:title" content="OAO: Farcaster">',
    '<meta property="og:description" content="Farcaster Protocol OAO">',
    '<meta property="og:image" content="https://oao-frame.vercel.app/api/images/start">',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
    '<meta property="fc:frame:button:1" content="Refresh" />',
    '<meta property="fc:frame:button:1:action" />',
    `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/result?id=${txhash}"/>`,
    '<meta property="fc:frame:button:2" content="View on Etherscan" />',
    '<meta property="fc:frame:button:2:action" content="link" />',
    `<meta property="fc:frame:button:2:target" content="${EXPLORERS[CHAIN_ID]}/tx/${txhash}"/>`,
  ];
  // hack: remove close tags, add aspect ratio and required OG tags
  const ret = `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;

  return ret
}