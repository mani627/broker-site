import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useAuth } from "@/context/authContext";
import Subscription from "@/pages/dashboard/Subscription";
import NotVerify from "@/components/NotVerify";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const {userData , userInfo} = useAuth()

  if(!userInfo.verified) return <NotVerify/>

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
    {userInfo.subscription || userInfo.subscription != null ?<>
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />

      
      <div className="p-4 xl:ml-80">
        <DashboardNavbar pageTitle={"Order"} />
        {/* <Configurator /> */}
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        {/* wrapping */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
          {/* wrapping */}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div> </>
       : //condiotion else here
        <div className="">
        <Subscription/>
        </div>
      }
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
