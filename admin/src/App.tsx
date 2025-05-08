import { useEffect } from 'react';
import Routes from './routes/Routes'
import { useUser } from './common/service/watchers/layout/user';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

function App() {
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    const user = cookies.get('portal-user-data')
    user && setUser(user);
  }, []);

  return (
    <Routes />
  )
}

export default App
