import { Spacer, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";

export const Navbar = ({ backNavigation, title }) => {
  const { theme } = useTheme();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: theme.colors.gray200.value,
      }}
    >
      {backNavigation && <div onClick={handleBack}>Volver</div>}
      {/* <Spacer css={{ flex: 1 }} /> */}

      {title && <div>{title}</div>}
      <span>Mundo</span>
    </div>
  );
};
