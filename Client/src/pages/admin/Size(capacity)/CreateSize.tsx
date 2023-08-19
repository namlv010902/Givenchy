import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { createSize } from "../../../service/size.service"
import { ISize } from "../../../types/size"

const CreateSize = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISize>()
   const navigate = useNavigate()
    const onSubmit = (data: ISize) => {
        console.log(data);
        createSize(data).then(({ data }) => {
            alert(data.message)
            navigate("/admin/sizes")
        })
            .catch(({ response }) => {
                alert(response.data.message)
            })

    }
    return (
        <div style={{ padding: "50px" }}>
            <h3>CreateSize</h3>
            <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
                <div>
                    <label htmlFor="productName">Size name:</label> <br />
                    <input
                        type="text"
                        id="input-groupAdd"
                        {...register('name', { required: true })}
                    />
                    <p id="err"> {errors.name && <span>This is required</span>}</p>
                </div>
                <button type="submit" id="btn-create">Create size</button>
            </form>
        </div>
    )
}

export default CreateSize