import axios from 'axios';
import React from 'react';
import './Blog.css';
import { instance } from '../../../api/config';

const Blog = () => {
  const Upload = (event:any) => {
    event.preventDefault(); // Chặn reload trang

    // Xử lý tải lên
    const formData = new FormData(event.target);
    const file = formData.get('image');

    // Gửi yêu cầu tải lên
    instance.post('/upload', { image: file })
      .then((response) => {
        // Xử lý phản hồi thành công
        console.log(response);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  };

  return (
    <div>
      Blog
      <form method="post" onSubmit={Upload}>
        <input type="file" name="image" id="" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Blog;
