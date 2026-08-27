/**
 * Line icons drawn on a 24x24 grid so they share stroke weight and optical size.
 */

import Svg, { Circle, Path, Rect, type SvgProps } from "react-native-svg";

export type IconProps = {
  size?: number;
  color: string;
  filled?: boolean;
} & Omit<SvgProps, "color">;

const STROKE_WIDTH = 1.9;

function IconBase({
  size = 24,
  children,
  ...rest
}: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      {children}
    </Svg>
  );
}

export function HomeIcon({ size, color, filled, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M3.5 10.4 12 3.6l8.5 6.8V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path
        d="M9.6 20.5v-5.1a2.4 2.4 0 0 1 4.8 0v5.1"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </IconBase>
  );
}

export function HistoryIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M3.5 12a8.5 8.5 0 1 0 2.83-6.33L3.5 8.2"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 3.9v4.4h4.4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 7.7V12l3.2 1.9"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function GoalIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M20.2 8.1A8.5 8.5 0 1 1 15.9 3.8"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M16.6 11.4a4.7 4.7 0 1 1-4-4.05"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="m12 12 7.6-7.6"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M15.6 3.2h4.9v4.9"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function TagIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2c0 .53.21 1.04.59 1.41l8.7 8.71a2.43 2.43 0 0 0 3.43 0l6.58-6.59a2.43 2.43 0 0 0 0-3.43z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Circle cx={7.4} cy={7.4} r={1.35} fill={color} />
    </IconBase>
  );
}

export function BellIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M18 8.4a6 6 0 1 0-12 0c0 4.2-1.3 5.6-2.5 6.9a1 1 0 0 0 .74 1.7h15.5a1 1 0 0 0 .74-1.7C19.3 14 18 12.6 18 8.4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path
        d="M10.3 20.4a2 2 0 0 0 3.46 0"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function PlusIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function ArrowUpIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M12 19.5v-15M5.6 10.9 12 4.5l6.4 6.4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ArrowDownIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M12 4.5v15M5.6 13.1 12 19.5l6.4-6.4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function CheckIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="m5 12.5 4.6 4.5L19 6.8"
        stroke={color}
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronLeftIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="m15 18-6-6 6-6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronRightIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="m9 18 6-6-6-6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronDownIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="m6 9 6 6 6-6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function PencilIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M16.9 3.1a2.85 2.85 0 0 1 4 4L7.6 20.4 2.4 21.6l1.2-5.2z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path
        d="m14.8 5.2 4 4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function UserCircleIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Circle
        cx={12}
        cy={12}
        r={9.3}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Circle
        cx={12}
        cy={10}
        r={3.1}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Path
        d="M6.2 19.4a6.6 6.6 0 0 1 11.6 0"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function MailIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Rect
        x={2.4}
        y={4.6}
        width={19.2}
        height={14.8}
        rx={3}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Path
        d="m3.6 7.6 7.3 5.2a2 2 0 0 0 2.2 0l7.3-5.2"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function KeyIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Circle
        cx={7.2}
        cy={12}
        r={4.3}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Circle cx={7.2} cy={12} r={1.2} fill={color} />
      <Path
        d="M11.5 12h9.1"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M17 12v3.1M20.6 12v2.3"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function CurrencyIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Circle
        cx={15.2}
        cy={6.9}
        r={3.4}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Path
        d="M10.8 16.1h2.5a1.85 1.85 0 0 0 0-3.7H9.9c-.5 0-1 .2-1.35.55L5.1 16.3"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m7.4 21 1.5-1.35c.3-.28.7-.43 1.1-.43h3.6c.9 0 1.75-.34 2.4-.95l3.9-3.7"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m2.4 16.4 5.3 5.3"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function FingerprintIcon({ size, color, ...rest }: IconProps) {
  const stroke = {
    stroke: color,
    strokeWidth: STROKE_WIDTH,
    strokeLinecap: "round" as const,
  };
  return (
    <IconBase size={size} {...rest}>
      <Path d="M2.6 11.4a9.4 9.4 0 0 1 16.6-5.6" {...stroke} />
      <Path d="M21.3 9.9c.2 1.6.2 3.6.1 5.1" {...stroke} />
      <Path
        d="M5.4 19.2c.5-1.5 1-4.3 1-7.2a5.6 5.6 0 0 1 .35-1.95"
        {...stroke}
      />
      <Path d="M9.2 7.1a5.6 5.6 0 0 1 8.4 4.9v2" {...stroke} />
      <Path d="M12 10.2a1.9 1.9 0 0 0-1.9 1.9c0 1-.1 2.4-.25 3.8" {...stroke} />
      <Path d="M13.9 13.2c0 2.3 0 6.1-.95 8.5" {...stroke} />
      <Path d="M17.1 20.8c.12-.6.4-2.2.47-2.9" {...stroke} />
      <Path d="M8.6 21.7c.2-.63.43-1.26.55-1.9" {...stroke} />
    </IconBase>
  );
}

export function SmartphoneIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Rect
        x={5.6}
        y={2.2}
        width={12.8}
        height={19.6}
        rx={3}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Path
        d="M12 18.2h.01"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function LogOutIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M9.4 20.8H5.6a2.4 2.4 0 0 1-2.4-2.4V5.6a2.4 2.4 0 0 1 2.4-2.4h3.8"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m15.8 16.6 4.6-4.6-4.6-4.6M20.4 12H9.2"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function SearchIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Circle cx={11} cy={11} r={7.4} stroke={color} strokeWidth={STROKE_WIDTH} />
      <Path d="m16.4 16.4 4.2 4.2" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </IconBase>
  );
}

export function FilterIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M4 7.5h16M7 12h10M10 16.5h4"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function EditIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M11 4.2H5.4a2.4 2.4 0 0 0-2.4 2.4v12a2.4 2.4 0 0 0 2.4 2.4h12a2.4 2.4 0 0 0 2.4-2.4V13"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.6 2.9a2.1 2.1 0 0 1 3 3l-8.4 8.4-3.9.9.9-3.9z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function MoreIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Circle cx={12} cy={5} r={1.7} fill={color} />
      <Circle cx={12} cy={12} r={1.7} fill={color} />
      <Circle cx={12} cy={19} r={1.7} fill={color} />
    </IconBase>
  );
}

export function TrashIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M3.8 6.2h16.4M8.6 6.2V4.4a1.6 1.6 0 0 1 1.6-1.6h3.6a1.6 1.6 0 0 1 1.6 1.6v1.8"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.8 6.2h12.4l-.9 13a1.9 1.9 0 0 1-1.9 1.8H8.6a1.9 1.9 0 0 1-1.9-1.8z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function HangerIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M12 9.2V7.6a2.3 2.3 0 1 1 2.3-2.3"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M12 9.2 3.5 16.3a1.6 1.6 0 0 0 1 2.9h15a1.6 1.6 0 0 0 1-2.9z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function BurgerIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M4.6 10.4a7.4 7.4 0 0 1 14.8 0z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path d="M4.2 13.6h15.6" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Path
        d="M4.6 16.6h14.8a3.2 3.2 0 0 1-3.2 3.2H7.8a3.2 3.2 0 0 1-3.2-3.2z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function WalletIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Rect x={2.9} y={5.4} width={18.2} height={13.2} rx={3.2} stroke={color} strokeWidth={STROKE_WIDTH} />
      <Path d="M2.9 9.6h9.6" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Rect x={15.4} y={11.2} width={5.7} height={4.2} rx={1.6} stroke={color} strokeWidth={STROKE_WIDTH} />
    </IconBase>
  );
}

export function DocumentsIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="M13.4 3.2H8.8A2.4 2.4 0 0 0 6.4 5.6v12a2.4 2.4 0 0 0 2.4 2.4h8a2.4 2.4 0 0 0 2.4-2.4V9z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path d="M13.4 3.2V9h5.8" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinejoin="round" />
      <Path
        d="M4.2 7.6A2.4 2.4 0 0 0 2.6 9.9v8.7a3.2 3.2 0 0 0 3.2 3.2h7.4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function PillIcon({ size, color, ...rest }: IconProps) {
  return (
    <IconBase size={size} {...rest}>
      <Path
        d="m10.5 20.5 10-10a5 5 0 0 0-7.07-7.07l-10 10a5 5 0 0 0 7.07 7.07Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <Path d="m8.5 8.5 7 7" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </IconBase>
  );
}
