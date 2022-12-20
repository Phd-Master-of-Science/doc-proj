export const fetchDocumentById = async (id) => await (
  await fetch(`http://localhost:5000/api/documents/${id}`)
).json();
