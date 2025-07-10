import { UserProfile } from '@/widgets/user-profile/ui/user-profile';
import { AppHeader } from '@/widgets/app-header/ui/app-header';
import { BreadcrumbNav } from '@/widgets/breadcrumb-nav/ui/breadcrumb-nav';
import { Container } from '@/widgets/container/ui/container';

export default function ProfilePage() {
  return (
    <section className="w-full">
      <AppHeader title="Mi Perfil" />
      <Container>
        <section className="w-full pl-4 pr-4">
          <BreadcrumbNav
            routes={[
              {
                label: 'Inicio',
                href: '/',
              },
              {
                label: 'Mi Perfil',
                href: '/profile',
              },
            ]}
          />
        </section>
        <UserProfile />
      </Container>
    </section>
  );
}
