import { Outlet } from 'react-router-dom';
import { Spinner } from '@/components';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ModalManager } from '../ModalManager';
import { useGetUserQuery } from '@/hooks/auth';

export function Layout() {
  const { isLoading } = useGetUserQuery();
  return (
    <>
      <Header />
      {isLoading ? <Spinner /> : null}
      <Outlet />
      <ModalManager />
      <Footer />
    </>
  );
}
