"use client";
import React, { useEffect, useState } from "react";
import fetchFilms from "../lib/fetchFilms";
import { genres } from "../lib/genres";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "@/rtk/reducers/responseData";
import noMovie from "../../public/images/nomovies.png";
import { changeStateActive } from "@/rtk/reducers/activeModal";
import { changeFilm } from "@/rtk/reducers/currentFilm";

function FilmCardWrap() {
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.responseData.value);
  const path = usePathname();
  const toggle = useSelector((state) => state.libraryToggle.value);
  const value = useSelector((state) => state.searchValue.value);
  const [currentArr, setCurrentArr] = useState([]);
  const watchArr = useSelector((state) => state.watchArr.value);
  const queueArr = useSelector((state) => state.queueArr.value);

  const modal = useSelector((state) => state.activeModal.value);


  console.log(value);
  useEffect(() => {
    setCurrentArr(toggle ? watchArr : queueArr);
    fetchFilms(path === "/mylibrary" ? currentArr : value)
      .then((res) => {
        if (path === "/mylibrary") {
          return dispatch(
            setData({ results: [...res], page: 1, totalPage: 1 })
          );
        } else {
          return dispatch(setData(res));
        }
      })
      .catch((er) => {
        console.log(er.message);
      });
  }, [path, value, queueArr, toggle, watchArr, dispatch, currentArr]);

  return (
    <section className="card-wrap">
      {currentArr.length === 0 && path !== "/" ? (
        <Image
          src={noMovie}
          alt="no Movie"
          width={400}
          height={400}
          className="nomovie-img"
        />
      ) : (
        responseData?.results?.map((el) => {
          const src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
          return (
            <article
              key={el.id}
              className="card"
              onClick={() => {
                dispatch(changeStateActive());
                dispatch(changeFilm(el));
              }}
            >
              <hgroup>
                <h2 className="card-title">{el.original_title}</h2>
                <p className="card-desc">
                  {genres
                    .filter((e) => {
                      if (el.genre_ids?.includes(e.id)) {
                        return e;
                      } else {
                        return null;
                      }
                    })
                    .slice(0, 2)
                    .map((et, index) => (
                      <span key={et.id}>
                        {Number(el.genre_ids.length) !== 1 && index !== 1
                          ? `${et.genre}, `
                          : ` ${et.genre} |`}
                      </span>
                    ))}
                </p>
              </hgroup>
              <div>
                <Image
                  unoptimized
                  className="card-img"
                  alt=""
                  loader={() => src}
                  src={src}
                  width={280}
                  height={402}
                />
              </div>
            </article>
          );
        })
      )}
    </section>
  );
}

export default FilmCardWrap;
