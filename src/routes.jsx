import React, { Suspense, lazy } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import LogOut from "./pages/dashboard/LogOut";
import OrderDetilas from "./widgets/layout/OrderDetilas";

// Lazy-loaded components
// const Home = lazy(() => import("@/pages/dashboard/Home"));
// const Profile = lazy(() => import("@/pages/dashboard/Profile"));
// const Tables = lazy(() => import("@/pages/dashboard/Tables"));
// const Notifications = lazy(() => import("@/pages/dashboard/Notifications"));


const icon = {
  className: "w-5 h-5  ",
};
const loader = <div class="flex justify-center items-center h-screen">
  <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Orders",
        path: "/home",
        element: (
          // <Suspense fallback={loader}>
          <Home />
          //  </Suspense>
        ),
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: (
          // <Suspense fallback={loader}>
          <Profile />
          //  </Suspense>
        ),
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "orderID",
        path: "/home/:id",
        element: (
          // <Suspense fallback={loader}>
          <OrderDetilas />
          //  </Suspense>
        ),
      },
  
      
    ],
  },
  {
    title: "Other Setting",
    layout: "auth",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "SignIN",
        path: "/sign-in",
        element: (
          // <Suspense fallback={loader}>
          <SignIn />
          //  </Suspense>
        ),
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "SignUp",
        path: "/sign-up",
        element: (
          // <Suspense fallback={loader}>
          <SignUp />
          //  </Suspense>
        ),
      },
    
    ],
  },
];

export default routes;


