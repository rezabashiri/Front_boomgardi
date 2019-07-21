import QueryBulider from "query-string";
export default class QueryString {
  buildQuery(queryObject) {
    let queryString =
      queryObject === ""
        ? ""
        : "?" +
          Object.keys(queryObject)
            .map(key => key + "=" + queryObject[key])
            .join("&");
    return queryString;
  }

  makeQuery(queryObject) {
    let newQuery = Object.keys(queryObject).map(key =>
      queryObject[key] !== "" ? key : null
    );
    console.log("newquery", newQuery);
    let queryString =
      queryObject === "" ? "" : "?" + QueryBulider.stringify(queryObject);
    return queryString;
  }
}
