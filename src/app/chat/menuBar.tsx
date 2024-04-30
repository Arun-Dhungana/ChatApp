import { UserButton } from "@clerk/nextjs";
import { BellIcon, BellOff, BellRing, Moon, Sun, Users } from "lucide-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../ThemeProvider";
import { useEffect, useState } from "react";

interface MenuProps {
  onUserMenuClick: () => void;
}

export default function MenuBar({ onUserMenuClick }: MenuProps) {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-between gap-3 border-e-[#DBDDE1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton
        afterSignOutUrl="/"
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
      />
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
        <ThemeToggleButton></ThemeToggleButton>
      </div>
    </div>
  );
}
function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  if (theme === "dark") {
    return (
      <span title="Enable light theme">
        <Moon
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        ></Moon>
      </span>
    );
  }
  return (
    <span title="Enable dark theme">
      <Sun className="cursor-pointer" onClick={() => setTheme("dark")}></Sun>
    </span>
  );
}
