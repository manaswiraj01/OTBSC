import React from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button"; // from shadcn/ui
import { Moon, Sun } from "lucide-react";       // icon library (optional)

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      {/* {theme === "dark" ? "Light Mode" : "Dark Mode"} */}
    </Button>
  );
}
