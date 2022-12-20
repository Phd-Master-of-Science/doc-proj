import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { useParams } from "react-router-dom";
import { fetchFileById } from "../api/fetchFileById";

export const PreviewFile = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);

  const dataFetch = async (id) => {
    const response = await fetchFileById(id);
    setFile(response.data);
  };

  useEffect(() => {
    dataFetch(id);
  }, [id]);

  if (!file) return <LinearProgress color="primary" />;

  return <div>{JSON.stringify(file)}</div>;
};
