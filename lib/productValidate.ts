interface productType {
  product: string;
  price: string;
  description: string;
  photo: string;
}

export const productValidate = (values: any): productType => {
  const errors: any = {};

  if (!values.product) {
    errors.product = 'Product name is required';
  } else if (values.product.length > 20) {
    errors.product = 'Must be 20 characters or less';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length > 400) {
    errors.description = 'Must be 400 characters or less';
  }

  if (!values.photo) {
    errors.photo = 'Photo is required';
  }

  return errors;
};
