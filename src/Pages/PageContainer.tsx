import Container from "@mui/material/Container";
import { FC, ReactNode } from "react";
import BackButton from "../Components/UI-Components/BackButton";

interface PageContainerProps {
  noBackButton?: boolean;
  noPadding?: boolean;
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = (props) => {
  return (
    <Container
      sx={{
        minWidth: 400,
        pt: props.noPadding ? 0 : 22,
      }}
      component="main"
      maxWidth="xs"
    >
      {props.children}

      {!props.noBackButton && <BackButton />}
    </Container>
  );
};

export default PageContainer;
