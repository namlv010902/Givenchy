import React from 'react';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';

interface ProductFormData {
  productName: string;
  sizes: {
    size: string;
    price: number;
    inStock: number;
  }[];
}

const CreateProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      sizes: [{ size: '', price: 0, inStock: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes',
  });

  const onSubmit = (data: ProductFormData) => {
    console.log(data);
    // Gửi dữ liệu đi hoặc xử lý dữ liệu tại đây
  };

  return (
    <div style={{ padding: '50px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productName">Tên sản phẩm:</label>
          <input
            type="text"
            id="productName"
            {...register('productName', { required: true })}
          />
          {errors.productName && <span>Tên sản phẩm là bắt buộc</span>}
        </div>

        <div>
          <h3>Size và giá:</h3>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`sizes.${index}.size`, { required: true })}
                placeholder="Kích thước"
              />
              {errors.sizes && errors.sizes[index]?.size && (
                <span>Kích thước là bắt buộc</span>
              )}

              <input
                type="number"
                {...register(`sizes.${index}.price`, { required: true })}
                placeholder="Giá"
              />
              {errors.sizes && errors.sizes[index]?.price && (
                <span>Giá là bắt buộc</span>
              )}

              <input
                type="number"
                {...register(`sizes.${index}.inStock`, { required: true })}
                placeholder="Tồn kho"
              />
              {errors.sizes && errors.sizes[index]?.inStock && (
                <span>Tồn kho là bắt buộc</span>
              )}

              <button type="button" onClick={() => remove(index)}>
                Xóa
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ size: '', price: 0, inStock: 0 })}>
            Thêm kích thước
          </button>
        </div>

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default CreateProduct;