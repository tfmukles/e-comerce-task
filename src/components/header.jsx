import { ShoppingCart } from "lucide-react";
import React from "react";
import Search from "./search";

export default function Header() {
  return (
    <header className="bg-yellow-500 py-4">
      <nav>
        <div className="container">
          <div className="flex justify-between">
            <img src="/logo.png" alt="prime tech solutions" />
            <ul className="flex w-full space-x-7 items-center max-w-xl">
              <li className="flex-1 ">
                <Search />
              </li>
              <li>
                <button type="button" className="relative">
                  <ShoppingCart />
                  <span className="absolute -top-3.5 -right-3.5 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full font-medium">
                    5
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
