import { FontSize, FontTracking, FontWeight, TextColor } from "core/theme";
import { FC, ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  color?: TextColor;
  tracking?: FontTracking;
  transform?: "capitalize" | "uppercase" | "lowercase";
  size?: FontSize;
  weight?: FontWeight;
};

export const Text: FC<TextProps> = ({
  children,
  color = TextColor.slate800,
  tracking = FontTracking.normal,
  size = FontSize.xs,
  weight = FontWeight.normal,
}) => <p className={`${size} ${weight} ${color} ${tracking}`}>{children}</p>;
