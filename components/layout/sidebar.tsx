import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineClose,
  AiFillMail,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdReceiptLong, MdReport } from 'react-icons/md';
import { IoAnalytics, IoSettings } from 'react-icons/io5';
import { IoMdClipboard } from 'react-icons/io';
import { FcSalesPerformance } from 'react-icons/fc';

interface Props {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: NextPage<Props> = ({ menu, setMenu }) => {
  const router = useRouter();

  const handleClose = () => {
    setMenu(false);
  };

  return (
    <aside
      className={`h-screen fixed lg:bg-transparent bg-slate-100 dark:bg-slate-800 top-0 left-0 w-[300px] lg:relative dark:lg:bg-transparent lg:w-auto -translate-x-full transition ${
        menu ? 'translate-x-0' : ''
      } lg:-translate-x-0`}
    >
      <div className='flex items-center justify-between mt-5 px-3 lg:px-0'>
        <div className='flex items-center gap-5'>
          <FcSalesPerformance className='text-4xl' />
          <h2 className='text-2xl font-bold dark:text-slate-400'>E-COM</h2>
        </div>
        <div className='close lg:hidden'>
          <AiOutlineClose
            onClick={handleClose}
            className='text-xl cursor-pointer dark:text-slate-300'
          />
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
          href='/category'
        >
          <AiOutlineUnorderedList />
          <h3>Category</h3>
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
