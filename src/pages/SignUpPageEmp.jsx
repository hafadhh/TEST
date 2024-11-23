import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Link,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react"
import React from "react";
import '../index.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller,useForm } from "react-hook-form";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";
import zetaImage from "../img/zeta-cantik.jpeg";
import "../style/zeta.css"
import NavbarComponent from "../components/NavbarHome";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  
  const signUpFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Format email tidak sesuai"),
    username: z.string().min(5, "Password harus 5 karakter atau lebih"),
    password: z.string().min(8, "Password harus 8 karakter atau lebih"),
    role: z.enum(["admin", "employee"], "Role must be 'admin' or 'employee'"),
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      username:"",
      password:"",
      role: "admin",
    },
    resolver: zodResolver(signUpFormSchema),
  })

  const navigate = useNavigate();
  const registerUserTest = async (data) => {
    try {
      // const endpoint = data.role === 'admin' ? 'admin-login' : 'employee-login';
      const uhuy = await axiosInstance.post('/auth/register', data);
      console.log(data); 
      console.log(uhuy); 
      toast.success("Register success!");
      navigate("/login");
    } catch (error) {
      toast.error("server error, please wait a moment...");
    }
  }

  // const { setValue } = form;

  return(
<>
<NavbarComponent />
<div className="flex h-screen items-center justify-center bg-red-950">
 <Card className="w-[300px]  bg-white">
  <CardHeader className="font-semibold text-lg p-3.5 ">Sign Up Page</CardHeader>

  <Divider />

  <CardBody >
  <form onSubmit={form.handleSubmit(registerUserTest)} className="flex flex-col gap-4">

  <Controller
    name="name"
    control={form.control}
    render={({field, fieldState}) => {
      return (
    <Input {...field} 
        label="Name" 
        size='sm' 
        isInvalid={Boolean(fieldState.error)}
        errorMessage={fieldState.error?.message} /> // karna error bisa undefined, maka (?) bisa di pake buat cegah dan terusin pe properti message
      )
    }} />

   <Controller
    name="email"
    control={form.control}
    render={({field, fieldState}) => {
      return (
    <Input {...field} 
        label="Email" 
        size='sm' 
        isInvalid={Boolean(fieldState.error)}
        errorMessage={fieldState.error?.message} /> 
      )
    }} />

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
    <Button type="submit" color="primary">SIGN UP</Button>
   </form>
    <Link className="pt-3 justify-center"  href="/login">
      Already have Account?
    </Link>
    <Link className="pb-2 justify-center" href="/" >
       Go back to Home
    </Link>
  </CardBody>
 </Card>
 
</div>
</>
    )
}

export default SignUp;

