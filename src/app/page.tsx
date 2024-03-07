import { Figtree } from 'next/font/google';
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('./components/date'), { ssr: false })

const inter = Figtree({ weight: '400', subsets: ['latin'] });
export default function Home() {

  return (
    <main className={`min-h-screen px-8 py-8 text-center ${inter.className}`}>
      <h1 className='text-2xl mb-4 font-bold'>Pill Tracker</h1>
      <NoSSR/>
    </main>
  );
}
