import React from "react";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 bg-black text-gray-200 shadow-md z-10 px-8 py-5">
        <div className="header flex justify-between items-center">
          <div className="header-logo text-lg font-extrabold">ReactMovie</div>
          <nav className="header-nav">
            <ul className="grid grid-cols-3 gap-4">
              <li>Home</li>
              <li>Movies</li>
              <li>Actors</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
