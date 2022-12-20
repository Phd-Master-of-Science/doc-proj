export const fetchRandomUser = async () => await (await fetch("http://localhost:5000/api/users/random")).json();
