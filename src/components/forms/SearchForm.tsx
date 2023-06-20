import { Stack, TextField } from "@mui/material";
import { purple } from "material-ui-colors";
import React from "react";
import { SearchProps } from "../../interfaces/Interfaces";

export const SearchForm = ({ handleSearch }: SearchProps) => {
  return (
    <>
      <Stack>
        <TextField
          label="Поиск по фамилии"
          onChange={handleSearch}
          size="small"
          defaultValue="Поиск по фамилии"
          color="secondary"
          sx={{
            marginLeft: 1.5,
            marginBottom: 1.5,
            maxWidth: "10%",
            background: purple[50],
            input: {
              color: "var(--color-black)",
              fontSize: {
                xs: "0.7rem",
                sm: "0.8rem",
                md: "0.9rem",
                lg: "1rem",
                xl: "1.2rem",
              },
              padding: {
                xs: "0.5rem",
                sm: "0.6rem",
                md: "0.7rem",
                lg: "0.8rem",
                xl: "1rem",
              },
            },
          }}
        />
      </Stack>
    </>
  );
};
