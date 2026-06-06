import { HewanStatus } from "@/domain/entities/Hewan";
import { useHewanViewModel } from "@/hooks/useHewanViewModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform
} from "react-native";

export default function EditHewanScreen() {
  const {
    id,
    nama: namaParam,
    jenis: jenisParam,
    harga: hargaParam,
    tanggal_lahir,
    status: statusParam,
  } = useLocalSearchParams<{
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
    tanggal_lahir ? new Date(tanggal_lahir) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState<HewanStatus>(statusParam ?? "tersedia");

  const { updateHewan, loading, error } = useHewanViewModel;
  const router = useRouter();

  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setTanggalLahir(selectedDate);
    }
  };

  const onSubmit = () => {
    const cleanNama = nama.trim();
    const cleanJenis = jenis.trim();
    const numericHarga = Number(harga);

    if (!cleanNama) {
      Alert.alert("Validasi Gagal", "Nama hewan wajib diisi");
      return;
    }
    if (!cleanJenis) {
      Alert.alert("Validasi Gagal", "Jenis hewan wajib diisi");
      return;
    }
    if (!harga || isNaN(numericHarga) || numericHarga <= 0) {
      Alert.alert(
        "Validasi Gagal",
        "Harga harus berupa angka lebih besar dari 0",
      );
      return;
    }

    updateHewan(
      Number(id),
      {
        nama: cleanNama,
        jenis: cleanJenis,
        harga: numericHarga,
        tanggal_lahir: formatDateString(tanggalLahir),
        status,
      },
      () => {
        router.back();
      },
    );
  };
  return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.header}>
            <ThemedText type="title">Edit Ternak</ThemedText>
          </ThemedView>
          <ThemedView style={styles.form}>
            {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
            <TextInput
              style={styles.input}
              placeholder="Nama hewan"
              placeholderTextColor="#94a3b8"
              value={nama}
              onChangeText={setNama}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis (contoh: Sapi Limosin)"
              placeholderTextColor="#94a3b8"
              value={jenis}
              onChangeText={setJenis}
            />
            <TextInput
              style={styles.input}
              placeholder="Harga (Rupiah)"
              placeholderTextColor="#94a3b8"
              keyboardType="number-pad"
              value={harga}
              onChangeText={(text) => {
                setHarga(text.replace(/[^0-9]/g, ""));
              }}
            />
            <TouchableOpacity
              style={styles.dateInputButton}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.dateText}>
                Tanggal Lahir: {formatDateString(tanggalLahir)}
              </ThemedText>
            </TouchableOpacity>
  
            {showDatePicker && (
              <DateTimePicker
                value={tanggalLahir}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onValueChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
            <ThemedText style={styles.labelText}>Status</ThemedText>
            <View style={styles.segmentContainer}>
              {HEWAN_STATUS_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.segmentButton,
                    status === opt.value && styles.segmentButtonActive,
                  ]}
                  onPress={() => setStatus(opt.value)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.segmentText,
                      status === opt.value && styles.segmentTextActive,
                    ]}
                  >
                    {opt.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.submitButtonText}>
                  Simpan Perubahan
                </ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    );
}
