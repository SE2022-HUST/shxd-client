import React, { FC, PropsWithChildren } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

interface ButtonAction {
  name: string;
  action: () => void;
}

interface IProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
  actions?: ButtonAction[];
}

const ActionDialog: FC<PropsWithChildren<IProps>> = ({
  title,
  text,
  actions,
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      {title === undefined ? <></> : <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {text === undefined ? (
          <></>
        ) : (
          <DialogContentText>{text}</DialogContentText>
        )}
        {children}
      </DialogContent>
      {actions === undefined ? (
        <></>
      ) : (
        <DialogActions>
          {actions.map((value, index) => (
            <Button key={index} onClick={value.action}>
              {value.name}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ActionDialog;
