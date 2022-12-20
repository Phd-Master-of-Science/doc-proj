export const fetchDocuments = async (
  responseAction,
  responseUser,
  page,
  rowsPerPage
) => {
  return await (
    await fetch(
      `http://localhost:5000/api/documents/${responseAction.data.toLowerCase()}/${responseUser.data}?pageNumber=${page + 1}&pageSize=${rowsPerPage}`
    )
  ).json();
};
