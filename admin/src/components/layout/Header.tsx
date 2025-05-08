import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Header() {
  const cookies = new Cookies();
  const location = useLocation();

  const logout = () => {
    cookies.remove('portal-user-token');
    cookies.remove('portal-user-data')
    window.location.replace('/admin/login')
  }

  return (
    <div className='header bg-white p-2.5 flex justify-between items-center shadow rounded-lg'>
      <div className='font-semibold text-2xl'>{location.pathname.split('/')[2] === undefined || location.pathname.split('/')[2] === '' ? 'Dashboard' : location.pathname.split('/')[2]}{location.pathname.split('/')[3] && `/${location.pathname.split('/')[3]}`}</div>
      <div className={"profile_dropdown-content rounded border"}>
        <button onClick={logout} className='w-full text-left px-3 py-2 hover:bg-gray-100 active:bg-gray-200'>Logout</button>
      </div>
    </div>
  );
}

export default Header;
