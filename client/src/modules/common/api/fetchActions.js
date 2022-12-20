export const fetchActions = async () => await (
    await fetch("http://localhost:5000/api/common/actions")
  ).json();
  