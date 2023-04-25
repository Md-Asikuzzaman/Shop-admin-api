import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineClose,
  AiFillMail,
  AiOutlinePlus,
  AiOutlineLogout,
} from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdReceiptLong, MdReport } from 'react-icons/md';
import { IoAnalytics, IoSettings } from 'react-icons/io5';
import { IoMdClipboard } from 'react-icons/io';
import { FcSalesPerformance } from 'react-icons/fc';

interface Props {}

const Sidebar: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <aside className='h-screen'>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
          <FcSalesPerformance className='text-4xl' />
          <h2 className='text-2xl font-bold dark:text-slate-400'>E-COM</h2>
        </div>
        <div className='close'>
          <AiOutlineClose className='text-xl hidden' />
        </div>
      </div>
      <div className='sidebar flex flex-col h-[80vh] bg-wahite mt-6 relative rounded-sm overflow-hidden'>
        <Link
          className={`flex items-center gap-4 text-md text-slate-500 h-12 ml-8 duration-300 dark:text-slate-400 ${
            router.asPath == '/'
              ? 'active'
              : 'hover:text-violet-500 hover:ml-12'
          }`}
          href='/'
        >
          <RiDashboardFill />
          <h3>Dashboard</h3>
        </Link>

        <Link
          className={`flex items-center gap-4 text-md text-slate-500 h-12 ml-8 duration-300 dark:text-slate-400 ${
            router.asPath == '/customer'
              ? 'active'
              : 'hover:text-violet-500 hover:ml-12'
          }`}
          href='/customer'
        >
          <BsFillPersonFill />
          <h3>Customers</h3>
        </Link>

        <Link
          className={`flex items-center gap-4 text-md text-slate-500 h-12 ml-8 duration-300 dark:text-slate-400 ${
            router.asPath == '/order'
              ? 'active'
              : 'hover:text-violet-500 hover:ml-12'
          }`}
          href='/order'
        >
          <MdReceiptLong />
          <h3>Orders</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8 hover:text-violet-500 hover:ml-12 duration-300 dark:text-slate-400'
          href='/'
        >
          <IoAnalytics />
          <h3>Analytics</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8 hover:text-violet-500 hover:ml-12 duration-300 dark:text-slate-400'
          href='/'
        >
          <AiFillMail />
          <h3>Message</h3>
          <div className='bg-violet-500 py-1 px-3 rounded-full text-white text-xs'>
            10
          </div>
        </Link>

        <Link
          className={`flex items-center gap-4 text-md text-slate-500 h-12 ml-8 duration-300 dark:text-slate-400 ${
            router.asPath == '/product' ||
            router.asPath == '/product/add-product'
              ? 'active'
              : 'hover:text-violet-500 hover:ml-12'
          }`}
          href='/product'
        >
          <IoMdClipboard />
          <h3>Products</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8 hover:text-violet-500 hover:ml-12 duration-300 dark:text-slate-400'
          href='/'
        >
          <MdReport />
          <h3>Reports</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8 hover:text-violet-500 hover:ml-12 duration-300 dark:text-slate-400'
          href='/'
        >
          <IoSettings />
          <h3>Settings</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8 hover:text-violet-500 hover:ml-12 duration-300 dark:text-slate-400'
          href='/'
        >
          <AiOutlinePlus />
          <h3>Add Product</h3>
        </Link>

        <Link
          className='flex items-center gap-4 text-md text-slate-500 h-12 ml-8  hover:text-violet-500 hover:ml-12 duration-300 absolute bottom-[2rem] dark:text-slate-400'
          href='/'
        >
          <AiOutlineLogout />
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
