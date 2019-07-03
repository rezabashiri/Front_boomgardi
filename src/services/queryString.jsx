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
}
