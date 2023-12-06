type ButtonProps = {
  type?: "button" | "submit" | "reset";
  buttonType?: "primary" | "secondary";
  label?: string | React.ComponentProps<"svg">;
  className?: string;
  fullWidth?: boolean;
  icon?: JSX.Element;
  [key: string]: any;
};

export default function Button({
  type = "button",
  buttonType = "primary",
  loading = false,
  disabled = false,
  label,
  fullWidth = false,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  let buttonTypeClass = "";
  switch (buttonType) {
    case "primary":
      buttonTypeClass = "primary";
      break;
    case "secondary":
      buttonTypeClass = "CheckoutButton";
      break;
  }
  return (
    <button
      disabled={disabled}
      type={type}
      className={buttonTypeClass}
      {...props}
      style={{display:'flex' ,gap:8}}
    >
      <>
        {label && label}
        {icon && icon}
      </>
    </button>
  );
}
