import { Fragment, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DescriptionIcon from '@mui/icons-material/Description';

import { fetchActions } from "./api/fetchActions";
import { SeedingsTable } from "./SeedingsTable";
  
export const Home = () => {
  const [data, setData] = useState(null);

  const dataFetch = async () => {
    const response = await fetchActions();
    setData(response.data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  

  if (!data) return <LinearProgress color="primary" />;

  return (
    <Fragment>
      <SeedingsTable />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data.map(a => (
            <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={a}  secondary={`${a} category for documents and directories`} />
          </ListItem>
        ))}
    </List>
    </Fragment>
  );
};
