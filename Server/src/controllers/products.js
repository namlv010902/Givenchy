import Products from "../models/products"
import Categories from "../models/categories"
import unidecode from "unidecode"
import Brand from "../models/brands";
import Size from "../models/size";


export const getAllProduct = async (req, res) => {
  const { _page = 1, _order = "asc", _limit = 12, _sort = "createdAt", _q = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: { path: 'categoryId' }
  };
  const searchText = _q ? unidecode(_q) : ''; // Chuyển đổi chuỗi tìm kiếm thành không dấu

  try {
    let product;
    if (searchText) {
      product = await Products.paginate(
        { name: { $regex: searchText, $options: 'i' } },
        options
      );
    } else {
      product = await Products.paginate({}, options);
      // product = await Products.find( ).populate("categoryId");


    }

    return res.status(201).json({
      message: "Get all product successfully",
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body)

    await Categories.findByIdAndUpdate(product.categoryId, {
      $push: { productId: product._id }
    })

    await Brand.findByIdAndUpdate(product.brandId, {
      $push: { productId: product._id }
    })
    for (let item of product.sizes) {
      console.log(item.sizeId);
      await Size.findByIdAndUpdate(item.sizeId, {
        $push: { productId: product._id }
      })
    }




    return res.status(201).json({
      message: "Create product successfully",
      product
    })

  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}


export const updateProduct = async (req, res) => {
  try {

    const { categoryId, brandId } = req.body;
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);

    // Update new category
    await Categories.findByIdAndUpdate(product.categoryId, {
      $pull: {
        productId: product._id,
      },
    });
    await Categories.findByIdAndUpdate(categoryId, {

      $addToSet: {
        productId: product._id,
      },
    });
    await Brand.findByIdAndUpdate(product.brandId, {
      $pull: {
        productId: product._id,
      },
    });
    await Brand.findByIdAndUpdate(brandId, {

      $addToSet: {
        productId: product._id,
      },
    });

    return res.status(201).json({
      message: "Update product successfully",
      product
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate("categoryId")

    await product.populate("categoryId.productId")
    await product.populate("brandId")
    await product.populate("sizes.sizeId")
    for (let item of product.sizes) {
      console.log(item.sizeId);
    }
    const limitedProducts = product.categoryId.productId.slice(0, 6);
    const productIndexOf = limitedProducts.find(item => item._id == req.params.id)
    console.log(productIndexOf);
    const productIndex = limitedProducts.indexOf(productIndexOf)
    limitedProducts.splice(productIndex, 1)
    return res.status(201).json({
      message: "Get product successfully",
      product,
      relatedProducts: limitedProducts
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}
export const removeProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id)
    return res.status(201).json({
      message: "Remove product successfully",

    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}
export const filterPrice = async (req, res) => {
  const { _page = 1, _order = "asc", _limit = 8, _sort = "createAt", _q = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };

  try {

    const product = await Products.paginate({}, options);
    const { minPrice, maxPrice } = req.body
    console.log(minPrice, maxPrice);
    const filteredProducts = product.docs.filter(item => item.sizes.find(size => size.price >= minPrice && size.price <= maxPrice));

    return res.status(201).json({
      message: "Get all product successfully",
      filteredProducts
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}
export const productsByGender = async (req, res) => {
  const { _page = 1, _limit = 12 } = req.query
  const options = {
    page: _page,
    limit: _limit,
  }
  try {
    const products = await Products.paginate({ gender: req.params.gender }, options)
    return res.status(201).json({
      message: "Successfully retrieve products by gender",
      products
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

