import { AuthProvider } from '@/contexts/auth/provider';
import { GlobalSnackbarProvider } from '@/contexts/snackbar';
import { AppRouter } from './router/AppRouter';
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <GlobalSnackbarProvider>
          <AppRouter />
        </GlobalSnackbarProvider>
      </AuthProvider>
    </>
  )
}

export default App
