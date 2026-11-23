import { Locale } from '../domain/types';

export interface QuestLinkItem {
  label: string;
  href: string;
  kind: 'submission' | 'internal' | 'artifact' | 'brief';
}

export interface QuestTrailItem {
  phase: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5';
  code: string;
  challengeName: string;
  title: string;
  deliverable: string;
  status: string;
  tone: 'good' | 'warn' | 'accent' | 'neutral';
  completed: boolean;
  summary: string;
  boundary: string;
  links?: QuestLinkItem[];
}
export const QUEST_CATALOG: Record<Locale, QuestTrailItem[]> = {
  id: [
    {
      phase: "Q1",
      code: "Q1.02",
      challengeName: "Scan the Signals",
      title: "Reality Signal Map",
      deliverable: "10 Sinyal Masalah & 3 Prioritas Awal",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Mengumpulkan 10 sinyal masalah nyata bersama Muhammad Faiz Roihan (Faiz S01–S05; saya S06–S10). Sinyal S07 mengenai koordinasi waktu pertemuan kelompok yang berulang di WhatsApp dipilih sebagai prioritas utama untuk ditelusuri.",
      boundary: "Batas bukti: skor dan estimasi durasi pada tahap ini masih berupa penyaringan awal, belum membuktikan kebutuhan aplikasi baru.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-02-Mohammad-Ferdinand-Valliandra-3da333dd1d28801b99dcd81131812385",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/C-Zone-Q1-02-Turn-Signals-into-Evidence-3ca333dd1d2880b59d71cc6a33f6e9d1",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.03",
      challengeName: "Enter Their World",
      title: "User Context Observation Pack",
      deliverable: "Observasi Kontekstual, Activity Flow & Context Map",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Mengamati langsung P01 mengoordinasikan rapat kelompok melalui WhatsApp di Warkop Idola Keputih pada 17 September 2026 (pesan awal 20.55, rangkuman/kompromi 20.58, pengumuman 21.00, konfirmasi lengkap 21.51). Mulai Q1.03 proyek saya kerjakan secara individu.",
      boundary: "Batas bukti: satu kejadian observasi dengan keterlibatan saya menyiapkan kerangka pesan; jeda 51 menit pasca-pengumuman tidak diklaim sebagai waktu produktif yang hilang.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-03_Andra-3e0333dd1d2880229aa0e7c76d006b1a",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Context-Evidence-Map-Turn-Observation-into-Evidence-3cc333dd1d288067bafec2a4dcb85b51",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.04",
      challengeName: "Hear the Unsaid",
      title: "User Interview Evidence Pack",
      deliverable: "Three Voices, One Emerging Need (P01, P02, P03)",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Wawancara tatap muka pada 24 September 2026 bersama P01 & P03 (koordinator) serta P02 (anggota). Menemukan pergeseran kunci: menyatakan \"bisa/tersedia\" di chat atau polling belum tentu berarti berkomitmen hadir pada jadwal final.",
      boundary: "Batas bukti: analisis bertumpu pada catatan wawancara yang dikonfirmasi peserta tanpa rekaman transkrip verbatim.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-04_Mohammad-Ferdinand-Valliandra-3e5333dd1d2880a7a034f90100b6fbd1",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Three-Voices-One-Emerging-Need-Dengarkan-Ceritanya-Temukan-Kebutuhannya-3cc333dd1d288015b664cca07bfaba25",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.05",
      challengeName: "Decode the Pain",
      title: "The Human Insight Atlas",
      deliverable: "Evidence Library, Affinity Map, Persona Raka & PP01–PP04",
      status: "Terkumpul · Notion & Forum",
      tone: "good",
      completed: true,
      summary: "Menyintesis temuan observasi dan wawancara ke dalam peta afinitas, persona komposit Raka, empathy map, serta customer journey. Menetapkan PP02 (kelengkapan dan tingkat kepastian respons yang belum terlihat bersama) sebagai critical pain.",
      boundary: "Batas bukti: Raka adalah persona komposit sintesis, bukan partisipan baru; klaim dampak awal dibaca bersama penyempitan pada Q1.06.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-05_Mohammad-Ferdinand-Valliandra-3ee333dd1d2880f18066cd2366152ef2",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Human-Insight-Atlas-From-Voices-to-Critical-Pains-3cc333dd1d288036b8d4c8fe491ace48",
          kind: "brief"
        },
        {
          label: "Forum Classroom",
          href: "https://classroom.its.ac.id/mod/forum/discuss.php?d=6708#p18009",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.06",
      challengeName: "Prove It Matters",
      title: "Problem Proof Dossier",
      deliverable: "Triangulasi, 5 Whys, Counterevidence & Keputusan Refine",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Menguji ketahanan rumusan masalah lewat triangulasi bukti, penelusuran sebab terbatas, pemetaan pemangku kepentingan, dan bukti pembanding P02. Memilih keputusan Refine untuk mempersempit masalah ke pembacaan kecukupan respons dan alasan keputusan koordinator.",
      boundary: "Batas bukti: cerita lanjutan P02 menunjukkan keterlambatan mulai rapat 15–30 menit berkaitan dengan perjalanan/kegiatan sebelumnya, bukan semata menunggu konfirmasi chat.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-06_Mohammad-Ferdinand-Valliandra-3f2333dd1d288028b75ed7e10cff1984",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Problem-Proof-Dossier-From-Pain-to-Proof-Buktikan-Masalahnya-Layak-Diperjuangkan-3cc333dd1d2880bbbfaad448d59eee48",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.07",
      challengeName: "Pitch the Problem",
      title: "Problem Pitch Portfolio",
      deliverable: "Deck 8 Slide, Brief Bukti, Naskah & Video Pitch",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Menyusun presentasi lima menit berbasis bukti manusia dan keterbatasan data (tanpa melompat menawarkan fitur aplikasi), dilengkapi deck 8 slide, problem evidence brief, rekaman video, serta catatan Scroll individu.",
      boundary: "Batas arsip: formulir PDF Q&A, peer assessment, dan revision sheet tersedia sebagai berkas pendamping; kelengkapan isi feedback eksternal tidak diklaim melampaui arsip.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-07-Mohammad-Ferdinand-Valliandra-3f2333dd1d28807fa332e9966d1e96f8",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Pitch-The-Problem-Make-the-Problem-Impossible-to-Ignore-3cc333dd1d288094b9d3e1b591fb4b69",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.08",
      challengeName: "Shift the Lens",
      title: "The Lens Shift Portfolio",
      deliverable: "Before–After, Assumption Autopsy & Refleksi CPMK 1",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Mendokumentasikan perubahan cara pandang individual berbasis jejak artefak Q1.02–Q1.07: bergeser dari asumsi \"mencari slot waktu kosong\" menjadi persoalan ambang kecukupan dan kepastian komitmen jadwal.",
      boundary: "Batas bukti: refleksi individual atas artefak nyata yang dikerjakan sendiri tanpa mengarang dialog review eksternal.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q1-08-Mohammad-Ferdinand-Valliandra-3f2333dd1d2880b88cf1ce6896f3a281",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Lens-Shift-Portfolio-Buktikan-bahwa-caramu-melihat-masalah-telah-berubah-3cc333dd1d28800abd3eed5c3d0ce647",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.02",
      challengeName: "Idea Storm",
      title: "Alternative Solution Portfolio",
      deliverable: "6 Alternatif Solusi, Risiko/Asumsi & Matriks Pemilihan",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Membandingkan enam alternatif solusi terhadap masalah koordinasi jadwal kelompok (mulai dari protokol pesan terstruktur hingga papan kesiapan keputusan) beserta analisis manfaat, risiko, dan asumsi tiap opsi.",
      boundary: "Koreksi terbuka pada tahap lanjut: jumlah skor matriks awal Decision Readiness Board adalah 17/20 (bukan 20/20), sedangkan Confirmation Protocol 19/20.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q2-02_Mohammad-Ferdinand-Valliandra-3fa333dd1d288088b65dfbab3568288e",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Idea-Lab-One-Problem-Many-Solutions-Don-t-Fall-in-Love-with-Your-First-Idea-3cc333dd1d2880d9b55be99aa9c1f036",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.03",
      challengeName: "Make The Bet",
      title: "Solution Bet Dossier",
      deliverable: "Value Proposition, Lean Canvas, Asumsi A1–A12 & Hipotesis H1–H4",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Menetapkan Decision Readiness Board sebagai kandidat utama dengan Confirmation Protocol sebagai aturan penggunaan. Merumuskan dua syarat ambang hipotesis H1/A3 terhadap rangkuman chat berinformasi setara sebelum eksperimen dijalankan.",
      boundary: "Batas status: kanvas nilai dan skor prioritas risiko merupakan rancangan taruhan uji, bukan bukti validasi pengguna.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/Q2-03-Solution-Bet-Dossier-4047d157485d804c8976ec54be036b8d",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Bet-Lab-Choose-What-Matters-One-Solution-Clear-Value-Testable-Assumptions-3f6333dd1d2880419d78f527a47692cb",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.04",
      challengeName: "Run The Experiment",
      title: "Experiment Evidence Pack",
      deliverable: "Eksplorasi R1–R3 & Uji Komparatif Skenario K1–K3",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Melaksanakan eksplorasi awal R1–R3 melalui 8 pertanyaan WhatsApp serta perbandingan skenario C/D pada K1–K3: ketepatan jawaban sama (3/3 benar pada chat maupun board) dengan durasi rata-rata terlapor 75 detik pada chat vs 40 detik pada board.",
      boundary: "Batas bukti: R1–R3 dan K1–K3 tidak otomatis berjumlah enam orang unik; bukti stopwatch mentah, pesan asli, dan kontrol urutan seri K belum terdokumentasi penuh.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q2-04-Mohammad-Ferdinand-Valliandra-406333dd1d288041b717f22c09eaf7bd",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Experiment-Lab-Prove-It-with-Evidence-Don-t-Just-Say-It-Works-Show-What-Happened-3f6333dd1d28802e9668d8b87fadafb7",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.05",
      challengeName: "Follow The Signal",
      title: "Evidence-to-Decision Report",
      deliverable: "Evaluasi Target–Aktual, Verdict H1 Inconclusive & Keputusan Pra-MVP",
      status: "Terkumpul · H1 Inconclusive",
      tone: "warn",
      completed: true,
      summary: "Menilai hasil Q2.04 secara ketat terhadap syarat ambang Q2.03: data mendukung H1 secara indikatif, namun validasi memadai ditetapkan Inconclusive sehingga diputuskan validasi tambahan sebelum perluasan MVP.",
      boundary: "Komitmen metodologis: verdict H1 Inconclusive dipertahankan hingga pengujian ulang berinstrumen lengkap dan uji beban pembaruan (H3) terlaksana.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q2-05-Mohammad-Ferdinand-Valliandra-408333dd1d28808c911bcd891fd740f8",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Decision-Lab-Make-Your-Move-Read-the-Evidence-Own-the-Decision-3f6333dd1d288033a543edfc84d2b0f7",
          kind: "brief"
        },
        {
          label: "Diagram SVG",
          href: "/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.06",
      challengeName: "Lean Checkpoint",
      title: "Lean Evidence Trail (Part B)",
      deliverable: "Peta Kausal Keputusan Q2.02–Q2.05 & Audit Kesiapan Solusi",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Menyusun peta jejak penalaran dari masalah tersempit Q1, koreksi skor alternatif Q2.02, taruhan hipotesis Q2.03, pemisahan bukti R dan K pada Q2.04, hingga keputusan validasi tambahan Q2.05.",
      boundary: "Batas cakupan: merupakan sintesis keterlacakan proyek sendiri (Part B), bukan klaim penyelesaian studi kasus baru terpisah dari pengampu.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q2-06-Mohammad-Ferdinand-Valliandra-408333dd1d288061b69effedfcee1779",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/The-Lean-Mastery-Lab-Prove-Your-Thinking-One-New-Case-Five-Skills-Prove-Your-Mastery-3f6333dd1d2880a2aca3e7012bd782ac",
          kind: "brief"
        },
        {
          label: "Diagram SVG",
          href: "/assets/Q2.06_Peta_Jejak_Keputusan.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.07",
      challengeName: "Change Your Mind",
      title: "My Innovation Mindshift",
      deliverable: "Refleksi Pergeseran Lensa Eksperimen & Beban Pembaruan",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Merefleksikan pergeseran dari keyakinan awal bahwa \"tampilan rapi pasti membantu\" menuju kesadaran bahwa angka durasi positif tidak menggantikan keterlacakan prosedur serta pengujian biaya pembaruan status (H3).",
      boundary: "Batas bukti: refleksi kritis atas data Q2.02–Q2.06 tanpa menambah klaim pengujian lapangan baru.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q2-07-Mohammad-Ferdinand-Valliandra-408333dd1d28807cb05cef42c01fe4e0",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/My-Innovation-Mindshift-From-Assumption-to-Insight-3f6333dd1d2880b7857bffc0d75474c2",
          kind: "brief"
        },
        {
          label: "Diagram SVG",
          href: "/assets/Q2.07_Peta_Perubahan_Pemahaman.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.02",
      challengeName: "Design The Experience",
      title: "Experience Design Blueprint",
      deliverable: "User Story, Branching User Flow & Prioritas Must Have / Later",
      status: "Terkumpul · Notion",
      tone: "good",
      completed: true,
      summary: "Menerjemahkan kebutuhan koordinator ke satu user story terfokus dan diagram alur bercabang: jalur klarifikasi sementara via WhatsApp, jalur penetapan final sadar dengan alasan tertulis, serta peninjauan ulang saat respons berubah pasca-final.",
      boundary: "Batas status: blueprint alur individu telah disusun di Notion dan naskah diskusi Forum Walk in Their Shoes siap diposting.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q3-02-Mohammad-Ferdinand-Valliandra-412333dd1d28807195b5eb2df9c20834",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Experience-Blueprint-Make-Every-Step-Count-Turn-User-Needs-Into-a-Clear-Product-Experience-3f6333dd1d28805b88bce0888dbdf838",
          kind: "brief"
        },
        {
          label: "Diagram User Flow",
          href: "/assets/Q3.02_User_Flow.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.03",
      challengeName: "Sketch The Future",
      title: "First Clickable Prototype Portfolio (Make It Clickable!)",
      deliverable: "Wireframe 6 Keadaan & Prototipe Klik Terisolasi (/q3-03)",
      status: "Aktif di Web · Siap Review",
      tone: "accent",
      completed: true,
      summary: "Merancang wireframe enam keadaan layar dan membangun prototipe klik interaktif terisolasi di rute /q3-03 untuk menguji keterbacaan anggota wajib vs opsional, tahapan Confirmation Protocol, alasan keputusan, dan perubahan pasca-final.",
      boundary: "Batas tahap: pemeriksaan fungsional dan responsivitas telah dilakukan mandiri; sesi review pengguna langsung dilaksanakan pada tahap evaluasi berikutnya.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/41d7d157485d80909fb6ee7358d153ec",
          kind: "submission"
        },
        {
          label: "Buka Prototipe /q3-03",
          href: "/q3-03",
          kind: "internal"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Make-It-Clickable-Your-First-Clickable-Prototype-Portfolio-409333dd1d28804caad7c7dd36484ad5",
          kind: "brief"
        },
        {
          label: "Wireframe SVG",
          href: "/assets/Q3.03_Wireframe.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.04",
      challengeName: "Build The Core",
      title: "MVP Core Build Portfolio (Make It Work. Prove It!)",
      deliverable: "Aplikasi Core MVP Persisten (/q3-04-core), Backlog & 6 Uji Internal",
      status: "Aktif di Web · Lulus Uji Internal",
      tone: "good",
      completed: true,
      summary: "Membangun fungsi inti yang benar-benar memproses data baru di rute /q3-04-core: pembuatan multi-usulan dengan validasi ketat, penyimpanan persisten localStorage, ekspor/impor tautan #snapshot=, evaluasi kesiapan dinamis, serta dokumentasi 6 uji internal (IT-01–IT-06).",
      boundary: "Batas tahap: lulus verifikasi fungsional internal pada 6 skenario; hasil uji pengguna Q3.06 dicatat terpisah. H1 tetap inconclusive.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/41d7d157485d8059b86bca3ffd96d777",
          kind: "submission"
        },
        {
          label: "Buka Core MVP /q3-04-core",
          href: "/q3-04-core",
          kind: "internal"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Make-It-Work-Prove-It-Your-MVP-Core-Build-Portfolio-40c333dd1d2880f99705e54a2e6294a5",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.05",
      challengeName: "Meet The Mentor",
      title: "Konsultasi & Review Progres MVP Bersama Mentor",
      deliverable: "Target Output: Mentor Feedback & Improvement Plan",
      status: "Tahap Berikutnya",
      tone: "warn",
      completed: false,
      summary: "Mempresentasikan fungsi inti /q3-04-core, batasan H1 inconclusive, serta rancangan protokol pengujian kepada mentor untuk memperoleh umpan balik terarah dan rencana perbaikan sebelum uji pengguna.",
      boundary: "Status saat ini: belum dilaksanakan; artefak demo /q3-03 dan /q3-04-core telah disiapkan sebagai bahan konsultasi.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.06",
      challengeName: "Let The Users Prove It!",
      title: "MVP User Testing Evidence Portfolio",
      deliverable: "Catatan uji, hasil tugas, dan masukan peserta",
      status: "Sesi P01 terdokumentasi",
      tone: "accent",
      completed: true,
      summary: "P01 menyelesaikan tiga dari empat tugas secara mandiri. Pada tugas peninjauan keputusan, P01 meminta klarifikasi sebelum memilih Sementara.",
      boundary: "Bukti berasal dari satu sesi P01. Tangkapan layar walkthrough merupakan pemeriksaan mandiri. H1 tetap inconclusive.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q3-06_Mohammad-Ferdinand-Valliandra-420333dd1d2880bcb9a3cb482912f4d9",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Let-The-Users-Prove-It-Don-t-Guess-Observe-Capture-The-Evidence-40c333dd1d28800baab7f48e4cb6e1d1",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.07",
      challengeName: "Find The Friction. Prove The Priority!",
      title: "User Friction & Improvement Priority Portfolio",
      deliverable: "Peta hambatan, matriks prioritas, dan backlog",
      status: "Portofolio siap · Progress di Notion",
      tone: "accent",
      completed: true,
      summary: "Menganalisis tiga hambatan dari uji Q3.06. Peninjauan keputusan saat Final belum tersedia diprioritaskan karena merupakan satu-satunya tugas yang memerlukan bantuan.",
      boundary: "Prioritas didasarkan pada satu sesi P01. Status Progress terlihat pada halaman Notion saat diperiksa.",
      links: [
        {
          label: "Pengumpulan Notion",
          href: "https://app.notion.com/p/idits/Q3-07-Mohammad-Ferdinand-Valliandra-421333dd1d288041a1efe183174e16ec?source=copy_link",
          kind: "submission"
        },
        {
          label: "Brief Dosen",
          href: "https://idits.notion.site/Find-The-Friction-Prove-The-Priority-From-User-Evidence-to-Smarter-Product-Decisions-40c333dd1d28802293bbd563d91fa63f",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.08",
      challengeName: "Find The Friction",
      title: "Analisis Hambatan & Kebingungan Pengguna",
      deliverable: "Target Output: UX Findings & Pain Point Report",
      status: "Tahap Berikutnya",
      tone: "neutral",
      completed: false,
      summary: "Memetakan titik gesekan aktual dari pengujian Q3.07—seperti penafsiran label tingkat kepastian (H2), keengganan memperbarui papan (H3), atau reaksi anggota terhadap status keputusan (H4).",
      boundary: "Status saat ini: menunggu data observasi pengujian pengguna Q3.07.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.09",
      challengeName: "Iterate Fast",
      title: "Perbaikan Cepat MVP Berbasis Temuan Pengujian",
      deliverable: "Target Output: Improved MVP Version & Change Log",
      status: "Tahap Berikutnya",
      tone: "neutral",
      completed: false,
      summary: "Melakukan iterasi terfokus pada antarmuka dan aturan alur Decision Readiness Board berdasarkan bukti friksi paling kritis yang ditemukan pada Q3.08.",
      boundary: "Status saat ini: terjadwal sesudah sintesis UX Findings Q3.08.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.10",
      challengeName: "MVP Ready",
      title: "Pemeriksaan Kesiapan Rilis MVP",
      deliverable: "Target Output: Kesiapan MVP (pedoman rinci Notion dosen menyusul)",
      status: "Peta Kurikulum",
      tone: "neutral",
      completed: false,
      summary: "Memverifikasi kestabilan fungsi utama, keterlacakan jejak perubahan, dan kesiapan instrumen sebelum memasuki evaluasi penggunaan di fase Transform.",
      boundary: "Catatan sumber dosen: halaman tercantum di peta Quest 3 dengan rincian output yang masih menunggu publikasi pengampu.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.11",
      challengeName: "Sprint Review",
      title: "Tinjauan Capaian Sprint & Keterlacakan Backlog",
      deliverable: "Target Output: Sprint Review Report (pedoman rinci menyusul)",
      status: "Peta Kurikulum",
      tone: "neutral",
      completed: false,
      summary: "Meninjau ketercapaian backlog pengembangan, kendala teknis yang terselesaikan maupun tersisa, serta keselarasan produk dengan bukti kebutuhan awal.",
      boundary: "Catatan sumber dosen: halaman tercantum di peta Quest 3 dengan rincian pedoman menyusul.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.12",
      challengeName: "Builder's Reflection",
      title: "Refleksi Proses Pembangunan & Adaptasi",
      deliverable: "Target Output: Reflection Journal & Learning Notes",
      status: "Peta Kurikulum",
      tone: "neutral",
      completed: false,
      summary: "Merefleksikan pembelajaran teknis dan metodologis selama membangun, menguji, dan mengiterasi MVP dari blueprint hingga produk fungsional.",
      boundary: "Status saat ini: tahap reflektif penutup fase Build.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.13",
      challengeName: "Ready For Impact",
      title: "Rangkuman MVP & Rencana Validasi Dampak",
      deliverable: "Target Output: MVP Showcase & Impact Validation Plan",
      status: "Gerbang Penutup Q3",
      tone: "neutral",
      completed: false,
      summary: "Merangkum versi MVP yang telah diiterasi dan menyusun protokol pengukuran nilai/dampak penggunaan nyata untuk dibawa ke Quest 4 (Create The Impact).",
      boundary: "Status saat ini: gerbang transisi dari fase Build menuju fase Transform.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.01 · E4Q01",
      challengeName: "Impact Check",
      title: "Pemeriksaan Awal Nilai Nyata Solusi",
      deliverable: "Target Output: Impact Evidence Collection & Initial Impact Review",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Mengumpulkan bukti penggunaan awal untuk memeriksa apakah Decision Readiness Board benar-benar membantu koordinator mengambil dan menjelaskan keputusan jadwal dibanding percakapan chat biasa.",
      boundary: "Status saat ini: rencana kurikuler Quest 4 sesuai peta resmi SI Capstone; belum ada klaim dampak lapangan.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.02 · E4Q02",
      challengeName: "Read The Results",
      title: "Analisis Data Validasi, Penggunaan & Umpan Balik",
      deliverable: "Target Output: Validation Summary & Impact Analysis Report",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Menganalisis secara objektif data hasil pemakaian, tingkat ketepatan, beban pembaruan status, serta batasan kondisi di mana board efektif maupun tidak diperlukan.",
      boundary: "Status saat ini: rencana kurikuler Quest 4.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.03 · E4Q03",
      challengeName: "Own Your Decisions",
      title: "Tinjauan Kritis Keputusan Produk & Pembelajaran",
      deliverable: "Target Output: Decision Review & Lessons Learned",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Meninjau kembali keputusan-keputusan krusial sepanjang proyek (seperti penyempitan Refine Q1.06 dan keputusan validasi tambahan Q2.05), mengevaluasi apa yang tepat dan apa yang seharusnya dilakukan berbeda.",
      boundary: "Status saat ini: rencana kurikuler Quest 4.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.04 · E4Q04",
      challengeName: "Think Beyond Today",
      title: "Peta Jalan Lanjutan & Keberlanjutan Solusi",
      deliverable: "Target Output: Future Roadmap & Sustainability Recommendation",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Merumuskan kelayakan adopsi jangka panjang, batasan fitur Later yang layak atau tidak layak dilanjutkan, serta rekomendasi keberlanjutan bagi kelompok mahasiswa.",
      boundary: "Status saat ini: rencana kurikuler Quest 4.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.05 · E4Q05",
      challengeName: "Impact Review",
      title: "Evaluasi Kesiapan Bukti Dampak & Pembelajaran",
      deliverable: "Target Output: Impact Readiness Assessment",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Mengaudit kelengkapan bukti validasi, kejujuran batas klaim, dan ketajaman rekomendasi sebelum memasuki tahap penutupan dan sidang akhir.",
      boundary: "Status saat ini: rencana kurikuler Quest 4.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.06 · E4Q06",
      challengeName: "Change Maker Reflection",
      title: "Refleksi Transformasi Cara Berpikir & Bekerja",
      deliverable: "Target Output: Personal Reflection & Digital Changemaker Story",
      status: "Peta Quest 4",
      tone: "neutral",
      completed: false,
      summary: "Merefleksikan perubahan pola pikir dalam memandang masalah pengguna, menguji asumsi secara jujur, dan membangun solusi digital berbasis bukti.",
      boundary: "Status saat ini: rencana kurikuler Quest 4.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.07 · E4Q07",
      challengeName: "Leave Your Legacy",
      title: "Perangkuman Produk, Dampak & Persiapan Showcase",
      deliverable: "Target Output: Capstone Legacy Statement & Final Showcase Prep",
      status: "Gerbang Penutup Q4",
      tone: "neutral",
      completed: false,
      summary: "Menyatukan ringkasan akhir produk, bukti evaluasi dampak, dan materi pameran sebagai jembatan menuju fase penutupan Quest 5.",
      boundary: "Status saat ini: gerbang transisi dari Quest 4 menuju Quest 5.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.01 · E5Q01",
      challengeName: "One Last Look",
      title: "Kilas Balik Utuh Perjalanan Bukti Q1–Q4",
      deliverable: "Target Output: Journey Timeline & Capstone Highlights",
      status: "Peta Quest 5",
      tone: "neutral",
      completed: false,
      summary: "Meninjau kembali benang merah perjalanan inovasi sejak sinyal awal S07 di Q1.02 hingga solusi yang diuji dan dievaluasi di lapangan.",
      boundary: "Status saat ini: rencana kurikuler Quest 5 sesuai situs resmi SI Capstone.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.02 · E5Q04",
      challengeName: "The Impact Defense",
      title: "Sidang Akhir EAS/UAS: Presentasi, Demo & Pembelaan Bukti",
      deliverable: "Target Output: Final Presentation, Live Demo, Impact Defense & Portfolio",
      status: "Puncak EAS / UAS",
      tone: "accent",
      completed: false,
      summary: "Puncak evaluasi akhir semester: mendemonstrasikan aplikasi secara langsung, memaparkan perjalanan bukti dari hulu ke hilir, serta mempertahankan setiap keputusan dan batas metodologis di hadapan penguji.",
      boundary: "Status saat ini: sasaran akhir seluruh keterlacakan bukti pada portal ini.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.03 · E5Q03",
      challengeName: "My Changemaker Story",
      title: "Manifesto & Cerita Perubahan Diri Satu Semester",
      deliverable: "Target Output: Personal Reflection & Digital Changemaker Manifesto",
      status: "Peta Quest 5",
      tone: "neutral",
      completed: false,
      summary: "Menuliskan refleksi komprehensif satu semester mengenai pembentukan disiplin riset pengguna, kejujuran bukti, dan rekayasa perangkat lunak berorientasi dampak.",
      boundary: "Catatan metadata dosen: tercatat dengan kode E5Q03 pada basis data resmi SI Capstone.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.04 · E5Q02",
      challengeName: "Legacy Unlocked",
      title: "Komitmen Keberlanjutan & Rencana Dampak Berikutnya",
      deliverable: "Target Output: Future Commitment Statement & Next Impact Plan",
      status: "Penutup Semester",
      tone: "neutral",
      completed: false,
      summary: "Menetapkan komitmen pribadi serta langkah nyata tindak lanjut atas pembelajaran dan artefak proyek setelah mata kuliah SI Capstone berakhir.",
      boundary: "Status saat ini: tahap penutup akhir kurikulum SI Capstone.",
      links: [
        {
          label: "Brief Dosen",
          href: "",
          kind: "brief"
        }
      ]
    }
  ],
  en: [
    {
      phase: "Q1",
      code: "Q1.02",
      challengeName: "Scan the Signals",
      title: "Reality Signal Map",
      deliverable: "10 Everyday Friction Signals & Top 3 Priorities",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Mapped 10 everyday friction signals with Muhammad Faiz Roihan (Faiz S01–S05; I handled S06–S10). Signal S07 on repetitive WhatsApp group meeting coordination was prioritized for field investigation.",
      boundary: "Evidence boundary: initial scores and time estimates were early screening heuristics, not proof of demand for a new standalone app.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-02-Mohammad-Ferdinand-Valliandra-3da333dd1d28801b99dcd81131812385",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/C-Zone-Q1-02-Turn-Signals-into-Evidence-3ca333dd1d2880b59d71cc6a33f6e9d1",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.03",
      challengeName: "Enter Their World",
      title: "User Context Observation Pack",
      deliverable: "Contextual Observation, Activity Flow & Context Map",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Observed P01 coordinating a student group meeting via WhatsApp at Warkop Idola Keputih on Sep 17, 2026 (initial prompt 20:55, summary/compromise 20:58, announcement 21:00, full confirmation 21:51). Worked individually from Q1.03 onward.",
      boundary: "Evidence boundary: single observed episode where I belonged to the group and helped frame the message; the 51-min post-announcement span is not claimed as lost work time.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-03_Andra-3e0333dd1d2880229aa0e7c76d006b1a",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Context-Evidence-Map-Turn-Observation-into-Evidence-3cc333dd1d288067bafec2a4dcb85b51",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.04",
      challengeName: "Hear the Unsaid",
      title: "User Interview Evidence Pack",
      deliverable: "Three Voices, One Emerging Need (P01, P02, P03)",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Conducted in-person interviews on Sep 24, 2026 with P01 & P03 (coordinators) and P02 (member). Uncovered a key distinction: replying \"available\" in chat or polls does not automatically mean committed to a final slot.",
      boundary: "Evidence boundary: grounded in participant-confirmed interview notes rather than verbatim audio transcripts.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-04_Mohammad-Ferdinand-Valliandra-3e5333dd1d2880a7a034f90100b6fbd1",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Three-Voices-One-Emerging-Need-Dengarkan-Ceritanya-Temukan-Kebutuhannya-3cc333dd1d288015b664cca07bfaba25",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.05",
      challengeName: "Decode the Pain",
      title: "The Human Insight Atlas",
      deliverable: "Evidence Library, Affinity Map, Persona Raka & PP01–PP04",
      status: "Submitted · Notion & Forum",
      tone: "good",
      completed: true,
      summary: "Synthesized observation and interview findings into affinity clusters, composite persona Raka, empathy map, and user journey. Prioritized PP02 (response completeness and certainty not visible together) as the critical pain.",
      boundary: "Evidence boundary: Raka is a synthesis composite rather than a new participant; broad impact claims are bounded by Q1.06.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-05_Mohammad-Ferdinand-Valliandra-3ee333dd1d2880f18066cd2366152ef2",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Human-Insight-Atlas-From-Voices-to-Critical-Pains-3cc333dd1d288036b8d4c8fe491ace48",
          kind: "brief"
        },
        {
          label: "Classroom Forum",
          href: "https://classroom.its.ac.id/mod/forum/discuss.php?d=6708#p18009",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.06",
      challengeName: "Prove It Matters",
      title: "Problem Proof Dossier",
      deliverable: "Triangulation, 5 Whys, Counterevidence & Refine Decision",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Stress-tested the problem statement via triangulation, bounded 5 Whys, stakeholder mapping, and P02 counterevidence. Chose a Refine decision to narrow focus onto reading response sufficiency and explaining coordinator rationale.",
      boundary: "Evidence boundary: P02’s follow-up story linked 15–30 min meeting start delays to commuting/prior activities rather than waiting on chat replies.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-06_Mohammad-Ferdinand-Valliandra-3f2333dd1d288028b75ed7e10cff1984",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Problem-Proof-Dossier-From-Pain-to-Proof-Buktikan-Masalahnya-Layak-Diperjuangkan-3cc333dd1d2880bbbfaad448d59eee48",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.07",
      challengeName: "Pitch the Problem",
      title: "Problem Pitch Portfolio",
      deliverable: "8-Slide Deck, Evidence Brief, Script & Video Pitch",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Delivered an evidence-backed five-minute problem pitch (without jumping prematurely to product features), supported by an 8-slide deck, problem evidence brief, pitch recording, and individual Scroll log.",
      boundary: "Archive boundary: companion PDF templates for Q&A, peer assessment, and revision sheet exist locally without claiming external review entries beyond recorded files.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-07-Mohammad-Ferdinand-Valliandra-3f2333dd1d28807fa332e9966d1e96f8",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Pitch-The-Problem-Make-the-Problem-Impossible-to-Ignore-3cc333dd1d288094b9d3e1b591fb4b69",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q1",
      code: "Q1.08",
      challengeName: "Shift the Lens",
      title: "The Lens Shift Portfolio",
      deliverable: "Before–After, Assumption Autopsy & CPMK 1 Reflection",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Documented my evidence-backed perspective shift across Q1.02–Q1.07: moving from \"finding empty calendar slots\" toward understanding commitment certainty thresholds in group coordination.",
      boundary: "Evidence boundary: grounded strictly in my own completed Q1 artifacts without fabricating external review dialogues.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q1-08-Mohammad-Ferdinand-Valliandra-3f2333dd1d2880b88cf1ce6896f3a281",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Lens-Shift-Portfolio-Buktikan-bahwa-caramu-melihat-masalah-telah-berubah-3cc333dd1d28800abd3eed5c3d0ce647",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.02",
      challengeName: "Idea Storm",
      title: "Alternative Solution Portfolio",
      deliverable: "6 Solution Alternatives, Risks/Assumptions & Selection Matrix",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Generated and compared six distinct solution alternatives for WhatsApp schedule coordination—ranging from lightweight chat protocols to a dedicated readiness board—analyzing benefits, risks, and assumptions.",
      boundary: "Open score correction documented later: Decision Readiness Board’s true matrix score is 17/20 (not 20/20), while Confirmation Protocol scored 19/20.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q2-02_Mohammad-Ferdinand-Valliandra-3fa333dd1d288088b65dfbab3568288e",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Idea-Lab-One-Problem-Many-Solutions-Don-t-Fall-in-Love-with-Your-First-Idea-3cc333dd1d2880d9b55be99aa9c1f036",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.03",
      challengeName: "Make The Bet",
      title: "Solution Bet Dossier",
      deliverable: "Value Proposition, Lean Canvas, Assumptions A1–A12 & Hypotheses H1–H4",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Selected Decision Readiness Board governed by Confirmation Protocol as the primary bet. Defined pre-experiment dual pass criteria for riskiest hypothesis H1/A3 against an information-equivalent chat summary.",
      boundary: "Status boundary: canvas mappings and risk rankings represent pre-test design hypotheses rather than validated user value.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/Q2-03-Solution-Bet-Dossier-4047d157485d804c8976ec54be036b8d",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Bet-Lab-Choose-What-Matters-One-Solution-Clear-Value-Testable-Assumptions-3f6333dd1d2880419d78f527a47692cb",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.04",
      challengeName: "Run The Experiment",
      title: "Experiment Evidence Pack",
      deliverable: "R1–R3 Exploration & K1–K3 Paired Scenario Comparison",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Conducted exploratory R1–R3 prompts (8 WhatsApp questions) and paired scenario tests K1–K3 (scenarios C/D comparing chat summary vs board: equal 3/3 accuracy; reported mean reading duration 75s chat vs 40s board).",
      boundary: "Evidence boundary: R1–R3 and K1–K3 are not automatically six unique individuals; raw stopwatch proof, original logs, and sequence controls in series K were incomplete.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q2-04-Mohammad-Ferdinand-Valliandra-406333dd1d288041b717f22c09eaf7bd",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Experiment-Lab-Prove-It-with-Evidence-Don-t-Just-Say-It-Works-Show-What-Happened-3f6333dd1d28802e9668d8b87fadafb7",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.05",
      challengeName: "Follow The Signal",
      title: "Evidence-to-Decision Report",
      deliverable: "Target-vs-Actual Audit, H1 Inconclusive Verdict & Pre-MVP Decision",
      status: "Submitted · H1 Inconclusive",
      tone: "warn",
      completed: true,
      summary: "Evaluated Q2.04 data rigorously against Q2.03 thresholds: numbers were directionally supportive, but procedural traceability was insufficient—establishing an H1 Inconclusive verdict and requiring further validation before full MVP.",
      boundary: "Methodological commitment: H1 Inconclusive remains active until a fully instrumented re-test and status-update burden test (H3) are completed.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q2-05-Mohammad-Ferdinand-Valliandra-408333dd1d28808c911bcd891fd740f8",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Decision-Lab-Make-Your-Move-Read-the-Evidence-Own-the-Decision-3f6333dd1d288033a543edfc84d2b0f7",
          kind: "brief"
        },
        {
          label: "Vector SVG",
          href: "/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.06",
      challengeName: "Lean Checkpoint",
      title: "Lean Evidence Trail (Part B)",
      deliverable: "Causal Decision Map Q2.02–Q2.05 & Readiness Audit",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Connected the narrowed Q1 problem, open Q2.02 matrix score correction, Q2.03 hypothesis bet, separation of R vs K series in Q2.04, and Q2.05 decision into one auditable reasoning trail.",
      boundary: "Scope boundary: represents Part B synthesis of my own project trail rather than claiming completion of a separate instructor-assigned case.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q2-06-Mohammad-Ferdinand-Valliandra-408333dd1d288061b69effedfcee1779",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/The-Lean-Mastery-Lab-Prove-Your-Thinking-One-New-Case-Five-Skills-Prove-Your-Mastery-3f6333dd1d2880a2aca3e7012bd782ac",
          kind: "brief"
        },
        {
          label: "Vector SVG",
          href: "/assets/Q2.06_Peta_Jejak_Keputusan.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q2",
      code: "Q2.07",
      challengeName: "Change Your Mind",
      title: "My Innovation Mindshift",
      deliverable: "Critical Reflection on Instrument Quality & Update Cost",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Reflected on shifting from the naive belief that \"structured visuals automatically help\" to demanding procedural traceability and weighing reading ease against manual status-update effort (H3).",
      boundary: "Evidence boundary: critical synthesis of Q2.02–Q2.06 records without claiming new field experiments.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q2-07-Mohammad-Ferdinand-Valliandra-408333dd1d28807cb05cef42c01fe4e0",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/My-Innovation-Mindshift-From-Assumption-to-Insight-3f6333dd1d2880b7857bffc0d75474c2",
          kind: "brief"
        },
        {
          label: "Vector SVG",
          href: "/assets/Q2.07_Peta_Perubahan_Pemahaman.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.02",
      challengeName: "Design The Experience",
      title: "Experience Design Blueprint",
      deliverable: "Coordinator User Story, Branching Flow & Must-Have Scope",
      status: "Submitted · Notion",
      tone: "good",
      completed: true,
      summary: "Translated coordinator needs into one focused user story and a branching user flow separating provisional WhatsApp clarification, deliberate coordinator finalization with written rationale, and post-final drift review.",
      boundary: "Status boundary: Notion blueprint is published and the Walk in Their Shoes forum post is drafted for peer exchange.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q3-02-Mohammad-Ferdinand-Valliandra-412333dd1d28807195b5eb2df9c20834",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Experience-Blueprint-Make-Every-Step-Count-Turn-User-Needs-Into-a-Clear-Product-Experience-3f6333dd1d28805b88bce0888dbdf838",
          kind: "brief"
        },
        {
          label: "User Flow SVG",
          href: "/assets/Q3.02_User_Flow.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.03",
      challengeName: "Sketch The Future",
      title: "First Clickable Prototype Portfolio (Make It Clickable!)",
      deliverable: "6-State Wireframe & Isolated Clickable Prototype (/q3-03)",
      status: "Live on Web · Ready for Review",
      tone: "accent",
      completed: true,
      summary: "Designed a six-state screen wireframe and built an isolated clickable prototype on /q3-03 testing required vs optional grouping, Confirmation Protocol stages, coordinator rationale, and post-final drift.",
      boundary: "Stage boundary: functional and responsive verification completed; live unguided participant review proceeds in the next evaluation step.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/41d7d157485d80909fb6ee7358d153ec",
          kind: "submission"
        },
        {
          label: "Launch Prototype /q3-03",
          href: "/q3-03",
          kind: "internal"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Make-It-Clickable-Your-First-Clickable-Prototype-Portfolio-409333dd1d28804caad7c7dd36484ad5",
          kind: "brief"
        },
        {
          label: "Wireframe SVG",
          href: "/assets/Q3.03_Wireframe.svg",
          kind: "artifact"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.04",
      challengeName: "Build The Core",
      title: "MVP Core Build Portfolio (Make It Work. Prove It!)",
      deliverable: "Persistent Core MVP (/q3-04-core), Sprint Backlog & 6 Internal Tests",
      status: "Live on Web · Internal Tests Passed",
      tone: "good",
      completed: true,
      summary: "Built the working persistent core on /q3-04-core processing brand-new proposals with strict validation, localStorage persistence, #snapshot= link sharing, dynamic readiness evaluation, and 6 verified internal test scenarios (IT-01–IT-06).",
      boundary: "Stage boundary: passed 6 internal functional test scenarios; Q3.06 documents participant testing separately. H1 remains inconclusive.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/41d7d157485d8059b86bca3ffd96d777",
          kind: "submission"
        },
        {
          label: "Launch Core MVP /q3-04-core",
          href: "/q3-04-core",
          kind: "internal"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Make-It-Work-Prove-It-Your-MVP-Core-Build-Portfolio-40c333dd1d2880f99705e54a2e6294a5",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.05",
      challengeName: "Meet The Mentor",
      title: "Mentor Consultation & Core MVP Review",
      deliverable: "Target Output: Mentor Feedback & Improvement Plan",
      status: "Next Milestone",
      tone: "warn",
      completed: false,
      summary: "Present the working /q3-04-core build, H1 inconclusive boundaries, and upcoming user-testing protocol to the mentor to gather actionable feedback and an iteration plan.",
      boundary: "Current status: upcoming; /q3-03 and /q3-04-core builds are prepared for live walkthrough.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.06",
      challengeName: "Let The Users Prove It!",
      title: "MVP User Testing Evidence Portfolio",
      deliverable: "Test notes, task outcomes, and participant feedback",
      status: "P01 session documented",
      tone: "accent",
      completed: true,
      summary: "P01 completed three of four tasks independently. During decision review, P01 requested clarification before choosing Provisional.",
      boundary: "Evidence comes from one P01 session. Walkthrough screenshots come from internal checks. H1 remains inconclusive.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q3-06_Mohammad-Ferdinand-Valliandra-420333dd1d2880bcb9a3cb482912f4d9",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Let-The-Users-Prove-It-Don-t-Guess-Observe-Capture-The-Evidence-40c333dd1d28800baab7f48e4cb6e1d1",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.07",
      challengeName: "Find The Friction. Prove The Priority!",
      title: "User Friction & Improvement Priority Portfolio",
      deliverable: "Friction map, priority matrix, and improvement backlog",
      status: "Portfolio ready · Progress in Notion",
      tone: "accent",
      completed: true,
      summary: "Analyzed three friction points from Q3.06. Reviewing a decision while Final was unavailable took priority because it was the only task that required assistance.",
      boundary: "Priorities draw on one P01 session. The Notion page showed Progress when checked.",
      links: [
        {
          label: "Notion Submission",
          href: "https://app.notion.com/p/idits/Q3-07-Mohammad-Ferdinand-Valliandra-421333dd1d288041a1efe183174e16ec?source=copy_link",
          kind: "submission"
        },
        {
          label: "Lecturer Brief",
          href: "https://idits.notion.site/Find-The-Friction-Prove-The-Priority-From-User-Evidence-to-Smarter-Product-Decisions-40c333dd1d28802293bbd563d91fa63f",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.08",
      challengeName: "Find The Friction",
      title: "Usability Friction & Confusion Analysis",
      deliverable: "Target Output: UX Findings & Pain Point Report",
      status: "Upcoming",
      tone: "neutral",
      completed: false,
      summary: "Diagnose concrete usability bottlenecks observed in Q3.07—such as certainty label ambiguity (H2), update reluctance (H3), or member reactions to decision states (H4).",
      boundary: "Current status: awaits empirical data from Q3.07.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.09",
      challengeName: "Iterate Fast",
      title: "Evidence-Driven MVP Iteration",
      deliverable: "Target Output: Improved MVP Version & Change Log",
      status: "Upcoming",
      tone: "neutral",
      completed: false,
      summary: "Execute targeted interface and workflow improvements on Decision Readiness Board addressing the highest-priority friction points identified in Q3.08.",
      boundary: "Current status: scheduled after Q3.08 UX synthesis.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.10",
      challengeName: "MVP Ready",
      title: "MVP Release Readiness Check",
      deliverable: "Target Output: MVP Readiness (detailed instructor brief pending)",
      status: "Course Map",
      tone: "neutral",
      completed: false,
      summary: "Verify core stability, audit-log traceability, and evaluation instrumentation prior to entering Quest 4 real-world impact checks.",
      boundary: "Course map note: listed in official Quest 3 database with detailed rubric pending instructor release.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.11",
      challengeName: "Sprint Review",
      title: "Sprint Progress & Backlog Traceability Review",
      deliverable: "Target Output: Sprint Review Report (detailed brief pending)",
      status: "Course Map",
      tone: "neutral",
      completed: false,
      summary: "Audit completed vs remaining sprint backlog items, technical resolutions, and alignment against validated user needs.",
      boundary: "Course map note: listed in official Quest 3 structure with detailed brief pending.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.12",
      challengeName: "Builder's Reflection",
      title: "Build Process, Collaboration & Adaptation Reflection",
      deliverable: "Target Output: Reflection Journal & Learning Notes",
      status: "Course Map",
      tone: "neutral",
      completed: false,
      summary: "Reflect on engineering decisions, scope discipline, and iterative adaptations experienced while translating blueprints into a working MVP.",
      boundary: "Current status: closing reflective challenge of Quest 3.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q3",
      code: "Q3.13",
      challengeName: "Ready For Impact",
      title: "MVP Showcase & Impact Validation Plan",
      deliverable: "Target Output: MVP Showcase & Impact Validation Plan",
      status: "Q3 Closing Gate",
      tone: "neutral",
      completed: false,
      summary: "Consolidate the iterated MVP showcase and define concrete real-world impact measurement criteria entering Quest 4 (Create The Impact).",
      boundary: "Current status: transition gate from Quest 3 (Build) to Quest 4 (Transform).",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.01 · E4Q01",
      challengeName: "Impact Check",
      title: "Initial Real-World Value & Impact Check",
      deliverable: "Target Output: Impact Evidence Collection & Initial Impact Review",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Collect real usage evidence to examine whether Decision Readiness Board genuinely helps coordinators decide and communicate schedules compared to plain group chat.",
      boundary: "Current status: official Quest 4 curriculum milestone; no field impact claimed yet.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.02 · E4Q02",
      challengeName: "Read The Results",
      title: "Validation, Usage & Feedback Analysis",
      deliverable: "Target Output: Validation Summary & Impact Analysis Report",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Analyze usage metrics, H1–H4 validation outcomes, update effort, and boundary conditions showing when the board adds value vs when lightweight chat suffices.",
      boundary: "Current status: official Quest 4 curriculum milestone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.03 · E4Q03",
      challengeName: "Own Your Decisions",
      title: "Critical Product Decision Review & Lessons Learned",
      deliverable: "Target Output: Decision Review & Lessons Learned",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Critically evaluate pivotal project decisions (such as Q1.06 Refine narrowing and Q2.05 pre-MVP validation hold), examining what worked and what would be done differently.",
      boundary: "Current status: official Quest 4 curriculum milestone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.04 · E4Q04",
      challengeName: "Think Beyond Today",
      title: "Future Product Roadmap & Sustainability Plan",
      deliverable: "Target Output: Future Roadmap & Sustainability Recommendation",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Define realistic long-term adoption paths, evaluate deferred Later features, and formulate sustainability recommendations for student teams.",
      boundary: "Current status: official Quest 4 curriculum milestone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.05 · E4Q05",
      challengeName: "Impact Review",
      title: "Comprehensive Impact & Evidence Readiness Audit",
      deliverable: "Target Output: Impact Readiness Assessment",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Audit validation completeness, honesty of methodological boundaries, and clarity of recommendations ahead of final showcase and defense.",
      boundary: "Current status: official Quest 4 curriculum milestone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.06 · E4Q06",
      challengeName: "Change Maker Reflection",
      title: "Mindset & Engineering Practice Transformation",
      deliverable: "Target Output: Personal Reflection & Digital Changemaker Story",
      status: "Quest 4 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Reflect on how evidence-driven inquiry reshaped the way I frame user problems, test risky assumptions, and build responsible software.",
      boundary: "Current status: official Quest 4 curriculum milestone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q4",
      code: "Q4.07 · E4Q07",
      challengeName: "Leave Your Legacy",
      title: "Capstone Legacy Synthesis & Final Showcase Preparation",
      deliverable: "Target Output: Capstone Legacy Statement & Final Showcase Prep",
      status: "Q4 Closing Gate",
      tone: "neutral",
      completed: false,
      summary: "Synthesize the product, empirical findings, and showcase package bridging Quest 4 into the final Quest 5 defense.",
      boundary: "Current status: transition gate from Quest 4 into Quest 5.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.01 · E5Q01",
      challengeName: "One Last Look",
      title: "End-to-End Journey Timeline (Q1–Q4)",
      deliverable: "Target Output: Journey Timeline & Capstone Highlights",
      status: "Quest 5 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Review the complete evidence thread from initial signal S07 in Q1.02 through field-tested MVP and impact evaluation.",
      boundary: "Current status: official Quest 5 milestone in the SI Capstone curriculum.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.02 · E5Q04",
      challengeName: "The Impact Defense",
      title: "Final Capstone Defense (EAS/UAS): Demo & Evidence Defense",
      deliverable: "Target Output: Final Presentation, Live Demo, Impact Defense & Portfolio",
      status: "Final Defense (EAS)",
      tone: "accent",
      completed: false,
      summary: "Culminating final examination: live product demonstration, end-to-end evidence walkthrough, and rigorous defense of design decisions, validation outcomes, and boundaries.",
      boundary: "Current status: culminating semester milestone supported by this unified evidence hub.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.03 · E5Q03",
      challengeName: "My Changemaker Story",
      title: "Full-Semester Changemaker Reflection & Manifesto",
      deliverable: "Target Output: Personal Reflection & Digital Changemaker Manifesto",
      status: "Quest 5 Roadmap",
      tone: "neutral",
      completed: false,
      summary: "Articulate a full-semester personal reflection on human-centered problem discovery, honest experimentation, and impact-focused engineering.",
      boundary: "Course map note: cataloged under code E5Q03 in the official SI Capstone Notion database.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    },
    {
      phase: "Q5",
      code: "Q5.04 · E5Q02",
      challengeName: "Legacy Unlocked",
      title: "Post-Course Commitment & Next Impact Plan",
      deliverable: "Target Output: Future Commitment Statement & Next Impact Plan",
      status: "Semester Closing",
      tone: "neutral",
      completed: false,
      summary: "Formulate post-capstone commitments and concrete next steps carrying forward the lessons and artifacts built throughout the semester.",
      boundary: "Current status: final closing milestone of SI Capstone.",
      links: [
        {
          label: "Lecturer Brief",
          href: "",
          kind: "brief"
        }
      ]
    }
  ]
};
