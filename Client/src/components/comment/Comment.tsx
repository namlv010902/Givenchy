
import { Button, Form, Input } from 'antd';
import './comment.css'
import { createComment, getCommentProduct } from '../../service/comment.service';
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useStoreComment } from '../../store/hooks';
interface IProps {
  data: any,
  idProduct: string,

}
const ShowComment = (props: IProps) => {

  const {comments, dispatch} = useStoreComment()
  useEffect(()=>{
   const fetchComment=async()=>{
    const {data} = await getCommentProduct(props.idProduct)
    dispatch({
      type:'GET_COMMENTS',
      payload:data.comment
    })
   }
   fetchComment()
  },[])
  const onFinish = (values: any) => {
    const idUser = JSON.parse(localStorage.getItem('userId')!);
    if (!idUser) {
      return toast.error("Bạn chưa đăng nhập")
    }
    props.data["content"] = values.content
    createComment(props.data).then(() => {
      const updateComment=async()=>{
      const {data} = await getCommentProduct(props.idProduct)
        dispatch({
          type:'GET_COMMENTS',
          payload: data.comment
        })
      }
      updateComment()
    
    }
    )
  }

  return (
    <div>
      <div className="show-comment">
        {comments?.map((item: any) => {
          var checkTime = new Date(item.createdAt);
          var outTime = checkTime.toLocaleString();

          return (
            <div className='item-showComment' key={item._id}>
              <img src={item?.userId?.avatar} alt="Avatar" />
              <div className="comment-info">
                <h3 className="comment-name">{item?.userId?.name}</h3>
                <p className="comment-date">{outTime}</p>
                <p className="comment-content">{item?.content}</p>
              </div>
            </div>
          )
        })}

      </div>


      <div className="add-comment">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, display: "flex" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}

          autoComplete="off"
        >
          <Form.Item
            label="Content"
            name="content"

            rules={[{ required: true, message: 'Please input your content!' }]}
          >
            <Input id="inputComment" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}

export default ShowComment
