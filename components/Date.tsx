import { FC } from "react";

import { TextColor } from "core/theme";
import { dateFormatter } from "core/utils";

import { Text } from "./Text";

type DateProps = {
  dateString: string;
};

export const Date: FC<DateProps> = ({ dateString }) => (
  <time dateTime={dateString}>
    <Text color={TextColor.neutral400}>{dateFormatter(dateString)}</Text>
  </time>
);
