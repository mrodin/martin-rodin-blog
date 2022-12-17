import { FC, ReactNode } from "react";

import {
  FontLeading,
  FontSize,
  FontTracking,
  FontWeight,
  TextColor,
} from "core/theme";

type TextProps = {
  children: ReactNode;
  color?: TextColor;
  leading?: FontLeading;
  tracking?: FontTracking;
  size?: FontSize;
  weight?: FontWeight;
};

export const Text: FC<TextProps> = ({
  children,
  color = TextColor.neutral200,
  leading = FontLeading.relaxed,
  tracking = FontTracking.normal,
  size = FontSize.lg,
  weight = FontWeight.normal,
}) => (
  <p className={`${color} ${leading} ${tracking} ${size} ${weight}`}>
    {children}
  </p>
);
