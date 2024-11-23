// import React, { useEffect, useState } from "react";
// import { Button } from "@nextui-org/react";
// import axiosInstance from "../../lib/axios"; // Pastikan path axios benar
// import { toast } from "sonner";
// import NavbarDefault from "../../components/NavbarDef";

// const TransactionPage = () => {
//   const [todoList, setTodoList] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);


//   // const fetchTransactionItems = async () => {
//   //   try {
//   //     const response = await axiosInstance.get("/api/v1/transactions");
//   //     if (response.data && response.data.data) {
//   //       setTodoList(response.data.data); 
//   //     }
//   //   } catch (error) {
//   //     toast.error("data errrorr diambil");
//   //   }
//   // };

//   const token = localStorage.getItem('authToken');
//   const fetchTransactionItems = async () => {
    
//     try {
//       const url = "/api/v1/bills";
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

//   useEffect(() => {
//     fetchTransactionItems();
//   }, []);


//   const checkDetails = (item) => {
//     setSelectedItem(item);
//   };

//   return (
//     <>
//       <NavbarDefault />
//       <div className="h-screen bg-slate-800 p-6">
//         {/* Tabel Customer */}
//         <div className="flex justify-center mt-8">
//           <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">No.</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Customer Name</th>
//                 <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todoList.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
//                 >
//                   <td className="border border-gray-300 px-6 py-3">{index + 1}</td>
//                   <td className="border border-gray-300 px-6 py-3">{item.customer.name}</td> 
//                   <td className="border border-gray-300 px-6 py-3">
//                     <Button
//                       onClick={() => checkDetails(item)}
//                       className="text-blue-600 hover:text-blue-800 hover:underline"
//                     >
//                       Check Details
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>


//         {selectedItem && (
//           <div className="mt-6 p-6 bg-gray-100 shadow-lg rounded-lg">
//             <h3 className="text-xl font-semibold">Transaction Details</h3>
//             <ul className="list-disc pl-6 mt-3">
//               <li><strong>Customer Name:</strong> {selectedItem.customer.name}</li>
//               <li><strong>Phone Number:</strong> {selectedItem.customer.phoneNumber}</li>
//               <li><strong>Address:</strong> {selectedItem.customer.address}</li>
//               <li><strong>Transaction Date:</strong> {new Date(selectedItem.billDate).toLocaleString()}</li>
//               <li><strong>Bill Details:</strong></li>
//               <ul className="list-inside">
//                 {selectedItem.billDetails.map((detail, idx) => (
//                   <li key={detail.id}>
//                     <strong>{detail.product.name}</strong> ({detail.qty} {detail.product.type}) - Price: {detail.price * detail.qty}
//                   </li>
//                 ))}
//               </ul>
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TransactionPage;







import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosInstance from "../../lib/axios"; // Pastikan path axios benar
import { toast } from "sonner";
import NavbarDefault from "../../components/NavbarDef";

const TransactionPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    billDetails: [{ productName: "", qty: 1, price: 0 }],
  });

  const token = localStorage.getItem("authToken");

  const fetchTransactionItems = async () => {
    try {
      const url = "/api/v1/bills";
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoList(response.data.data);
    } catch (error) {
      toast.error("Error fetching products, please try again later.");
    }
  };

  const handleAddTransaction = async () => {
    try {
      const url = "/api/v1/bills";
      const response = await axiosInstance.post(
        url,
        {
          customer: {
            name: newTransaction.customerName,
            phoneNumber: newTransaction.phoneNumber,
            address: newTransaction.address,
          },
          billDetails: newTransaction.billDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Transaction added successfully!");
      setTodoList([...todoList, response.data.data]); // Tambahkan transaksi baru ke daftar
      setNewTransaction({
        customerName: "",
        phoneNumber: "",
        address: "",
        billDetails: [{ productName: "", qty: 1, price: 0 }],
      });
    } catch (error) {
      toast.error("Failed to add transaction, please try again later.");
    }
  };

  const handleBillDetailChange = (index, field, value) => {
    const updatedBillDetails = [...newTransaction.billDetails];
    updatedBillDetails[index][field] = value;
    setNewTransaction({ ...newTransaction, billDetails: updatedBillDetails });
  };

  useEffect(() => {
    fetchTransactionItems();
  }, []);

  const checkDetails = (item) => {
    setSelectedItem(item);
  };

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
      <div className="bg bg-sky-700 h-screen">
      <div className=" p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
            <div className="mb-4">
              <Input
                fullWidth
                clearable
                label="Customer Name"
                value={newTransaction.customerName}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, customerName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                fullWidth
                clearable
                label="Phone Number"
                value={newTransaction.phoneNumber}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                fullWidth
                clearable
                label="Address"
                value={newTransaction.address}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <h4>Bill Details</h4>
              {newTransaction.billDetails.map((detail, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <Input
                    placeholder="Product Name"
                    value={detail.productName}
                    onChange={(e) =>
                      handleBillDetailChange(index, "productName", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={detail.qty}
                    onChange={(e) =>
                      handleBillDetailChange(index, "qty", parseInt(e.target.value, 10))
                    }
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={detail.price}
                    onChange={(e) =>
                      handleBillDetailChange(index, "price", parseFloat(e.target.value))
                    }
                  />
                </div>
              ))}
              <Button
                onClick={() =>
                  setNewTransaction({
                    ...newTransaction,
                    billDetails: [...newTransaction.billDetails, { productName: "", qty: 1, price: 0 }],
                  })
                }
              >
                Add More Product
              </Button>
            </div>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <table className="table-auto border-collapse border border-gray-300 text-left w-3/4 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">No.</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Customer Name</th>
                <th className="border border-gray-300 px-6 py-3 text-gray-700 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border border-gray-300 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 px-6 py-3">{index + 1}</td>
                  <td className="border border-gray-300 px-6 py-3">{item.customer.name}</td>
                  <td className="border border-gray-300 px-6 py-3">
                    <Button
                      onClick={() => checkDetails(item)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Check Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <div className="mt-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Transaction Details</h3>
            <ul className="list-disc pl-6 mt-3">
              <li>
                <strong>Customer Name:</strong> {selectedItem.customer.name}
              </li>
              <li>
                <strong>Phone Number:</strong> {selectedItem.customer.phoneNumber}
              </li>
              <li>
                <strong>Address:</strong> {selectedItem.customer.address}
              </li>
              <li>
                <strong>Transaction Date:</strong>{" "}
                {new Date(selectedItem.billDate).toLocaleString()}
              </li>
              <li>
                <strong>Bill Details:</strong>
              </li>
              <ul className="list-inside">
                {selectedItem.billDetails.map((detail, idx) => (
                  <li key={detail.id}>
                    <strong>{detail.product.name}</strong> ({detail.qty}{" "}
                    {detail.product.type}) - Price: {detail.price * detail.qty}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default TransactionPage;
