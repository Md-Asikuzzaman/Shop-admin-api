interface categoryType {
  category: string;
}

export const categoryValidate = (values: any): categoryType => {
  const errors: any = {};

  if (!values.category) {
    errors.category = 'Category is required';
  }

  return errors;
};
