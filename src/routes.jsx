import React, { Suspense, lazy } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
 import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

// Lazy-loaded components
// const Home = lazy(() => import("@/pages/dashboard/Home"));
// const Profile = lazy(() => import("@/pages/dashboard/Profile"));
// const Tables = lazy(() => import("@/pages/dashboard/Tables"));
// const Notifications = lazy(() => import("@/pages/dashboard/Notifications"));


const icon = {
  className: "w-5 h-5  ",
};
const loader=<div class="flex justify-center items-center h-screen">
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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: (
         // <Suspense fallback={loader}>
            <Profile />
         //  </Suspense>
        ),
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: (
         // <Suspense fallback={loader}>
            <Tables />
         //  </Suspense>
        ),
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: (
         // <Suspense fallback={loader}>
            <Notifications />
         //  </Suspense>
        ),
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: (
         
            <SignIn />
         
        ),
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: (
         
            <SignUp />
         
        ),
      },
    ],
  },
];

export default routes;


