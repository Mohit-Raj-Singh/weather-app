import React from "react";
import { AtomSpinner } from "react-epic-spinners";

const Loader = () => {
  return (
    <>
      <div className="grid place-content-center w-full h-screen">
        <AtomSpinner size="300" color="#3e5569" />
      </div>

    </>

  );
};

export default Loader;
