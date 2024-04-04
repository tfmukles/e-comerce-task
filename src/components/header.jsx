import { ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./search";

export default function Header() {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { items: carts } = useSelector((state) => state.cart);
  const totalItems = carts.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <header className="py-4 sticky top-0 left-0 w-full bg-white border-b">
      <nav>
        <div className="container">
          <div className="flex justify-between">
            <Link to={"/"}>
              <img src="/logo.png" alt="prime tech solutions" />
            </Link>
            <ul className="flex w-full space-x-7 items-center max-w-xl">
              <li className="flex-1 ">
                <Search />
              </li>
              <li>
                <button
                  onClick={() => navigator("/checkout")}
                  type="button"
                  className="relative"
                >
                  <ShoppingCart />
                  <span className="absolute -top-3.5 -right-3.5 w-5 h-5 flex items-center justify-center bg-yellow-500 text-white text-xs rounded-full font-medium">
                    {totalItems}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
