import { HomeIcon } from "@heroicons/react/20/solid";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    icon: <HomeIcon />,
    url: "/home",
  },
  {
    name: "Debit Note",
    icon: <CreditCardIcon />,
    url: "/debit-note",
  },
];

export const NavigationBar = () => {
  const location = useLocation();
  const pathName = location?.pathname;
  return (
    <div className='navContainer z-10 fixed top-0'>
      {menuItems?.map((item) => (
        <Link to={item.url} key={item.name}>
          <ul
            className={clsx("navItem flex items-center pb-3", {
              "borer text-primary-500 border-primary-500":
                pathName === item.url,
              "border-none": pathName !== item.url,
            })}
          >
            {React.cloneElement(item.icon, { className: "navIcon" })}
            <li className='navText'>{item.name}</li>
          </ul>
        </Link>
      ))}
    </div>
  );
};
