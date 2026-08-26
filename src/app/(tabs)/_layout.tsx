import { Tabs } from 'expo-router/js-tabs';

import { TabBar } from '@/components/navigation/tab-bar';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.background },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="goals" options={{ title: 'Goals' }} />
      <Tabs.Screen name="tags" options={{ title: 'Tags' }} />
      {/* Reached from the home avatar and the add button; neither has a tab button. */}
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="new-movement" options={{ title: 'New Movement' }} />
    </Tabs>
  );
}
