import { Container } from '@/components/common/container';
import { Sidebar } from '@/components/home/sidebar';
import dynamic from 'next/dynamic';

const AvatarMenu = dynamic(() =>
  import('@/components/home/avatar-menu').then((mod) => mod.AvatarMenu)
);

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Sidebar />
        <h1 className="text-xl font-bold">NicAhorro</h1>
        <AvatarMenu />
      </header>
      <Container>
        <h2>Home</h2>
      </Container>
    </>
  );
}
