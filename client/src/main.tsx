import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Never refetch data
    },
  },
});

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </BrowserRouter>
  </QueryClientProvider>
)
