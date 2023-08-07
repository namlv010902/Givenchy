import React, { useState } from 'react';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [sizes, setSizes] = useState([{ size: '', price: '' }]);

  const handleInputChange = (index:number, event:any) => {
    console.log(index, event);
    const { name, value } = event.target;
    console.log(name,"value: ", value);
    let list = [...sizes];
    list[index] = {...list[index], [name]: value};
    console.log(list);
    
    setSizes(list);
  };

  const handleAddNewSize = () => {
    setSizes([...sizes, { size: '', price: '' }]);
  };

  const handleRemoveSize = (index) => {
    const list = [...sizes];
    list.splice(index, 1);
    setSizes(list);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data={
      productName,
      sizes
    }
    console.log(data);
    
    // Gửi dữ liệu đi hoặc xử lý dữ liệu tại đây
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Tên sản phẩm:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
      </div>

      <div>
        <h3>Size và giá:</h3>
        {sizes.map((size, index) => (
          <div key={index}>
            <input
              type="text"
              name="size"
              placeholder="Kích thước"
               value={size.size}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="price"
              placeholder="Giá"
               value={size.price}
              onChange={(event) => handleInputChange(index, event)}
            />
            <button type="button" onClick={() => handleRemoveSize(index)}>
              Xóa
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddNewSize}>
          Thêm kích thước
        </button>
      </div>

      <button type="submit">Thêm sản phẩm</button>
    </form>
  );
};

export default CreateProduct;
