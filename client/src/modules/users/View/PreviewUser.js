import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { fetchUserById } from '../api/fetchUserById';

export const PreviewUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const dataFetch = async (id) => {
    const response = await fetchUserById(id);
    setUser(response.data);
  };

  useEffect(() => {
    dataFetch(id);
  }, [id]);

  if (!user) return <LinearProgress color="primary" />;
  
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
