import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteUser, getUsers, updateRole } from "../../../service/users.service"
import { IUser } from "../../../types/user"
import { Tag } from "antd"

const ListUsers = () => {
    const [user, setUser] = useState<IUser[]>()
    useEffect(() => {
        getUsers().then(({ data }) => {
            setUser(data.users)
        })
    }, [])
    console.log(user);
    const handleUpdateRole = (id: string, role: string) => {
        console.log(role);
        updateRole(id, { role }).then(({ data }) => {
            getUsers().then(({ data }) => {
                setUser(data.users)
            })
            alert(data.message)
        })
            .catch(({ response }) => {
                alert(response.data.message)
            })
    }
    const handleRemove = (id: string) => {
        if (window.confirm('Are you sure you want to remove')) {
            deleteUser(id).then(() => {
                getUsers().then(({ data }) => {
                    setUser(data.users)
                })
            })
        }
    }
    return (
        <div style={{ padding: "  50px" }} >
            <table id="table-order" style={{ width: "1150px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Order count</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.map((item: IUser, index: number) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.orderId.length}</td>
                            <td><select name="" id="" onChange={(e) => handleUpdateRole(item._id, e.target.value)}>
                                <option value="" hidden>{item.role}</option>
                                <option value="admin" >Admin</option>
                                <option value="manager" >Manager</option>
                                <option value="member" >Member</option>
                            </select></td>
                            <td>
                                {item.role !== "admin" && <Tag onClick={() => handleRemove(item._id)} color="red">Delete</Tag>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListUsers