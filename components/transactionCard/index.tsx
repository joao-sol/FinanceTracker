import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { styles } from "./styles";

type TransactionType = "income" | "expense";

type TransactionCardProps = {
  title: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
};

export function TransactionCard({
  title,
  category,
  amount,
  date,
  type,
}: TransactionCardProps) {
  const isIncome = type === "income";

  return (
    <View style={styles.card}>
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
            color={isIncome ? "#4CAF50" : "#F25C2A"}
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
    </View>
  );
}
