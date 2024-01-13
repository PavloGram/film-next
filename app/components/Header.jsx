"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SearchIcon from "../ui/SearchIcon";
import LogoIcon from "../ui/LogoIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "@/rtk/reducers/searchValue";
import { setToggleFalse, setToggleTrue } from "@/rtk/reducers/libraryToggle";

function Header() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.libraryToggle.value);
  const responseData = useSelector((state) => state.responseData.value);
  const path = usePathname();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setSearchValue(value));
    setValue("");
  }

  return (
    <header className="header">
      <div className="nav-and-search-section-wrap">
        <nav>
          <ul className="list">
            <li>
              <Link
                href="/"
                onClick={() => dispatch(setSearchValue(null))}
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
              value={value}
              type="text"
              className="input"
              placeholder="Movie Search"
              onChange={(e) => setValue(e.target.value)}
            ></input>
            <button
              type="submit"
              className="search-btn"
              onClick={(e) => handleSubmit(e)}
            >
              <SearchIcon />
            </button>
          </form>
          <div
            className={`error-text-wrap ${
              responseData?.results?.length === 0 ? "is-active" : ""
            }`}
          >
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
          onClick={() => dispatch(setToggleTrue())}
          className={`my-library-btn watched-btn ${toggle ? "active" : ""}`}
        >
          Watched
        </button>
        <button
          type="button"
          onClick={() => dispatch(setToggleFalse())}
          className={`my-library-btn queue-btn ${toggle ? "" : "active"}`}
        >
          queue
        </button>
      </section>
    </header>
  );
}

export default Header;
