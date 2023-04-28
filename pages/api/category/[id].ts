import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  // DELETE PRODUCT
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Category.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: 'Category deleted successfully', id });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }
}
