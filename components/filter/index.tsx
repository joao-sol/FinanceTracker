import { Pressable, Text } from "react-native";

import { styles } from "./styles";

type FilterProps = {
  label: string;
  active?: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active = false, onPress }: FilterProps) {
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
