import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import { styles } from "./_layout.styles";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} {...props} />;
}

function CustomTabBar(props: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      <BottomTabBar {...props} />

      <Pressable onPress={() => router.push("/add")} style={styles.addButton}>
        <FontAwesome name="plus" size={22} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2F66F5",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
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
