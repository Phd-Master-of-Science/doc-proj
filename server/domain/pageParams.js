export const pageParams = {
  pageNumber: 1,
  pageSize: 10,
  totalRecords: Number,
};

export const calculateParams = (req) => {
  pageParams.pageNumber = parseInt(req.query.pageNumber);
  pageParams.pageSize = parseInt(req.query.pageSize);

  if (!req.query.pageNumber && !pageParams.pageSize) {
    pageParams.pageNumber = 1;
    pageParams.pageSize = 10;
  }
};
