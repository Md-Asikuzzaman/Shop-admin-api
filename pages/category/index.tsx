import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { NextPage } from 'next';
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import {
  addCategory,
  deleteCategory,
  fetchCategories,
} from '@/redux/features/category/categorySlice';
import { FormikProps, useFormik } from 'formik';
import { categoryValidate } from '@/lib/categoryValidate';
import { toast } from 'react-toastify';
import Link from 'next/link';
interface Props {}

const Category: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const [click, setClick] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const category = useAppSelector((state) => state.category);

  // DELETE CATEGORY
  const handleDelete = (id: string): void => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteCategory(id));
      toast.warning('Category Deleted!!!');
    }
  };

  // form validation
  interface CategoryType {
    category: string;
    parent: string;
  }

  const formik: FormikProps<CategoryType> = useFormik<CategoryType>({
    initialValues: {
      category: click ? 'clicked' : '',
      parent: '',
    },

    validate: categoryValidate,
    onSubmit: async (values) => {
      const formData = {
        category: values.category,
        parent: values.parent,
      };

      try {
        const val = dispatch(addCategory(formData));
        if ((await val).meta.requestStatus == 'fulfilled') {
          formik.resetForm();

          toast.success('Category Created');
        } else {
          throw new Error('Category not created');
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  return (
    <Layout>
      <div className='bg-white rounded-lg shadow-md p-5 dark:bg-slate-800'>
        <h2
          onClick={() => setClick(true)}
          className='text-xl font-bold mb-2 dark:text-slate-300'
        >
          Add Category
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
            <AiOutlinePlus />
            Add Category
          </button>
        </form>
      </div>
      <table className='mt-5 w-full text-center bg-white rounded-lg shadow-md dark:bg-slate-800'>
        <thead className='h-14'>
          <tr className='border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'>
            <th>Category Name</th>
            <th>Parent Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.loading ? (
            <tr>
              <td className='py-6 text-violet-500' colSpan={5}>
                <b>Loading...</b>
              </td>
            </tr>
          ) : category.category.length > 0 ? (
            category.category.map((cat) => (
              <tr
                key={cat._id}
                className='h-12 border-b border-slate-200 dark:border-slate-700 dark:text-slate-300'
              >
                <td>{cat.category}</td>
                <td>
                  {category.category.map((p) =>
                    p._id === cat.parent ? p.category : ''
                  )}
                </td>
                <td className=' flex gap-2 items-center justify-center h-10'>
                  <Link href={`/category/edit/${cat._id}`}>
                    <AiFillEdit className='text-xl cursor-pointer text-slate-500' />
                  </Link>
                  <MdDelete
                    onClick={() => handleDelete(cat._id)}
                    className='text-xl cursor-pointer text-slate-500'
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='py-6 text-violet-500' colSpan={5}>
                <b>No Category Available</b>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Category;
