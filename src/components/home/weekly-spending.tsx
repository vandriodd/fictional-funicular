import { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Svg, { Path } from "react-native-svg";

import {
  Colors,
  FontFamily,
  Radius,
  ScreenPadding,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { last7Days } from "@/data/mock";
import { formatMoney } from "@/utils/format";
import { useProfile } from '@/state/profile';

const CARD_PADDING = 16;
const BAR_WIDTH = 22;
const CHART_HEIGHT = 190;
/** Wide enough that the outer date labels are not clipped by the card. */
const EDGE_SPACING = 16;
/** Headroom above the tallest bar so the callout has somewhere to sit. */
const MAX_VALUE = 14_000;
const CALLOUT_HEIGHT = 31;
/** Only used to decide which side of the bar the callout opens on. */
const CALLOUT_WIDTH_ESTIMATE = 120;

function CalloutCaret({ pointing }: { pointing: "left" | "right" }) {
  return (
    <Svg width={7} height={14} viewBox="0 0 7 14">
      <Path
        d={pointing === "left" ? "M0 7 7 0v14z" : "M7 7 0 0v14z"}
        fill={Colors.primary}
      />
    </Svg>
  );
}

export function WeeklySpending() {
  const { width } = useWindowDimensions();
  const { currency } = useProfile();
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const chartWidth = width - ScreenPadding * 2 - CARD_PADDING * 2;
  const pitch =
    (chartWidth - EDGE_SPACING * 2 - BAR_WIDTH) / (last7Days.length - 1);
  const spacing = pitch - BAR_WIDTH;

  // Nothing is accented until a bar is held.
  const bars = last7Days.map((day, index) => ({
    value: day.value,
    label: day.label,
    frontColor: index === pressedIndex ? Colors.accent : Colors.primarySoft,
  }));

  const barIndexAt = (x: number) => {
    const index = Math.round((x - EDGE_SPACING - BAR_WIDTH / 2) / pitch);
    return Math.min(last7Days.length - 1, Math.max(0, index));
  };

  const renderCallout = () => {
    if (pressedIndex === null) return null;

    const day = last7Days[pressedIndex];
    const barLeft = EDGE_SPACING + pressedIndex * pitch;
    const barTop = CHART_HEIGHT - (day.value / MAX_VALUE) * CHART_HEIGHT;
    const top = Math.min(CHART_HEIGHT - CALLOUT_HEIGHT, barTop + Spacing.sm);
    // Open to the left once there is no room left on the right.
    const flipped = barLeft + BAR_WIDTH + CALLOUT_WIDTH_ESTIMATE > chartWidth;

    return (
      <View
        style={[
          styles.callout,
          { top },
          flipped
            ? { right: chartWidth - barLeft + Spacing.xs }
            : { left: barLeft + BAR_WIDTH + Spacing.xs },
        ]}
        pointerEvents="none"
      >
        {!flipped && <CalloutCaret pointing="left" />}
        <View style={styles.calloutPill}>
          <Text style={styles.calloutText}>{formatMoney(day.value, currency)}</Text>
        </View>
        {flipped && <CalloutCaret pointing="right" />}
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Last 7 days</Text>

      <View style={styles.card}>
        <View style={styles.chartWrapper}>
          <BarChart
            data={bars}
            width={chartWidth}
            height={CHART_HEIGHT}
            maxValue={MAX_VALUE}
            barWidth={BAR_WIDTH}
            spacing={spacing}
            initialSpacing={EDGE_SPACING}
            endSpacing={EDGE_SPACING}
            roundedTop
            barBorderRadius={6}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            yAxisLabelWidth={0}
            xAxisThickness={0}
            disableScroll
            xAxisLabelTextStyle={styles.axisLabel}
          />

          {renderCallout()}

          <View
            style={StyleSheet.absoluteFill}
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => true}
            onResponderGrant={(event) =>
              setPressedIndex(barIndexAt(event.nativeEvent.locationX))
            }
            onResponderMove={(event) =>
              setPressedIndex(barIndexAt(event.nativeEvent.locationX))
            }
            onResponderRelease={() => setPressedIndex(null)}
            onResponderTerminate={() => setPressedIndex(null)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    letterSpacing: -0.2,
    color: Colors.ink,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingHorizontal: CARD_PADDING,
    paddingVertical: Spacing.xl,
    ...Shadows.card,
  },
  chartWrapper: {
    position: "relative",
  },
  callout: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  calloutPill: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  calloutText: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: Colors.white,
  },
  axisLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11.5,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
