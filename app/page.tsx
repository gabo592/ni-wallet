import { Sidebar } from '@/components/home/sidebar';
import dynamic from 'next/dynamic';

const AvatarMenu = dynamic(() =>
  import('@/components/home/avatar-menu').then((mod) => mod.AvatarMenu),
);

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center p-4">
        <Sidebar />
        <h1 className="text-xl font-bold">Ni Wallet</h1>
        <AvatarMenu />
      </header>
      <main></main>
    </>
  );
}
