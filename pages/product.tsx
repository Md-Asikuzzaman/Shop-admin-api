import Layout from '@/components/layout/layout';
import { NextPage } from 'next';
import {
  AiOutlineCloudUpload,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useFormik, FormikProps } from 'formik';
import { useState } from 'react';
import { productValidate } from '@/lib/productValidate';

interface Props {}

const Product: NextPage<Props> = ({}) => {
  // Form validation
  interface SignUpType {
    product: string;
    price: string;
    description: string;
    photo: string;
  }

  const formik: FormikProps<SignUpType> = useFormik<SignUpType>({
    initialValues: {
      product: '',
      price: '',
      description: '',
      photo: '',
    },

    validate: productValidate,

    onSubmit: async (values) => {
      console.log('TCL: values', values);
      formik.resetForm();
    },
  });


  return (
    <Layout>
      <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
        <h2 className='text-xl font-bold mb-2 dark:text-slate-300'>
          Add Product
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label htmlFor='product'>Product Name:</label>
              <input
                type='text'
                id='product'
                placeholder='Product Name'
                {...formik.getFieldProps('product')}
              />
              <p className='text-sm text-rose-500 mt-1'>
                {formik.errors.product && formik.touched.product
                  ? formik.errors.product
                  : null}
              </p>
            </div>
            <div>
              <label htmlFor='price'>Price (in USD)</label>
              <input
                type='number'
                id='price'
                placeholder='Product Price'
                {...formik.getFieldProps('price')}
              />
              <p className='text-sm text-rose-500 mt-1'>
                {formik.errors?.price && formik.touched?.price
                  ? formik.errors?.price
                  : null}
              </p>
            </div>
          </div>

          <div className='mt-3'>
            <label htmlFor='desc'>Description:</label>
            <textarea
              id='desc'
              placeholder='Product Description'
              rows={5}
              {...formik.getFieldProps('description')}
            ></textarea>
            <p className='text-sm text-rose-500'>
              {formik.errors?.description && formik.touched?.description
                ? formik.errors?.description
                : null}
            </p>
          </div>

          <div className='mt-3 grid grid-cols-2 gap-5'>
            <div>
              <label htmlFor='photo'>
                <div className='bg-violet-100 flex flex-col items-center p-5 rounded-lg cursor-pointer border-2 border-dashed border-violet-400'>
                  <AiOutlineCloudUpload className='text-5xl text-violet-500' />
                  <h4 className='mt-3 text-violet-500'>Upload Product Photo</h4>
                </div>
                <input
                  className='hidden'
                  type='file'
                  id='photo'
                  {...formik.getFieldProps('photo')}
                />
              </label>
              <p className='text-sm text-rose-500 mt-1'>
                {formik.errors?.photo && formik.touched?.photo
                  ? formik.errors?.photo
                  : null}
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              {/* <p>No Photos in this product</p> */}
              <div className='relative'>
                <AiOutlineCloseCircle className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer' />

                <img className='h-32' src='/galaxy-s23.webp' alt='phot0' />
              </div>

              <div className='relative'>
                <AiOutlineCloseCircle className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer' />
                <img className='h-32' src='/galaxy-s23.webp' alt='phot0' />
              </div>

              <div className='relative'>
                <AiOutlineCloseCircle className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer' />
                <img className='h-32' src='/galaxy-s23.webp' alt='phot0' />
              </div>

              <div className='relative'>
                <AiOutlineCloseCircle className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer' />
                <img className='h-32' src='/galaxy-s23.webp' alt='phot0' />
              </div>
            </div>
          </div>

          <button className='bg-violet-500 text-white mt-4' type='submit'>
            <AiOutlinePlus />
            Add product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Product;