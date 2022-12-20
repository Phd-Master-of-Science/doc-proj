export const fetchFiles = async (page, rowsPerPage) => {
  return await (
    await fetch(
      `http://localhost:5000/api/files?pageNumber=${
        page + 1
      }&pageSize=${rowsPerPage}`
    )
  ).json();
};
