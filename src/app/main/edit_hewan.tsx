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

  const [nama, setNama] = useState(namaParam ?? "");
  const [jenis, setJenis] = useState(jenisParam ?? "");
  const [harga, setHarga] = useState(hargaParam ?? "");
  const [tanggalLahir, setTanggalLahir] = useState(
    tanggal_lahir ? new Date(tanggal_lahir) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState<HewanStatus>(statusParam ?? "tersedia");

  const { updateHewan, loading, error } = useHewanViewModel;
  const router = useRouter();

}