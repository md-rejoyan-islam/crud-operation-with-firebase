import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  // handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar fluid rounded className="bg-zinc-200">
      <Link href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold ">
          DEVS
        </span>
      </Link>
      <div className="flex md:order-2">
        {user?.uid && (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user?.photoURL} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.displayName}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <NavLink to={"/"} className="py-2 px-3 rounded-sm">
          Home
        </NavLink>

        {!user?.uid && (
          <>
            <NavLink to="/login" className="py-2 px-3 rounded-sm">
              Login
            </NavLink>
            <NavLink to="/register" className="py-2 px-3 rounded-sm">
              Register
            </NavLink>
          </>
        )}
      </Navbar.Collapse> */}
    </Navbar>
  );
}
