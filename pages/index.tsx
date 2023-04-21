import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { NextPage } from 'next';
import { fetchUsers } from '@/redux/features/user/userSlice';

interface Props {}

const Home: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h1 className='text-3xl font-semibold bg-gray-200 py-3 text-center'>
        List of Users
      </h1>

      <div className='p-5'>
        <div className='grid md:grid-cols-3 gap-5'>
          {data.loading || data.error ? (
            <h1 className='text-2xl py-4'>Users Loading...</h1>
          ) : (
            data.users.map((user) => (
              <div key={user.id} className='bg-gray-300 p-4 rounded-md'>
                <h5 className='text-xl'>user ID: {user.id}</h5>
                <h5 className='text-xl'>User name: {user.name}</h5>
                <h5 className='text-xl'>Email Address: {user.email}</h5>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
