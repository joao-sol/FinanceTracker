import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBarContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    position: "absolute",
    alignSelf: "center",
    top: -24,
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: "#2F66F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#2F66F5",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
  },
});
