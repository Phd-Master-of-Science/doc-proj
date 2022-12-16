export const pagination = async (collection, filter, pageParams) => {
  let pageNum = pageParams.pageNumber ?? 1;

  let count = await collection.find(filter).toArray();

  let data = await collection
    .find(filter)
    .skip(pageParams.pageSize * (pageNum - 1))
    .limit(pageParams.pageSize)
    .toArray();

  pageParams.totalRecords = parseInt(count.length);

  var result = {
    rows: data,
    urlQuery: pageParams,
  };

  return result;
};
