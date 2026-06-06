import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HEWAN_STATUS_OPTIONS, HewanStatus } from "@/domain/entities/Hewan";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
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
    const { id, nama: namaParam, jenis: jenisParam, harga: hargaParam, tanggal_lahir, status: statusParam } = useLocalSearchParams<{
    id: string;
    nama: string;
    jenis: string;
    harga: string;
    tanggal_lahir: string;
    status: HewanStatus;
  }>();

}