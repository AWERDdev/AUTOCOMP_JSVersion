import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function Result({ countedWords, correctedWords }) {
  const [countLoading, setCountLoading] = useState(true);
  const [correctedLoading, setCorrectedLoading] = useState(true);

  useEffect(() => {
    if (countedWords == null) return;

    setCountLoading(true);
    const timer = setTimeout(() => setCountLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [countedWords]);

  useEffect(() => {
    if (correctedWords == null) return;

    setCorrectedLoading(true);
    const timer = setTimeout(() => setCorrectedLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [correctedWords]);

  return (
    <main className="container bg-white w-full md:w-[90vw] shadow-lg rounded-md p-5">
      <div className="Result-content flex flex-col gap-3">
        {countLoading ? (
          <p className="text-[1.5rem] text-gray-500">Counting words...</p>
        ) : countedWords !== null ? (
          <h1 className="text-[1.5rem]">Counted words: {countedWords}</h1>
        ) : (
          <p className="text-red-500 text-[1.5rem]">No word count available</p>
        )}

        {correctedLoading ? (
          <p className="text-[1.5rem] text-gray-500">Correcting sentence...</p>
        ) : correctedWords !== null ? (
          <p className="text-[1rem] md:text-[1.5rem]">Corrected sentence: {correctedWords}</p>
        ) : (
          <p className="text-red-500 text-[1.5rem]">No corrected sentence available</p>
        )}
      </div>
    </main>
  );
}

Result.propTypes = {
  countedWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.oneOf([null])]),
  correctedWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.oneOf([null])]),
};

export default Result;

