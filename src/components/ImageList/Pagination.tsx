import { CircularProgress, LinearProgress, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { FC } from "react";

interface IProps {
  now: number;
  total: number;
  loading?: boolean;
  percentage?: number;
  onNext: () => void;
}

const Pagination: FC<IProps> = ({
  now,
  total,
  loading,
  percentage,
  onNext: next,
}) => {
  return (
    <div className="image-pagination">
      {loading === true ? (
        percentage !== undefined ? (
          <div className="progress-container">
            <LinearProgress variant="determinate" value={percentage} />
          </div>
        ) : (
          <div className="progress-container">
            <CircularProgress />
          </div>
        )
      ) : (
        <div className="pagination-container">
          <h1>{`${now + 1}/${total}`}</h1>
          <IconButton onClick={next}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Pagination;
