export const fetchRandomAction = async () => await (
  await fetch("http://localhost:5000/api/directories/action/random")
).json();
