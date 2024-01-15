"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SearchIcon from "../ui/SearchIcon";
import LogoIcon from "../ui/LogoIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "@/rtk/reducers/searchValue";
import { setToggleFalse, setToggleTrue } from "@/rtk/reducers/libraryToggle";
import Button from "../ui/Button";
import { changePage } from "@/rtk/reducers/currentPage";

function Header() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.libraryToggle.value);
  const responseData = useSelector((state) => state.responseData.value);
  const path = usePathname();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setSearchValue(value));
    dispatch(changePage(1));
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
                onClick={() => {dispatch(setSearchValue(null)); dispatch(changePage(1))}}
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
                onClick={() => dispatch(setToggleTrue())}
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
        <Button
          btnValue={"Watched"}
          actClx={toggle ? "active" : ""}
          modClx={"header-watch"}
          clickFunction={() => dispatch(setToggleTrue())}
        />
        <Button
          btnValue={"queue"}
          actClx={toggle ? "" : "active"}
          modClx={"header-queue"}
          clickFunction={() => dispatch(setToggleFalse())}
        />
      </section>
    </header>
  );
}

export default Header;
