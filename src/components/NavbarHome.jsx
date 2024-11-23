import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import zetaImage from "../img/zeta-cantik.jpeg";


function NavbarComponent() {

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="font-semibold text-lg " >
          <Link href="/">ENIGMA LAUNDRY UHUY</Link>
        </NavbarItem>

        {/* <NavbarItem style={{backgroundImage: `url(${zetaImage})`}} /> 
        <NavbarItem /> */}

        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/sign-up" >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarComponent;



// import React from "react";
// import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
// import { Link } from "react-router-dom";

// const NavbarComponent = ({ isAuthenticated }) => {
//   return (
//     <Navbar>
//       <NavbarBrand>
//         <Link to="/">My App</Link>
//       </NavbarBrand>
//       <NavbarContent>
//         {isAuthenticated ? (
//           <>
//             <NavbarItem>
//               <Link to="/dashboard">Dashboard</Link>
//             </NavbarItem>
//             <NavbarItem>
//               <Button color="danger" onClick={() => alert("Logout successful")}>
//                 Logout
//               </Button>
//             </NavbarItem>
//           </>
//         ) : (
//           <NavbarItem>
//             <Link to="/login">
//               <Button>Login</Button>
//             </Link>
//           </NavbarItem>
//         )}
//       </NavbarContent>
//     </Navbar>
//   );
// };

// export default NavbarComponent;