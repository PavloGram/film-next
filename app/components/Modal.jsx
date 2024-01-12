"use client";
import { useCurrentFilm, useModal, useQueueArr, useWatchArr } from "@/store";
import React, { useEffect, useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import Image from "next/image";
import { genres } from "../lib/genres";
import { localStorageParse } from "../lib/localStorageParse";
import { detectIdInArrey } from "../lib/detectIdInArr";
import { changeLocalStorage } from "../lib/changeLocalStorage";

const LOCAL_STORAGE_WATCHED_KEY = "watched";
const LOCAL_STORAGE_QUEUE_KEY = "queue";

function Modal() {
  const currentFilm = useCurrentFilm();
  const cFilm = currentFilm.currentFilm.e;
  const modal = useModal();
  const src = `https://image.tmdb.org/t/p/w500${cFilm?.poster_path}`;
  const watchArr = useWatchArr();
  const queueArr = useQueueArr();
  const [watchBtn, setWatchBtn] = useState(false);
  const [queuehBtn, setQueueBtn] = useState(false);

  useEffect(() => {
    setWatchBtn(detectIdInArrey(watchArr.watchArr, cFilm));
    setQueueBtn(detectIdInArrey(queueArr.queueArr, cFilm));
  }, [setWatchBtn, cFilm, watchArr, queueArr]);
  console.log(watchBtn);
  function handleChangeWatchedList() {
    changeLocalStorage(watchArr.watchArr, cFilm, LOCAL_STORAGE_WATCHED_KEY);
    watchArr.setArr();
  }
  function handleChangeQueueList() {
    changeLocalStorage(queueArr.queueArr, cFilm, LOCAL_STORAGE_QUEUE_KEY);
    queueArr.setArr();
  }

  return (
    <section
      className={`modal-section ${modal.isOpen ? "is-open" : ""}`}
      onClick={() => modal.close()}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close-modal-btn"
          onClick={() => modal.close()}
        >
          <CloseIcon />
        </button>

        <Image
          unoptimized
          alt=""
          loader={() => src}
          src={src}
          width={375}
          height={478}
          className="modal-img"
        />
        <div className="modal-content-wrap">
           <h2 className="modal-title">{cFilm?.original_title}</h2>
        <table>
          <tbody>
            <tr>
              <th className="modal-table-title">Vote / Votes</th>
              <td className="modal-table-value">
                <span className="modal-table-change-bg">
                  {Number(cFilm?.vote_average).toFixed(1)}
                </span>
                {` / ${cFilm?.vote_count}`}
              </td>
            </tr>
            <tr>
              <th className="modal-table-title">Popularity</th>
              <td className="modal-table-value">
                {Number(cFilm?.popularity).toFixed(1)}
              </td>
            </tr>
            <tr>
              <th className="modal-table-title">Original Title</th>
              <td className="modal-table-value">{cFilm?.original_title}</td>
            </tr>
            <tr>
              <th className="modal-table-title">Genre</th>
              <td className="modal-table-value">
                {" "}
                {genres
                  .filter((e) => {
                    if (cFilm?.genre_ids?.includes(e.id)) {
                      return e;
                    } else {
                      return null;
                    }
                  })
                  .map((el, i) => {
                    return (
                      <span key={el.id}>
                        {cFilm?.genre_ids?.length === i + 1
                          ? `${el.genre}.`
                          : `${el.genre}, `}
                      </span>
                    );
                  })}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="modal-desc-title">About </h3>
        <p className="modal-desc-text">{cFilm?.overview}</p>
        <button
          type="button"
          className={`modal-btn ${watchBtn ? "active" : ""}  watch`}
          onClick={() => handleChangeWatchedList()}
        >
          {watchBtn ? "rem to Watched" : "add to Watched"}
        </button>
        <button
          type="button"
          className={`modal-btn ${queuehBtn ? "active" : ""} queue`}
          onClick={() => handleChangeQueueList()}
        >
          {queuehBtn ? "rem to queue" : "add to queue"}
        </button>
        </div>
       
      </div>
    </section>
  );
}

export default Modal;
