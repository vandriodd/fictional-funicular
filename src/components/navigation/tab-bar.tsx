import { useRouter } from "expo-router";
import { type BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  GoalIcon,
  HistoryIcon,
  HomeIcon,
  PlusIcon,
  TagIcon,
  type IconProps,
} from "@/components/ui/icons";
import { Colors, Radius, Shadows } from "@/constants/theme";

const BAR_HEIGHT = 62;
const FAB_SIZE = 56;
const FAB_OVERHANG = 24;

type TabDescriptor = {
  name: string;
  label: string;
  Icon: (props: IconProps) => React.ReactElement;
};

const LEFT_TABS: TabDescriptor[] = [
  { name: "home", label: "Home", Icon: HomeIcon },
  { name: "history", label: "History", Icon: HistoryIcon },
];

const RIGHT_TABS: TabDescriptor[] = [
  { name: "goals", label: "Goals", Icon: GoalIcon },
  { name: "tags", label: "Tags", Icon: TagIcon },
];

function TabButton({
  tab,
  focused,
  onPress,
}: {
  tab: TabDescriptor;
  focused: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={tab.label}
      onPress={onPress}
      style={styles.tabButton}
    >
      <tab.Icon
        size={25}
        color={focused ? Colors.primary : Colors.textSecondary}
        filled={focused}
      />
    </Pressable>
  );
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderTab = (tab: TabDescriptor) => {
    const routeIndex = state.routes.findIndex(
      (route) => route.name === tab.name,
    );
    if (routeIndex === -1) return null;

    const route = state.routes[routeIndex];
    const focused = state.index === routeIndex;

    return (
      <TabButton
        key={route.key}
        tab={tab}
        focused={focused}
        onPress={() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { height: FAB_OVERHANG + BAR_HEIGHT + insets.bottom },
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.bar,
          { height: BAR_HEIGHT + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        {LEFT_TABS.map(renderTab)}
        <View style={styles.fabSlot} />
        {RIGHT_TABS.map(renderTab)}
      </View>

      <View style={styles.fabRow} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New movement"
          onPress={() => router.push('/new-movement')}
          style={({ pressed }) => [
            styles.fab,
            Shadows.glow(Colors.accent),
            pressed && { backgroundColor: Colors.accentPressed },
          ]}
        >
          <PlusIcon size={26} color={Colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  fabSlot: {
    width: FAB_SIZE + 16,
  },
  fabRow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
});
