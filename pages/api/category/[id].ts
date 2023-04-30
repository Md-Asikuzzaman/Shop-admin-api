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

  // UPDATE CATEGORY
  if (req.method === 'PUT') {
    const { id } = req.query;
    const formData = req.body;

    try {
      const exist = await Category.findOne({ _id: id });
      if (exist) {
        const data = await Category.findByIdAndUpdate({ _id: id }, formData, {
          new: true,
        });
        res.status(200).json({ message: 'Product Updated!!!', id, data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }
}
