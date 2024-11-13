import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import "./theme.css";

export default function ChangeTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="light-dark-mode">
      <div className="container">
        <p>Hello world</p>
        <button onClick={handleToggleTheme}>Change Theme</button>
      </div>
    </div>
  );
}
