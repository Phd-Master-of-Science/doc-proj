export const fetchSeeding = async () => await (
  await fetch("http://localhost:5000/api/common/seedings")
).json();
