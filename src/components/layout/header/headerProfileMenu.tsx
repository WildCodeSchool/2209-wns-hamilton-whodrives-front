import "../../../styles/layout.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

type MenuItems = {
  path: string;
  name: string;
};

const disconnectedMenuItems: MenuItems[] = [
  { path: "/register", name: "Inscription" },
  { path: "/auth", name: "Connexion" },
];

const menuItems: MenuItems[] = [
  { path: "/profile", name: "Mon compte" },
  { path: "/profile/dashboard", name: "Mon tableau de bord" },
];

const headerLinks: MenuItems[] = [
  { path: "/", name: "Accueil" },
  { path: "/search-trip", name: "Rechercher" },
  { path: "/create-trip", name: "Publier un trajet" },
];

const responsiveMenuItems: MenuItems[] = headerLinks
  .concat(menuItems)
  .map((obj) => ({ ...obj }));

const responsiveDisconnectedMenuItems: MenuItems[] = headerLinks
  .concat(disconnectedMenuItems)
  .map((obj) => ({ ...obj }));

export default function HeaderProfileMenu(): JSX.Element {
  const { userInfos, logout } = useAuth();

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
      {/* Menu desktop */}
      <div className="hidden sm:block">
        <button
          className="flex flex-row"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {Object.keys(userInfos).length > 0 ? (
            <img
              className="w-10"
              src="/assets/icons/user-green.svg"
              alt="user icon"
            />
          ) : (
            <img
              className="w-10"
              src="/assets/icons/user-white.svg"
              alt="user icon"
            />
          )}
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

        {Object.keys(userInfos).length > 0 ? (
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
              <p
                onClick={logout}
                className="header-profile-text hover:text-validBlue"
              >
                Déconnexion
              </p>
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {disconnectedMenuItems.map((item: MenuItems, index: number) => {
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
          </Menu>
        )}
      </div>

      {/* Menu mobile */}
      <div className="flex flex-row items-center justify-end sm:hidden">
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
        {Object.keys(userInfos).length > 0 ? (
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
            <MenuItem>
              <p
                onClick={logout}
                className="header-profile-text hover:text-validBlue"
              >
                Déconnexion
              </p>
            </MenuItem>
          </Menu>
        ) : (
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
            {responsiveDisconnectedMenuItems.map(
              (item: MenuItems, index: number) => {
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
              }
            )}
          </Menu>
        )}
      </div>
    </div>
  );
}
