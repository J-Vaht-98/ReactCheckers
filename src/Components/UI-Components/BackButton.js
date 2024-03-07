import { Button } from "@mui/material";

function BackButton(props) {
  return (
    <Button
      sx={
        props.sx ?? {
          width: "30%",
          mt: props.mt ?? 2,
        }
      }
      variant="contained"
      color="error"
      onClick={
        props.to
          ? (window.location.href = props.to)
          : () => window.history.back()
      }
    >
      {props.children ?? "Back"}
    </Button>
  );
}

export default BackButton;
