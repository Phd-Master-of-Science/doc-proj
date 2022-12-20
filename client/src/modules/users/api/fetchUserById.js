export const fetchUserById = async (id) => await (
  await fetch(`http://localhost:5000/api/users/${id}`)
).json();
