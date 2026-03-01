import { Cpu, Wifi, Battery, Shield, Leaf, Zap, Eye, Heart, Globe, Layers, Sparkles, Gauge } from "lucide-react";
import ecoChipX1 from "@/assets/eco-chip-x1.png";
import ecoSensePro from "@/assets/eco-sense-pro.png";
import ecoPadLite from "@/assets/eco-pad-lite.png";
import ecoLinkBand from "@/assets/eco-link-band.png";
import ecoStationMini from "@/assets/eco-station-mini.png";
import ecoVisionGlass from "@/assets/eco-vision-glass.png";

export type Status = "available" | "coming-soon" | "sold-out";

export interface ProductSpec {
  icon: typeof Cpu;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  edition: string;
  status: Status;
  price: string;
  specs: ProductSpec[];
  fullSpecs: { label: string; value: string }[];
  features: string[];
  materials: string[];
  gallery: string[];
}

export const products: Product[] = [
  {
    slug: "arocore-x1",
    name: "AroCore X1",
    tagline: "Neural AI Processor",
    desc: "Our flagship bio-chip featuring recycled silicon architecture with 40% less energy consumption. Each unit is individually numbered and hand-inspected before shipping.",
    image: ecoChipX1,
    edition: "Limited to 500 units",
    status: "coming-soon",
    price: "$349",
    specs: [
      { icon: Cpu, label: "Neural 8-Core" },
      { icon: Battery, label: "Ultra Low Power" },
      { icon: Leaf, label: "95% Recycled" },
    ],
    fullSpecs: [
      { label: "Architecture", value: "8-core Neural Processing Unit" },
      { label: "Process Node", value: "4nm recycled silicon" },
      { label: "TDP", value: "5W (40% less than conventional)" },
      { label: "Memory", value: "16GB LPDDR5X eco-fab" },
      { label: "Connectivity", value: "PCIe 5.0, USB4, Wi-Fi 7" },
      { label: "Dimensions", value: "42mm × 42mm × 3.2mm" },
      { label: "Weight", value: "12g" },
      { label: "Certification", value: "Carbon Trust, EPEAT Gold" },
    ],
    features: [
      "On-device AI inference with zero cloud dependency",
      "Adaptive power management — scales cores dynamically",
      "Hardware-level encryption for all data at rest",
      "Compatible with AroStation Mini for edge clusters",
    ],
    materials: [
      "95% recycled silicon substrate",
      "Lead-free soldering throughout",
      "Bio-resin packaging — fully compostable",
      "Soy-based thermal interface material",
    ],
    gallery: [ecoChipX1, ecoChipX1, ecoChipX1],
  },
  {
    slug: "arosense-pro",
    name: "AroSense Pro",
    tagline: "Smart Environment Hub",
    desc: "A biodegradable smart home hub that monitors air quality, energy usage, and connects your eco-friendly devices through green mesh networking.",
    image: ecoSensePro,
    edition: "Limited to 1,000 units",
    status: "coming-soon",
    price: "$199",
    specs: [
      { icon: Wifi, label: "Green Mesh" },
      { icon: Shield, label: "Bio-Secure" },
      { icon: Leaf, label: "Biodegradable" },
    ],
    fullSpecs: [
      { label: "Connectivity", value: "Wi-Fi 6E, Zigbee 3.0, Thread, BLE 5.3" },
      { label: "Sensors", value: "CO₂, VOC, PM2.5, temperature, humidity" },
      { label: "Processor", value: "AroCore Lite (quad-core)" },
      { label: "Storage", value: "32GB eMMC local storage" },
      { label: "Power", value: "5V USB-C, 3W typical" },
      { label: "Dimensions", value: "98mm diameter × 35mm" },
      { label: "Weight", value: "145g" },
      { label: "Shell", value: "PHA bioplastic — biodegrades in 180 days" },
    ],
    features: [
      "Real-time air quality index with health recommendations",
      "Energy usage monitoring for connected devices",
      "Green mesh protocol connects up to 200 devices",
      "Local-first processing — your data stays home",
    ],
    materials: [
      "PHA bioplastic shell — industrially compostable",
      "Recycled copper PCB traces",
      "Plant-based adhesives throughout",
      "Cork base pad from sustainably harvested bark",
    ],
    gallery: [ecoSensePro, ecoSensePro, ecoSensePro],
  },
  {
    slug: "aropad-lite",
    name: "AroPad Lite",
    tagline: "Sustainable Tablet",
    desc: "A lightweight tablet crafted with bamboo-composite casing and an e-ink hybrid display that lasts weeks on a single charge.",
    image: ecoPadLite,
    edition: "Limited to 750 units",
    status: "coming-soon",
    price: "$449",
    specs: [
      { icon: Battery, label: "30-Day Battery" },
      { icon: Leaf, label: "Bamboo Body" },
      { icon: Cpu, label: "AroCore Inside" },
    ],
    fullSpecs: [
      { label: "Display", value: "10.3\" E-ink Kaleido 3 hybrid" },
      { label: "Processor", value: "AroCore X1 (efficiency mode)" },
      { label: "Battery", value: "6,000mAh — 30 days typical" },
      { label: "Storage", value: "128GB UFS 3.1" },
      { label: "RAM", value: "8GB LPDDR5" },
      { label: "Dimensions", value: "242 × 167 × 6.8mm" },
      { label: "Weight", value: "320g" },
      { label: "OS", value: "AroOS (Linux-based)" },
    ],
    features: [
      "E-ink hybrid display readable in direct sunlight",
      "Weeks of battery life on a single charge",
      "Stylus support with bamboo pen included",
      "Runs full productivity suite offline",
    ],
    materials: [
      "Bamboo-composite unibody casing",
      "Recycled aluminum frame reinforcement",
      "Organic cotton carry sleeve included",
      "Mineral-oil-free display lamination",
    ],
    gallery: [ecoPadLite, ecoPadLite, ecoPadLite],
  },
  {
    slug: "arolink-band",
    name: "AroLink Band",
    tagline: "Eco Fitness Wearable",
    desc: "Health tracking meets sustainability — a fitness band made from ocean-recycled plastics with solar-assisted charging.",
    image: ecoLinkBand,
    edition: "Limited to 2,000 units",
    status: "coming-soon",
    price: "$129",
    specs: [
      { icon: Battery, label: "Solar Charge" },
      { icon: Shield, label: "Health AI" },
      { icon: Leaf, label: "Ocean Plastic" },
    ],
    fullSpecs: [
      { label: "Display", value: "1.1\" AMOLED, 326ppi" },
      { label: "Sensors", value: "Heart rate, SpO2, skin temp, accelerometer" },
      { label: "Battery", value: "180mAh + solar cell — 14 days typical" },
      { label: "Water Rating", value: "5ATM (50m)" },
      { label: "Connectivity", value: "BLE 5.3, NFC" },
      { label: "Dimensions", value: "42 × 24 × 11mm" },
      { label: "Weight", value: "28g" },
      { label: "Band Size", value: "Adjustable 140–220mm" },
    ],
    features: [
      "Solar-assisted charging extends battery indefinitely outdoors",
      "On-device health AI — no phone needed for insights",
      "Contactless payments via NFC",
      "Sleep quality analysis with gentle haptic alarm",
    ],
    materials: [
      "Band made from 100% ocean-recycled HDPE",
      "Recycled stainless steel buckle",
      "Bio-based gorilla glass alternative",
      "Compostable packaging with seed paper insert",
    ],
    gallery: [ecoLinkBand, ecoLinkBand, ecoLinkBand],
  },
  {
    slug: "arostation-mini",
    name: "AroStation Mini",
    tagline: "Edge Compute Node",
    desc: "A palm-sized edge computing device for on-device AI processing. Zero cloud dependency, carbon-neutral manufacturing.",
    image: ecoStationMini,
    edition: "Limited to 300 units",
    status: "coming-soon",
    price: "$599",
    specs: [
      { icon: Cpu, label: "Edge AI" },
      { icon: Shield, label: "Privacy First" },
      { icon: Leaf, label: "Carbon Neutral" },
    ],
    fullSpecs: [
      { label: "Processor", value: "Dual AroCore X1 in tandem" },
      { label: "RAM", value: "32GB LPDDR5X" },
      { label: "Storage", value: "512GB NVMe (expandable)" },
      { label: "Networking", value: "2.5GbE, Wi-Fi 7, BLE 5.3" },
      { label: "TDP", value: "15W typical" },
      { label: "Dimensions", value: "80 × 80 × 52mm" },
      { label: "Weight", value: "210g" },
      { label: "Cooling", value: "Passive — recycled copper heatsink" },
    ],
    features: [
      "Run LLMs locally with dual AroCore X1 processors",
      "Cluster multiple units for distributed workloads",
      "Silent operation — fully passive cooling",
      "Kubernetes-ready out of the box",
    ],
    materials: [
      "Recycled wood composite chassis",
      "Recycled copper heatsink and PCB",
      "Hemp fiber internal dampening",
      "Carbon-offset manufacturing — net zero lifecycle",
    ],
    gallery: [ecoStationMini, ecoStationMini, ecoStationMini],
  },
  {
    slug: "arovision-glass",
    name: "AroVision Glass",
    tagline: "AR Smart Glasses",
    desc: "Augmented reality glasses with frames made from recycled titanium and plant-based polymers. See the world differently.",
    image: ecoVisionGlass,
    edition: "Limited to 200 units",
    status: "coming-soon",
    price: "$799",
    specs: [
      { icon: Cpu, label: "AR Engine" },
      { icon: Battery, label: "All-Day Use" },
      { icon: Leaf, label: "Recycled Ti" },
    ],
    fullSpecs: [
      { label: "Display", value: "Dual micro-OLED waveguide, 50° FoV" },
      { label: "Processor", value: "AroCore X1 (AR-optimized)" },
      { label: "Camera", value: "12MP RGB + depth sensor" },
      { label: "Audio", value: "Open-ear directional speakers" },
      { label: "Battery", value: "Built-in 800mAh — 8 hours" },
      { label: "Connectivity", value: "Wi-Fi 6E, BLE 5.3, UWB" },
      { label: "Weight", value: "48g" },
      { label: "Lenses", value: "Prescription-compatible snap-in" },
    ],
    features: [
      "Real-time AR overlays for navigation and translation",
      "Gesture and voice control — no touch needed",
      "Prescription lens compatibility with snap-in system",
      "Spatial audio for immersive notifications",
    ],
    materials: [
      "Recycled titanium frame — hypoallergenic",
      "Plant-based cellulose acetate temple tips",
      "Bio-glass lens coating — scratch resistant",
      "Bamboo charging cradle included",
    ],
    gallery: [ecoVisionGlass, ecoVisionGlass, ecoVisionGlass],
  },
];
