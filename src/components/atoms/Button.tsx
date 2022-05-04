import React, { CSSProperties, FC } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  bold?: boolean;
  style?: CSSProperties;
  underline?: boolean;
  children?: React.ReactNode;
  component?: React.ElementType;
  to?: any;
}

const Button: FC<ButtonProps> = (props) => {
  const { bold, children, underline, style, component, ...rest } = props;

  return (
    <MuiButton
      component={component!}
      style={{
        fontWeight: bold ? 700 : 400,
        textDecoration: underline ? "underline" : "",
        
        ...style,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
