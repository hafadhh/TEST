import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios";
import { toast } from "sonner";
import NavbarDefault from "../../components/NavbarDef";
import axios from "axios";

const ProductList = () => {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      type: "",
    },
  });

  const token = localStorage.getItem("authToken");
  const fetchToDoItems = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token:", token);
      setTodoList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError("Error fetching products, please try again later.");
      toast.error("Error fetching products, please try again later.");
    } 
  };

  const addOrUpdateTodo = async (data) => {
    try {
      const realData = { ...data, price: Number(data.price) }; // Pastikan price menjadi number

      if (editingIndex !== null) {
        const updatedItem = await axiosInstance.put(
          `/api/v1/products/${todoList[editingIndex].id}`,
          realData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedList = [...todoList];
        updatedList[editingIndex] = updatedItem.data;
        setTodoList(updatedList);
        toast.success("Product updated successfully!");
      } else {
        const newItem = await axiosInstance.post("/api/v1/products", realData);
        setTodoList((prevList) => [...prevList, newItem.data]);
        toast.success("Product added successfully!");
      }
      reset();
      setEditingIndex(null);
    } catch (error) {
      toast.error("Error saving product, please try again.");
    }
  };

  const deleteBang = async (index) => {
    try {
      const productId = todoList[index].id;
      await axiosInstance.delete(`/api/v1/products/${productId}`);
      const updatedList = [...todoList];
      updatedList.splice(index, 1);
      setTodoList(updatedList);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product, please try again.");
    }
  };

  const editBang = (item, index) => {
    reset(item);
    setEditingIndex(index);
  };

  useEffect(() => {
    // const storedToken = localStorage.getItem("authToken");
    // setToken(storedToken);
    // console.log("Retrieved token:", storedToken);
    fetchToDoItems();
  }, []);

   // Login things nih
   const navigate = useNavigate();
   useEffect(() => {
     const token = localStorage.getItem("authToken");
     if (!token) {
       navigate("/login"); // Redirect ke login jika token tidak ada
     }
   }, [navigate]);
 

  return (
    <>
      <NavbarDefault />
      <div className="h-screen bg-sky-700">
        <form
          onSubmit={form.handleSubmit(addOrUpdateTodo)}
          className="w-auto items-center pt-10 flex flex-col gap-4"
        >
          <div className="flex flex-row gap-4 w-2/3">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Name"
                  size="md"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Price"
                  type="number"
                  size="md"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Type"
                  size="md"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div>
            <Button className="w-36 items-center" type="submit" color="primary">
              {editingIndex !== null ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center mt-8">
          <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Price</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Type</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(todoList) && todoList.length > 0 ? (
                todoList.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                  >
                    <td className="border border-gray-300 px-6 py-3">{item.name}</td>
                    <td className="border border-gray-300 px-6 py-3">{item.price}</td>
                    <td className="border border-gray-300 px-6 py-3">{item.type}</td>
                    <td className="border border-gray-300 px-6 py-3">
                      <button 
                        onClick={() => editBang(item, index)} 
                        className="text-blue-600 hover:text-blue-800 hover:underline mr-3">
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteBang(index)} 
                        className="text-red-600 hover:text-red-800 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border border-gray-300 px-6 py-3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;








// import React, { useEffect, useState } from "react";
// import { Button, Input, } from "@nextui-org/react";
// import { Controller, useForm } from "react-hook-form";
// import axiosInstance from "../../lib/axios";
// import { toast } from "sonner";
// import NavbarDefault from "../../components/NavbarDef";
// import axios from "axios";



  
// const token = localStorage.getItem('authToken');
// const fetchToDoItems = async () => {
    
//   try {
//       const url = `/api/v1/products`;
//       const response = await axiosInstance.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setTodoList(response.data.data);
//       console.log("Todo List:", response.data.data)
//       // console.log(response.data);
//     } catch (error) {
//       toast.error("Error fetching products, please try again later.");
//     }
//   };

//   const ProductList = () => {
//     const [todoList, setTodoList] = useState([]);
//     const [editingIndex, setEditingIndex] = useState(null);
  
//     const { control, handleSubmit, reset } = useForm({
//       defaultValues: {
//         name: "",
//         price: 0,
//         type: "",
//       },
//     });

//   const addOrUpdateTodo = async (data) => {
//     try {
//       const realData = { ...data, price: Number(data.price) }; 
  
//       if (editingIndex !== null) {        
//         const productId = todoList[editingIndex].id;
//         console.log("Product ID being updated:", productId);
//         const updatedItem = await axiosInstance.put(`/api/v1/products/${productId}`, 
//         realData, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         const updatedList = [...todoList];
//         updatedList[editingIndex] = updatedItem.data;
//         setTodoList(updatedList);
//         toast.success("Product updated successfully!");
//       } else {

//         console.log("Adding new product with data:", realData);
//         const newItem = await axiosInstance.post(`api/v1/products`,
//           realData, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         setTodoList((prevList) => [...prevList, newItem.data]);
//         toast.success("Product added successfully!");
//       }
//       reset();
//       setEditingIndex(null);
//     } catch (error) {
//       console.error("Error saving product:", error);
//       toast.error("Error saving product, please try again.");
//     }
//   };
  

//   const deleteBang = async (index) => {
//     try {
//       const productId = todoList[index].id;
//       await axiosInstance.delete(`api/v1/products/${productId}`);
//       const updatedList = [...todoList];
//       updatedList.splice(index, 1);
//       setTodoList(updatedList);
//       console.log(productId)
//       console.log(updatedList)
//       toast.success("Product deleted successfully!");
//     } catch (error) {
//       toast.error("Error deleting product, please try again.");
//     }
//   };


//   const editBang = (item, index) => {
//     reset(item);
//     setEditingIndex(index);
//   };

//   useEffect(() => {
//     fetchToDoItems();
//   }, []);

//   console.log("Todo List Length:", todoList.length)

//   return (
//     <>
//       <NavbarDefault />
//       <div className="h-screen bg-slate-800">
//         <form
//           onSubmit={handleSubmit(addOrUpdateTodo)}
//           className="w-auto items-center pt-10 flex flex-col gap-4"
//         >
//           <div className="flex flex-row gap-4 w-2/3">
//             <Controller
//               name="name"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Name"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />

//             <Controller
//               name="price"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Price"
//                   type="number"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />

//             <Controller
//               name="type"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Type"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />
//           </div>

//           <div>
//             <Button className="w-36 items-center" type="submit" color="primary">
//               {editingIndex !== null ? "Update Product" : "Add Product"}
//             </Button>
//           </div>
//         </form>


//              {/* jan lupa, ini yang styling liat gugel, bgian tr nya aj */}
//         <div className="flex justify-center mt-8">
//   <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
//     <thead>
//       <tr className="bg-gray-100">
//         <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
//         <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Price</th>
//         <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Type</th>
//         <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
//       </tr>
//     </thead>
//     <tbody>
//         {Array.isArray(todoList) && todoList.length > 0 ? (
//           todoList.map((item, index) => {
//             // console.log("Rendering item:", item); // Log setiap item yang dirender
//             return (
//               <tr 
//                 key={item.id} 
//                 className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
//               >
//                 <td className="border border-gray-300 px-6 py-3">{item.name}</td>
//                 <td className="border border-gray-300 px-6 py-3">{item.price}</td>
//                 <td className="border border-gray-300 px-6 py-3">{item.type}</td>
//                 <td className="border border-gray-300 px-6 py-3">
//                   <button 
//                     onClick={() => editBang(item, index)} 
//                     className="text-blue-600 hover:text-blue-800 hover:underline mr-3">
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => deleteBang(item, index)} 
//                     className="text-red-600 hover:text-red-800 hover:underline">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             );
//           })
//         ) : (
//           <tr>
//             <td colSpan="4" className="text-center">No products found.</td>
//           </tr>
//         )}
//       </tbody>
//   </table>
// </div>
//         {/* <ul className="font-semibold text-lg p-3.5 text-cyan-50">
//           {todoList.map((item, index) => (
//             <li key={index}>
//               {item.name} - {item.price} - {item.type}
//               <Button 
//                 size="sm" 
//                 onClick={() => editBang(item, index)}>
//                 Edit
//               </Button>
//               <Button
//                 size="sm"
//                 color="error"
//                 onClick={() => deleteBang(index)}
//               >
//                 Delete
//               </Button>
//             </li>
//           ))}
//         </ul> */}
//       </div>
//     </>
//   );
// };

// export default ProductList;




















// import React, { useEffect, useState } from "react";
// import { Button, Input } from "@nextui-org/react";
// import { Controller, useForm } from "react-hook-form";
// import axiosInstance from "../../lib/axios";
// import { toast } from "sonner";
// import NavbarDefault from "../../components/NavbarDef";
// import axios from "axios";

// const ProductList = () => {
//   const [todoList, setTodoList] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       price: 0,
//       type: "",
//     },
//   });

//   // console.log("Data from API:", response.data);
//   // console.log("Data set to todoList:", todoList);
//   // const token = localStorage.getItem("token"); 

//   const fetchToDoItems = async () => {
//     try {
//       const token = localStorage.getItem('authToken')
//       const url = "/api/v1/products";
//       const response = await axiosInstance.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // console.log("Token from localStorage:", token);
//       // console.log('Status Code:', response.status); 
//       setTodoList(response.data);
//       // console.log('Response Data:', response.data);

//     } catch (error) {
//       toast.error("Error fetching products, please try again later.");
//     }
//   };

//   const addOrUpdateTodo = async (data) => {
//     try {
//       const realData = { ...data, price: Number(data.price) }; // Pastikan price menjadi number

//       if (editingIndex !== null) {
//         // Update existing product
//         const updatedItem = await axiosInstance.put(
//           `/api/v1/products/${todoList[editingIndex].id}`, // Pastikan menambahkan id
//           realData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
        
//         const updatedList = [...todoList];
//         updatedList[editingIndex] = updatedItem.data;
//         setTodoList(updatedList);
//         toast.success("Product updated successfully!");
//       } else {
//         const newItem = await axiosInstance.post("/api/v1/products", realData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTodoList((prevList) => [...prevList, newItem.data]);
//         toast.success("Product added successfully!");
//       }
//       reset();
//       setEditingIndex(null);
//     } catch (error) {
//       toast.error("Error saving product, please try again.");
//     }
//   };

//   const deleteBang = async (index) => {
//     try {
//       const productId = todoList[index].id;
//       await axiosInstance.delete(`/api/v1/products/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const updatedList = [...todoList];
//       updatedList.splice(index, 1);
//       setTodoList(updatedList);
//       toast.success("Product deleted successfully!");
//     } catch (error) {
//       toast.error("Error deleting product, please try again.");
//     }
//   };

//   const editBang = (item, index) => {
//     reset(item);
//     setEditingIndex(index);
//   };

//   useEffect(() => {
//     fetchToDoItems();
//   }, []);



//   return (
//     <>
//       <NavbarDefault />
//       <div className="h-screen bg-slate-800">
//         <form
//           onSubmit={form.handleSubmit(addOrUpdateTodo)}
//           className="w-auto items-center pt-10 flex flex-col gap-4"
//         >
//           <div className="flex flex-row gap-4 w-2/3">
//             <Controller
//               name="name"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Name"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />

//             <Controller
//               name="price"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Price"
//                   type="number"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />

//             <Controller
//               name="type"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Type"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />
//           </div>

//           <div>
//             <Button className="w-36 items-center" type="submit" color="primary">
//               {editingIndex !== null ? "Update Product" : "Add Product"}
//             </Button>
//           </div>
//         </form>

//         {/* Tabel Produk */}
//         <div className="flex justify-center mt-8">
//           <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Price</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Type</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todoList.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
//                 >
//                   <td className="border border-gray-300 px-6 py-3">{item.name}</td>
//                   <td className="border border-gray-300 px-6 py-3">{item.price}</td>
//                   <td className="border border-gray-300 px-6 py-3">{item.type}</td>
//                   <td className="border border-gray-300 px-6 py-3">
//                     <button
//                       onClick={() => editBang(item, index)}
//                       className="text-blue-600 hover:text-blue-800 hover:underline mr-3"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteBang(index)}
//                       className="text-red-600 hover:text-red-800 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

      
//     </>
//   );
// };

// export default ProductList;

