export const fetchUser = async (id) => await (
  await fetch(`http://localhost:5000/api/users/${id}`)
).json();
