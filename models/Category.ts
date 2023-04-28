import mongoose, { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface CategoryType {
  category: string;
  parent: string;
}

// 2. Create a Schema corresponding to the document interface.
const CategorySchema = new Schema<CategoryType>(
  {
    category: { type: String, required: true },
    parent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category =
  models.Category || model<CategoryType>('Category', CategorySchema);
export default Category;
