import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";

const DateTimePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        date.getHours(),
        date.getMinutes()
      );
      setDate(newDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setDate(newDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Date Picker Button */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.button}
        accessibilityLabel="Select date"
      >
        <Text style={styles.buttonText}>{format(date, "MMM d, yyyy")}</Text>
      </TouchableOpacity>

      {/* Time Picker Button */}
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.button}
        accessibilityLabel="Select time"
      >
        <Text style={styles.buttonText}>{format(date, "h:mm a")}</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          accentColor={Colors.header}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
          accentColor={Colors.header}
          backgroundColor={Colors.header}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#2F4F4F",
  },
});

export default DateTimePickerComponent;
