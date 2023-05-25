import "../../../styles/layout.css";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

type MenuItems = {
  path: string;
  name: string;
};
const logout = () => {
  localStorage.clear();
  window.location.href = "/";
}

const menuItems: MenuItems[] = [
  { path: "/profile", name: "Mon compte" },
  { path: "/profile/dashboard", name: "Mon tableau de bord" },
  { path: "/profile/messages", name: "Mes messages" },
];

const headerLinks: MenuItems[] = [
  { path: "/search-trip", name: "Rechercher" },
  { path: "/create-trip", name: "Publier un trajet" },
];

const responsiveMenuItems: MenuItems[] = headerLinks
  .concat(menuItems)
  .map((obj) => ({ ...obj }));

export default function HeaderProfileMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="hidden sm:block">
        <button
          className="flex flex-row"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img
            className="w-10"
            src="/assets/icons/user-white.svg"
            alt="user icon"
          />
          <img
            className="w-8"
            src={
              isOpen
                ? "/assets/icons/chevron-up-white.svg"
                : "/assets/icons/chevron-down-white.svg"
            }
            alt="chevron down icon"
          />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {menuItems.map((item: MenuItems, index: number) => {
            return (
              <MenuItem key={index} onClick={handleClose}>
                <a
                  className="header-profile-text hover:text-validBlue"
                  href={item.path}
                >
                  {item.name}
                </a>
              </MenuItem>
            );
          })}
          <MenuItem>
          <a href="#"  onClick={logout}  className="header-profile-text hover:text-validBlue"> 
          Déconnexion
          </a>
         </MenuItem>
        </Menu>
      </div>

      <div className="flex flex-row justify-end h-full sm:hidden">
        <button
          className="flex flex-row"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img
            className="w-8"
            src={
              isOpen
                ? "/assets/icons/chevron-up-white.svg"
                : "/assets/icons/chevron-down-white.svg"
            }
            alt="chevron down icon"
          />
        </button>
        <Menu
          className="sm:hidden"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          
          {responsiveMenuItems.map((item: MenuItems, index: number) => {
            return (
              <MenuItem key={index} onClick={handleClose}>
                <a
                  className="header-profile-text hover:text-validBlue"
                  href={item.path}
                >
                  {item.name}
                </a>
              </MenuItem>
            );
          })}
          <MenuItem onClick={logout}>Déconnexion</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
