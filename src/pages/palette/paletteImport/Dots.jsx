import React from "react";

const Dot = ({ num, currentPage, onClick }) => {
  const handleClick = () => {
    onClick(num);
  };

  return (
    <div
      style={{
        width: 10,
        height: 10,
        marginTop: 5,
        marginBottom: 5,
        border: "1px solid black",
        borderRadius: 999,
        backgroundColor: currentPage === num ? "gray" : "transparent",
        transitionDuration: 1000,
        transition: "background-color 0.5s",
        cursor: "pointer",
      }}
      onClick={handleClick}
    ></div>
  );
};

const Dots = ({ currentPage, onPageChange }) => {
  const totalPages = 9;

  const handleDotClick = (page) => {
    onPageChange(page);
  };

  return (
    <div style={{ position: "fixed", top: "40%", right: 30, zIndex: 1000 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid gray",
          borderRadius: 100,
          width: 20,
          height: 180,
          zIndex: 1001,
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <Dot
            key={index + 1}
            num={index + 1}
            currentPage={currentPage}
            onClick={handleDotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Dots;
