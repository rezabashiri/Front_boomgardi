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
    let newq = QueryBulider.stringify(queryObject);
    console.log("newqqqq", newq);
    console.log("query", queryString);
    return queryString;
  }

  /*buildParam(object) {
    var parameters = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        parameters.push(encodeURI(property + "=" + object[property]));
      }
    }

    return parameters.join("&");
  }*/
}
