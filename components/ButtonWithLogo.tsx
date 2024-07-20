import React from "react";
import { Button } from "@/components/ui/button";

interface ButtonProps {
  name?: string;
  onClick?: () => void;
  image?: React.ReactElement;
  variant?: "primary" | "secondary"; // Extend the interface to include a variant prop
  disabled?: boolean;
}

function ButtonWithLogo(props: ButtonProps) {
  // Define a function or a mapping object to get Tailwind classes based on the variant
  const variantClasses: { primary: string; secondary: string } = {
    primary: "bg-customColors-google-blue text-customColors-google-white ",
    secondary: "bg-customColors-black text-customColors-white",
  };

  // Use the variant to select the appropriate class names
  const buttonClasses = `flex justify-around ${variantClasses[props.variant!]}`;

  return (
    <Button className={`${buttonClasses} flex items-center justify-center gap-2 font-bold`} onClick={props.onClick} disabled={props.disabled}>
        {props.image ? <div>{props.image}</div> : null}
        <div>{props.name}</div>
    </Button>
  );
}

export default ButtonWithLogo;
