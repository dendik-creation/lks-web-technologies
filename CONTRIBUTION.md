# Panduan kontribusi

Terima kasih atas minatmu menambahkan arsip ke repository ini.

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

1. Pastikan kamu memiliki izin untuk membagikan materi yang akan ditambahkan.
2. Buat atau pilih folder `<tahun>/<jenjang>/<lokasi>` yang sesuai.
3. Masukkan berkas sumber (PDF atau ZIP) ke folder tersebut.
4. Daftar arsip pada README diperbarui otomatis setiap hari, jadi tidak perlu mengeditnya manual. Jangan hapus penanda `<!-- daftar-arsip:start -->` dan `<!-- daftar-arsip:end -->`.
5. Ajukan pull request dengan format pada bagian [Format commit dan pull request](#format-commit-dan-pull-request).

## Format commit dan pull request

Pesan commit dan judul pull request memakai format:

```text
<tipe>: <deskripsi singkat>
```

- `<tipe>` wajib salah satu dari daftar di bawah.
- `<deskripsi singkat>` diawali huruf kecil, memakai kalimat perintah, tanpa titik di akhir, dan maksimal 72 karakter.
- Satu commit untuk satu tujuan, misalnya satu arsip atau satu perbaikan dokumentasi.

| Tipe | Penggunaan |
| --- | --- |
| `feat` | Menambahkan arsip baru, misalnya `feat: tambah arsip 2023 kabupaten kudus` |
| `fix` | Memperbaiki berkas, tautan, atau struktur folder, misalnya `fix: perbaiki tautan arsip 2023` |
| `docs` | Mengubah dokumentasi seperti README atau panduan ini |
| `refactor` | Merapikan struktur berkas atau folder tanpa mengubah isi materi |
| `chore` | Pemeliharaan lain, misalnya pembaruan `.gitignore` |

Contoh:

```text
feat: tambah arsip 2023 provinsi jawa-tengah
docs: perbarui daftar arsip pada README
```

Pull request mengikuti aturan yang sama:

- Judul pull request memakai format `<tipe>: <deskripsi singkat>`.
- Deskripsi minimal memuat ringkasan perubahan dan daftar arsip yang ditambahkan dalam bentuk `<tahun>/<jenjang>/<lokasi>`.
- Cantumkan pernyataan bahwa kamu memiliki izin untuk membagikan materi tersebut.
