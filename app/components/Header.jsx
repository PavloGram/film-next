"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SearchIcon from "../ui/SearchIcon";
import LogoIcon from "../ui/LogoIcon";

function Header() {
  const path = usePathname();
  const [act, setAct] = useState(true);
  const [myLibaryToggle, setMyLibraryToggle] = useState(false);
  return (
    <header className="header">
      <div className="nav-and-search-section-wrap">
        <nav >
          <ul className="list">
            <li>
              <Link
                href="/"
                className={`home-link link ${
                  path === "/" ? "active-link" : ""
                }`}
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="/mylibrary"
                className={`my-library-link link ${
                  path === "/mylibrary" ? "active-link" : ""
                }`}
              >
                my library
              </Link>
            </li>
          </ul>
        </nav>
        <section
          className={`section-form ${path === "/" ? "" : "visually-hidden"}`}
        >
          <form className="form">
            <input
              type="text"
              className="input"
              placeholder="Movie Search"
            ></input>
            <button type="submit" className="search-btn">
              <SearchIcon />
            </button>
          </form>
          <div className={`error-text-wrap ${act ? "is-act" : ""}`}>
            <p className="error-text">
              Search result not successful. Enter the correct movie name.
            </p>
          </div>
        </section>
      </div>

      <section className={`logo-section ${path === "/" ? "" : "my-library"}`}>
        <LogoIcon />
        <p className="logo">Filmoteka</p>
      </section>
      <section
        className={`my-library-btn-wrap ${
          path === "/" ? "visually-hidden" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setMyLibraryToggle(false)}
          className={`my-library-btn watched-btn ${
            myLibaryToggle ? "" : "active"
          }`}
        >
          Watched
        </button>
        <button
          type="button"
          onClick={() => setMyLibraryToggle(true)}
          className={`my-library-btn queue-btn ${
            myLibaryToggle ? "active" : ""
          }`}
        >
          queue
        </button>
      </section>
    </header>
  );
}

export default Header;
