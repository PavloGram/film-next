"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import Image from "next/image";
import { genres } from "../lib/genres";
import { detectIdInArrey } from "../lib/detectIdInArr";
import { changeLocalStorage } from "../lib/changeLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { changeQueueArray } from "@/rtk/reducers/queueArr";
import { changeWatchedArray } from "@/rtk/reducers/watchArr";
import { changeStateActive } from "@/rtk/reducers/activeModal";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";

const LOCAL_STORAGE_WATCHED_KEY = "watched";
const LOCAL_STORAGE_QUEUE_KEY = "queue";

function Modal() {
  const path = usePathname();
  const dispatch = useDispatch();
  const currentFilm = useSelector((state) => state.currentFilm.value);
  const modal = useSelector((state) => state.activeModal.value);
  const src = `https://image.tmdb.org/t/p/w500${currentFilm?.poster_path}`;
  const watchArr = useSelector((state) => state.watchArr.value);
  const queueArr = useSelector((state) => state.queueArr.value);
  const [watchBtn, setWatchBtn] = useState(false);
  const [queuehBtn, setQueueBtn] = useState(false);
  const [genLen, setGenLen] = useState(0);

  useEffect(() => {
    setGenLen(
      path === "/"
        ? currentFilm?.genre_ids?.length
        : currentFilm?.genres?.length
    );
    setWatchBtn(detectIdInArrey(watchArr, currentFilm));
    setQueueBtn(detectIdInArrey(queueArr, currentFilm));
  }, [setWatchBtn, watchArr, queueArr, currentFilm, path]);

  function handleChangeWatchedList() {
    changeLocalStorage(watchArr, currentFilm, LOCAL_STORAGE_WATCHED_KEY);
    return dispatch(changeWatchedArray());
  }
  function handleChangeQueueList() {
    changeLocalStorage(queueArr, currentFilm, LOCAL_STORAGE_QUEUE_KEY);
    return dispatch(changeQueueArray());
  }

  return (
    <section
      className={`modal-section ${modal ? "is-open" : ""}`}
      onClick={() => dispatch(changeStateActive())}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close-modal-btn"
          onClick={() => dispatch(changeStateActive())}
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
          <h2 className="modal-title">{currentFilm?.original_title}</h2>
          <table>
            <tbody>
              <tr>
                <th className="modal-table-title">Vote / Votes</th>
                <td className="modal-table-value">
                  <span className="modal-table-change-bg">
                    {Number(currentFilm?.vote_average).toFixed(1)}
                  </span>
                  {` / ${currentFilm?.vote_count}`}
                </td>
              </tr>
              <tr>
                <th className="modal-table-title">Popularity</th>
                <td className="modal-table-value">
                  {Number(currentFilm?.popularity).toFixed(1)}
                </td>
              </tr>
              <tr>
                <th className="modal-table-title">Original Title</th>
                <td className="modal-table-value">
                  {currentFilm?.original_title}
                </td>
              </tr>
              <tr>
                <th className="modal-table-title">Genre</th>
                <td className="modal-table-value">
                  {" "}
                  {genres
                    .filter((e) => {
                      if (
                        path === "/"
                          ? currentFilm?.genre_ids?.includes(e.id)
                          : currentFilm?.genres
                              ?.map((et) => {
                                return et.id;
                              })
                              ?.includes(e.id)
                      ) {
                        return e;
                      } else {
                        return null;
                      }
                    })
                    .map((el, i) => {
                      return (
                        <span key={el.id}>
                          {genLen === i + 1 ? `${el.genre}.` : `${el.genre}, `}
                        </span>
                      );
                    })}
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="modal-desc-title">About </h3>
          <p className="modal-desc-text">{currentFilm?.overview}</p>
          <Button
            btnValue={watchBtn ? "rem to Watched" : "add to Watched"}
            actClx={watchBtn ? "active" : ""}
            modClx={"modal-watch"}
            clickFunction={() => handleChangeWatchedList()}
          />
          <Button
            btnValue={queuehBtn ? "rem to queue" : "add to queue"}
            actClx={queuehBtn ? "active" : ""}
            modClx={"modal-queue"}
            clickFunction={() => handleChangeQueueList()}
          />
        </div>
      </div>
    </section>
  );
}

export default Modal;
