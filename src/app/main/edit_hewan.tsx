import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HEWAN_STATUS_OPTIONS, HewanStatus } from "@/domain/entities/Hewan";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditHewanScreen() {
    
}