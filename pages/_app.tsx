import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Poppins } from 'next/font/google';
import store from '@/redux/store';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </Provider>
  );
}
