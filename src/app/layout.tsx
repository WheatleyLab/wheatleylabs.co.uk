import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import DefaultLayout from '@/components/DefaultLayout';
import GTMScript from '@/components/GTMScript';
import PixiBackground from '@/components/PixiBackground';
import PixiControl from '@/components/PixiControl';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'WLBS',
  description: 'WLBS website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GTMScript />
        <PixiBackground />
        <PixiControl />
        <AppProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </AppProvider>
      </body>
    </html>
  );
}
