import { Header } from './Header';
import { Footer } from './Footer';
import { BaseProps } from '../../types';

export function Layout({ children }: BaseProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}