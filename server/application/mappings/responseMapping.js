export const responseMapping = (dto, paginationModel) => {
  return {
    rows: dto,
    paging: {
      totalRecords: paginationModel.urlQuery.totalRecords,
      pageSize: paginationModel.urlQuery.pageSize,
      pageNumber: paginationModel.urlQuery.pageNumber ?? 1,
    },
  };
};

export const responseObjectMapping = (dto) => {
  return {
    data: dto,
  };
};
