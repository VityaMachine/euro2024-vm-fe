"use client";

import { createContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const MobileSideMenuContext = createContext<IMobileSideMenu>({
  open: false,
  toggleOpen: () => {},
});

export default function MobileSideMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const resizeHandler = () => {
      if (matches) {
        setOpen(false);
      }
    };

    resizeHandler();
  }, [matches]);

  const providerValue = { open, toggleOpen };

  return (
    <MobileSideMenuContext.Provider value={providerValue}>
      {children}
    </MobileSideMenuContext.Provider>
  );
}
