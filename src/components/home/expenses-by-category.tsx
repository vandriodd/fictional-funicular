import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { Colors, FontFamily, Radius, Spacing } from "@/constants/theme";
import { expensesByCategory } from "@/data/mock";
import { useMoney } from '@/hooks/use-money';

const RADIUS = 78;
const RING_THICKNESS = 21;
const START_ANGLE = (-58 * Math.PI) / 180;

export function ExpensesByCategory() {
  const money = useMoney();
  const slices = expensesByCategory.map(({ value, color }) => ({
    value,
    color,
  }));

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Expenses by category</Text>

      <View style={styles.row}>
        <PieChart
          data={slices}
          donut
          radius={RADIUS}
          innerRadius={RADIUS - RING_THICKNESS}
          innerCircleColor={Colors.background}
          initialAngle={START_ANGLE}
        />

        <View style={styles.legend}>
          {expensesByCategory.map((category) => (
            <View key={category.label} style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: category.color }]} />
              <Text style={styles.legendLabel}>{category.label}</Text>
              <Text style={styles.legendValue}>
                {money.format(category.value)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.lg,
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    letterSpacing: -0.2,
    color: Colors.ink,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  legend: {
    flex: 1,
    gap: Spacing.lg,
    paddingLeft: Spacing.lg,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: Radius.pill,
  },
  legendLabel: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
  legendValue: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.ink,
  },
});
