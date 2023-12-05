import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonType } from "types/button.types";

import Button from "components/button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={(e: SyntheticEvent<HTMLButtonElement, Event>): void => {
        e.preventDefault();
        navigate(-1);
      }}
      type={ButtonType.Back}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
