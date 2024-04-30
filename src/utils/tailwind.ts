import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
const twconfig = resolveConfig(tailwindConfig);
const mdBreakpoint = parseInt((twconfig.theme?.screens as any).md);

export { mdBreakpoint };
