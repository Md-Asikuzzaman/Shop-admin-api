import { NextPage } from 'next';
import Sidebar from './sidebar';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

interface Props {}

const Layout: NextPage<Props> = ({ children }: any) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  const handleMode = () => {
    let htmlClasses = document.querySelector('html')?.classList;

    if (localStorage.theme === 'dark') {
      localStorage.removeItem('theme');
      htmlClasses?.remove('dark');
      localStorage.theme = 'light';
      setDark(false);
    } else {
      localStorage.theme = 'dark';
      htmlClasses?.add('dark');
      localStorage.theme = 'dark';
      setDark(true);
    }
  };

  return (
    <div className='w-[96%] mx-auto min-h-screen grid grid-col gap-10'>
      <Sidebar />
      <section>
        <div className='flex justify-between items-center py-3 mb-5'>
          <div className='flex items-center gap-5'>
            <AiFillDashboard className='text-4xl text-violet-500' />
            <h1 className='text-3xl font-bold dark:text-slate-400'>
              Dashboard
            </h1>
          </div>
          <div className='flex items-center gap-8'>
            <div
              onClick={handleMode}
              className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer shadow-md ${
                dark ? 'bg-slate-700' : 'bg-violet-500/25'
              }`}
            >
              {dark ? (
                <BsFillSunFill className='text-slate-300' />
              ) : (
                <BsFillMoonFill className='text-slate-800' />
              )}
            </div>
            <div>
              <div className='flex items-center gap-4'>
                <div>
                  <p className='text-black dark:text-slate-400'>
                    Hey, <b>Jhon Doe</b>
                  </p>
                  <p className='text-right text-sm text-slate-500'>Admin</p>
                </div>
                <img
                  className='h-10 w-10 rounded-lg shadow-md'
                  src='/user.jpg'
                  alt='user'
                />
              </div>
            </div>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
