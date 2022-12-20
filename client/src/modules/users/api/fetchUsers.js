export const fetchUsers = async (page, rowsPerPage) => {
  return await (
    await fetch(
      `http://localhost:5000/api/users?pageNumber=${
        page + 1
      }&pageSize=${rowsPerPage}`
    )
  ).json();
};
