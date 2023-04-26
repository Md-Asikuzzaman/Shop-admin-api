import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json('Something went wrong!');
    }
  }

  if (req.method === 'POST') {
    const data = req.body;
    try {
      await Product.create(data);
      res.status(201).json({ message: 'Product created successfully!' });
    } catch (error) {
      res.status(500).json('Something wrong!');
    }
  }
}
