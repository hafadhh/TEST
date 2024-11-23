import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react"
import React from "react";
import '../index.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller,useForm } from "react-hook-form";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";
import NavbarComponent from "../components/NavbarHome";
import { useNavigate } from "react-router-dom";


const LoginEmp = () => {
  
  const signUpFormSchema = z.object({
    // name: z.string().min(1, "Name is required"),
    // email: z.string().email("Format email tidak sesuai"),
    username: z.string().min(5, "Password harus 5 karakter atau lebih"),
    password: z.string().min(8, "Password harus 8 karakter atau lebih"),
    // role: z.enum(["admin", "employee"], "Role must be 'admin' or 'employee'"),
  })

  const form = useForm({
    defaultValues: {
    //   name: "",
    //   email: "",
      username:"",
      password:"",
    //   role: "",
    },
    resolver: zodResolver(signUpFormSchema),
  })

    // Login things nih
  // const registerUserTest = async (data) => {
  //   try {
  //     const response = await axiosInstance.post("/api/v1/auth/login", data);
  //     const token = response.data.data.token;
  //     localStorage.setItem("authToken", token);
  //     toast.success("Login Success");
  //     console.log(token)

  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error("Login failed");
  //   }
  // };
  const navigate = useNavigate();

  const registerUserTest = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log("Response data:", response.data);

      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token;
        localStorage.setItem("authToken", token);
        console.log("Token successfully saved in localStorage:", localStorage.getItem("authToken"));

        toast.success("Login Success");
        navigate("/dashboard"); // Navigasi setelah login berhasil
      } else {
        console.error("Token not found in response.");
        toast.error("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Error during login:", error.response || error);
      toast.error("Login failed");
    }
  };
  
  // const registerUserTest = async (data) => {
  //   try {
  //     // const endpoint = data.role === 'admin' ? 'admin-login' : 'employee-login';
  //     console.log(data); 
  //     alert(`Submit complete, Username: ${data.username}, Password: ${data.password}`);
  //     await axiosInstance.post("/auth/login",
  //       {
  //       username: "",
  //       password: "",
  //      }
  //     );
  //     toast.success("Register success!");
  //   } catch (error) {
  //     toast.error("server error, please wait a moment...");
  //   }
  // }

  
//   const { setValue } = form;

  return(
<>
<NavbarComponent />
<div className="flex h-screen items-center justify-center bg-red-950" 
// style={{backgroundImage: `url(${zetaImage})`}}
>
 <Card className="w-[300px]  bg-white">
  <CardHeader className="font-semibold text-lg p-3.5 ">Login Page</CardHeader>

  <Divider />

  <CardBody >

  <form onSubmit={form.handleSubmit(registerUserTest)} className="flex flex-col gap-4">
   <Controller
    name="username"
    control={form.control}
    render={({field, fieldState}) => {
      return (
        <Input 
        {...field} 
        label="Username" 
        size="sm" 
        isInvalid={Boolean(fieldState.error)}
        errorMessage={fieldState.error?.message} />
      )
    }} />

   <Controller
    name="password"
    control={form.control}
    render={({field, fieldState}) => {
      return (
        <Input 
        {...field} 
        type="password"
        label="Password" 
        size="sm" 
        isInvalid={Boolean(fieldState.error)}
        errorMessage={fieldState.error?.message} />
      )
    }} />
    
    {/* <Controller
    name="role"
    control={form.control}
    render={({ field, fieldState }) => (
        <Dropdown>
        <DropdownTrigger> 
         <Button variant="bordered">
           {field.value ? field.value : "Select Role"} 
         </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Select Role"
          onAction={(key) => {
          setValue("role", key);  // Set role in form data
            }}
        >
           <DropdownItem key="employee">Employee</DropdownItem>
           <DropdownItem key="admin">Admin</DropdownItem>
        </DropdownMenu>
        </Dropdown>
              )}
    /> */}
    <Button type="submit" color="primary">LOGIN</Button>
   </form>
  </CardBody>
 </Card>
</div>
</>
    )
}

export default LoginEmp;

