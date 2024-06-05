import React from "react";
import { Link } from "react-router-dom";
import useNavigation from "../../../consts/navigation";
import { useAuth } from "../../Context/AuthContainer";
import style from "./Header.module.css";

const Header: React.FC = () => {
  const navigation = useNavigation();
  const { handleLogout } = useAuth();

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        <p>
          Sport <span>Elite</span>
        </p>
      </Link>
      <nav className={style.nav}>
        <ul className={style.navList}>
          {navigation.map((item) => (
            <li key={item.link} className={style.navItem}>
              {item.label === "Logout" ? (
                <button onClick={handleLogout}>{item.label}</button>
              ) : (
                <Link to={item.link} className={style.navLink}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
