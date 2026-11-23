import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Copy,
  Check,
  ShieldCheck,
  FileCode,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Lock,
  Database,
  Radio,
} from 'lucide-react';
import { sfx } from '../utils/sound';

export interface CodeSnippetItem {
  id: string;
  filename: string;
  language: string;
  title: string;
  description: string;
  securityBadge?: string;
  architecturePattern: string;
  code: string;
}

interface ProductionCodeViewerProps {
  projectId?: string;
  className?: string;
}

const PROJECT_SNIPPETS: Record<string, CodeSnippetItem[]> = {
  'bps-system': [
    {
      id: 'bps-auth',
      filename: 'src/middleware/authJwt.js',
      language: 'JavaScript',
      title: 'JWT Authentication & Role-Based Access Control (RBAC)',
      description:
        'Middleware verifikasi otorisasi pengguna multi-level (Super Admin, Operator Pabrik, Keuangan) dengan proteksi token JWT, payload decoding, dan penanganan token expired.',
      securityBadge: 'Bearer Token Shield & RBAC Guard',
      architecturePattern: 'Express.js Middleware Pattern',
      code: `// src/middleware/authJwt.js
// Enterprise Role-Based Access Control (RBAC) - PT Bintang Plastik Sempurna
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak: Token autentikasi tidak ditemukan.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Verifikasi user masih aktif di database
    const user = await User.findByPk(decoded.userId, {
      include: [{ model: Role, attributes: ['name', 'permissions'] }]
    });

    if (!user || !user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Akun telah dinonaktifkan oleh administrator.'
      });
    }

    req.user = user;
    req.role = user.Role.name;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Sesi telah kedaluwarsa, silakan login ulang.' });
    }
    return res.status(403).json({ success: false, message: 'Token tidak valid.' });
  }
};

const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.role)) {
      return res.status(403).json({
        success: false,
        message: \`Hak akses terbatas. Diperlukan peran: \${allowedRoles.join(', ')}\`
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireRoles };`,
    },
    {
      id: 'bps-transaction',
      filename: 'src/controllers/workOrderController.js',
      language: 'JavaScript',
      title: 'ACID Database Transaction — Produksi & Pemotongan Stok Bahan Baku',
      description:
        'Eksekusi penerbitan Work Order (WO) dengan transaksi database ACID Sequelize. Menjamin stok biji plastik di gudang berkurang tepat secara atomik atau rollback jika stok tidak mencukupi.',
      securityBadge: 'ACID Transactional Integrity',
      architecturePattern: 'Transactional Unit-of-Work',
      code: `// src/controllers/workOrderController.js
// Atomicity, Consistency, Isolation, Durability (ACID) Transaction
const { sequelize, WorkOrder, RawMaterial, BatchLot, AuditLog } = require('../models');

const createWorkOrder = async (req, res) => {
  // Buka transaksi database terisolasi
  const t = await sequelize.transaction();

  try {
    const { orderNumber, recipeId, targetQuantity, materialRequirements } = req.body;

    // 1. Validasi kecukupan seluruh bahan baku sebelum pemotongan
    for (const item of materialRequirements) {
      const material = await RawMaterial.findByPk(item.materialId, {
        lock: t.LOCK.UPDATE, // Row-level locking mencegah race condition
        transaction: t
      });

      if (!material || material.currentStock < item.requiredQuantity) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: \`Stok bahan baku '\${material?.name || item.materialId}' tidak mencukupi!\`
        });
      }

      // Potong stok gudang secara atomik
      await material.decrement('currentStock', {
        by: item.requiredQuantity,
        transaction: t
      });
    }

    // 2. Buat record Work Order baru
    const newWorkOrder = await WorkOrder.create({
      orderNumber,
      recipeId,
      targetQuantity,
      status: 'IN_PRODUCTION',
      createdById: req.user.id,
      startedAt: new Date()
    }, { transaction: t });

    // 3. Catat audit trail untuk kepatuhan regulasi manufaktur
    await AuditLog.create({
      action: 'WORK_ORDER_CREATED',
      entityId: newWorkOrder.id,
      userId: req.user.id,
      details: \`Penerbitan WO \${orderNumber} target: \${targetQuantity} unit.\`
    }, { transaction: t });

    // Commit transaksi jika seluruh tahapan sukses
    await t.commit();

    return res.status(201).json({
      success: true,
      message: 'Work Order produksi berhasil diterbitkan.',
      data: newWorkOrder
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses Work Order: ' + error.message
    });
  }
};

module.exports = { createWorkOrder };`,
    },
    {
      id: 'bps-socket',
      filename: 'src/services/factorySocketService.js',
      language: 'JavaScript',
      title: 'Real-Time Factory WebSocket Engine (Socket.io)',
      description:
        'Layanan WebSocket realtime untuk menyiarkan telemetri sensor suhu mesin extruder plastik, pencapaian target produksi, dan notifikasi peringatan downtime pabrik.',
      securityBadge: 'Low Latency WebSocket Broadcast',
      architecturePattern: 'Event-Driven Publisher/Subscriber',
      code: `// src/services/factorySocketService.js
// Real-Time Machine Telemetry & Event Broadcaster
const { Server } = require('socket.io');

let io = null;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(\`[SOCKET] Klien terhubung: \${socket.id}\`);

    // Bergabung ke room telemetri lantai pabrik
    socket.on('subscribe_factory_floor', (roomName) => {
      socket.join(roomName);
    });

    socket.on('disconnect', () => {
      console.log(\`[SOCKET] Klien terputus: \${socket.id}\`);
    });
  });

  return io;
};

// Siarkan data sensor mesin ke dashboard eksekutif
const broadcastMachineTelemetry = (machineId, data) => {
  if (!io) return;
  io.to('production_floor').emit('telemetry_update', {
    machineId,
    temperatureCelsius: data.temp,
    outputPcsPerMinute: data.rate,
    status: data.temp > 230 ? 'OVERHEAT_WARNING' : 'OPTIMAL',
    timestamp: new Date().toISOString()
  });
};

module.exports = { initSocket, broadcastMachineTelemetry };`,
    },
  ],

  'sipak-rt012': [
    {
      id: 'sipak-surat',
      filename: 'app/Http/Controllers/SuratPengantarController.php',
      language: 'PHP',
      title: 'Digital Citizen Letter Generation & QR Verification (Laravel)',
      description:
        'Controller pembuatan surat pengantar kependudukan otomatis dengan validasi data NIK warga, pembuatan nomor surat dinamis, dan verifikasi QR Code terenkripsi.',
      securityBadge: 'SHA256 Digital Verification QR',
      architecturePattern: 'Laravel MVC Architecture',
      code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\SuratPengantar;
use App\\Models\\Warga;
use Illuminate\\Http\\Request;
use SimpleSoftwareIO\\QrCode\\Facades\\QrCode;
use PDF;

class SuratPengantarController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|digits:16|exists:warga,nik',
            'keperluan' => 'required|string|min:5|max:255',
            'tujuan' => 'required|string|max:100',
        ]);

        $warga = Warga::where('nik', $validated['nik'])->firstOrFail();

        // Generate nomor surat berformat: [NOMOR]/RT012/RW05/[BULAN]/[TAHUN]
        $nomorUrut = SuratPengantar::whereYear('created_at', now()->year)->count() + 1;
        $nomorSurat = sprintf("%03d/RT012/RW05/%s/%s", $nomorUrut, now()->format('m'), now()->year);

        // Buat hash token digital untuk validasi QR Code
        $validationHash = hash('sha256', $nomorSurat . $warga->nik . config('app.key'));

        $surat = SuratPengantar::create([
            'nomor_surat' => $nomorSurat,
            'warga_id' => $warga->id,
            'keperluan' => $validated['keperluan'],
            'tujuan' => $validated['tujuan'],
            'hash_token' => $validationHash,
            'status' => 'TERBIT',
            'diterbitkan_oleh' => auth()->user()->name
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Surat pengantar berhasil diterbitkan.',
            'data' => $surat
        ], 201);
    }
}`,
    },
  ],

  'kost-saali': [
    {
      id: 'kost-billing',
      filename: 'src/utils/billingCalculator.ts',
      language: 'TypeScript',
      title: 'Automated Rental Billing & Direct WhatsApp Link Dispatcher',
      description:
        'Utility penghitungan selisih hari menuju jatuh tempo pembayaran kamar kost dengan format pesan reminder WhatsApp dinamis.',
      securityBadge: 'Type-Safe Due Date Engine',
      architecturePattern: 'Deterministic Utility Pattern',
      code: `// src/utils/billingCalculator.ts
export interface TenantBillingInfo {
  tenantId: string;
  name: string;
  roomNumber: string;
  monthlyFee: number;
  dueDate: string; // ISO Date
  phoneWhatsApp: string;
}

export const calculateDaysRemaining = (dueDateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const generateWhatsAppBillingReminder = (info: TenantBillingInfo): string => {
  const daysLeft = calculateDaysRemaining(info.dueDate);
  const formattedFee = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(info.monthlyFee);

  let statusMsg = \`jatuh tempo dalam \${daysLeft} hari lagi\`;
  if (daysLeft === 0) statusMsg = 'jatuh tempo HARI INI';
  if (daysLeft < 0) statusMsg = \`TELAT \${Math.abs(daysLeft)} hari\`;

  const text = \`Halo Kak \${info.name} (Kamar \${info.roomNumber}),\\n\\n\` +
    \`Mengingatkan tagihan sewa bulanan sebesar \${formattedFee} \${statusMsg} (\${info.dueDate}).\\n\` +
    \`Mohon konfirmasi jika telah melakukan pembayaran.\\n\\nTerima kasih.\\n-- Kost Saali\`;

  return \`https://wa.me/\${info.phoneWhatsApp}?text=\${encodeURIComponent(text)}\`;
};`,
    },
  ],
};

// Fallback general showcase snippets if project is not explicitly found
const GENERAL_SNIPPETS: CodeSnippetItem[] = PROJECT_SNIPPETS['bps-system'];

export const ProductionCodeViewer: React.FC<ProductionCodeViewerProps> = ({
  projectId = 'bps-system',
  className = '',
}) => {
  const availableSnippets = PROJECT_SNIPPETS[projectId] || GENERAL_SNIPPETS;
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(availableSnippets[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet =
    availableSnippets.find((s) => s.id === selectedSnippetId) || availableSnippets[0];

  const handleCopyCode = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentSnippet.code.split('\n');

  return (
    <div
      className={`rounded-3xl border border-slate-200 dark:border-onyx-800 bg-white dark:bg-[#07070B] overflow-hidden shadow-xl dark:shadow-2xl transition-colors ${className}`}
    >
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#0D0D14] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 flex items-center justify-center border border-crimson-500/20">
            <Code2 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Cuplikan Kode Produksi (Clean Architecture)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold hidden xs:inline">
                TERVERIFIKASI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Implementasi nyata best practices, penanganan error, dan keamanan sistem
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyCode}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-crimson-500 dark:hover:text-white hover:border-crimson-500/40 transition-all cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Kode Disalin!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Salin Kode</span>
            </>
          )}
        </button>
      </div>

      {/* Snippet Tab Selector Strip */}
      <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-[#0A0A0F] border-b border-slate-200 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {availableSnippets.map((snippet) => {
          const isActive = snippet.id === currentSnippet.id;
          return (
            <button
              key={snippet.id}
              onClick={() => {
                sfx.playClick();
                setSelectedSnippetId(snippet.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-crimson-600 text-white font-bold shadow-glow-crimson'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
              }`}
            >
              <FileCode size={13} />
              <span>{snippet.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Snippet Context & Architecture Meta */}
      <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-onyx-950/40 border-b border-slate-200 dark:border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h4 className="text-sm font-bold text-slate-800 dark:text-white">
            {currentSnippet.title}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold">
              {currentSnippet.architecturePattern}
            </span>
            {currentSnippet.securityBadge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20 font-bold flex items-center gap-1">
                <ShieldCheck size={11} />
                <span>{currentSnippet.securityBadge}</span>
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {currentSnippet.description}
        </p>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="relative p-4 sm:p-6 bg-[#050508] text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto max-h-[500px]">
        <pre className="flex">
          {/* Line Numbers Column */}
          <div className="select-none text-slate-600 text-right pr-4 border-r border-white/10 shrink-0">
            {lines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Actual Code Column */}
          <div className="pl-4 flex-grow overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} className="leading-6 whitespace-pre">
                {line.startsWith('//') || line.startsWith('/*') ? (
                  <span className="text-slate-500 italic">{line}</span>
                ) : line.includes('const ') ||
                  line.includes('let ') ||
                  line.includes('return ') ||
                  line.includes('async ') ||
                  line.includes('await ') ||
                  line.includes('function') ? (
                  <span className="text-rose-400 font-medium">{line}</span>
                ) : (
                  <span>{line}</span>
                )}
              </div>
            ))}
          </div>
        </pre>
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-[#0D0D14] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-crimson-500" />
          <span>Bahasa: {currentSnippet.language}</span>
          <span>&bull;</span>
          <span>{lines.length} Baris Kode Bersih</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 font-semibold">
          <Check size={12} />
          <span>Production Ready</span>
        </div>
      </div>
    </div>
  );
};
