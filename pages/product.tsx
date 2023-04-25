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
import {
  fetchProducts,
  addProduct,
} from '@/redux/features/product/productSlice';

interface Props {}

const Product: NextPage<Props> = ({}) => {
  // fetch data
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useAppSelector((state) => state.product);
  console.log('TCL: data', products);

  // form validation start
  const [images, setImages] = useState<string[]>([]);

  const handleOnCompleted = (files: any) => {
    setImages(files[0]?.base64_file);
  };

  interface SignUpType {
    title: string;
    price: string;
    description: string;
  }

  const formik: FormikProps<SignUpType> = useFormik<SignUpType>({
    initialValues: {
      title: '',
      price: '',
      description: '',
    },

    validate: productValidate,

    onSubmit: async (values) => {
      const formData = {
        title: values.title,
        price: values.price,
        description: values.description,
        photo: images,
      };

      try {
        dispatch(addProduct(formData));
        formik.resetForm();
        setImages([]);
        alert('product created successfully!');
      } catch (error) {
        console.log(error);
      }
    },
  });

  const removePhoto = () => {
    setImages([]);
  };
  // form validation end

  // custom file-base-64 design
  const CustomisedButton = ({ triggerInput }: any) => {
    return (
      <div onClick={triggerInput}>
        <div className='bg-violet-100 flex flex-col items-center p-5 rounded-lg cursor-pointer border-2 border-dashed border-violet-400'>
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
              <label htmlFor='title'>Product Name:</label>
              <input
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
              <ReactImageFileToBase64
                multiple={false}
                onCompleted={handleOnCompleted}
                CustomisedButton={CustomisedButton}
              />
            </div>

            <div className='flex flex-wrap gap-3'>
              {images.length > 0 ? (
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
                <p>No Photos in this product</p>
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

export default Product;
