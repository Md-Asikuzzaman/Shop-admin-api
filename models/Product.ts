import { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ProductType {
  title: string;
  description: string;
  price: number;
  photo: string;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String },
});

const Product = models.Product || model<ProductType>('Product', productSchema);
export default Product;
