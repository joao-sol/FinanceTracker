import { useMemo } from "react";
import { Pressable, Text } from "react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { createStyles } from "./styles";

type FilterProps = {
  label: string;
  active?: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active = false, onPress }: FilterProps) {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Text
        style={[
          styles.chipText,
          active ? styles.chipTextActive : styles.chipTextInactive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
