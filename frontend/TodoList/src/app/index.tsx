import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import { getReminders } from "../services/reminderService";
import { ActivityIndicator } from "react-native";
import ReminderListItem from "../components/reminderListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: "20%" }} />;
  }

  if (error) {
    return (
      <Text style={{ alignSelf: "center", marginTop: "20%" }}>
        {error.message}
      </Text>
    );
  }
  console.log(data);

  if (!data || data.length === 0) {
    return (
      <Text style={{ alignSelf: "center", marginTop: "20%" }}>
        No reminders found
      </Text>
    );
  }

  const reminderItem = data[0];
  const reminderItem2 = data[1];

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
      <Text
        style={{
          fontSize: 27,
          fontWeight: "bold",
          letterSpacing: 0.5,
          color: "#FF8C00",
          marginBottom: 15,
        }}
      >
        Reminders
      </Text>
      <ReminderListItem reminderItem={reminderItem} />
      <ReminderListItem reminderItem={reminderItem2} />
    </SafeAreaView>
  );
}
