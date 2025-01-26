import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
//import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cloudImageUrl = await uploadFileHandler();
      const productData = new FormData();
      productData.append("image", cloudImageUrl);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  // const uploadFileHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[0]);

  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     toast.success(res.message);
  //     setImageUrl(res.imageUrl);
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // };

  const imagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader
      reader.onload = (e) => {
        setImage(e.target.result);
        setImageUrl(e.target.result);
        // Set the image data (base64 string)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return res.imageUrl;
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  const inputClass =
    "mt-2 p-2 py-2 bg-transparent rounded-sm w-full border-[2px] border-gray-500";
  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row w-fit mx-auto'>
        {/* <AdminMenu /> */}
        <div className=''>
          <div className=' mb-4 font-bold font-sans text-lg md:text-xl border-b-4 border-orange-400'>
            Create Product
          </div>

          {imageUrl && (
            <div className='text-center'>
              <img
                src={imageUrl}
                alt='product'
                className='block mx-auto max-h-[200px]'
              />
            </div>
          )}

          <div className='mb-3'>
            <label className='border-dotted border-2 border-gray-400  block w-full text-center rounded-lg cursor-pointer font-bold py-6'>
              {image ? image.name : "Upload Image"}

              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={imagePreviewHandler}
                className={
                  !image ? "hidden" : "text-white border-[3px] border-gray-400"
                }
              />
            </label>
          </div>

          <div className='py-3'>
            <div className='flex flex-wrap sm:flex-nowrap'>
              <div className='one'>
                <label htmlFor='name' className='font-semibold'>
                  Name
                </label>{" "}
                <br />
                <input
                  type='text'
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='two ml-10 '>
                <label htmlFor='name block'>Price</label> <br />
                <input
                  type='number'
                  className={inputClass}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='one'>
                <label htmlFor='name block'>Quantity</label> <br />
                <input
                  type='number'
                  className={inputClass}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className='two ml-10 '>
                <label htmlFor='name block'>Brand</label> <br />
                <input
                  type='text'
                  className={inputClass}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className='w-full'>
              <label htmlFor='' className='my-5'>
                Description
              </label>
              <textarea
                type='text'
                rows={4}
                className=' bg-transparent rounded-md w-full border-[3px] border-gray-400'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='flex justify-between '>
              <div className='w-[45%] mt-4 sm:mt-6'>
                <label htmlFor='name block' className='text-md sm:text-lg'>
                  Count In Stock
                </label>{" "}
                <br />
                <input
                  type='text'
                  className={inputClass}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className=' w-[45%] mt-4 sm:mt-6'>
                <label htmlFor='category' className='text-md sm:text-lg'>
                  Category
                </label>{" "}
                <br />
                <select
                  placeholder='Choose Category'
                  id='category'
                  className={inputClass}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className='py-2 md:py-4 w-full mt-5 rounded-lg text-lg font-bold bg-orange-600'
            >
              ADD PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
