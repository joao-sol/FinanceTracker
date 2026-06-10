import { FontAwesome } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { createStyles } from "./styles";

type TransactionType = "income" | "expense";

type TransactionCardProps = {
  title: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  onLongPress?: () => void;
};

export function TransactionCard({
  title,
  category,
  amount,
  date,
  type,
  onLongPress,
}: TransactionCardProps) {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isIncome = type === "income";

  return (
    <Pressable
      onLongPress={onLongPress}
      delayLongPress={350}
      style={styles.card}
    >
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            isIncome ? styles.incomeIconBg : styles.expenseIconBg,
          ]}
        >
          <FontAwesome
            name={isIncome ? "arrow-up" : "arrow-down"}
            size={16}
            color={isIncome ? colors.income : colors.expense}
          />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text
          style={[styles.amount, isIncome ? styles.income : styles.expense]}
        >
          {isIncome ? "+ " : "- "}R$ {amount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Pressable>
  );
}
