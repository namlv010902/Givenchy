import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ISize } from "../../../types/size"
import { createBrand } from "../../../service/brand.service"

const CreateBrand = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISize>()
   const navigate = useNavigate()
    const onSubmit = (data: ISize) => {
        console.log(data);
        createBrand(data).then(({ data }) => {
            alert(data.message)
            navigate("/admin/brands")
        })
            .catch(({ response }) => {
                alert(response.data.message)
            })

    }
    return (
        <div style={{ padding: "50px" }}>
            <h3>CreateBrand</h3>
            <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
                <div>
                    <label htmlFor="productName">Brand name:</label> <br />
                    <input
                        type="text"
                        id="input-groupAdd"
                        {...register('name', { required: true })}
                    />
                    <p id="err"> {errors.name && <span>This is required</span>}</p>
                </div>
                <button type="submit" id="btn-create">Create brand</button>
            </form>
        </div>
    )
}

export default CreateBrand