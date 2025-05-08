import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page404() {
  const router = useRouter();

  useEffect(() => {
    // Добавляем задержку перед перенаправлением
    const timeoutId = setTimeout(() => {
      router.push('/');
    }, 3000); // Перенаправление через 3 секунды

    return () => clearTimeout(timeoutId); // Очищаем таймер при демонтировании компонента
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the homepage in 3 seconds...</p>

    </div>
  );
}

export default Page404;
