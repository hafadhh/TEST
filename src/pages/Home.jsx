import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarHome";
import bgDash from "../img/giv.gif"


const Home = () => {
  return (
    <>
    <NavbarComponent />
    <div className="flex flex-col h-screen overflow-hidden items-center justify-center bg-gray-100"
      style={{background: `url(${bgDash})`,
              backgroundSize:1450,
              backgroundPositionX:110,
              backgroundPositionY:16
              }}>
      
      <Card className="w-[400px] text-center">
        <CardBody>
          <h1 className="text-2xl font-bold">Welcome to My App</h1>
          <p className="my-4 text-gray-700">Get started on your journey today!</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/sign-up">
            <Button color="primary">SIGNUP NOW</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
    </>
  );
};

export default Home;