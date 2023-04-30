import { useEffect } from 'react';
import Layout from '@/components/layout/layout';
import { categoryValidate } from '@/lib/categoryValidate';
import {
  fetchCategories,
  updateCategory,
} from '@/redux/features/category/categorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { FormikProps, useFormik } from 'formik';
import { NextPage } from 'next';
import { AiOutlineEdit } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Props {}

const EditCategory: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { editId } = router.query;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const category = useAppSelector((state) => state.category);
  const productById = category.category.find((category) =>
    category._id == editId ? category : null
  );

  // form validation
  interface CategoryType {
    category: string;
    parent: string;
  }

  const formik: FormikProps<CategoryType> = useFormik<CategoryType>({
    initialValues: {
      category: productById ? productById.category : '',
      parent: productById ? productById.parent : '',
    },

    validate: categoryValidate,
    onSubmit: async (values) => {
      const formData = {
        category: values.category,
        parent: values.parent,
        id: editId,
      };

      try {
        const val = dispatch(updateCategory(formData));
        if ((await val).meta.requestStatus == 'fulfilled') {
          formik.resetForm();
          toast.success('Category Updated');
          setTimeout(() => {
            router.push('/category');
          }, 300);
        } else {
          throw new Error('Category not updated');
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });
  return (
    <Layout>
      <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
        <h2 className='text-xl font-bold mb-2 dark:text-slate-300'>
          Update Category
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='dark:text-slate-300' htmlFor='title'>
                Category Name:
              </label>
              <input
                className='dark:bg-slate-900 dark:text-white'
                type='text'
                id='title'
                placeholder='Category Name'
                {...formik.getFieldProps('category')}
              />
              <p className='text-sm text-rose-500 mt-1'>
                {formik.errors?.category && formik.touched?.category
                  ? formik.errors?.category
                  : null}
              </p>
            </div>
            <div>
              <label className='dark:text-slate-300' htmlFor='price'>
                Parent Category:
              </label>

              <select
                className='dark:bg-slate-900 dark:text-white'
                {...formik.getFieldProps('parent')}
              >
                <option value=''>No Parent Category</option>

                {category.category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className='bg-violet-500 text-white mt-4' type='submit'>
            <AiOutlineEdit />
            Update Category
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditCategory;
