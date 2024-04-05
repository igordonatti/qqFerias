import { styled } from "@mui/system";
import { IconType } from "react-icons/lib";

interface buttonProps {
  text: string;
  marginTop?: string;
  Icon: IconType;
  backColor?: string;
  heightButton?: number;
  widthButton?: number;
  handleClick?: () => void;
}

const ButtonComponent = styled('button')({
  height: '50px',
  width: '300px',
  borderRadius: '16px',
  border: 'none',
  cursor: 'pointer',
  color: '#EAEFEB',
  fontWeight: 'bold',
  fontSize: '20px',
  svg: {
    width: '30px',
    height: '30px',
    color: '#EAEFEB', 
    padding: '0 20px 0 0',
  },
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  
})

export function ButtonIcon (props : buttonProps) {
  return (
    <>
      <ButtonComponent
        sx={{
          backgroundColor: props.backColor ||  'rgb(255, 249, 108, 0.65)',
          marginTop: props.marginTop || 0,
          height: props.heightButton + 'px',
          width: props.widthButton + 'px',
        }}
        onClick={props.handleClick}
      >
        <props.Icon /> 
        {props.text}
      </ButtonComponent>
    </>
  )
}
