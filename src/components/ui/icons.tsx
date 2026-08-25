/**
 * Line icons drawn on a 24x24 grid so they share stroke weight and optical size.
 */

import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

export type IconProps = {
  size?: number;
  color: string;
  /** Filled variants are used for the active tab. */
  filled?: boolean;
} & Omit<SvgProps, 'color'>;

const STROKE_WIDTH = 1.9;

function IconBase({ size = 24, children, ...rest }: SvgProps & { size?: number }) {
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
        fill={filled ? color : 'none'}
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
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
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
