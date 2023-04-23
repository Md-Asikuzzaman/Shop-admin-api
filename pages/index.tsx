import Layout from '@/components/layout/layout';
import { NextPage } from 'next';
import { MdAnalytics, MdDelete } from 'react-icons/md';
import { SiGoogleanalytics } from 'react-icons/si';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <Layout>
      <div className='grid grid-cols-3 gap-5'>
        <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
          <div className='flex items-center gap-10'>
            <div className='h-16 w-16 bg-violet-500 rounded-full flex items-center justify-center shrink-0'>
              <MdAnalytics className='text-4xl text-white' />
            </div>
            <div>
              <h3 className='text-lg font-bold dark:text-slate-300'>
                Total Sales
              </h3>
              <h1 className='text-2xl font-bold mt-2 dark:text-slate-300'>
                $20,500
              </h1>
            </div>
          </div>
          <p className='text-slate-500 mt-10 dark:dark:text-slate-400'>
            Last 24 Hours
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
          <div className='flex items-center gap-10'>
            <div className='h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center shrink-0'>
              <SiGoogleanalytics className='text-4xl text-white' />
            </div>
            <div>
              <h3 className='text-lg font-bold dark:text-slate-300'>
                Total Expenses
              </h3>
              <h1 className='text-2xl font-bold mt-2 dark:text-slate-300'>
                $15,300
              </h1>
            </div>
          </div>
          <p className='text-slate-500 mt-10 dark:dark:text-slate-400'>
            Last 24 Hours
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
          <div className='flex items-center gap-10'>
            <div className='h-16 w-16 bg-teal-500 rounded-full flex items-center justify-center shrink-0'>
              <IoAnalyticsSharp className='text-4xl text-white' />
            </div>
            <div>
              <h3 className='text-lg font-bold dark:text-slate-300'>
                Total Income
              </h3>
              <h1 className='text-2xl font-bold mt-2 dark:text-slate-300'>
                $10,500
              </h1>
            </div>
          </div>
          <p className='text-slate-500 mt-10 dark:dark:text-slate-400'>
            Last 24 Hours
          </p>
        </div>
      </div>
      <div className='mt-7 mb-5'>
        <h2 className='text-2xl font-bold mb-4 dark:text-slate-400'>
          Recent Orders
        </h2>
        <table className='w-full text-center bg-white rounded-lg shadow-md dark:bg-slate-800'>
          <thead className='h-14'>
            <tr className='border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Photo</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-12 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>iPhone 14 Pro</td>
              <td>$1,200</td>
              <td>1</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/iphone-14-pro.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='delivered'>Delivered</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Macbook Air</td>
              <td>$12,000</td>
              <td>3</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/macbook-air-13.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='pending'>Pending</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
            <tr className='h-11 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
              <td>Samsung S3</td>
              <td>$78,000</td>
              <td>4</td>
              <td>
                <img
                  className='h-10 mx-auto'
                  src='/galaxy-s23.webp'
                  alt='iphone'
                />
              </td>
              <td>
                <span className='declined'>Declined</span>
              </td>
              <td className=' flex gap-2 items-center justify-center h-10'>
                <MdDelete className='text-xl cursor-pointer text-slate-500' />
                <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Home;
