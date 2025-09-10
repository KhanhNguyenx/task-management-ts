interface ObjectSearch {
  keyword: string;
  regex?: RegExp;
}

const searchHelper = (query) => {
  let objectSearch: ObjectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    const regex = new RegExp(objectSearch.keyword, "i"); // 'i' để không phân biệt hoa thường
    objectSearch.regex = regex;
  }

  return objectSearch;
};
export default searchHelper;