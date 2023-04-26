import { useEffect } from 'react';
import Layout from '@/components/layout/layout';
import { NextPage } from 'next';
import {
  AiOutlineCloudUpload,
  AiOutlineCloseCircle,
  AiOutlinePlus,
  AiOutlineEdit,
} from 'react-icons/ai';
import { useFormik, FormikProps } from 'formik';
import { useState } from 'react';
import { productValidate } from '@/lib/productValidate';
import ReactImageFileToBase64 from 'react-file-image-to-base64';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  fetchProducts,
  addProduct,
  updateProduct,
} from '@/redux/features/product/productSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Props {}

const EditProduct: NextPage<Props> = ({}) => {
  const [images, setImages] = useState<string>('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { editId } = router.query;

  // use selector
  const products = useAppSelector((state) => state.product);

  const product = products.products.find((pro) =>
    pro._id == editId ? pro : null
  );

  // fetch data
  useEffect(() => {
    dispatch(fetchProducts());

    setImages(product?.photo ? product.photo : '');
  }, [dispatch]);

  const handleOnCompleted = (files: any) => {
    setImages(files[0]?.base64_file);
  };

  // form validation start
  interface SignUpType {
    title: string;
    price: number;
    description: string;
  }

  const formik: FormikProps<SignUpType> = useFormik<SignUpType>({
    initialValues: {
      title: product?.title ? product.title : '',
      price: product?.price ? product.price : 0,
      description: product?.description ? product.description : '',
    },

    validate: productValidate,

    onSubmit: async (values) => {
      const formData = {
        title: values.title,
        price: values.price,
        description: values.description,
        photo: images,
        id: editId,
      };

      try {
        const val = dispatch(updateProduct({ formData }));

        if ((await val).meta.requestStatus == 'fulfilled') {
          formik.resetForm();
          setImages('');
          toast.success('Product Updated');
          setTimeout(() => {
            router.push('/product');
          }, 300);
        } else {
          console.log('product not updated');
        }

        console.log(formData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const removePhoto = () => {
    setImages('');
  };
  // form validation end

  // custom file-base-64 design
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
          Update Product
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
              {images?.length > 0 || product?.photo ? (
                <div className='relative'>
                  {images ? (
                    <>
                      <AiOutlineCloseCircle
                        onClick={removePhoto}
                        className='absolute top-2 right-2 z-10 text-slate-100 text-2xl hover:text-red-400 cursor-pointer'
                      />
                      <img
                        className='h-32'
                        src={images ? `${images}` : product?.photo}
                        alt='phot0'
                      />
                    </>
                  ) : (
                    <p className='dark:text-violet-200'>
                      No Photos in this product
                    </p>
                  )}
                </div>
              ) : (
                <p className='dark:text-violet-200'>
                  No Photos in this product
                </p>
              )}
            </div>
          </div>

          <button className='bg-violet-500 text-white mt-4' type='submit'>
            <AiOutlineEdit />
            Update product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProduct;
