import ThemeProvider from "@/contexts/ThemeContext";
import MobileSideMenuProvider from "@/contexts/MobileSideMenuContext";
import SettingsMenuProvider from "@/contexts/SettingsMenuContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MobileSideMenuProvider>
        {/* <SettingsMenuProvider> */}
          {children}
        {/* </SettingsMenuProvider> */}
      </MobileSideMenuProvider>
    </ThemeProvider>
  );
}
