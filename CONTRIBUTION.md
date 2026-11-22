# Panduan kontribusi

Terima kasih atas minat Anda menambahkan arsip ke repository ini.

## Struktur folder

Arsip dikelompokkan berdasarkan **tahun**, lalu **jenjang** (`kabupaten`, `provinsi`, `nasional`, atau `wordskills`), lalu **lokasi**:

```text
<tahun>/<jenjang>/<lokasi>/<isi source>
```

- Nama folder tahun wajib 4 digit angka, misalnya `2023`.
- Nama folder jenjang hanya boleh `kabupaten`, `provinsi`, `nasional`, atau `wordskills`.
- Gunakan huruf kecil untuk nama folder lokasi dan pisahkan kata dengan tanda hubung, misalnya `jawa-tengah`.
- Isi source dapat berupa berkas PDF atau arsip ZIP/RAR, disimpan langsung di dalam folder lokasi.

Contoh struktur saat ini:

```text
2023/
├── kabupaten/
│   └── kudus/
│       └── <isi source>
└── provinsi/
    └── jawa-tengah/
        └── <isi source>
```

## Menambahkan arsip

1. Pastikan Anda memiliki izin untuk membagikan materi yang akan ditambahkan.
2. Buat atau pilih folder `<tahun>/<jenjang>/<lokasi>` yang sesuai.
3. Masukkan berkas sumber (PDF atau ZIP) ke folder tersebut.
4. Tambahkan entri pada tabel [Daftar arsip](README.md#daftar-arsip) di README.
5. Ajukan pull request agar dapat ditinjau.
