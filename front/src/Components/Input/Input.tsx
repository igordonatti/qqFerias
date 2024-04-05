import { styled } from "@mui/system";

export interface InputProps {
  typeInput: string;
  heightInput?: number;
  widthInput?: number;
  backColor?: string;
  border?: string;
  font?: number;
  fontColor?: string;
  value?: any;
  handleChange?: () => void;
  name?: string;
  id?: string;
}

const InputComponent = styled('input')({
  borderRadius: '16px',
  outline: 'none',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  color: "#EAEFEB",
  fontWeight: 'bold',
})

export function Input (props : InputProps) {
  return (
    <InputComponent
      type={props.typeInput || 'text'}
      sx={{
        width: props.widthInput || '648px',
        height: props.heightInput || '98px',
        background: props.backColor || 'rgb(255, 249, 108, 0.65)',
        border: props.border || 'none',
        fontSize: props.font + 'px'|| '40px',
        color: props.fontColor || '#EAEFEB'
      }}
      id={props.id || ''}
      onChange={() => props.handleChange}
    >
    </InputComponent>
  )
}
