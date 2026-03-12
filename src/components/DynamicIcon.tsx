import { type FC } from "react";
import { icons } from "lucide-react";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const DynamicIcon: FC<DynamicIconProps> = ({ name, size = 24, className }) => {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} />;
};

export default DynamicIcon;
