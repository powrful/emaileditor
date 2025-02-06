import { useTheme } from "@/components/theme/provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="iconSm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="" /> : <Moon className="" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
