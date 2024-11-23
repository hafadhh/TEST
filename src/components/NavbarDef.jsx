import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function NavbarDefault() {
  const navigate = useNavigate();  // menggunakan useNavigate untuk redirect

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("authToken");

    // Redirect pengguna ke halaman login
    navigate("/login");  // Ganti dengan URL halaman login
  };

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
          "width: 100%",
   
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/dashboard" aria-current="page">
            ENIGMA LAUNDRY
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/customer">
            Customer
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/product">
            Product List
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/transaction">
            Transaction
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button 
            as={Link} 
            color="primary" 
            onClick={handleLogout} // Menambahkan aksi logout saat tombol diklik
            variant="flat"
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarDefault;
