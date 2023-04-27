import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  message?: string;
  id?: any;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  // DELETE PRODUCT
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Product.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: 'Product deleted successfully', id });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }

  // UPDATE PRODUCT
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { formData: data } = req.body;

    try {
      const exist = await Product.findOne({ _id: id });
      if (exist) {
        await Product.findByIdAndUpdate({ _id: id }, data, { new: true });
      }

      res.status(200).json({ message: 'Product Updated!!!', id, data });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }
}
