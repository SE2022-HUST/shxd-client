import { CircularProgress, LinearProgress, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { FC } from "react";
import "./style.css";

interface IProps {
  now: number;
  total: number;
  loading?: boolean;
  percentage?: number;
  onNext: () => void;
  onBack: () => void;
}

const Pagination: FC<IProps> = ({
  now,
  total,
  loading,
  percentage,
  onNext: next,
  onBack: back,
}) => {
  return (
    <div className="image-pagination">
      {loading === true ? (
        percentage !== undefined ? (
          <div className="progress-container">
            <LinearProgress variant="determinate" value={percentage} />
            <h2>{`${percentage}%`}</h2>
          </div>
        ) : (
          <div className="progress-container">
            <CircularProgress />
          </div>
        )
      ) : (
        <div className="pagination-container">
          <IconButton className="pag-but" onClick={back} disabled={now === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <h1>{`${now + 1} / ${total}`}</h1>
          <IconButton
            className="pag-but"
            onClick={next}
            disabled={now === total - 1}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Pagination;
