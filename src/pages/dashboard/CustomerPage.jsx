
// // INI YANG BARU
// import React, { useEffect, useState } from "react";
// import { Button, Input } from "@nextui-org/react";
// import { Controller, useForm } from "react-hook-form";
// import axiosInstance from "../../lib/axios";
// import { toast } from "sonner";
// import NavbarDefault from "../../components/NavbarDef";

// const Customer = () => {
//   const [todoList, setTodoList] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const { control, handleSubmit, reset } = useForm({
//     defaultValues: {
//       name: "",
//       phoneNumber: "",
//       address: "",
//     },
//   });

//   const token = localStorage.getItem('authToken');
//   const fetchToDoItems = async () => {
//     try {
//       const url = "/api/v1/customers";
//       const response = await axiosInstance.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setTodoList(response.data.data);
//       console.log("Todo List:", response.data.data);
//     } catch (error) {
//       toast.error("Error fetching products, please try again later.");
//     }
//   };

//   const addOrUpdateTodo = async (data) => {
//     try {
//       console.log("Data yang akan dikirim:", data);
  
//       if (editingIndex !== null) {
//         // Mengupdate customer yang ada
//         const updatedItem = await axiosInstance.put(
//           `/api/v1/customers`,  // endpoint ini tanpa ID di URL
//           { 
//             id: todoList[editingIndex].id,
//             name: data.name,
//             phoneNumber: data.phoneNumber,
//             address: data.address
//         },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         // Update data yang ditampilkan setelah berhasil mengubah customer
//         const updatedList = [...todoList];
//         updatedList[editingIndex] = updatedItem.data;
//         setTodoList(updatedList);
//         toast.success("Customers updated successfully!");
//       } else {
//         // Saat menambah customer baru
//         const newCustomer = await axiosInstance.post(
//           "/api/v1/customers",
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         setTodoList((prevList) => [...prevList, newCustomer.data]);
//         toast.success("Customer added successfully!");
//       }
//       // reset();
//       setEditingIndex(null);
//     } catch (error) {
//       console.error("Error details:", error.response ? error.response.data : error.message);
//       toast.error("Error saving data, please try again.");
//     }
//   };

//   const deleteBang = async (index) => {
//     try {
//       const productId = todoList[index].id;
//       await axiosInstance.delete(`/api/v1/customers/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updatedList = [...todoList];
//       updatedList.splice(index, 1);
//       setTodoList(updatedList);
//       toast.success("Product deleted successfully!");
//     } catch (error) {
//       toast.error("Error deleting Data, please try again.");
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
//               name="phoneNumber"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Phone Number"
//                   size="md"
//                   isInvalid={Boolean(fieldState.error)}
//                   errorMessage={fieldState.error?.message}
//                 />
//               )}
//             />

//             <Controller
//               name="address"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <Input
//                   {...field}
//                   label="Address"
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

//         <div className="flex justify-center mt-8">
//           <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Phone Number</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Address</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(todoList) && todoList.length > 0 ? (
//                 todoList.map((item, index) => (
//                   <tr 
//                     key={item.id} 
//                     className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
//                   >
//                     <td className="border border-gray-300 px-6 py-3">{item.name}</td>
//                     <td className="border border-gray-300 px-6 py-3">{item.phoneNumber}</td>
//                     <td className="border border-gray-300 px-6 py-3">{item.address}</td>
//                     <td className="border border-gray-300 px-6 py-3">
//                       <button 
//                         onClick={() => editBang(item, index)} 
//                         className="text-blue-600 hover:text-blue-800 hover:underline mr-3">
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => deleteBang(index)} 
//                         className="text-red-600 hover:text-red-800 hover:underline">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center border border-gray-300 px-6 py-3">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Customer;






















// // import React, { useEffect, useState } from "react";
// // import { Button, Input } from "@nextui-org/react";
// // import { Controller, useForm } from "react-hook-form";
// // import axiosInstance from "../../lib/axios"; // Pastikan axiosInstance sudah dikonfigurasi
// // import { toast } from "sonner";
// // import NavbarDefault from "../../components/NavbarDef";

// // const Customer = () => {
// //   const [todoList, setTodoList] = useState([]);
// //   const [editingIndex, setEditingIndex] = useState(null);

// //   const { control, handleSubmit, reset } = useForm({
// //     defaultValues: {
// //       name: "",
// //       phoneNumber: "",
// //       address: "",
// //     },
// //   });

// //   const token = localStorage.getItem('authToken');

// //   const fetchToDoItems = async () => {
// //     try {
// //       const url = "/api/v1/customers";
// //       const response = await axiosInstance.get(url, {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       });
// //       setTodoList(response.data.data);
// //       console.log("Todo List:", response.data.data);
// //     } catch (error) {
// //       toast.error("Error fetching products, please try again later.");
// //     }
// //   };

// //   const addOrUpdateTodo = async (data) => {
// //     try {
// //       console.log("Data yang akan dikirim:", data);
  
// //       if (editingIndex !== null) {
// //         // Mengupdate customer yang ada
// //         const updatedItem = await axiosInstance.put(
// //           `/api/v1/customers/${todoList[editingIndex].id}`, // endpoint dengan ID
// //           { 
// //             name: data.name,
// //             phoneNumber: data.phoneNumber,
// //             address: data.address
// //           },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`
// //             }
// //           }
// //         );

// //         // Update data yang ditampilkan setelah berhasil mengubah customer
// //         const updatedList = [...todoList];
// //         updatedList[editingIndex] = updatedItem.data;
// //         setTodoList(updatedList);
// //         toast.success("Customer updated successfully!");
// //       } else {
// //         // Saat menambah customer baru
// //         const newCustomer = await axiosInstance.post(
// //           "/api/v1/customers",
// //           data,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`
// //             }
// //           }
// //         );
// //         setTodoList((prevList) => [...prevList, newCustomer.data]);
// //         toast.success("Customer added successfully!");
// //       }
// //       reset();
// //       setEditingIndex(null);
// //     } catch (error) {
// //       console.error("Error details:", error.response ? error.response.data : error.message);
// //       toast.error("Error saving data, please try again.");
// //     }
// //   };

// //   const deleteBang = async (index) => {
// //     try {
// //       const productId = todoList[index].id;
// //       await axiosInstance.delete(`/api/v1/customers/${productId}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       });
// //       const updatedList = [...todoList];
// //       updatedList.splice(index, 1);
// //       setTodoList(updatedList);
// //       toast.success("Customer deleted successfully!");
// //     } catch (error) {
// //       toast.error("Error deleting data, please try again.");
// //     }
// //   };

// //   const editBang = (item, index) => {
// //     reset(item);
// //     setEditingIndex(index);
// //   };

// //   useEffect(() => {
// //     fetchToDoItems();
// //   }, []);

// //   return (
// //     <>
// //       <NavbarDefault />
// //       <div className="h-screen bg-slate-800">
// //         <form
// //           onSubmit={handleSubmit(addOrUpdateTodo)}
// //           className="w-auto items-center pt-10 flex flex-col gap-4"
// //         >
// //           <div className="flex flex-row gap-4 w-2/3">
// //             <Controller
// //               name="name"
// //               control={control}
// //               render={({ field, fieldState }) => (
// //                 <Input
// //                   {...field}
// //                   label="Name"
// //                   size="md"
// //                   isInvalid={Boolean(fieldState.error)}
// //                   errorMessage={fieldState.error?.message}
// //                 />
// //               )}
// //             />

// //             <Controller
// //               name="phoneNumber"
// //               control={control}
// //               render={({ field, fieldState }) => (
// //                 <Input
// //                   {...field}
// //                   label="Phone Number"
// //                   size="md"
// //                   isInvalid={Boolean(fieldState.error)}
// //                   errorMessage={fieldState.error?.message}
// //                 />
// //               )}
// //             />

// //             <Controller
// //               name="address"
// //               control={control}
// //               render={({ field, fieldState }) => (
// //                 <Input
// //                   {...field}
// //                   label=" Address"
// //                   size="md"
// //                   isInvalid={Boolean(fieldState.error)}
// //                   errorMessage={fieldState.error?.message}
// //                 />
// //               )}
// //             />
// //           </div>

// //           <div>
// //             <Button className="w-36 items-center" type="submit" color="primary">
// //               {editingIndex !== null ? "Update Customer" : "Add Customer"}
// //             </Button>
// //           </div>
// //         </form>

// //         <div className="flex justify-center mt-8">
// //           <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
// //                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Phone Number</th>
// //                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Address</th>
// //                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {Array.isArray(todoList) && todoList.length > 0 ? (
// //                 todoList.map((item, index) => (
// //                   <tr 
// //                     key={item.id} 
// //                     className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
// //                   >
// //                     <td className="border border-gray-300 px-6 py-3">{item.name}</td>
// //                     <td className="border border-gray-300 px-6 py-3">{item.phoneNumber}</td>
// //                     <td className="border border-gray-300 px-6 py-3">{item.address}</td>
// //                     <td className="border border-gray-300 px-6 py-3">
// //                       <button 
// //                         onClick={() => editBang(item, index)} 
// //                         className="text-blue-600 hover:text-blue-800 hover:underline mr-3">
// //                         Edit
// //                       </button>
// //                       <button 
// //                         onClick={() => deleteBang(index)} 
// //                         className="text-red-600 hover:text-red-800 hover:underline">
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="4" className="text-center border border-gray-300 px-6 py-3">No data available</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Customer;






import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios";
import { toast } from "sonner";
import NavbarDefault from "../../components/NavbarDef";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  const token = localStorage.getItem('authToken');

  // Fetch customers from API
  const fetchToDoItems = async () => {
    try {
      const response = await axiosInstance.get("/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodoList(response.data.data);
      console.log("Todo List:", response.data.data);
    } catch (error) {
      toast.error("Error fetching customers, please try again later.");
    }
  };

  // Handle adding or updating customer
  const addOrUpdateTodo = async (data) => {
    try {
      console.log("Data yang akan dikirim:", data);

      if (editingIndex !== null) {
        // Update existing customer
        const updatedItem = await axiosInstance.put(
          "/customers", // Use ID in URL for PUT
          {
            name: data.name,
            phoneNumber: data.phoneNumber,
            address: data.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the customer list after successful update
        const updatedList = [...todoList];
        updatedList[editingIndex] = updatedItem.data;
        setTodoList(updatedList);
        toast.success("Customer updated successfully!");
      } else {
        // Add new customer
        const newCustomer = await axiosInstance.post(
          "/customers",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTodoList((prevList) => [...prevList, newCustomer.data]);
        toast.success("Customer added successfully!");
      }

      reset();
      setEditingIndex(null);
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      toast.error("Error saving data, please try again.");
    }
  };

  // Handle delete customer
  const deleteBang = async (index) => {
    try {
      const productId = todoList[index].id;
      await axiosInstance.delete(`/customers/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedList = [...todoList];
      updatedList.splice(index, 1);
      setTodoList(updatedList);
      toast.success("Customer deleted successfully!");
    } catch (error) {
      toast.error("Error deleting customer, please try again.");
    }
  };

  // Set fields for editing
  const editBang = (item, index) => {
    reset(item);
    setEditingIndex(index);
  };

  useEffect(() => {
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
          onSubmit={handleSubmit(addOrUpdateTodo)}
          className="w-auto items-center pt-10 flex flex-col gap-4"
        >
          <div className="flex flex-row gap-4 w-2/3">
            <Controller
              name="name"
              control={control}
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
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  size="md"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Address"
                  size="md"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div>
            <Button className="w-36 items-center" type="submit" color="primary">
              {editingIndex !== null ? "Update Customer" : "Add Customer"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center mt-8">
          <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Name</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Phone Number</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Address</th>
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
                    <td className="border border-gray-300 px-6 py-3">{item.phoneNumber}</td>
                    <td className="border border-gray-300 px-6 py-3">{item.address}</td>
                    <td className="border border-gray-300 px-6 py-3">
                      <button
                        onClick={() => editBang(item, index)}
                        className="text-blue-600 hover:text-blue-800 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBang(index)}
                        className="text-red-600 hover:text-red-800 hover:underline"
                      >
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

export default Customer;
