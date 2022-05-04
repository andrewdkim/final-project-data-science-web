import { Typography } from "@mui/material";
import { FC } from "react";

export interface DescriptionProps {
  title: string;
  titleSize?: "sm" | "md" | "lg"
  description?: string;
}

const Description: FC<DescriptionProps> = (props) => {
  const { title, titleSize="sm", description } = props;
  return (
    <>
      <Typography
        variant={titleSize === "lg" ? "h4" : titleSize === "md" ? "h5" : "h6"}
        color="textPrimary"
        style={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="secondary">
        {description}
      </Typography>
    </>
  );
};

export default Description;
