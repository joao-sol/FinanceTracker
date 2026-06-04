import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { initializeDatabase } from "@/database";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [databaseReady, setDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState<Error | null>(null);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (databaseError) throw databaseError;
  }, [databaseError]);

  useEffect(() => {
    let isMounted = true;

    async function prepareApp() {
      if (!loaded) return;

      try {
        await initializeDatabase();
        await Promise.all([
          useCategoryStore.getState().loadCategories(),
          useTransactionStore.getState().loadTransactions(),
        ]);

        if (isMounted) {
          setDatabaseReady(true);
        }
      } catch (caughtError) {
        if (isMounted) {
          setDatabaseError(
            caughtError instanceof Error
              ? caughtError
              : new Error("Não foi possível carregar o banco de dados."),
          );
        }
      } finally {
        if (isMounted) {
          await SplashScreen.hideAsync();
        }
      }
    }

    prepareApp();

    return () => {
      isMounted = false;
    };
  }, [loaded]);

  if (!loaded || !databaseReady) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add/index" />
        <Stack.Screen name="categories/index" />
      </Stack>
    </ThemeProvider>
  );
}
