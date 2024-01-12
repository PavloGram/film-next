"use client";
import React, { useEffect, useState } from "react";
import fetchFilms from "../lib/fetchFilms";
import { genres } from "../lib/genres";
import Image from "next/image";
import { useCurrentFilm, useModal } from "@/store";

function FilmCardWrap() {
  const [filmArr, setFilmArr] = useState([]);
  const value = "hulk";

  const modal = useModal();
  const currentFilm = useCurrentFilm();

  useEffect(() => {
    fetchFilms(value)
      .then((res) => setFilmArr(res))
      .catch((er) => {
        console.log(er.message);
      });
  }, []);
  // console.log(filmArr);
  return (
    <section className="card-wrap">
      {filmArr.results?.map((el) => {
        const src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
        return (
          <article
            key={el.id}
            className="card"
            onClick={() => {
              modal.open();
              currentFilm.setCurrentFilm(el);
          
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
      })}
    </section>
  );
}

export default FilmCardWrap;
