import { FC, ReactNode } from "react";

import { FontSize, FontTracking, FontWeight, TextColor } from "core/theme";

type TextProps = {
  children: ReactNode;
  color?: TextColor;
  tracking?: FontTracking;
  size?: FontSize;
  weight?: FontWeight;
};

export const Text: FC<TextProps> = ({
  children,
  color = TextColor.neutral200,
  tracking = FontTracking.normal,
  size = FontSize.lg,
  weight = FontWeight.normal,
}) => (
  <p className={`leading-relaxed ${size} ${weight} ${color} ${tracking}`}>
    {children}
  </p>
);
