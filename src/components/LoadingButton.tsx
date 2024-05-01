import { ComponentPropsWithoutRef } from "react";
import Button from "./Button";
import { LoadingIndicator } from "stream-chat-react";

interface LoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}
export default function LoadingButton({
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading} value="Load more..">
      {loading ? <LoadingIndicator></LoadingIndicator> : props.children}
    </Button>
  );
}