import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  message?: string;
  products?: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  // FETCH PRODUCTS
  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  // ADD PRODUCT
  if (req.method === 'POST') {
    const data = req.body;
    try {
      await Product.create(data);
      res.status(201).json({ message: 'Product created successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }
}
