import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  message?: string;
  category?: any[];
  newCategory?: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  // FETCH CATEGORY
  if (req.method === 'GET') {
    try {
      const category = await Category.find({});
      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  // CRETE CATEGORY
  if (req.method === 'POST') {
    const { category, parent } = req.body;
    try {
      const newCategory = await Category.create({ category, parent });
      res.status(201).json({ newCategory });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong!' });
    }
  }
}
