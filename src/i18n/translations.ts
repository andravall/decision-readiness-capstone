import { AuditEntry, Locale, ProtocolStatusKey, ResponseKey, ValidationErrorCode } from '../domain/types';
import { QUEST_CATALOG, QuestLinkItem, QuestTrailItem } from './questCatalog';

export type { QuestLinkItem, QuestTrailItem };

export interface ResponseTranslation {
  label: string;
  short: string;
  desc: string;
}

export interface StatusTranslation {
  label: string;
  caption: string;
}

export interface VisualArtifactItem {
  id: string;
  tab: string;
  title: string;
  caption: string;
  png: string;
  svg: string;
  pngDark: string;
  svgDark: string;
}

export interface TranslationDictionary {
  nav: {
    hubTitle: string;
    boardTitle: string;
    hubRoute: string;
    q303Route: string;
    q304Route: string;
    openMvpCta: string;
    simBadge: string;
    mvpBadge: string;
    resetShort: string;
    newProposalBtn: string;
    storedLocalCount: (n: number) => string;
    switchLangLabel: string;
  };
  responses: Record<ResponseKey, ResponseTranslation>;
  statuses: Record<ProtocolStatusKey, StatusTranslation>;
  protocolSteps: {
    s1: string;
    s2: string;
    s3: string;
    drift: string;
    agencyNote: string;
    persistentNote: string;
  };
  common: {
    statusDecisionLabel: string;
    requiredRole: string;
    optionalRole: string;
    changedPostFinal: string;
    notRecordedYet: string;
    updatedAtPrefix: string;
    editBtn: string;
    editingBtn: string;
    saveBtn: string;
    cancelBtn: string;
    backBtn: string;
    backToBoardBtn: string;
    closeBtn: string;
    copyTextBtn: string;
    copiedFeedback: string;
    currentTag: string;
    membersCount: (n: number) => string;
    recordsCount: (n: number) => string;
    readinessTitle: string;
    ruleTarget: (n: number) => string;
    requiredConfirmedSuffix: string;
    blockersTitle: string;
    zeroPending: string;
    pendingCountLabel: (n: number) => string;
    readyToReviewMetric: string;
    peopleCountMetric: (n: number) => string;
    ruleMetSub: string;
    blockingFinalSub: string;
    noBlockersMsg: string;
    optionalTitle: string;
    optionalCountMetric: (n: number) => string;
    notBlockingSub: string;
    noOptionalMsg: string;
    membersSectionTitle: string;
    membersSectionSub: string;
    requiredGroupTitle: (countStr: string) => string;
    requiredGroupRule: string;
    optionalGroupTitle: (countStr: string) => string;
    optionalGroupRule: string;
    historyTitle: string;
    historyEmpty: string;
    mobileJumpForm: string;
    mobileJumpAnnounce: string;
    mobileJumpDecision: string;
    mobileConfirmedShort: (ready: number, total: number, statusLabel: string) => string;
    mobileAllMet: string;
    mobilePendingCount: (n: number) => string;
  };
  workbench: {
    updateEyebrow: string;
    updateTitle: (name: string) => string;
    updateLead: string;
    roleFieldLabel: string;
    roleRequiredOption: string;
    roleOptionalOption: string;
    reviewEyebrow: string;
    reviewTitle: string;
    reviewLead: string;
    check1Label: (n: number, certainLabel: string) => string;
    check1Pass: (ready: number, total: number) => string;
    check1Wait: (ready: number, total: number) => string;
    check2Label: (ctx: string) => string;
    check2Info: string;
    check3Label: string;
    check3Required: string;
    check3Locked: string;
    allMetCalloutTitle: string;
    allMetCalloutBody: string;
    reasonLabel: string;
    reasonHint: string;
    reasonPlaceholder: string;
    reasonEmptyError: string;
    lockFinalBtn: string;
    blockedCalloutTitle: string;
    blockedCalloutLead: string;
    markProvisionalBtn: string;
    waFollowupEyebrow: string;
    waFollowupTitle: string;
    waFollowupLead: string;
    waPreviewHeaderClarify: string;
    waPreviewBadgeSim: string;
    waPreviewBadgeReady: string;
    waAnnounceEyebrow: string;
    waAnnounceTitle: string;
    waAnnounceLead: string;
    waPreviewHeaderFinal: string;
    announcedRecordedAt: (at: string) => string;
    markAnnouncedSimBtn: string;
    markAnnouncedRealBtn: string;
    reMarkAnnouncedBtn: string;
    boardFinalEyebrow: (at: string) => string;
    boardFinalTitle: string;
    boardFinalReasonTitle: string;
    boardFinalAnnouncedSub: (at: string) => string;
    boardFinalReadySub: string;
    openAnnounceBtn: string;
    inspectRulesBtn: string;
    boardDriftEyebrow: string;
    boardDriftBadge: string;
    boardDriftTitle: string;
    boardDriftCalloutTitle: string;
    boardDriftChangePrefix: string;
    boardDriftBlockingMsg: (list: string) => string;
    boardDriftStillMetMsg: string;
    reReviewBtn: string;
    prevReasonTitle: (at: string) => string;
    boardReadyTitle: string;
    boardReadyCalloutTitle: string;
    boardReadyCalloutBody: string;
    reviewDecisionBtn: string;
    boardWaitEyebrowProvisional: string;
    boardWaitEyebrowInitial: string;
    boardWaitTitleProvisional: string;
    boardWaitTitleInitial: string;
    boardWaitFollowupTitle: (names: string) => string;
    boardWaitProvisionalBody: string;
    boardWaitInitialBody: (n: number) => string;
    openWaDraftBtn: string;
    composeClarifyWa: (params: {
      title: string;
      dateStr: string;
      timeStr: string;
      mode: string;
      names: string;
    }) => string;
    composeFinalWa: (params: {
      title: string;
      dateStr: string;
      timeStr: string;
      mode: string;
      reason: string;
    }) => string;
    auditKindLabels: Record<AuditEntry['kind'], string>;
    formatAuditText: (entry: AuditEntry, dict: TranslationDictionary) => string;
  };
  q303: {
    eyebrow: string;
    meetingTitle: string;
    meetingDate: string;
    meetingTime: string;
    meetingMode: string;
    scenarioRuleChip: string;
    footerNote: string;
    resetFullBtn: string;
    toastReset: string;
    toastProvisional: string;
    toastResponseSaved: (name: string, label: string, at: string) => string;
    toastNoChange: (name: string) => string;
    toastDrift: (name: string) => string;
    toastFinalized: (at: string) => string;
    toastAnnounced: (at: string) => string;
  };
  q304: {
    emptyEyebrow: string;
    addEyebrow: string;
    emptyHeading: string;
    addHeading: string;
    builderSub: string;
    fillSampleBtn: string;
    closeBuilderBtn: string;
    formErrorHeading: string;
    panel1Title: string;
    titleLabel: string;
    titlePlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    tzLabel: string;
    modeLabel: string;
    modePlaceholder: string;
    ruleHint: string;
    panel2Title: string;
    min2Label: string;
    memberPlaceholder: (i: number) => string;
    addRowBtn: string;
    builderFooterHint: string;
    submitProposalBtn: string;
    copySnapshotBtn: string;
    snapshotCopied: string;
    deleteProposalBtn: string;
    inlineAddPlaceholder: string;
    inlineAddBtn: string;
    clearAllBtn: string;
    footerNote: string;
    sampleTitle: string;
    sampleMode: string;
    savedProposalEyebrow: (at: string) => string;
    ruleChipDynamic: (n: number) => string;
    formatValidationError: (err: ValidationErrorCode) => string;
    toastCreated: (title: string) => string;
    toastDeleted: (title: string) => string;
    toastCleared: string;
    toastSnapshotLoaded: (title: string) => string;
    toastSnapshotInvalid: string;
    toastInlineNameEmpty: string;
    toastInlineDupe: (name: string) => string;
    toastInlineAdded: (name: string) => string;
    toastMinOneRequired: string;
  };
  hub: {
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    authorChipLabel: string;
    workModeChip: string;
    questionLabel: string;
    questionQuote: string;
    candidateSummaryLabel: string;
    candidateSummaryBody: string;
    ep1Label: string;
    ep1Val: string;
    ep1Note: string;
    ep2Label: string;
    ep2Val: string;
    ep2Note: string;
    ep3Label: string;
    ep3Val: string;
    ep3Note: string;
    ep4Label: string;
    ep4Val: string;
    ep4Note: string;
    routesEyebrow: string;
    routesTitle: string;
    routesSub: string;
    cardQ303Pill: string;
    cardQ303Title: string;
    cardQ303Body: string;
    cardQ303RouteLabel: string;
    cardQ303OpenBtn: string;
    cardQ303CopyBtn: string;
    cardQ303Copied: string;
    cardQ304Pill: string;
    cardQ304Title: string;
    cardQ304Body: string;
    cardQ304RouteLabel: string;
    cardQ304OpenBtn: string;
    cardQ304CopyBtn: string;
    cardQ304Copied: string;
    visualsEyebrow: string;
    visualsTitle: string;
    visualsSub: string;
    expandBtn: string;
    svgVectorBtn: string;
    mobileTapZoomHint: string;
    fitScreenBtn: string;
    zoomInBtn: string;
    trailEyebrow: string;
    trailTitle: string;
    trailSub: string;
    filterAll: (n: number) => string;
    filterQ1: (n: number) => string;
    filterQ2: (n: number) => string;
    filterQ3: (n: number) => string;
    filterQ4: (n: number) => string;
    filterQ5: (n: number) => string;
    stateFilterAll: string;
    stateFilterDone: (n: number) => string;
    stateFilterUpcoming: (n: number) => string;
    coursePortalBtn: string;
    telemetrySubmitted: (n: number) => string;
    telemetryActiveWeb: (n: number) => string;
    telemetryUpcoming: (n: number) => string;
    notionPermNote: string;
    footerLeft: string;
    footerRight: string;
    visuals: VisualArtifactItem[];
    quests: QuestTrailItem[];
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  id: {
    nav: {
      hubTitle: 'Decision Readiness Hub',
      boardTitle: 'Decision Readiness Board',
      hubRoute: 'Hub Utama',
      q303Route: 'Prototipe Q3.03',
      q304Route: 'MVP Core Q3.04',
      openMvpCta: 'MVP Q3.04',
      simBadge: 'Simulasi Q3.03',
      mvpBadge: 'MVP Core · Q3.04',
      resetShort: 'Ulangi',
      newProposalBtn: '+ Usulan Baru',
      storedLocalCount: (n) => `Tersimpan (${n})`,
      switchLangLabel: 'Pilih bahasa tampilan'
    },
    responses: {
      available_certain: {
        label: 'Tersedia · pasti',
        short: 'pasti',
        desc: 'Menyatakan siap hadir dengan kepastian penuh pada waktu usulan.'
      },
      maybe_tentative: {
        label: 'Mungkin · tentatif',
        short: 'tentatif',
        desc: 'Menunjukkan minat hadir namun masih bersyarat atau belum mengikat komitmen.'
      },
      unknown_schedule: {
        label: 'Belum tahu',
        short: 'belum tahu',
        desc: 'Sudah membalas pesan namun belum mengetahui kepastian jadwal pribadinya.'
      },
      no_response: {
        label: 'Belum menjawab',
        short: 'belum balas',
        desc: 'Belum memberikan respons di ruang percakapan kelompok.'
      },
      unavailable: {
        label: 'Tidak tersedia',
        short: 'berhalangan',
        desc: 'Menyatakan tidak dapat hadir pada waktu yang diusulkan.'
      }
    },
    statuses: {
      proposal: {
        label: 'Usulan',
        caption: 'Usulan waktu terbuka. Koordinator memeriksa kelengkapan respons sebelum bertindak.'
      },
      provisional: {
        label: 'Sementara',
        caption: 'Menunggu konfirmasi anggota wajib. Jadwal belum dijanjikan sebagai keputusan final.'
      },
      final: {
        label: 'Final',
        caption: 'Jadwal telah ditegaskan secara sadar oleh koordinator beserta alasan tertulis.'
      },
      needs_review: {
        label: 'Perlu tinjau ulang',
        caption: 'Ada perubahan respons sesudah jadwal final ditetapkan. Periksa kembali kelayakan jadwal.'
      }
    },
    protocolSteps: {
      s1: 'Usulan dibuka',
      s2: 'Sementara · klarifikasi',
      s3: 'Final · ditetapkan',
      drift: 'Perlu tinjau ulang',
      agencyNote: 'Keputusan final ditetapkan secara sadar oleh koordinator',
      persistentNote: 'Data persisten localStorage'
    },
    common: {
      statusDecisionLabel: 'Status keputusan',
      requiredRole: 'Wajib hadir',
      optionalRole: 'Opsional',
      changedPostFinal: 'Berubah pasca-final',
      notRecordedYet: 'Belum tercatat di board',
      updatedAtPrefix: 'Diperbarui',
      editBtn: 'Ubah',
      editingBtn: 'Sedang diubah',
      saveBtn: 'Simpan pembaruan',
      cancelBtn: 'Batal',
      backBtn: 'Kembali',
      backToBoardBtn: 'Kembali ke board',
      closeBtn: 'Tutup',
      copyTextBtn: 'Salin teks',
      copiedFeedback: 'Tersalin',
      currentTag: 'Saat ini',
      membersCount: (n) => `${String(n).padStart(2, '0')} anggota`,
      recordsCount: (n) => `${n} catatan`,
      readinessTitle: 'Kesiapan wajib hadir',
      ruleTarget: (n) => `Syarat ${n}/${n}`,
      requiredConfirmedSuffix: 'anggota wajib sudah pasti',
      blockersTitle: 'Penghalang keputusan',
      zeroPending: '0 tertunda',
      pendingCountLabel: (n) => `${n} perlu konfirmasi`,
      readyToReviewMetric: 'Siap tinjau',
      peopleCountMetric: (n) => `${n} orang`,
      ruleMetSub: 'syarat hadir terpenuhi',
      blockingFinalSub: 'menghalangi status final',
      noBlockersMsg: 'Tidak ada penghalang anggota wajib. Menunggu peninjauan & penetapan koordinator.',
      optionalTitle: 'Anggota opsional',
      optionalCountMetric: (n) => `${n} opsional`,
      notBlockingSub: 'tidak menghalangi aturan',
      noOptionalMsg: 'Tidak ada anggota opsional pada usulan ini.',
      membersSectionTitle: 'Respons anggota',
      membersSectionSub: 'Status ketersediaan dan tingkat kepastian terakhir dari percakapan WhatsApp.',
      requiredGroupTitle: (c) => `Anggota wajib hadir · ${c}`,
      requiredGroupRule: 'Seluruhnya harus tersedia pasti sebelum final',
      optionalGroupTitle: (c) => `Anggota opsional · ${c}`,
      optionalGroupRule: 'Tetap tercatat, tidak menghalangi penetapan final',
      historyTitle: 'Jejak perubahan',
      historyEmpty: 'Belum ada perubahan yang dicatat. Usulan masih berada pada kondisi awal.',
      mobileJumpForm: 'Form respons',
      mobileJumpAnnounce: 'Pengumuman WA',
      mobileJumpDecision: 'Tinjau keputusan',
      mobileConfirmedShort: (r, t, s) => `${r}/${t} wajib pasti · ${s}`,
      mobileAllMet: 'Syarat hadir terpenuhi',
      mobilePendingCount: (n) => `${n} anggota wajib belum pasti`
    },
    workbench: {
      updateEyebrow: 'Pembaruan respons',
      updateTitle: (name) => `Ubah respons ${name}`,
      updateLead: 'Pilih status terbaru berdasarkan balasan di WhatsApp. Tingkat kepastian ditulis eksplisit agar tidak tertukar.',
      roleFieldLabel: 'Peran kehadiran pada pertemuan ini',
      roleRequiredOption: 'Wajib hadir (penentu syarat final)',
      roleOptionalOption: 'Opsional (konteks tambahan)',
      reviewEyebrow: 'Pemeriksaan kesiapan',
      reviewTitle: 'Tinjau keputusan',
      reviewLead: 'Periksa keterpenuhan aturan kelompok sebelum menentukan tindak lanjut atau menetapkan jadwal final.',
      check1Label: (n, certain) => `${n} anggota wajib menyatakan ${certain}`,
      check1Pass: (r, t) => `Terpenuhi (${r}/${t})`,
      check1Wait: (r, t) => `Belum (${r}/${t})`,
      check2Label: (ctx) => `Konteks anggota opsional (${ctx})`,
      check2Info: 'Tercatat',
      check3Label: 'Alasan keputusan ditulis sadar oleh koordinator',
      check3Required: 'Wajib diisi',
      check3Locked: 'Menunggu syarat',
      allMetCalloutTitle: 'Syarat kehadiran wajib terpenuhi',
      allMetCalloutBody: 'Seluruh anggota wajib hadir sudah memastikan siap hadir. Tuliskan dasar keputusan sebelum mengunci status Final.',
      reasonLabel: 'Alasan menetapkan jadwal final',
      reasonHint: 'Catatan ini menjadi dasar pengumuman dan tetap tersimpan bila nanti terjadi perubahan.',
      reasonPlaceholder: 'Contoh: Ketiga anggota wajib sudah memastikan hadir; anggota yang berhalangan bersifat opsional.',
      reasonEmptyError: 'Isi alasan keputusan sebelum menetapkan jadwal final.',
      lockFinalBtn: 'Tetapkan jadwal final',
      blockedCalloutTitle: 'Belum dapat ditetapkan sebagai Final',
      blockedCalloutLead: 'Anggota wajib yang masih menghalangi keputusan:',
      markProvisionalBtn: 'Tandai sementara & siapkan WA',
      waFollowupEyebrow: 'Tindak lanjut WhatsApp',
      waFollowupTitle: 'Konfirmasi via WhatsApp',
      waFollowupLead: 'Draf pesan untuk menindaklanjuti anggota wajib yang belum pasti tanpa memberi kesan jadwal sudah final.',
      waPreviewHeaderClarify: 'Pratinjau pesan klarifikasi',
      waPreviewBadgeSim: 'Simulasi',
      waPreviewBadgeReady: 'Siap salin',
      waAnnounceEyebrow: 'Pengumuman kelompok',
      waAnnounceTitle: 'Pengumuman jadwal',
      waAnnounceLead: 'Pratinjau pesan WhatsApp untuk mengumumkan jadwal yang telah ditetapkan beserta dasar keputusannya.',
      waPreviewHeaderFinal: 'Pratinjau pesan pengumuman',
      announcedRecordedAt: (at) => `Sudah ditandai diumumkan pada ${at}.`,
      markAnnouncedSimBtn: 'Tandai diumumkan (simulasi)',
      markAnnouncedRealBtn: 'Tandai sudah diumumkan',
      reMarkAnnouncedBtn: 'Catat ulang pengumuman',
      boardFinalEyebrow: (at) => `Ditetapkan ${at}`,
      boardFinalTitle: 'Jadwal ditetapkan',
      boardFinalReasonTitle: 'Alasan penetapan final',
      boardFinalAnnouncedSub: (at) => `Status pengumuman: telah ditandai diumumkan pada ${at}. Jika ada anggota mengubah jawaban, board otomatis menandai peninjauan ulang.`,
      boardFinalReadySub: 'Jadwal sudah berstatus Final. Buka pratinjau pengumuman untuk membagikan kepastian waktu ke grup WhatsApp.',
      openAnnounceBtn: 'Lihat pengumuman',
      inspectRulesBtn: 'Periksa aturan',
      boardDriftEyebrow: 'Peringatan kemutakhiran',
      boardDriftBadge: 'Pasca-final',
      boardDriftTitle: 'Respons berubah setelah final',
      boardDriftCalloutTitle: 'Keputusan lama tidak lagi mutakhir',
      boardDriftChangePrefix: 'Perubahan:',
      boardDriftBlockingMsg: (list) => `Anggota wajib yang kembali menghalangi jadwal final: ${list}.`,
      boardDriftStillMetMsg: 'Seluruh anggota wajib masih tersedia pasti, namun perubahan pasca-final perlu diperiksa kembali oleh koordinator.',
      reReviewBtn: 'Tinjau keputusan ulang',
      prevReasonTitle: (at) => `Alasan final sebelumnya (${at}):`,
      boardReadyTitle: 'Siap untuk ditinjau',
      boardReadyCalloutTitle: 'Respons wajib telah lengkap',
      boardReadyCalloutBody: 'Seluruh anggota wajib sudah menyatakan tersedia dengan pasti. Keputusan final tidak terjadi otomatis—koordinator perlu meninjau dan mencatat alasannya.',
      reviewDecisionBtn: 'Tinjau keputusan',
      boardWaitEyebrowProvisional: 'Menunggu balasan WA',
      boardWaitEyebrowInitial: 'Pemeriksaan awal',
      boardWaitTitleProvisional: 'Menunggu konfirmasi wajib',
      boardWaitTitleInitial: 'Siapa yang perlu dikonfirmasi?',
      boardWaitFollowupTitle: (names) => `Perlu ditindaklanjuti: ${names}`,
      boardWaitProvisionalBody: 'Jadwal sedang ditandai Sementara. Saat balasan terbaru masuk di WhatsApp, perbarui baris anggota terkait lalu tinjau kembali keputusan.',
      boardWaitInitialBody: (n) => `Jadwal belum dapat ditetapkan karena ${n} anggota wajib belum memberi kepastian hadir.`,
      openWaDraftBtn: 'Lihat pesan klarifikasi WA',
      composeClarifyWa: ({ title, dateStr, timeStr, mode, names }) =>
        `[JADWAL SEMENTARA · PERLU KONFIRMASI]\n${title}\n${dateStr} · ${timeStr} · ${mode}\n\nHalo ${names}, apakah sudah pasti bisa hadir pada jadwal di atas? Saat ini jadwal masih berstatus sementara menunggu kepastian kalian.`,
      composeFinalWa: ({ title, dateStr, timeStr, mode, reason }) =>
        `[JADWAL FINAL DITETAPKAN]\n${title}\n${dateStr} · ${timeStr} · ${mode}\n\nDasar keputusan: ${reason}`,
      auditKindLabels: {
        proposal_created: 'Usulan',
        protocol_provisional: 'Protokol',
        response_updated: 'Respons',
        member_added: 'Anggota',
        final_locked: 'Keputusan',
        announced: 'Pengumuman',
        post_final_drift: 'Tinjau ulang'
      },
      formatAuditText: (entry, dict) => {
        switch (entry.kind) {
          case 'proposal_created':
            return `Usulan baru "${entry.proposalTitle}" dibuat dengan ${entry.totalMembers} anggota (${entry.requiredCount} wajib hadir)`;
          case 'protocol_provisional':
            return `Status Sementara ditetapkan · menunggu klarifikasi ${(entry.targetNames || []).join(', ')}`;
          case 'response_updated': {
            const parts: string[] = [];
            if (entry.fromResponse && entry.toResponse && entry.fromResponse !== entry.toResponse) {
              parts.push(`${dict.responses[entry.fromResponse].label} ke ${dict.responses[entry.toResponse].label}`);
            }
            if (entry.roleChangedTo) {
              parts.push(`peran menjadi ${entry.roleChangedTo === 'required' ? 'Wajib hadir' : 'Opsional'}`);
            }
            return `${entry.actorName} · ${parts.join(', ')}`;
          }
          case 'member_added':
            return `${entry.actorName} ditambahkan sebagai ${entry.roleChangedTo === 'required' ? 'anggota wajib hadir' : 'anggota opsional'}`;
          case 'final_locked':
            return `Final ditetapkan · ${entry.reasonText}`;
          case 'announced':
            return 'Pengumuman jadwal final dicatat oleh koordinator';
          case 'post_final_drift':
            return `Status beralih ke Perlu tinjau ulang · data ${entry.actorName} berubah setelah final`;
        }
      }
    },
    q303: {
      eyebrow: 'Koordinasi jadwal kelompok · Usulan 01',
      meetingTitle: 'Rapat pembagian tugas',
      meetingDate: 'Rabu, 11 November 2026',
      meetingTime: '19.30 WIB',
      meetingMode: 'Daring',
      scenarioRuleChip: 'Syarat skenario: 3/3 wajib pasti',
      footerNote: 'Skenario fiktif Q3.03 · Seluruh perubahan tersimpan di memori halaman selama sesi aktif dan tidak terhubung ke WhatsApp atau basis data.',
      resetFullBtn: 'Ulangi simulasi ke kondisi awal',
      toastReset: 'Simulasi dikembalikan ke keadaan awal (Usulan terbuka, 1/3 anggota wajib pasti).',
      toastProvisional: 'Usulan ditandai Sementara. Pratinjau pesan klarifikasi WhatsApp siap diperiksa.',
      toastResponseSaved: (name, label, at) => `Respons ${name} diperbarui menjadi "${label}" (${at}).`,
      toastNoChange: (name) => `Respons ${name} tidak berubah.`,
      toastDrift: (name) => `Perubahan pasca-final terdeteksi pada ${name}. Status keputusan beralih ke Perlu tinjau ulang.`,
      toastFinalized: (at) => `Jadwal ditetapkan sebagai Final pada ${at}. Pratinjau pengumuman siap dibuka.`,
      toastAnnounced: (at) => `Pengumuman jadwal dicatat dalam riwayat simulasi (${at}).`
    },
    q304: {
      emptyEyebrow: 'Ruang kerja kosong · Mulai dari data nyata',
      addEyebrow: 'Tambah usulan jadwal baru',
      emptyHeading: 'Buat usulan pertemuan pertama',
      addHeading: 'Buat usulan pertemuan baru',
      builderSub: 'Masukkan rincian waktu dan daftar anggota kelompok. Data diproses secara nyata dan langsung tersimpan pada penyimpanan lokal peramban.',
      fillSampleBtn: 'Isi contoh cepat',
      closeBuilderBtn: 'Tutup formulir',
      formErrorHeading: 'Periksa kembali isian formulir:',
      panel1Title: '1. Konteks waktu & kanal pertemuan',
      titleLabel: 'Judul pertemuan',
      titlePlaceholder: 'Contoh: Rapat Evaluasi Sprint Kelompok 4',
      dateLabel: 'Tanggal usulan',
      timeLabel: 'Jam mulai',
      tzLabel: 'Zona waktu',
      modeLabel: 'Format / lokasi',
      modePlaceholder: 'Contoh: Daring (Google Meet) atau Perpustakaan',
      ruleHint: 'Aturan kesiapan inti: seluruh anggota Wajib hadir harus berstatus Tersedia · pasti sebelum koordinator mengunci status Final.',
      panel2Title: '2. Daftar anggota & status awal',
      min2Label: 'Min. 2 anggota',
      memberPlaceholder: (i) => `Nama anggota ${i}`,
      addRowBtn: '+ Tambah baris anggota',
      builderFooterHint: 'Seluruh validasi input diperiksa sebelum usulan disimpan ke penyimpanan lokal.',
      submitProposalBtn: 'Simpan & buka board usulan',
      copySnapshotBtn: 'Salin tautan snapshot',
      snapshotCopied: 'Tautan snapshot disalin',
      deleteProposalBtn: 'Hapus usulan ini',
      inlineAddPlaceholder: 'Tambah anggota susulan...',
      inlineAddBtn: '+ Tambah',
      clearAllBtn: 'Bersihkan semua data lokal',
      footerNote: 'MVP Core Build Q3.04 · Data usulan baru diproses nyata dan disimpan persisten pada localStorage peramban tanpa kredensial eksternal.',
      sampleTitle: 'Sinkronisasi Backlog Sprint Kelompok',
      sampleMode: 'Daring (Google Meet)',
      savedProposalEyebrow: (at) => `Usulan jadwal tersimpan · Diperbarui ${at}`,
      ruleChipDynamic: (n) => `Syarat: ${n}/${n} wajib hadir harus pasti`,
      formatValidationError: (err) => {
        switch (err.code) {
          case 'title_short':
            return 'Judul pertemuan wajib diisi (minimal 3 karakter, bukan spasi kosong).';
          case 'date_invalid':
            return 'Tanggal pertemuan wajib dipilih secara lengkap.';
          case 'time_invalid':
            return 'Waktu pertemuan wajib diisi.';
          case 'min_members':
            return 'Masukkan minimal 2 anggota kelompok dengan nama yang tidak kosong.';
          case 'duplicate_names':
            return `Terdapat nama anggota ganda (${err.names.join(', ')}). Gunakan nama unik agar status tidak tertukar.`;
          case 'no_required_member':
            return 'Tandai minimal 1 anggota sebagai Wajib hadir untuk mengevaluasi syarat kesiapan keputusan.';
        }
      },
      toastCreated: (t) => `Usulan "${t}" berhasil disimpan dan dievaluasi.`,
      toastDeleted: (t) => `Usulan "${t}" dihapus dari penyimpanan lokal.`,
      toastCleared: 'Seluruh data usulan lokal telah dibersihkan.',
      toastSnapshotLoaded: (t) => `Usulan "${t}" dimuat dari tautan snapshot dan disimpan ke perangkat.`,
      toastSnapshotInvalid: 'Tautan snapshot tidak valid atau terpotong.',
      toastInlineNameEmpty: 'Masukkan nama anggota sebelum menambahkan ke daftar.',
      toastInlineDupe: (n) => `Anggota bernama "${n}" sudah terdaftar pada usulan ini.`,
      toastInlineAdded: (n) => `Anggota "${n}" berhasil ditambahkan dan disimpan.`,
      toastMinOneRequired: 'Tidak dapat mengubah peran: minimal harus ada 1 anggota Wajib hadir pada usulan.'
    },
    hub: {
      eyebrow: 'SI Capstone: Digital Innovation for Real-World Impact · Gasal 2026/2027',
      heroTitle: 'Dari balasan chat yang tersebar menuju keputusan jadwal yang dapat dijelaskan.',
      heroLead: 'Dokumentasi riset dan produk interaktif mengenai cara kelompok mahasiswa menyepakati jadwal pertemuan melalui WhatsApp—menyatukan status ketersediaan, tingkat kepastian, anggota wajib hadir, dan alasan keputusan dalam satu papan kesiapan.',
      authorChipLabel: 'Penyusun:',
      workModeChip: 'Q1.02 bersama M. Faiz Roihan · Mulai Q1.03 individu',
      questionLabel: 'Pertanyaan utama proyek',
      questionQuote: '“Kapan respons anggota sudah cukup untuk menetapkan jadwal pertemuan kelompok yang dapat dijalankan?”',
      candidateSummaryLabel: 'Kandidat solusi:',
      candidateSummaryBody: 'Decision Readiness Board dengan Confirmation Protocol — menyatukan status respons, tingkat kepastian, penanda anggota wajib hadir, alasan keputusan koordinator, dan jejak perubahan, dengan WhatsApp tetap sebagai kanal percakapan serta pengumuman.',
      ep1Label: 'Temuan kunci Q1',
      ep1Val: 'Tersedia ≠ Berkomitmen',
      ep1Note: 'Belum menjawab, tentatif, tersedia pasti, dan komitmen jadwal final perlu dibedakan (PP02, dipersempit pada Q1.06).',
      ep2Label: 'Kandidat & skor Q2.02–Q2.03',
      ep2Val: 'Board (17/20) + Protokol',
      ep2Note: 'Confirmation Protocol (19/20) menjadi aturan pakai; protokol tanpa board tetap alternatif pembanding yang ringan.',
      ep3Label: 'Keputusan bukti Q2.05',
      ep3Val: 'H1 Inconclusive',
      ep3Note: 'Rekap K1–K3 indikatif (rata-rata 40 dtk vs 75 dtk; ketepatan 3/3 setara), namun butuh validasi tambahan sebelum MVP.',
      ep4Label: 'Implementasi Q3.03–Q3.04',
      ep4Val: 'Prototipe & Core MVP',
      ep4Note: 'Simulasi alur skenario pada Q3.03 dan pemrosesan usulan jadwal berpenyimpanan lokal pada Q3.04.',
      routesEyebrow: 'Eksplorasi Produk Interaktif',
      routesTitle: 'Simulasi prototipe & aplikasi fungsi inti',
      routesSub: 'Coba langsung bagaimana koordinator memantau kepastian respons anggota, menyiapkan klarifikasi WhatsApp, hingga menetapkan jadwal pertemuan.',
      cardQ303Pill: 'Q3.03 · Sketch The Future',
      cardQ303Title: 'First Clickable Prototype — Simulasi Koordinator',
      cardQ303Body: 'Simulasi interaktif satu alur untuk memeriksa keterbacaan anggota wajib vs opsional, tahapan Confirmation Protocol, pratinjau klarifikasi WhatsApp, dan peninjauan ulang saat respons berubah pasca-final.',
      cardQ303RouteLabel: '/q3-03',
      cardQ303OpenBtn: 'Coba Simulasi Q3.03',
      cardQ303CopyBtn: 'Salin tautan',
      cardQ303Copied: 'Tautan disalin',
      cardQ304Pill: 'Q3.04 · Build The Core',
      cardQ304Title: 'MVP Core Build — Data Baru & Persisten',
      cardQ304Body: 'Aplikasi fungsi inti yang memproses usulan pertemuan baru, memvalidasi daftar anggota, menyimpan perubahan di localStorage, menghasilkan tautan snapshot lintas perangkat, dan mencatat riwayat protokol.',
      cardQ304RouteLabel: '/q3-04-core',
      cardQ304OpenBtn: 'Buka Aplikasi Q3.04',
      cardQ304CopyBtn: 'Salin tautan',
      cardQ304Copied: 'Tautan disalin',
      visualsEyebrow: 'Artefak Visual Q2–Q3',
      visualsTitle: 'Peta penalaran, alur pengguna, dan struktur layar',
      visualsSub: 'Pilih diagram di panel samping atau perbesar kanvas untuk menelusuri alur keputusan, wireframe enam keadaan layar, serta evaluasi bukti eksperimen.',
      expandBtn: 'Perbesar',
      svgVectorBtn: 'SVG Vektor',
      mobileTapZoomHint: 'Ketuk diagram untuk memperbesar & menggeser detail',
      fitScreenBtn: 'Pas layar',
      zoomInBtn: 'Perbesar 165%',
      trailEyebrow: 'Keterlacakan Lintas Tahap & Arsip Karya',
      trailTitle: 'Jejak pengerjaan proyek & peta kurikulum (Q1.02–Q5)',
      trailSub: 'Dokumentasi bertahap dari penemuan masalah, pengujian hipotesis, dan pembangunan fungsi inti beserta tautan halaman Notion, dilanjutkan peta tahapan SI Capstone hingga evaluasi akhir.',
      filterAll: (n) => `Semua (${n})`,
      filterQ1: (n) => `Q1 · Discover (${n})`,
      filterQ2: (n) => `Q2 · Validate (${n})`,
      filterQ3: (n) => `Q3 · Build (${n})`,
      filterQ4: (n) => `Q4 · Transform (${n})`,
      filterQ5: (n) => `Q5 · Legacy (${n})`,
      stateFilterAll: 'Semua Tahap',
      stateFilterDone: (n) => `Selesai & Aktif (${n})`,
      stateFilterUpcoming: (n) => `Tahap Berikutnya (${n})`,
      coursePortalBtn: 'Kurikulum SI Capstone',
      telemetrySubmitted: (n) => `${n} Dokumen Notion`,
      telemetryActiveWeb: (n) => `${n} Aplikasi Interaktif`,
      telemetryUpcoming: (n) => `${n} Tahap Lanjutan (Q3.05–Q5)`,
      notionPermNote: 'Dokumen Q1.02–Q3.02 berada pada ruang kerja Notion perkuliahan ITS, sementara prototipe Q3.03 dan fungsi inti Q3.04 berjalan langsung di aplikasi web ini.',
      footerLeft: 'Mohammad Ferdinand Valliandra (5026231159) · SI Capstone Kelas A · Gasal 2026/2027',
      footerRight: 'Decision Readiness Board dengan Confirmation Protocol · Departemen Sistem Informasi ITS.',
      visuals: [
        {
          id: 'q302-flow',
          tab: 'Q3.02 · User Flow',
          title: 'Diagram Alur Pengguna Bercabang (Q3.02 Experience Design Blueprint)',
          caption: 'Memisahkan cabang klarifikasi sementara via WhatsApp dari penetapan jadwal final oleh koordinator.',
          png: '/assets/Q3.02_User_Flow.png',
          svg: '/assets/Q3.02_User_Flow.svg',
          pngDark: '/assets/Q3.02_User_Flow_dark.png',
          svgDark: '/assets/Q3.02_User_Flow_dark.svg'
        },
        {
          id: 'q303-wireframe',
          tab: 'Q3.03 · Wireframe 6 Keadaan',
          title: 'Wireframe Enam Keadaan Layar (Q3.03 Sketch The Future)',
          caption: 'Kerangka awal sebelum diterjemahkan menjadi prototipe interaktif.',
          png: '/assets/Q3.03_Wireframe.png',
          svg: '/assets/Q3.03_Wireframe.svg',
          pngDark: '/assets/Q3.03_Wireframe_dark.png',
          svgDark: '/assets/Q3.03_Wireframe_dark.svg'
        },
        {
          id: 'q205-decision',
          tab: 'Q2.05 · Bukti & Keputusan',
          title: 'Ringkasan Bukti Eksperimen dan Keputusan (Q2.05 Follow The Signal)',
          caption: 'Menjelaskan mengapa hasil K1–K3 bersifat indikatif sementara validasi H1 ditetapkan inconclusive.',
          png: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.png',
          svg: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.svg',
          pngDark: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan_dark.png',
          svgDark: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan_dark.svg'
        },
        {
          id: 'q206-trail',
          tab: 'Q2.06 · Lean Evidence Trail',
          title: 'Peta Jejak Keputusan Q2.02–Q2.05 (Q2.06 Lean Checkpoint)',
          caption: 'Menghubungkan alternatif ide, koreksi skor matriks, asumsi berisiko, eksperimen, dan keputusan sebelum MVP.',
          png: '/assets/Q2.06_Peta_Jejak_Keputusan.png',
          svg: '/assets/Q2.06_Peta_Jejak_Keputusan.svg',
          pngDark: '/assets/Q2.06_Peta_Jejak_Keputusan_dark.png',
          svgDark: '/assets/Q2.06_Peta_Jejak_Keputusan_dark.svg'
        },
        {
          id: 'q207-mindshift',
          tab: 'Q2.07 · Mindshift',
          title: 'Peta Perubahan Pemahaman Inovasi (Q2.07 Change Your Mind)',
          caption: 'Pergeseran dari sekadar merapikan tampilan menuju tuntutan keterlacakan prosedur dan beban pembaruan.',
          png: '/assets/Q2.07_Peta_Perubahan_Pemahaman.png',
          svg: '/assets/Q2.07_Peta_Perubahan_Pemahaman.svg',
          pngDark: '/assets/Q2.07_Peta_Perubahan_Pemahaman_dark.png',
          svgDark: '/assets/Q2.07_Peta_Perubahan_Pemahaman_dark.svg'
        }
      ],
      quests: QUEST_CATALOG.id
    }
  },
  en: {
    nav: {
      hubTitle: 'Decision Readiness Hub',
      boardTitle: 'Decision Readiness Board',
      hubRoute: 'Main Hub',
      q303Route: 'Q3.03 Prototype',
      q304Route: 'Q3.04 Core MVP',
      openMvpCta: 'Core MVP',
      simBadge: 'Q3.03 Simulation',
      mvpBadge: 'Core MVP · Q3.04',
      resetShort: 'Reset',
      newProposalBtn: '+ New Proposal',
      storedLocalCount: (n) => `Saved (${n})`,
      switchLangLabel: 'Select display language'
    },
    responses: {
      available_certain: {
        label: 'Available · certain',
        short: 'certain',
        desc: 'Confirmed full commitment to attend at the proposed time.'
      },
      maybe_tentative: {
        label: 'Maybe · tentative',
        short: 'tentative',
        desc: 'Expressed willingness to join, but still conditional or unconfirmed.'
      },
      unknown_schedule: {
        label: 'Unsure yet',
        short: 'unsure',
        desc: 'Replied in chat, but personal schedule certainty is not yet known.'
      },
      no_response: {
        label: 'No response yet',
        short: 'no reply',
        desc: 'Has not replied in the group conversation yet.'
      },
      unavailable: {
        label: 'Unavailable',
        short: 'unavailable',
        desc: 'Confirmed unable to attend at the proposed time.'
      }
    },
    statuses: {
      proposal: {
        label: 'Proposed',
        caption: 'Time proposal is open. Coordinator inspects response completeness before acting.'
      },
      provisional: {
        label: 'Provisional',
        caption: 'Awaiting required members’ confirmation. Not yet promised as a final schedule.'
      },
      final: {
        label: 'Final',
        caption: 'Schedule deliberately locked by the coordinator with a written decision rationale.'
      },
      needs_review: {
        label: 'Needs re-review',
        caption: 'A member’s availability changed after finalization. Re-evaluate schedule viability.'
      }
    },
    protocolSteps: {
      s1: 'Proposal open',
      s2: 'Provisional · clarify',
      s3: 'Final · locked',
      drift: 'Needs re-review',
      agencyNote: 'Final decision is deliberately affirmed by the coordinator',
      persistentNote: 'Persistent localStorage state'
    },
    common: {
      statusDecisionLabel: 'Decision status',
      requiredRole: 'Required',
      optionalRole: 'Optional',
      changedPostFinal: 'Changed post-final',
      notRecordedYet: 'Not recorded on board',
      updatedAtPrefix: 'Updated',
      editBtn: 'Update',
      editingBtn: 'Editing',
      saveBtn: 'Save update',
      cancelBtn: 'Cancel',
      backBtn: 'Back',
      backToBoardBtn: 'Back to board',
      closeBtn: 'Close',
      copyTextBtn: 'Copy text',
      copiedFeedback: 'Copied',
      currentTag: 'Current',
      membersCount: (n) => `${String(n).padStart(2, '0')} members`,
      recordsCount: (n) => `${n} entries`,
      readinessTitle: 'Required attendance',
      ruleTarget: (n) => `Rule ${n}/${n}`,
      requiredConfirmedSuffix: 'required members confirmed',
      blockersTitle: 'Decision blockers',
      zeroPending: '0 pending',
      pendingCountLabel: (n) => `${n} need follow-up`,
      readyToReviewMetric: 'Ready',
      peopleCountMetric: (n) => `${n} ${n === 1 ? 'person' : 'people'}`,
      ruleMetSub: 'attendance rule satisfied',
      blockingFinalSub: 'blocking final status',
      noBlockersMsg: 'No required-member blockers remain. Awaiting coordinator review & confirmation.',
      optionalTitle: 'Optional members',
      optionalCountMetric: (n) => `${n} optional`,
      notBlockingSub: 'does not block rule',
      noOptionalMsg: 'No optional members configured for this proposal.',
      membersSectionTitle: 'Member responses',
      membersSectionSub: 'Latest availability and certainty levels recorded from WhatsApp.',
      requiredGroupTitle: (c) => `Required members · ${c}`,
      requiredGroupRule: 'All must be confirmed certain before finalization',
      optionalGroupTitle: (c) => `Optional members · ${c}`,
      optionalGroupRule: 'Recorded as context, does not block finalization',
      historyTitle: 'Audit trail',
      historyEmpty: 'No changes recorded yet. Proposal remains in its initial state.',
      mobileJumpForm: 'Response form',
      mobileJumpAnnounce: 'Announcement',
      mobileJumpDecision: 'Review decision',
      mobileConfirmedShort: (r, t, s) => `${r}/${t} required certain · ${s}`,
      mobileAllMet: 'Attendance rule met',
      mobilePendingCount: (n) => `${n} required pending`
    },
    workbench: {
      updateEyebrow: 'Response update',
      updateTitle: (name) => `Update ${name}’s response`,
      updateLead: 'Select the latest status from WhatsApp. Explicit certainty levels prevent misinterpretation.',
      roleFieldLabel: 'Attendance role for this meeting',
      roleRequiredOption: 'Required (blocks finalization if uncertain)',
      roleOptionalOption: 'Optional (supporting context)',
      reviewEyebrow: 'Readiness check',
      reviewTitle: 'Review decision',
      reviewLead: 'Verify group rule fulfillment before requesting follow-up or locking the final schedule.',
      check1Label: (n, certain) => `${n} required members marked ${certain}`,
      check1Pass: (r, t) => `Met (${r}/${t})`,
      check1Wait: (r, t) => `Pending (${r}/${t})`,
      check2Label: (ctx) => `Optional member context (${ctx})`,
      check2Info: 'Logged',
      check3Label: 'Written decision rationale by coordinator',
      check3Required: 'Required',
      check3Locked: 'Awaiting rule',
      allMetCalloutTitle: 'Required attendance rule satisfied',
      allMetCalloutBody: 'All required members have confirmed full certainty. Write a brief rationale before locking Final status.',
      reasonLabel: 'Rationale for locking final schedule',
      reasonHint: 'Included in the group announcement and preserved if post-final changes occur.',
      reasonPlaceholder: 'Example: All three required members confirmed availability; optional member conflict noted.',
      reasonEmptyError: 'Enter a non-empty decision rationale before locking final status.',
      lockFinalBtn: 'Lock final schedule',
      blockedCalloutTitle: 'Cannot lock as Final yet',
      blockedCalloutLead: 'Required members still blocking finalization:',
      markProvisionalBtn: 'Mark provisional & draft WA',
      waFollowupEyebrow: 'WhatsApp follow-up',
      waFollowupTitle: 'Clarification via WhatsApp',
      waFollowupLead: 'Draft message to follow up with uncertain required members without implying the slot is already final.',
      waPreviewHeaderClarify: 'Clarification message preview',
      waPreviewBadgeSim: 'Simulation',
      waPreviewBadgeReady: 'Ready to copy',
      waAnnounceEyebrow: 'Group announcement',
      waAnnounceTitle: 'Schedule announcement',
      waAnnounceLead: 'WhatsApp message preview to announce the finalized meeting time and its rationale.',
      waPreviewHeaderFinal: 'Final announcement preview',
      announcedRecordedAt: (at) => `Marked as announced at ${at}.`,
      markAnnouncedSimBtn: 'Mark announced (simulation)',
      markAnnouncedRealBtn: 'Mark as announced',
      reMarkAnnouncedBtn: 'Log announcement again',
      boardFinalEyebrow: (at) => `Locked ${at}`,
      boardFinalTitle: 'Schedule finalized',
      boardFinalReasonTitle: 'Final decision rationale',
      boardFinalAnnouncedSub: (at) => `Announcement logged at ${at}. Any subsequent member response edit automatically triggers Needs re-review.`,
      boardFinalReadySub: 'Status is locked as Final. Open the announcement preview to share the confirmed slot on WhatsApp.',
      openAnnounceBtn: 'View announcement',
      inspectRulesBtn: 'Inspect rules',
      boardDriftEyebrow: 'Freshness alert',
      boardDriftBadge: 'Post-final',
      boardDriftTitle: 'Response changed after finalization',
      boardDriftCalloutTitle: 'Previous decision is no longer current',
      boardDriftChangePrefix: 'Change:',
      boardDriftBlockingMsg: (list) => `Required member(s) now blocking the finalized slot: ${list}.`,
      boardDriftStillMetMsg: 'All required members remain certain, but post-final edits require coordinator re-verification.',
      reReviewBtn: 'Re-review decision',
      prevReasonTitle: (at) => `Previous final rationale (${at}):`,
      boardReadyTitle: 'Ready for coordinator review',
      boardReadyCalloutTitle: 'Required responses complete',
      boardReadyCalloutBody: 'All required members confirmed certainty. Finalization is never automatic—the coordinator must review and record the rationale.',
      reviewDecisionBtn: 'Review decision',
      boardWaitEyebrowProvisional: 'Awaiting WA replies',
      boardWaitEyebrowInitial: 'Initial check',
      boardWaitTitleProvisional: 'Awaiting required confirmation',
      boardWaitTitleInitial: 'Who needs confirmation?',
      boardWaitFollowupTitle: (names) => `Follow up needed: ${names}`,
      boardWaitProvisionalBody: 'Marked as Provisional. Once new replies arrive on WhatsApp, update the member rows and review again.',
      boardWaitInitialBody: (n) => `Cannot finalize yet because ${n} required member(s) have not confirmed certainty.`,
      openWaDraftBtn: 'View WA clarification draft',
      composeClarifyWa: ({ title, dateStr, timeStr, mode, names }) =>
        `[PROVISIONAL SCHEDULE · CONFIRMATION NEEDED]\n${title}\n${dateStr} · ${timeStr} · ${mode}\n\nHi ${names}, can you confirm if you can definitely make the slot above? The schedule is currently provisional while awaiting your confirmation.`,
      composeFinalWa: ({ title, dateStr, timeStr, mode, reason }) =>
        `[FINAL SCHEDULE CONFIRMED]\n${title}\n${dateStr} · ${timeStr} · ${mode}\n\nDecision rationale: ${reason}`,
      auditKindLabels: {
        proposal_created: 'Proposal',
        protocol_provisional: 'Protocol',
        response_updated: 'Response',
        member_added: 'Member',
        final_locked: 'Decision',
        announced: 'Announced',
        post_final_drift: 'Re-review'
      },
      formatAuditText: (entry, dict) => {
        switch (entry.kind) {
          case 'proposal_created':
            return `Proposal "${entry.proposalTitle}" created with ${entry.totalMembers} members (${entry.requiredCount} required)`;
          case 'protocol_provisional':
            return `Marked Provisional · awaiting clarification from ${(entry.targetNames || []).join(', ')}`;
          case 'response_updated': {
            const parts: string[] = [];
            if (entry.fromResponse && entry.toResponse && entry.fromResponse !== entry.toResponse) {
              parts.push(`${dict.responses[entry.fromResponse].label} to ${dict.responses[entry.toResponse].label}`);
            }
            if (entry.roleChangedTo) {
              parts.push(`role set to ${entry.roleChangedTo === 'required' ? 'Required' : 'Optional'}`);
            }
            return `${entry.actorName} · ${parts.join(', ')}`;
          }
          case 'member_added':
            return `${entry.actorName} added as ${entry.roleChangedTo === 'required' ? 'required member' : 'optional member'}`;
          case 'final_locked':
            return `Locked Final · ${entry.reasonText}`;
          case 'announced':
            return 'Final schedule announcement logged by coordinator';
          case 'post_final_drift':
            return `Switched to Needs re-review · ${entry.actorName}’s status changed after finalization`;
        }
      }
    },
    q303: {
      eyebrow: 'Group schedule coordination · Proposal 01',
      meetingTitle: 'Task division meeting',
      meetingDate: 'Wednesday, November 11, 2026',
      meetingTime: '19.30 WIB',
      meetingMode: 'Online',
      scenarioRuleChip: 'Scenario rule: 3/3 required certain',
      footerNote: 'Fictional Q3.03 scenario · Changes live in browser memory during this session and do not connect to WhatsApp or a database.',
      resetFullBtn: 'Reset simulation to initial state',
      toastReset: 'Simulation restored to initial state (Open proposal, 1/3 required confirmed).',
      toastProvisional: 'Marked as Provisional. WhatsApp clarification draft is ready to inspect.',
      toastResponseSaved: (name, label, at) => `${name}’s response updated to "${label}" (${at}).`,
      toastNoChange: (name) => `${name}’s response remained unchanged.`,
      toastDrift: (name) => `Post-final change detected for ${name}. Status switched to Needs re-review.`,
      toastFinalized: (at) => `Schedule locked as Final at ${at}. Announcement preview is ready.`,
      toastAnnounced: (at) => `Schedule announcement logged in simulation history (${at}).`
    },
    q304: {
      emptyEyebrow: 'Empty workspace · Start with real data',
      addEyebrow: 'Add new schedule proposal',
      emptyHeading: 'Create your first meeting proposal',
      addHeading: 'Create a new meeting proposal',
      builderSub: 'Enter meeting details and group members. Inputs are validated and persisted directly in browser localStorage.',
      fillSampleBtn: 'Quick-fill sample',
      closeBuilderBtn: 'Close form',
      formErrorHeading: 'Please fix the following form issues:',
      panel1Title: '1. Meeting time & channel context',
      titleLabel: 'Meeting title',
      titlePlaceholder: 'e.g., Team 4 Sprint Review Sync',
      dateLabel: 'Proposed date',
      timeLabel: 'Start time',
      tzLabel: 'Time zone',
      modeLabel: 'Format / location',
      modePlaceholder: 'e.g., Online (Google Meet) or Campus Library',
      ruleHint: 'Core readiness rule: all Required members must be marked Available · certain before locking Final status.',
      panel2Title: '2. Group roster & initial status',
      min2Label: 'Min. 2 members',
      memberPlaceholder: (i) => `Member ${i} name`,
      addRowBtn: '+ Add member row',
      builderFooterHint: 'All inputs are validated before saving to persistent local storage.',
      submitProposalBtn: 'Save & open readiness board',
      copySnapshotBtn: 'Copy snapshot link',
      snapshotCopied: 'Snapshot link copied',
      deleteProposalBtn: 'Delete proposal',
      inlineAddPlaceholder: 'Add another member...',
      inlineAddBtn: '+ Add',
      clearAllBtn: 'Clear all local data',
      footerNote: 'Q3.04 Core MVP Build · New proposals are processed dynamically and persisted in browser localStorage with zero external credentials.',
      sampleTitle: 'Team Sprint Backlog Sync',
      sampleMode: 'Online (Google Meet)',
      savedProposalEyebrow: (at) => `Saved schedule proposal · Updated ${at}`,
      ruleChipDynamic: (n) => `Rule: ${n}/${n} required must be certain`,
      formatValidationError: (err) => {
        switch (err.code) {
          case 'title_short':
            return 'Meeting title is required (minimum 3 non-space characters).';
          case 'date_invalid':
            return 'Please select a valid proposed date.';
          case 'time_invalid':
            return 'Please enter a valid start time.';
          case 'min_members':
            return 'Enter at least 2 group members with non-empty names.';
          case 'duplicate_names':
            return `Duplicate member name(s) found (${err.names.join(', ')}). Use distinct names to avoid status confusion.`;
          case 'no_required_member':
            return 'Mark at least 1 member as Required so decision readiness can be evaluated.';
        }
      },
      toastCreated: (t) => `Proposal "${t}" saved and evaluated.`,
      toastDeleted: (t) => `Proposal "${t}" removed from local storage.`,
      toastCleared: 'All local proposal data has been cleared.',
      toastSnapshotLoaded: (t) => `Proposal "${t}" imported from snapshot link and saved locally.`,
      toastSnapshotInvalid: 'Snapshot link is invalid or truncated.',
      toastInlineNameEmpty: 'Enter a member name before adding to the roster.',
      toastInlineDupe: (n) => `Member "${n}" already exists in this proposal.`,
      toastInlineAdded: (n) => `Member "${n}" added and saved.`,
      toastMinOneRequired: 'Cannot change role: at least 1 Required member must remain on the proposal.'
    },
    hub: {
      eyebrow: 'SI Capstone: Digital Innovation for Real-World Impact · Fall 2026/2027',
      heroTitle: 'From scattered chat replies to explainable group scheduling decisions.',
      heroLead: 'Research documentation and interactive product exploring how student groups coordinate meeting schedules over WhatsApp—unifying availability, certainty levels, required attendance, and decision rationale on one readiness board.',
      authorChipLabel: 'Author:',
      workModeChip: 'Q1.02 with M. Faiz Roihan · Individual from Q1.03 onward',
      questionLabel: 'Core research question',
      questionQuote: '“When are member responses sufficient to commit to an actionable group meeting schedule?”',
      candidateSummaryLabel: 'Solution candidate:',
      candidateSummaryBody: 'Decision Readiness Board with Confirmation Protocol — unifying response status, certainty level, required-attendance priority, coordinator rationale, and change history while keeping WhatsApp for discussion and announcements.',
      ep1Label: 'Q1 key insight',
      ep1Val: 'Available ≠ Committed',
      ep1Note: 'Non-response, tentative replies, confirmed availability, and final commitment must be distinguished (PP02, narrowed in Q1.06).',
      ep2Label: 'Q2.02–Q2.03 candidate & score',
      ep2Val: 'Board (17/20) + Protocol',
      ep2Note: 'Confirmation Protocol (19/20) serves as the operating rule; protocol-only remains a lightweight baseline comparator.',
      ep3Label: 'Q2.05 evidence verdict',
      ep3Val: 'H1 Inconclusive',
      ep3Note: 'K1–K3 scenario reading times were indicative (avg. 40s vs 75s; equal 3/3 accuracy), requiring further validation before full MVP.',
      ep4Label: 'Q3.03–Q3.04 implementations',
      ep4Val: 'Prototype & Core MVP',
      ep4Note: 'Guided scenario simulation in Q3.03 and persistent local schedule management in Q3.04.',
      routesEyebrow: 'Interactive Product Workspaces',
      routesTitle: 'Clickable prototype & working core MVP',
      routesSub: 'Explore firsthand how a group coordinator tracks response certainty, drafts WhatsApp clarifications, and locks a final meeting schedule.',
      cardQ303Pill: 'Q3.03 · Sketch The Future',
      cardQ303Title: 'First Clickable Prototype — Coordinator Simulation',
      cardQ303Body: 'Interactive single-flow simulation examining required vs optional member grouping, Confirmation Protocol stages, simulated WhatsApp drafts, and post-final drift detection.',
      cardQ303RouteLabel: '/q3-03',
      cardQ303OpenBtn: 'Try Q3.03 Simulation',
      cardQ303CopyBtn: 'Copy link',
      cardQ303Copied: 'Link copied',
      cardQ304Pill: 'Q3.04 · Build The Core',
      cardQ304Title: 'MVP Core Build — Live & Persistent',
      cardQ304Body: 'Working core application that validates brand-new meeting proposals, persists state in localStorage, generates shareable URL snapshots, and tracks the full protocol lifecycle.',
      cardQ304RouteLabel: '/q3-04-core',
      cardQ304OpenBtn: 'Open Q3.04 Core App',
      cardQ304CopyBtn: 'Copy link',
      cardQ304Copied: 'Link copied',
      visualsEyebrow: 'Q2–Q3 Visual Artifacts',
      visualsTitle: 'Reasoning maps, user flow, and screen wireframes',
      visualsSub: 'Select a blueprint on the side rail or expand the canvas to inspect decision flows, six-state screen wireframes, and experiment evidence.',
      expandBtn: 'Expand',
      svgVectorBtn: 'Vector SVG',
      mobileTapZoomHint: 'Tap diagram to zoom & pan details',
      fitScreenBtn: 'Fit screen',
      zoomInBtn: 'Zoom 165%',
      trailEyebrow: 'Cross-Phase Traceability & Artifacts',
      trailTitle: 'Project evidence trail & curriculum roadmap (Q1.02–Q5)',
      trailSub: 'Stage-by-stage record from problem discovery, hypothesis testing, and core engineering with Notion portfolio links, followed by the SI Capstone roadmap through final defense.',
      filterAll: (n) => `All (${n})`,
      filterQ1: (n) => `Q1 · Discover (${n})`,
      filterQ2: (n) => `Q2 · Validate (${n})`,
      filterQ3: (n) => `Q3 · Build (${n})`,
      filterQ4: (n) => `Q4 · Transform (${n})`,
      filterQ5: (n) => `Q5 · Legacy (${n})`,
      stateFilterAll: 'All Stages',
      stateFilterDone: (n) => `Completed & Active (${n})`,
      stateFilterUpcoming: (n) => `Upcoming Roadmap (${n})`,
      coursePortalBtn: 'SI Capstone Curriculum',
      telemetrySubmitted: (n) => `${n} Notion Documents`,
      telemetryActiveWeb: (n) => `${n} Interactive Apps`,
      telemetryUpcoming: (n) => `${n} Upcoming Stages (Q3.05–Q5)`,
      notionPermNote: 'Q1.02–Q3.02 documents reside in the ITS Notion course workspace, while the Q3.03 prototype and Q3.04 core application run directly on this web app.',
      footerLeft: 'Mohammad Ferdinand Valliandra (5026231159) · SI Capstone Class A · Fall 2026/2027',
      footerRight: 'Decision Readiness Board with Confirmation Protocol · Information Systems Department, ITS.',
      visuals: [
        {
          id: 'q302-flow',
          tab: 'Q3.02 · User Flow',
          title: 'Branching Coordinator User Flow (Q3.02 Experience Design Blueprint)',
          caption: 'Separates provisional WhatsApp clarification loops from deliberate coordinator finalization.',
          png: '/assets/Q3.02_User_Flow.png',
          svg: '/assets/Q3.02_User_Flow.svg',
          pngDark: '/assets/Q3.02_User_Flow_dark.png',
          svgDark: '/assets/Q3.02_User_Flow_dark.svg'
        },
        {
          id: 'q303-wireframe',
          tab: 'Q3.03 · 6-State Wireframe',
          title: 'Six-State Screen Wireframe (Q3.03 Sketch The Future)',
          caption: 'Structural layout skeleton prior to visual and interactive implementation.',
          png: '/assets/Q3.03_Wireframe.png',
          svg: '/assets/Q3.03_Wireframe.svg',
          pngDark: '/assets/Q3.03_Wireframe_dark.png',
          svgDark: '/assets/Q3.03_Wireframe_dark.svg'
        },
        {
          id: 'q205-decision',
          tab: 'Q2.05 · Evidence & Decision',
          title: 'Experiment Evidence & Pre-MVP Decision Summary (Q2.05 Follow The Signal)',
          caption: 'Illustrates why K1–K3 reading-time gains were indicative while H1 validation remained inconclusive.',
          png: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.png',
          svg: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan.svg',
          pngDark: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan_dark.png',
          svgDark: '/assets/Q2.05_Ringkasan_Bukti_dan_Keputusan_dark.svg'
        },
        {
          id: 'q206-trail',
          tab: 'Q2.06 · Lean Evidence Trail',
          title: 'Decision Reasoning Trail Q2.02–Q2.05 (Q2.06 Lean Checkpoint)',
          caption: 'Connects solution alternatives, open matrix score correction, riskiest assumptions, and pre-MVP decision.',
          png: '/assets/Q2.06_Peta_Jejak_Keputusan.png',
          svg: '/assets/Q2.06_Peta_Jejak_Keputusan.svg',
          pngDark: '/assets/Q2.06_Peta_Jejak_Keputusan_dark.png',
          svgDark: '/assets/Q2.06_Peta_Jejak_Keputusan_dark.svg'
        },
        {
          id: 'q207-mindshift',
          tab: 'Q2.07 · Mindshift',
          title: 'Innovation Mindshift Map (Q2.07 Change Your Mind)',
          caption: 'Shift from assuming structured visuals automatically help toward demanding procedural traceability and update-cost testing.',
          png: '/assets/Q2.07_Peta_Perubahan_Pemahaman.png',
          svg: '/assets/Q2.07_Peta_Perubahan_Pemahaman.svg',
          pngDark: '/assets/Q2.07_Peta_Perubahan_Pemahaman_dark.png',
          svgDark: '/assets/Q2.07_Peta_Perubahan_Pemahaman_dark.svg'
        }
      ],
      quests: QUEST_CATALOG.en
    }
  }
};
