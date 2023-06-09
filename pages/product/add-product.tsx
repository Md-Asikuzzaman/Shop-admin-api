import { useEffect } from 'react';
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
import ReactImageFileToBase64 from 'react-file-image-to-base64';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { addProduct } from '@/redux/features/product/productSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { fetchCategories } from '@/redux/features/category/categorySlice';

interface Props {}

const AddProduct: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // FETCH CATEGORY
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const category = useAppSelector((state) => state.category);

  // FORM VALIDATION
  const [images, setImages] = useState<string>('');

  const handleOnCompleted = (files: any) => {
    setImages(files[0]?.base64_file);
  };

  interface ProductType {
    title: string;
    price: string;
    description: string;
    color: string;
    category: string;
  }

  const formik: FormikProps<ProductType> = useFormik<ProductType>({
    initialValues: {
      title: '',
      price: '',
      description: '',
      color: '',
      category: '',
    },
    validate: productValidate,
    onSubmit: async (values) => {
      const formData = {
        title: values.title,
        price: values.price,
        color: values.color,
        description: values.description,
        category: values.category,
        photo: images,
      };
      const val = dispatch(addProduct(formData));

      try {
        if ((await val).meta.requestStatus == 'fulfilled') {
          formik.resetForm();
          setImages('');
          toast.success('Product Created');
          setTimeout(() => {
            router.push('/product');
          }, 300);
        } else {
          throw new Error('product not created');
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  const removePhoto = () => {
    setImages('');
  };

  // CUSTOM FILE-BASE-64 UI
  const CustomizedButton = ({ triggerInput }: any) => {
    return (
      <div className='z-10' onClick={triggerInput}>
        <div className='bg-violet-100 flex flex-col items-center p-5 rounded-lg cursor-pointer border-2 border-dashed border-violet-400 dark:bg-slate-900'>
          <AiOutlineCloudUpload className='text-5xl text-violet-500' />
          <h4 className='mt-3 text-violet-500'>Upload Product Photo</h4>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
        <h2 className='text-xl font-bold mb-2 dark:text-slate-300'>
          Add Product
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='dark:text-slate-300' htmlFor='title'>
                Product Name:
              </label>
              <input
                className='dark:bg-slate-900 dark:text-white'
                type='text'
                id='title'
                placeholder='Product Name'
                {...formik.getFieldProps('title')}
              />
              <p className='text-sm text-rose-500 mt-1'>
                {formik.errors.title && formik.touched.title
                  ? formik.errors.title
                  : null}
              </p>
            </div>
            <div>
              <label className='dark:text-slate-300' htmlFor='price'>
                Price (in USD)
              </label>
              <input
                className='dark:bg-slate-900 dark:text-white'
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

          <div className='grid grid-cols-2 gap-5 mt-3'>
            <div>
              <label htmlFor='category'>Select a Category</label>
              <select id='category' {...formik.getFieldProps('category')}>
                <option value=''>No Selected Category</option>
                {category.loading
                  ? 'Loading'
                  : category.category.length > 0
                  ? category.category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category}
                      </option>
                    ))
                  : ''}
              </select>
            </div>
            <div>
              <label htmlFor='color'>Colors (_,_)</label>
              <input
                type='text'
                placeholder='Use coma for separated colors (red, green)'
                id='color'
                {...formik.getFieldProps('color')}
              />
            </div>
          </div>

          <div className='mt-3'>
            <label className='dark:text-slate-300' htmlFor='desc'>
              Description:
            </label>
            <textarea
              className='dark:bg-slate-900 dark:text-white'
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
              <ReactImageFileToBase64
                multiple={false}
                onCompleted={handleOnCompleted}
                CustomisedButton={CustomizedButton}
              />
            </div>

            <div className='flex flex-wrap gap-3'>
              {images?.length > 0 ? (
                <div className='relative'>
                  <AiOutlineCloseCircle
                    onClick={removePhoto}
                    className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer'
                  />

                  <img
                    className='h-32'
                    src={images ? `${images}` : ''}
                    alt='phot0'
                  />
                </div>
              ) : (
                <p className='dark:text-violet-200'>
                  No Photos in this product
                </p>
              )}
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

export default AddProduct;
