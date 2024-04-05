import { styled } from "@mui/system";

interface buttonProps {
  text: string;
  marginTop?: string;
  backColor?: string;
  textColor?: string;
  heightButton?: number;
  widthButton?: number;
  font?: number;
  handleClick?: () => void;
}

const ButtonComponent = styled('button')({
  borderRadius: '16px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '40px',
  alignItems: 'center',
})

export function Button ({handleClick, backColor, marginTop, text, textColor, heightButton, widthButton, font} : buttonProps) {
  return (
    <>
      <ButtonComponent
        sx={{
          backgroundColor: backColor ||  'rgb(255, 249, 108, 0.65)',
          marginTop: marginTop || 0,
          color: textColor || "#EAEFEB",
          height: heightButton + 'px' || '98px',
          width: widthButton + 'px' || '648px',
          fontSize: font + 'px' || '40px'
        }}
        onClick={handleClick}
      >
        {text}
      </ButtonComponent>
    </>
  )
}
