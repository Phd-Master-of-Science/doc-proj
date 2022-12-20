import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { fetchDocumentById } from "../api/fetchDocumentById";
import { LinearProgress } from "@mui/material";

export const PreviewDocument = () => {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);

  const dataFetch = async (id) => {
    const response = await fetchDocumentById(id);
    setDoc(response.data);
  };

  useEffect(() => {
    dataFetch(id);
  }, [id]);

  if (!doc) return <LinearProgress color="primary" />;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));

  const lightTheme = createTheme({ palette: { mode: "light" } });

  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: "background.default",
            display: "grid",
          }}
        >
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item xs={4}>
              <Item elevation={24}>
                <strong>createdDate</strong>
              </Item>
              <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                <strong>completedDate</strong>
              </Item>
              <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                <strong>sn</strong>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item elevation={24}>{doc.createdDate}</Item>
              <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                {doc.completedDate}
              </Item>
              <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                {doc.sn}
              </Item>
            </Grid>
          </Grid>
          <hr />
          {doc.files.map((f, j) => (
            <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
              <Grid item xs={4}>
                <Item elevation={24}>
                  <strong>{f.description} ({++j})</strong>
                </Item>
              </Grid>
            </Grid>
          ))}
          <hr />
          {doc.versions.map((v, i) => (
            <Grid container spacing={2} style={{ marginTop: "1rem" }}>
              <Grid item xs={4}>
                <Item elevation={24}>
                  <strong>version ({++i})</strong>
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                  <strong
                    style={v.current ? { color: "green" } : { color: "red" }}
                  >
                    {v.title}
                  </strong>{" "}
                  <strong>({v.action})</strong>
                </Item>
                {v.editors.map((e, j) => (
                  <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                    <strong style={{ color: "blue" }}>Editor ({++j})</strong>{" "}
                    {e.user.name} - {e.user.email} ({e.readDate})
                  </Item>
                ))}
                {v.recipients.map((r, k) => (
                  <Item elevation={24} style={{ marginTop: "0.5rem" }}>
                    <strong style={{ color: "green" }}>
                      Recipient ({++k})
                    </strong>{" "}
                    {r.user.name} - {r.user.email} ({r.sendDate})
                  </Item>
                ))}
              </Grid>
            </Grid>
          ))}
        </Box>
      </ThemeProvider>
    </div>
  );
};
