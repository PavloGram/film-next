import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { changePage } from "@/rtk/reducers/currentPage";

function Pag() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage.value);
  const responseData = useSelector((state) => state.responseData.value);
  const [oneBtn, setOneBtn] = useState(0);
  const [twoBtn, setTwoBtn] = useState(0);
  const [threeBtn, setThreeBtn] = useState(0);
  const [fourBtn, setFourBtn] = useState(0);
  const [fiveBtn, setFiveBtn] = useState(0);

  const totalresults = Math.ceil(responseData?.total_results / 20);

  useEffect(() => {
    setOneBtn(currentPage <= 3 ? 1 : currentPage - 2);
    setTwoBtn(currentPage <= 3 ? 2 : currentPage - 1);
    setThreeBtn(currentPage <= 3 ? 3 : currentPage);
    setFourBtn(currentPage <= 3 ? 4 : currentPage + 1);
    setFiveBtn(currentPage <= 3 ? 5 : currentPage + 2);
  }, [currentPage]);

  return (
    <>
      {totalresults > 1 && (
        <div className="pagination-wrap">
          {currentPage >= 6 && (
            <button
              type="button"
              className="pagination-btn"
              onClick={() => {
                dispatch(changePage(1));
              }}
            >
              &#60;&#60;
            </button>
          )}
          {currentPage >= 4 && (
            <button
              type="button"
              className="pagination-btn"
              onClick={() => dispatch(changePage(currentPage - 3))}
            >
              &#60;
            </button>
          )}

          {totalresults > oneBtn && (
            <button
              type="button"
              className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
              onClick={() => {
                dispatch(changePage(oneBtn));
              }}
            >
              {oneBtn}
            </button>
          )}
          {totalresults >= twoBtn && (
            <button
              type="button"
              className={`pagination-btn ${currentPage === 2 ? "active" : ""}`}
              onClick={() => {
                dispatch(changePage(twoBtn));
              }}
            >
              {twoBtn}
            </button>
          )}
          {totalresults >= threeBtn && (
            <button
              type="button"
              className={`pagination-btn ${currentPage >= 3 ? "active" : ""}`}
              onClick={() => {
                dispatch(changePage(threeBtn));
              }}
            >
              {threeBtn}
            </button>
          )}
          {totalresults >= fourBtn && (
            <button
              type="button"
              className="pagination-btn"
              onClick={() => {
                dispatch(changePage(fourBtn));
              }}
            >
              {fourBtn}
            </button>
          )}
          {totalresults >= fiveBtn && (
            <button
              type="button"
              className="pagination-btn"
              onClick={() => {
                dispatch(changePage(fiveBtn));
              }}
            >
              {fiveBtn}
            </button>
          )}
          {totalresults <= 5 ||
            (currentPage + 3 < totalresults && (
              <button
                type="button"
                className="pagination-btn"
                onClick={() => dispatch(changePage(currentPage + 3))}
              >
                &#62;
              </button>
            ))}
          {totalresults >= 5 && totalresults >= threeBtn + 3 && (
            <button
              type="button"
              className="pagination-btn"
              onClick={() => dispatch(changePage(totalresults))}
            >
              {totalresults}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Pag;
