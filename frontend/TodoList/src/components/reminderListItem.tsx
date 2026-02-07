import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Margin } from "@mui/icons-material";
import { useState } from "react";

interface Reminder {
  reminder: string;
  notes: string;
  completed: boolean;
}

interface ReminderListItemProps {
  reminderItem: Reminder;
}

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  if (!reminderItem) {
    return <Text>No reminder data</Text>;
  }

  const [isCompleted, setIsCompleted] = useState(reminderItem.completed);

  return (
    <TouchableOpacity
      onPress={() => setIsCompleted((currentState) => !currentState)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey",
        paddingBottom: 10,
      }}
    >
      {isCompleted ? (
        <MaterialIcons name="radio-button-checked" size={24} color="#FF8C00" />
      ) : (
        <MaterialIcons
          name="radio-button-unchecked"
          size={24}
          color="#FF8C00"
        />
      )}

      <View style={{ gap: 2, flexShrink: 1 }}>
        <Text>{reminderItem.reminder}</Text>
        <Text style={{ fontSize: 12, color: "grey" }}>
          {reminderItem.notes}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color="#FF8C00"
        style={{ marginLeft: "auto", marginRight: 5 }}
      />
    </TouchableOpacity>
  );
}
