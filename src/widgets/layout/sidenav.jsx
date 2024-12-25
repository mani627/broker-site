import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import LoadingAnimation from "@/components/Loading";
import { useState } from "react";
import { HomeIcon } from "lucide-react";
import LogOut from "@/pages/dashboard/LogOut";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [isLogout, setisLogout] = useState(false);
  const { sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // Separate the routes into top and bottom sections
  const topRoutes = routes.filter(route => route.title !== "Other Setting");
  const bottomRoutes = routes.filter(route => route.title === "Other Setting");

  const closeSidenav = () => setOpenSidenav(dispatch, false);
  const [navRoute, setnavRoute] = useState([
    {
      title: "Order",
      layout:"dashboard",
      section:"top",
      path:"/home",
      icon:<HomeIcon className="w-5 h-5" />
    },
  ]);

  return (
    <div className="relative">
      {/* Backdrop for Small Screens */}
      {openSidenav && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={closeSidenav}
        />
      )}



      {/* Sidenav */}
      <aside
        className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
          } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)]  w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
      >
        {/* Brand Section */}
        <div className="relative">
          <Link to="/" className="py-6 px-8 text-center">
            <div className="flex justify-center items-center">
              <Typography
                variant="h6"
                style={{ letterSpacing: "0.2vh", fontSize: "3.5vh" }}
                className="font-medium"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
              >
                {brandName}
              </Typography>
              <LoadingAnimation size="10" type={"gif"} gifSrc={"/img/icon_img.gif"} />
            </div>
          </Link>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={closeSidenav}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>

        {/* Top Section */}
        <div className="m-4 flex-grow">
          <ul className="mb-4 flex flex-col gap-1">
            {navRoute.map(({ layout, title,path ,icon}) =>
            
                <li key={title}>
                  <NavLink className="cursor-pointer" to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color="pink"
                        className={`${isActive
                          ? ""
                          : sidenavType === "dark"
                            ? "text-white"
                            : "text-blue-gray-500"
                          } flex items-center gap-4 px-4 capitalize`}
                        fullWidth
                      >
                        {icon && <span className="h-5 w-5">{icon}</span>}
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          {title}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              
            )}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="p-4 flex absolute bottom-0 flex-col justify-end  w-full">

            <Button size="sm" onClick={()=>setisLogout(true)} variant={isLogout ? 'filled' : 'outlined'} color="pink">
              <Typography>

                LogOut
              </Typography>
            </Button>

          {/* <ul className="flex flex-col gap-1 border-t border-gray-300 pt-4">
            {bottomRoutes.map(({ layout, pages }) =>
              pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color="pink"
                        className={`${isActive
                          ? ""
                          : sidenavType === "dark"
                            ? "text-white"
                            : "text-blue-gray-500"
                          } flex items-center gap-4 px-4 capitalize`}
                        fullWidth
                      >
                        {icon && <span className="h-5 w-5">{icon}</span>}
                        <Typography
                          color="inherit"
                          className="font-normal capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))
            )}
          </ul> */}
        </div>
      </aside>
      <LogOut isopen={isLogout} setIsOpen={setisLogout} />
    </div>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Dispatch Go",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
