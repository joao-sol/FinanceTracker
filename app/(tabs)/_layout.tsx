import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  BottomTabBar,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { router, Tabs } from "expo-router";
import { useMemo } from "react";
import { Pressable, View } from "react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { createStyles } from "./_styles";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} {...props} />;
}

type CustomTabBarProps = BottomTabBarProps & {
  iconColor: string;
  tabStyles: ReturnType<typeof createStyles>;
};

function CustomTabBar({ iconColor, tabStyles, ...props }: CustomTabBarProps) {
  return (
    <View style={tabStyles.tabBarContainer}>
      <BottomTabBar {...props} />

      <Pressable
        onPress={() => router.push("/add")}
        style={tabStyles.addButton}
      >
        <FontAwesome name="plus" size={22} color={iconColor} />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Tabs
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          iconColor={colors.primaryContrast}
          tabStyles={styles}
        />
      )}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="charts/index"
        options={{
          title: "Gráficos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
