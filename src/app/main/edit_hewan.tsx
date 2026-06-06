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
}
