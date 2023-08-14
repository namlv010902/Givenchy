import { useState } from 'react';
import { IProduct } from '../../common/products';
import { searchProduct } from '../../service/products.service';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
const Search = () => {
    const [products, setProducts] = useState<IProduct[]>()
    const handleSearch = (value: any) => {
        console.log(value);
        searchProduct(value).then(({ data }) => {
            setProducts(data.product.docs)
        })
    }
    const showSearch = (
        <div className='show-search'>
            {products?.map(item => {
                return (
                    <div key={item._id} >
                        <Link className="item-cart" to={`/product/${item._id}`}>
                            <div className="image-cart">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="product-in-search">
                                <p id='search-name'>{item.name}</p>
                                <strong id='price'>${item.sizes[0].price} </strong>
                            </div>
                        </Link>
                    </div>
                )
            })}
            {products?.length == 0 && <p>Ko tìm thấy</p>}
        </div>
    )
    return (
        <form action="#" id="formSearch" >
            <Popover title={showSearch}> <input onChange={e => handleSearch(e.target.value)} id="inputSearch" type="text" name="" placeholder="Search..." /></Popover>
            <button className='btn-search'><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
    )
}

export default Search