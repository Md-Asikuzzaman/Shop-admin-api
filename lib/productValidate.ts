interface productType {
  title: string;
  price: string;
  description: string;
}

export const productValidate = (values: any): productType => {
  const errors: any = {};

  if (!values.title) {
    errors.title = 'Product name is required';
  } else if (values.title.length < 3) {
    errors.title = 'At list 10 characters or more';
  } else if (values.title.length > 100) {
    errors.title = 'At most 100 characters or less';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 5) {
    errors.description = 'At list 50 characters or more';
  } else if (values.description.length > 400) {
    errors.description = 'At most 400 characters or less';
  }

  return errors;
};
