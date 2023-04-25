import { useEffect } from 'react';
import Layout from '@/components/layout/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { AiFillCheckCircle, AiOutlinePlus } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchProducts } from '@/redux/features/product/productSlice';

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.product);
  console.log('TCL: products', data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Layout>
      <div>
        <Link
          href='/product/add-product'
          className='bg-violet-500 text-white custom-btn '
          type='submit'
        >
          <AiOutlinePlus />
          Add new product
        </Link>
        <div className='mt-7 mb-5'>
          <h2 className='text-2xl font-bold mb-4 dark:text-slate-400'>
            All Products
          </h2>
          <table className='w-full text-center bg-white rounded-lg shadow-md dark:bg-slate-800'>
            <thead className='h-14'>
              <tr className='border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.loading ? (
                <tr>
                  <td>1</td>
                </tr>
              ) : (
                data.products.map((product) => (
                  <tr
                    key={product._id}
                    className='h-12 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'
                  >
                    <td>{product.title}</td>
                    <td>{product.description.slice(0, 20)}...</td>
                    <td>${product.price}</td>
                    <td>
                      {product.photo.length > 10 ? (
                        <img
                          className='h-10 mx-auto'
                          src={`${product.photo}`}
                          alt='iphone'
                        />
                      ) : (
                        'no photo'
                      )}
                    </td>

                    <td className=' flex gap-2 items-center justify-center h-10'>
                      <MdDelete className='text-xl cursor-pointer text-slate-500' />
                      <AiFillCheckCircle className='text-xl cursor-pointer text-slate-500' />
                      <BsFillEyeFill className='text-xl cursor-pointer text-slate-500' />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
