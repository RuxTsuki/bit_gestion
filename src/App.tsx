import { AuthProvider } from '@/contexts/auth/provider';
import { GlobalSnackbarProvider } from '@/contexts/snackbar';
import { Home } from './pages/home/Home';
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <GlobalSnackbarProvider>
          <Home />
        </GlobalSnackbarProvider>
      </AuthProvider>
    </>
  )
}

export default App
