import { FC } from "react";

import { FontLeading, FontSize, FontTracking } from "core/theme";

import { Container } from "./Container";
import { Text } from "./Text";

export const Footer: FC = () => (
  <footer className="bg-neutral-900">
    <Container>
      <div className="py-6 flex justify-center">
        <Text
          leading={FontLeading.tight}
          tracking={FontTracking.tighter}
          size={FontSize.xs}
        >
          Martin Rodin | 2022
        </Text>
      </div>
    </Container>
  </footer>
);
