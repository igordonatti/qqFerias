import { TextField } from "@mui/material"

import { AiOutlineSearch } from 'react-icons/ai';

interface inputProps {
  width?: string;
}

export const SearchBar = (props: inputProps) => {
  return (
      <TextField
      label={<AiOutlineSearch size="25px" color="#018749"/>}
      sx={{
        width: props.width ? props.width : '1100px',
        marginLeft: '20px',
        svg: {
          color: "black"
        }
      }}>
      </TextField>
  )
}
