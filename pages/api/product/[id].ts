import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Product.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: 'Product deleted successfully', id });
    } catch (error) {
      res.status(500).json('Something wrong!');
    }
  }
}
