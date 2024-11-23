import React from "react";
import NavbarDefault from "../../components/NavbarDef";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";
import bgDash from "../../img/hehe.gif"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

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
      <div className="flex flex-col h-screen overflow-hidden items-center justify-center bg-gray-100"
      style={{background: `url(${bgDash})`,
              backgroundSize:1600,
              backgroundPositionX:-1
              }}>
        <h1 className="text-3xl font-bold">Welcome to Enigma Laundry</h1>

        <div className="flex flex-row pt-20"> 

        <div className="p-5">
        <Card className="w-[400px] text-center">
         <CardBody>
          <h1 className="text-2xl font-bold">Customer Page</h1>
          <p className="text-lg my-4 text-gray-700">Go see our customer details</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/customer">
            <Button color="primary">Go There!</Button>
          </Link>
         </CardBody>
        </Card>
        </div>

        <div className="p-5">
        <Card className="w-[400px] text-center">
         <CardBody>
          <h1 className="text-2xl font-bold">Product Page</h1>
          <p className="text-lg my-4 text-gray-700">Check our market product!</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to="#">
            <Button color="primary">Go There!</Button>
          </Link>
         </CardBody>
        </Card>
        </div>

        <div className="p-5">
        <Card className="w-[400px] text-center">
         <CardBody>
          <h1 className="text-2xl font-bold">Transaction</h1>
          <p className="text-lg my-4 text-gray-700">Get transaction information</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to="#">
            <Button color="primary">Go There!</Button>
          </Link>
         </CardBody>
        </Card>
        </div>
        
        </div>

      </div>
  
      {/* <div className="bg-slate-600">    </div> */}

</>
  );
};

export default Dashboard;