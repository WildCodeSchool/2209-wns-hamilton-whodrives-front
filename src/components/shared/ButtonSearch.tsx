import React from "react";

function ButtonSearch(onclick: any,texte :string) {
  return (
    <>
      <button onClick={onclick}>{texte}</button>
    </>
  );
}

export default ButtonSearch;
