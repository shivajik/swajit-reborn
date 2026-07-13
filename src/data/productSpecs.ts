// Hard-coded product specification tables extracted from the official
// Swajit product catalogue (Cement / Steel / Power / Edible Oil, dtd 13-06-2026).
// Each entry is matched to a product by ANY of the `match` substrings (case-insensitive)
// against either the product name or the category slug (formatted as "category:<slug>").
// A single product may show multiple tables (e.g. Bucket Elevator has two).

export interface ProductSpec {
  title?: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number)[][];
  notes?: string[];
  match: string[];
}

export const productSpecs: ProductSpec[] = [
  // --- Drag Chain / Flow Conveyor Chain (Cement) ---
  {
    title: "Drag Chain / Flow Conveyor Chain",
    columns: ["Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)", "B", "C", "D", "E", "F", "G"],
    rows: [
      ["SWAJIT 2101", 142, "6,700", "20,000", 10, 20, 42, 11, 50, 25],
      ["SWAJIT 2102", 142, "8,400", "25,000", 11, 19, 43, 15, 50, 25],
      ["SWAJIT 2103", 142, "9,400", "28,000", 15, 30, 62, 16, 50, 25],
      ["SWAJIT 2104", 142, "10,000", "30,000", 16, 25, 58, 16, 50, 25],
      ["SWAJIT 2105", 142, "10,000", "30,000", 16, 30, 63, 18, 50, 25],
      ["SWAJIT 2106", 150, "7,400", "22,000", 10, 20, 41, 12, 46, 25],
      ["SWAJIT 2107", 150, "11,700", "35,000", 14, 31, 61, 20, 50, 28],
      ["SWAJIT 2108", 160, "8,400", "25,000", 11, 20, 43, 12, 56, 25],
      ["SWAJIT 2109", 200, "13,500", "40,000", 13, 26, 54, 14, 54, 28],
      ["SWAJIT 2110", 216, "16,700", "50,000", 17, 27, 63, 18, 72, 30],
      ["SWAJIT 2111", 260, "20,000", "60,000", 18.5, 31, 70, 20, 75, 32],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["drag chain", "flow conveyor"],
  },
  {
    title: "Drag Chain / Flow Conveyor Chain — Type Y",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Link Width (F)", "Link Height (G)", "Link Thk (H)", "Att Thk (I)", "Att Length (J)", "Att Width (K)",
    ],
    rows: [
      ["SWAJIT 2151", 100, "4,700", "14,000", 16, 68, 28, 40, 28, 42, 40, 6, 8, 180],
      ["SWAJIT 2152", 102, "4,700", "14,000", 16, 70, 28, 42, 30, 44, 50, 6, 8, 250],
      ["SWAJIT 2153", 125, "4,700", "14,000", 15, 76, 26, 40, 28, 42, 40, 6, 8, 276],
      ["SWAJIT 2154", 125, "6,700", "20,000", 20, 80, 32, 46, 34, 48, 50, 6, 8, 482],
      ["SWAJIT 2155", 125, "10,000", "30,000", 22, 90, 35, 50, 34, 52, 65, 8, 10, 482],
      ["SWAJIT 2156", 150, "8,400", "25,000", 20, 100, 32, 61, 45, 63, 65, 8, 10, 440],
      ["SWAJIT 2157", 160, "7,400", "22,000", 21, 100, 30, 56, 40, 58, 60, 8, 10, 315],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["drag chain", "flow conveyor"],
  },

  // --- Reclaimer Chain (two variants) ---
  {
    title: "Reclaimer Chain — With Out-Board Rollers",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Inner Width (H)", "Inner Thk (I)", "Att Width (J)", "Att Thk (K)",
      "L", "M", "N", "O", "P", "Q","R"
    ],
    rows: [
      ["SWAJIT 2201", 250, "13,500", "40,000", 26, 110, 34, 74, 85, 52, 54, 75, 70, 10, 150, 12, 35, 80, 90, 170,22],
      ["SWAJIT 2202", 250, "20,000", "60,000", 28, 110, 36, 74, 85, 52, 54, 75, 75, 10, 175, 12, 37.5, 95, 90, 170, 21],
      ["SWAJIT 2203", 250, "26,700", "80,000", 30, 135, 38, 82, 95, 52, 54, 83, 80, 14, 180, 16, 40, 100, 90, 170, 21],
      ["SWAJIT 2204", 250, "33,400", "1,00,000", 36, 165, 45, 93, 105, 55, 57, 94, 90, 18, 170, 20, 45, 80, 90, 170, 26],
      ["SWAJIT 2205", 250, "46,700", "1,40,000", 40, 170, 48, 135, 115, 93, 95, 136, 100, 20, 170, 22, 50, 88, 210, 300, 25],
      ["SWAJIT 2206", 315, "23,500", "70,000", 36, 125, 44, 61, 120, 35, 37, 62, 90, 12, 200, 14, 45, 120, 130, 200,25],
      ["SWAJIT 2207", 315, "30,000", "90,000", 36, 155, 44, 82, 120, 48, 50, 83, 80, 16, 200, 18, 40, 120, 130, 200,25],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["reclaimer"],
  },
  {
    title: "Reclaimer Chain — Standard",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Inner Width (H)", "Inner Width (I)", "Inner Thk (J)",
      "K", "L", "M", "N", "O", "P", "Q",
    ],
    rows: [
      ["SWAJIT 2251", 250, "6,700", "20,000", 18, 75, 25, 46, 64, 28, 30, 47, 50, 8, 130, 100, 160, 80, 133, 21],
      ["SWAJIT 2252", 250, "13,500", "40,000", 25, 100, 33, 66, 100, 46, 48, 67, 70, 10, 110, 90, 140, 90, 126, 22],
      ["SWAJIT 2253", 250, "26,700", "80,000", 33, 132, 42, 82, 95, 52, 54, 83, 75, 14, 157, 100, 150, 110, 160, 25],
      ["SWAJIT 2254", 315, "20,000", "60,000", 36, 130, 44, 74, 120, 48, 50, 75, 80, 12, 140, 130, 190, 90, 125, 21],
      ["SWAJIT 2255", 315, "36,700", "1,10,000", 36, 155, 44, 100, 150, 68, 70, 101, 100, 16, 140, 130, 190, 117, 147, 25],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["reclaimer"],
  },

  // --- Bucket Elevator Chain (two variants) ---
  {
    title: "Bucket Elevator Chain — Type X / Y / Z",
    columns: [
      "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Inner Width (H)", "Inner Thk (I)",
      "L", "M", "N", "O",
    ],
    rows: [
      ["SWAJIT 2301", "X", 75, "6,000", "18,000", 14.5, 66, 20, 43, 29, 28, 30, 44, 40, 6, 75, 80, 14],
      ["SWAJIT 2302", "X", 76.2, "7,400", "22,000", 19, 90, 27, 53, 40, 38, 40, 57, 50, 8, 75, 80, 14],
      ["SWAJIT 2303", "X", 125, "16,700", "50,000", 28, 134, 36, 92, 56.8, 62, 66, 94, 75, 13, 125, 110, 18],
      ["SWAJIT 2304", "Y", 150, "6,000", "18,000", 14.5, 68, 20, 42, 29, 28, 30, 44, 38, 6, 75, 80, 14],
      ["SWAJIT 2305", "Y", 200, "10,000", "30,000", 19, 107, 27, 72, 40, 50, 52, 73, 50, 10, 100, 100, 16],
      ["SWAJIT 2306", "Z", 250, "10,000", "30,000", 19, 107, 27, 72, 40, 50, 52, 73, 50, 10, 140, 100, 19],
      ["SWAJIT 2307", "Z", 250, "13,500", "40,000", 24, 113, 34, 77, 50.8, 55, 57, 78, 65, 10, 140, 100, 19],
      ["SWAJIT 2308", "Z", 300, "13,500", "40,000", 24, 113, 34, 77, 50.8, 55, 57, 78, 65, 10, 170, 100, 19],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["bucket elevator"],
  },
  {
    title: "Bucket Elevator Chain — K-24 / K-32 / K-44 / K-443",
    columns: [
      "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Link Width (F)", "Link Thk (G)",
      "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    ],
    rows: [
      ["SWAJIT 0800", "K-32", 101.6, "6,700", "20,000", 15.75, 106, 25.4, 74, 54, 75, 40, 10, 20, 27, 47, 45, 135, 75, 170, "-", "-", 12],
      ["SWAJIT 0956", "K-24", 152.4, "19,300", "57,900", 25.4, 142, 44, 101.6, 76.2, 102.6, 76.2, 12.7, 31.7, 47.6, 79.3, 63.5, "-", 183.9, "-", 184.1, 246.9, 18],
      ["SWAJIT 0958", "K-44", 152.4, "28,900", "86,700", 30, 142, 50.8, 101.6, 76.2, 102.6, 62.6, 12.7, 41.5, 63.5, 105, 88.9, "-", 177.8, 304.8, 146, 345, 14],
      ["SWAJIT 0984", "K-443", 177.8, "37,000", "111,000", 35, 173, 63.5, 125.3, 95.3, 126.3, 101.6, 15, 47.8, 76.2, 124, 95.3, 69.85, 228.6, 330.2, 187, 375, 18],
      ["SWAJIT 0864", "K-443", 177.8, "36,700", "110,000", 31, 180, 60, 127, 95, 128, 100, 16, 44, 76, 120, 95, 70, 230, 330, 187, 375, 18],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["bucket elevator"],
  },

  // --- Deep Bucket Conveyor Chain ---
  {
    title: "Deep Bucket Conveyor Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Bush Dia (C)", "Link Width (D)",
      "E", "F", "G", "H", "I", "J",
    ],
    rows: [
      ["SWAJIT 2401", 250, "10,500", "31,500", 32, 50, 45, 65, 75, 140, 150, 80, 18],
      ["SWAJIT 2402", 250, "13,500", "40,000", 36, 50, 50, 64, 80, 140, 152, 80, 18],
      ["SWAJIT 2403", 250, "22,500", "67,500", 36, 50, 54, 80, 100, 140, 150, 80, 18],
      ["SWAJIT 2404", 315, "6,700", "20,000", 26, 50, 36, 55, 65, 100, 170, 115, 18],
      ["SWAJIT 2405", 315, "26,700", "80,000", 36, 50, 54, 80, 100, 140, 170, 115, 18],
      ["SWAJIT 2406", 315, "31,700", "95,000", 38, 50, 60, 84, 106, 140, 170, 115, 18],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["deep bucket"],
  },

  // --- Pan Conveyor Chain ---
  {
    title: "Pan Conveyor Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)",
      "E", "F", "G", "H", "I", "J", "K", "L",
    ],
    rows: [
      ["SWAJIT 2501", 250, "10,000", "30,000", 25, 95, 40, 45, 65, 59.5, 75, 140, 14, 120, 180],
      ["SWAJIT 2502", 250, "11,700", "35,000", 26, 95, 40, 45, 65, 60, 75, 150, 14, 120, 180],
      ["SWAJIT 2503", 250, "15,000", "45,000", 26, 100, 40, 45, 70, 60, 80, 140, 14, 125, 185],
      ["SWAJIT 2504", 250, "16,700", "50,000", 27, 114, 40, 45, 80, 74, 80, 150, 14, 125, 185],
      ["SWAJIT 2505", 250, "23,500", "70,000", 38, 145, 56, 75, 100, 75, 80, 190, 14, 125, 185],
      ["SWAJIT 2506", 250, "33,400", "1,00,000", 38, 142, 56, 75, 100, 80, 80, 200, 14, 125, 185],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["pan conveyor"],
  },

  // --- Travel Grate Chain ---
  {
    title: "Travel / Traveling Grate Chain",
    columns: [
      "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Link Width (K)", "Link Thk (L)", "Height (M)",
    ],
    rows: [
      ["SWAJIT 2801", "X", 146, "13,500", "40,000", 24.65, 136, 114, "-", "-", 57, 65, 16, 186],
      ["SWAJIT 2802", "Y", 150, "13,500", "40,000", 25, 94, 33, 56, 75, 35, 65, 10, 140],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["travel grate", "traveling grate", "travelling grate"],
  },

  // ============ SUGAR INDUSTRY ============
  // --- Feeder Table Chain / S-1 Attachment / Pusher Chain ---
  {
    title: "S-1 Attachment / Feeder Table Chain / Pusher Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "H", "I", "Link Plain W (J)", "Link Plain Thk (K)", "Link Att W (L)", "Link Att Thk (M)",
    ],
    rows: [
      ["SWAJIT 1001", 150, "6,700", "20,000", 20, 77, 27, 48, 60, 30, 32, 49, 50, 8, 125, 8],
      ["SWAJIT 1002", 150, "10,000", "30,000", 23, 91, 30, 57, 75, 35, 37, 58, 65, 10, 145, 10],
      ["SWAJIT 1003", 150, "13,400", "40,000", 25, 100, 33, 61, 75, 35, 37, 62, 65, 12, 150, 12],
      ["SWAJIT 1004", 150, "20,000", "60,000", 28, 110, 35, 65, 75, 35, 37, 66, 65, 14, 150, 14],
      ["SWAJIT 1005", 200, "26,666", "80,000", 32, 118, 42, 65, 90, 35, 37, 66, 75, 14, 200, 14],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["feeder table", "pusher chain", "s-1 attachment"],
  },

  // --- Cane Carrier Chain / K-2 Attachment ---
  {
    title: "K-2 Attachment / Cane Carrier Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Link H", "Link I", "Link Thk (J)", "K", "L",
      "Slat Fit W (M)", "Slat Fit H (N)", "O", "P",
    ],
    rows: [
      ["SWAJIT 1101", 150, "6,700", "20,000", 20, 78, 27, 48, 60, 30, 32, 49, 50, 8, 25, 61, 60, 120, 12],
      ["SWAJIT 1102", 150, "10,000", "30,000", 23, 91, 30, 57, 75, 35, 37, 58, 65, 10, 32.5, 78, 64, 126, 14],
      ["SWAJIT 1103", 150, "13,500", "40,000", 25, 101, 33, 61, 75, 35, 37, 62, 65, 12, 32.5, 80, 60, 130, 14],
      ["SWAJIT 1104", 150, "13,500", "40,000", 25, 101, 33, 61, 75, 35, 37, 62, 65, 12, 32.5, 80, 75, 150, 14],
      ["SWAJIT 1105", 150, "16,700", "50,000", 28, 101, 35, 61, 75, 35, 37, 62, 65, 12, 32.5, 80, 60, 130, 14],
      ["SWAJIT 1106", 150, "16,700", "50,000", 28, 101, 35, 61, 75, 35, 37, 62, 65, 12, 32.5, 80, 75, 150, 14],
      ["SWAJIT 1107", 150, "20,000", "60,000", 28, 110, 36, 65, 75, 35, 37, 66, 65, 14, 32.5, 82, 75, 150, 14],
      ["SWAJIT 1108", 150, "26,700", "80,000", 30, 118, 38, 69, 90, 35, 37, 70, 75, 16, 37.5, 94, 75, 150, 14],
      ["SWAJIT 1109", 200, "20,000", "60,000", 28, 101, 36, 61, 90, 35, 37, 62, 75, 12, 37.5, 90, 75, 150, 14],
      ["SWAJIT 1110", 200, "25,000", "75,000", 30, 110, 38, 65, 90, 35, 37, 66, 75, 14, 37.5, 93, 80, 170, 14],
      ["SWAJIT 1111", 200, "26,700", "80,000", 32, 120, 40, 69, 90, 35, 37, 70, 75, 16, 37.5, 94, 80, 170, 18],
      ["SWAJIT 1112", 200, "33,400", "1,00,000", 32, 120, 40, 69, 90, 35, 37, 70, 75, 16, 37.5, 94, 100, 170, 18],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["cane carrier", "k-2 attachment"],
  },

  // --- Bagasse Carrier Chain / AS2 Attachment ---
  {
    title: "AS2 Attachment / Bagasse Carrier Chain",
    subtitle: "Also known as Return Bagasse Carrier (RBC), Main Bagasse Carrier (MBC), Bagasse Elevator (BEC)",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Link Plain W (H)", "Link Plain Thk (I)",
      "Att J", "Att K", "Att L", "Att M", "Att N",
    ],
    rows: [
      ["SWAJIT 1201", 150, "6,700", "20,000", 20, 78, 27, 48, 60, 30, 32, 49, 50, 8, 50, 10, 70],
      ["SWAJIT 1202", 150, "10,000", "30,000", 23, 91, 30, 57, 75, 35, 37, 58, 65, 10, 50, 12, 75],
      ["SWAJIT 1203", 150, "13,500", "40,000", 25, 101, 33, 61, 75, 35, 37, 62, 65, 12, 65, 16, 85],
      ["SWAJIT 1204", 150, "16,700", "50,000", 28, 101, 35, 61, 75, 35, 37, 62, 65, 12, 65, 20, 85],
      ["SWAJIT 1205", 150, "20,000", "60,000", 28, 110, 36, 65, 75, 35, 37, 66, 65, 14, 65, 25, 95],
      ["SWAJIT 1206", 150, "26,700", "80,000", 30, 118, 38, 69, 90, 35, 37, 70, 75, 16, 65, 25, 100],
      ["SWAJIT 1207", 200, "20,000", "60,000", 28, 101, 36, 61, 90, 35, 37, 62, 75, 12, 65, 20, 85],
      ["SWAJIT 1208", 200, "25,000", "75,000", 30, 110, 38, 65, 90, 35, 37, 66, 75, 14, 80, 25, 95],
      ["SWAJIT 1209", 200, "26,700", "80,000", 32, 120, 40, 69, 90, 35, 37, 70, 75, 16, 80, 25, 100],
      ["SWAJIT 1210", 200, "33,400", "1,00,000", 32, 120, 40, 69, 90, 35, 37, 70, 75, 16, 80, 25, 100],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["bagasse", "as2 attachment", "rbc", "mbc", "bec"],
  },

  // --- Forged Rake Elevator / Inter Carrier Chain ---
  {
    title: "Forged Rake Elevator / Inter Carrier Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Nut Size (C)", "Bush Dia (D)", "Bush Length (E)",
      "Link F", "Link G", "Link H", "Link I", "Link J", "Link K",
      "Att L", "Att M", "Att N",
    ],
    rows: [
      ["SWAJIT 1301", 101.6, "3,400", "10,000", 16, "M-12", 22, 20, 15, 8.5, 38, 26, 20, 10, "-", 90, 17],
      ["SWAJIT 1302", 101.6, "5,000", "15,000", 18, "M-16", 23, 25, 20, 14, 55, 28, 20, 10, "-", 90, 17],
      ["SWAJIT 1303", 150, "15,000", "45,000", 28, "M-24", 34, 32, 20, 14, 61, 50, 30, 16, "-", 100, 18],
      ["SWAJIT 1304", 200, "13,500", "40,000", 26, "M-24", 32, 28, 19, 13, 55, 46, 32, 12, 60, 80, 18],
      ["SWAJIT 1305", 229, "20,000", "60,000", 32, "M-30", 40, 33, 28, 18, 71, 57, 35, 16, 70, 110, 18],
      ["SWAJIT 1306", 229, "23,500", "70,000", 32, "M-30", 40, 34, 28, 20, 76, 65, 40, 16, 70, 120, 18],
      ["SWAJIT 1307", 229, "26,700", "80,000", 34, "M-30", 42, 40, 30, 22, 86, 68, 40, 16, 50, 145, 20],
      ["SWAJIT 1308", 229, "33,400", "1,00,000", 35, "M-30", 44, 40, 32, 24, 90, 65, 42.5, 20, 70, 150, 20],
      ["SWAJIT 1309", 300, "26,700", "80,000", 36, "M-30", 44, 40, 32, 22, 86, 65, 42.5, 25, 100, 108, 18],
      ["SWAJIT 1310", 300, "30,000", "90,000", 36, "M-30", 44, 44, 32, 25, 95, 62, 45, 20, 112, 120, 22],
      ["SWAJIT 1311", 300, "33,400", "1,00,000", 45, "M-39", 57, 50, 35, 30, 112, 64, 50, 20, 125, 125, 18],
      ["SWAJIT 1312", 300, "40,000", "1,20,000", 45, "M-36", 52, 50, 38, 35, 122, 64, 50, 20, 70, 100, 22],
      ["SWAJIT 1313", 300, "43,400", "1,30,000", 45, "M-42", 55, 51, 40, 38, 130, 65, 50, 20, 112, 108, 22],
      ["SWAJIT 1314", 300, "43,400", "1,30,000", 45, "M-42", 55, 51, 40, 38, 130, 65, 50, 20, 112, 108, 22],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["forged rake", "inter carrier"],
  },

  // --- Rake Carrier Chain (Fabricated) ---
  {
    title: "Rake Carrier Chain (Fabricated) / Fabricated Carrier Chain",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Nut (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)", "Liner Bush Dia", "Liner Bush Length",
      "Link Width", "Link Thk",
      "Rake Att L", "Rake Att M", "Rake Att N", "Rake Att O", "Rake Att P",
    ],
    rows: [
      ["SWAJIT 1401", 150, "13,500", "40,000", 25, "M-20", 33, 61, 75, 35, 40, 35, 62, 12, 50, 90, 16, 18, 85],
      ["SWAJIT 1402", 150, "20,000", "60,000", 28, "M-24", 36, 65, 76, 35, 44, 35, 66, 14, 50, 90, 16, 18, 85],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["fabricated carrier", "fabricated rake", "rake carrier"],
  },

  // --- Sugar Bag Stacker Chain ---
  {
    title: "Sugar Bag Stacker Chain",
    columns: [
      "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
      "Roller Dia (F)", "Roller Length (G)",
      "Link W (H)", "Link Thk (I)", "Link H (J)", "Link Thk (K)",
      "L", "M", "N", "O","P"
    ],
    rows: [
      ["SWAJIT 1601", "X", 66.5, "3,400", "10,000", 10, 61, 14, 39, 24, 28, 29, 40, 25, 5, 12.5, 31, 5, 100,11],
      ["SWAJIT 1602", "X", 70, "3,400", "10,000", 10, 61, 14, 39, 24, 28, 29, 40, 25, 5, 12.5, 31, 5, 100,11],
      ["SWAJIT 1603", "Y", 75, "3,400", "10,000", 10, 61, 14, 39, 24, 28, 29, 40, 25, 5, 12.5, 36, 5, 100,11],
      ["SWAJIT 1604", "Y", 76.2, "3,400", "10,000", 10, 61, 14, 39, 24, 28, 29, 40, 25, 5, 12.5, 36, 5, 100,11],
    ],
    notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
    match: ["sugar bag stacker", "bag stacker"],
  },

  // --- Drop Forged Chain (Washing Table Chain) ---
  {
    title: "Drop Forged Chain (Washing Table Chain)",
    columns: [
      "Model No.", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
      "Pin Dia (B)", "Pin Length (C)", "D", "E",
    ],
    rows: [
      ["SWAJIT 0348", 76.2, "8,000", "24,000", 12.7, 46.99, 26.92, 19.05],
      ["SWAJIT 0458", 102.38, "16,000", "48,000", 15.87, 57.91, 34.92, 25.65],
      ["SWAJIT 0678", 153.18, "28,333", "85,000", 22.22, 79.5, 50.8, 32.76],
      ["SWAJIT 0698", 153.18, "45,333", "1,36,000", 28.44, 95.25, 68.32, 39.37],
    ],
    notes: ["All dimensions are in mm."],
    match: ["drop forged", "washing table"],
  },

  // // --- Sugar Elevator Chain (share Bucket Elevator sizing typical) ---
  // // Uses Bucket Elevator variants which already exist; add a sugar-specific match for "elevator chain" in sugar category
  // {
  //   title: "Sugar Elevator Chain",
  //   subtitle: "Used for elevating sugar to storage before packing. Available with various attachments as per requirement.",
  //   columns: [
  //     "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
  //     "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
  //     "Roller Dia (F)", "Roller Length (G)",
  //     "Inner Width (H)", "Inner Thk (I)",
  //   ],
  //   rows: [
  //     ["SWAJIT 2301", "X", 75, "6,000", "18,000", 14.5, 66, 20, 43, 29, 28, 30, 44],
  //     ["SWAJIT 2302", "X", 76.2, "7,400", "22,000", 19, 90, 27, 53, 40, 38, 40, 57],
  //     ["SWAJIT 2304", "Y", 150, "6,000", "18,000", 14.5, 68, 20, 42, 29, 28, 30, 44],
  //     ["SWAJIT 2305", "Y", 200, "10,000", "30,000", 19, 107, 27, 72, 40, 50, 52, 73],
  //   ],
  //   notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
  //   match: ["category:sugar-industry|elevator", "sugar elevator"],
  // },

  // // --- Sugar Drive Chain ---
  // {
  //   title: "Drive Chain",
  //   columns: [
  //     "Model No.", "Type", "Pitch (A)", "Proof Load (kgf)", "Breaking Load (kgf)",
  //     "Pin Dia (B)", "Pin Length (C)", "Bush Dia (D)", "Bush Length (E)",
  //     "Roller Dia (F)", "Roller Length (G)",
  //     "H", "I", "Link Width (J)", "Link Thk (K)",
  //   ],
  //   rows: [
  //     ["SWAJIT 5001", "Y", 78.1, "3,800", "11,260", 14.3, 70, 31, 44.4, "-", "-", 31.8, 45.4, 31.8, 6.3],
  //     ["SWAJIT 5002", "Y", 101.6, "6,400", "19,200", 19, 91, 36.6, 59.6, "-", "-", 41.4, 60.6, 38.1, 9.1],
  //     ["SWAJIT 5003", "X", 152.4, "58,700", "1,76,000", 38.1, 174, 56, 115, 76.2, 76.2, 77, 119, 101.6, 19],
  //     ["SWAJIT 5004", "Y", 153.7, "11,700", "35,000", 25.4, 141, 44.4, 101.6, "-", "-", 76.2, 102.6, 50.8, 12.7],
  //   ],
  //   notes: ["Alternative sizes are also available on request.", "All dimensions are in mm."],
  //   match: ["category:sugar-industry|drive"],
  // },
];

/**
 * Return the spec tables that apply to a given product.
 * Matches by product name substring, plus a special "category:<slug>|..." token
 * that requires the current category slug to match.
 */
export function findProductSpecs(productName: string, categorySlug?: string): ProductSpec[] {
  const name = productName.toLowerCase();
  return productSpecs.filter((spec) =>
    spec.match.some((token) => {
      const t = token.toLowerCase();
      if (t.startsWith("category:")) {
        const [catPart, namePart] = t.slice("category:".length).split("|");
        if (!categorySlug || categorySlug.toLowerCase() !== catPart) return false;
        return namePart ? name.includes(namePart) : true;
      }
      return name.includes(t);
    }),
  );
}