import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@/routes/AppRoutes';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const { bootstrap } = useAuth();

  // Silently exchange the httpOnly refresh cookie for an access token on
  // first load, so refreshing the page doesn't force a re-login.
  useEffect(() => {
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', fontSize: '14px' },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
