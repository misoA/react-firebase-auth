import React from "react";
import queryString from "query-string";

const Home = ({ location, match }) => {
  const query = queryString.parse(location.search);
  console.log(query);

  return (
    <div>
      <h2>{match.params.name} 홈에 오신걸 환영합니다.</h2>
    </div>
  );
};

export default Home;
