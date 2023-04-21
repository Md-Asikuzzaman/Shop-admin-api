import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
  age: number;
  isMale: boolean;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    name: 'asik',
    age: 23,
    isMale: false,
    email: 'asik@gmail.com',
  };

  res.status(200).json(data);
}
