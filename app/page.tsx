import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

export async function generateMetadata(): Promise<Metadata> {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Enter',
      },
    ],
    image: `${NEXT_PUBLIC_URL}/landing_frame.png`,
    post_url: `${NEXT_PUBLIC_URL}/api/start`,
  });

  return {
    title: 'OAO Frame Template',
    description: 'AI Powered Frames',
    openGraph: {
      title: 'OAO Frame Template',
      description: 'AI Powered Frames',
      images: [`${NEXT_PUBLIC_URL}/landing_frame.png`],
    },
    other: {
      ...frameMetadata,
      'fc:frame:image:aspect_ratio': '1:1',
    },
  };
}

export default function Home() {
  return (
    <div></div>
  );
}
