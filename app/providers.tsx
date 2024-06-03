import ThemeProvider from "@/contexts/ThemeContext";
import MobileSideMenuProvider from "@/contexts/MobileSideMenuContext";
import SettingsMenuProvider from "@/contexts/SettingsMenuContext";
import AuthProvider from "@/contexts/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
      <MobileSideMenuProvider>
        {/* <SettingsMenuProvider> */}
          {children}
        {/* </SettingsMenuProvider> */}
      </MobileSideMenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
