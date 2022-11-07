import React from "react";

interface IProps {
  now: number;
  total: 
}

const Pagination = () => {
  return (
    <div className="image-pagination">
      {ready ? (
        <h1>{`${nowPage}/${allPage}`}</h1>
      ) : (
        <div className="loading-text">
          <CircularProgress />
          <span>加载中</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
