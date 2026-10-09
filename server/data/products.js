export const initialProducts = [
  {
    name: "Acid Matrix Heavyweight Hoodie",
    slug: "acid-matrix-heavyweight-hoodie",
    tagline: "520 GSM ultra-dense loopback cotton with screenprinted hazard graphics",
    description: "Built like a brutalist monolith. Cut with exaggerated drop-shoulders, massive kangaroo pocket, and double-layered heavyweight hood that stands on its own. Pre-shrunk industrial wash with raw cut edge finishings and high-contrast neo-brutalist graphic hits on sleeves and back.",
    price: 88,
    originalPrice: 125,
    category: "Streetwear",
    tags: ["BESTSELLER", "520 GSM", "OVERSIZED"],
    badge: "30% OFF",
    badgeColor: "pink",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 18,
    isFeatured: true,
    isNewDrop: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pitch Black", hex: "#111111" },
      { name: "Acid Lime", hex: "#B8FF00" },
      { name: "Concrete Heather", hex: "#7F8489" }
    ],
    specs: [
      { label: "Fabric Weight", value: "520 GSM Loopback Terry" },
      { label: "Material", value: "100% Organic Combed Cotton" },
      { label: "Fit", value: "Boxy / Brutal Oversize" },
      { label: "Origin", value: "Crafted in Portugal" }
    ],
    rating: 4.9,
    numReviews: 34,
    reviews: [
      {
        user: "Marcus K.",
        rating: 5,
        comment: "The weight on this hoodie is insane. Thickest hood I own, pure neo-brutalist armor.",
        verifiedPurchase: true,
        createdAt: new Date("2026-08-15")
      },
      {
        user: "Elena V.",
        rating: 5,
        comment: "Colors pop 10x harder in person. Got 4 compliments on the subway day one.",
        verifiedPurchase: true,
        createdAt: new Date("2026-08-28")
      }
    ]
  },
  {
    name: "Concrete Matrix Cargo Pants",
    slug: "concrete-matrix-cargo-pants",
    tagline: "Modular 8-pocket tactical ripstop with fluorescent pull-tethers",
    description: "Designed for street architects and urban drifters. Engineered with hard-wearing cotton-nylon ripstop, triple reinforced knees, deep 3D envelope cargo pockets with chunky velcro flaps, and snap-cinch cuffs for pairing with chunky footwear.",
    price: 110,
    originalPrice: 140,
    category: "Streetwear",
    tags: ["WATER-RESISTANT", "8 POCKETS", "RIPSTOP"],
    badge: "HOT DROP",
    badgeColor: "yellow",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 12,
    isFeatured: true,
    isNewDrop: false,
    sizes: ["S (30)", "M (32)", "L (34)", "XL (36)"],
    colors: [
      { name: "Raw Concrete", hex: "#8A8D91" },
      { name: "Stealth Black", hex: "#0E0E0E" },
      { name: "Safety Ochre", hex: "#E59500" }
    ],
    specs: [
      { label: "Composition", value: "70% Cotton / 30% Cordura Nylon" },
      { label: "Hardware", value: "YKK Vislon Zips & Dura-Velcro" },
      { label: "Pockets", value: "8 Modular Gusseted Compartments" },
      { label: "Fit", value: "Relaxed Taper with Adjustable Cinch" }
    ],
    rating: 4.8,
    numReviews: 22,
    reviews: [
      {
        user: "Dax T.",
        rating: 5,
        comment: "Pocket capacity is unbelievable. Don't even need a backpack when wearing these.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-02")
      }
    ]
  },
  {
    name: "Cyber Glitch High-Density Tee",
    slug: "cyber-glitch-high-density-tee",
    tagline: "280 GSM combed jersey with tactile 3D rubberized typography",
    description: "Bold statement piece with high-contrast screenprint and tactile dimensional puff ink. Built with reinforced collar binding that never sags, double needle seam construction, and a boxy vintage silhouette.",
    price: 45,
    originalPrice: 55,
    category: "Streetwear",
    tags: ["280 GSM", "PUFF PRINT", "HEAVYWEAR"],
    badge: "STAFF PICK",
    badgeColor: "cyan",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 25,
    isFeatured: false,
    isNewDrop: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Off-White Chalk", hex: "#F5F3E9" },
      { name: "Electric Black", hex: "#121212" },
      { name: "Cyber Purple", hex: "#7E57C2" }
    ],
    specs: [
      { label: "Weight", value: "280 GSM Single Jersey" },
      { label: "Printing", value: "Silkscreen + 3D Micro-Puff" },
      { label: "Neckline", value: "1.25\" Chunky Ribbed Crewneck" }
    ],
    rating: 4.7,
    numReviews: 19,
    reviews: [
      {
        user: "Kai S.",
        rating: 5,
        comment: "The puff print has real texture! Washed it 5 times and it looks brand new.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-11")
      }
    ]
  },
  {
    name: "Neo-Lug Chunky Stomp Boots",
    slug: "neo-lug-chunky-stomp-boots",
    tagline: "Exaggerated 55mm platform lug sole with contrast pull tabs",
    description: "Make an unforgettable footprint. Crafted with full-grain vulcanized leather, oversized geometric deep-tread rubber outsole, Goodyear welt construction, and padded neoprene collar for immediate out-of-the-box comfort.",
    price: 175,
    originalPrice: 220,
    category: "Footwear",
    tags: ["55MM LUG", "GOODYEAR WELT", "VULCANIZED"],
    badge: "LIMITED RUN",
    badgeColor: "lime",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 8,
    isFeatured: true,
    isNewDrop: true,
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "Onyx & Acid Yellow", hex: "#1C1C1C" },
      { name: "Bone White", hex: "#ECEAE4" }
    ],
    specs: [
      { label: "Sole Height", value: "55mm Geometric Lug Sole" },
      { label: "Upper", value: "Full-Grain Matte Cowhide" },
      { label: "Lining", value: "Breathable Antibacterial Mesh" },
      { label: "Construction", value: "Triple Stitched Goodyear Welt" }
    ],
    rating: 5.0,
    numReviews: 14,
    reviews: [
      {
        user: "Jaxson W.",
        rating: 5,
        comment: "These boots command any room you step into. Chunky as hell without being overly heavy.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-18")
      }
    ]
  },
  {
    name: "Proto-75 Mechanical Keyboard",
    slug: "proto-75-mechanical-keyboard",
    tagline: "Frosted CNC acrylic body with hot-swap tactile switches & yellow accents",
    description: "A mechanical typing instrument straight out of a retro-futuristic hacker lab. Gasket mounted with sound-dampening brass weight plate, per-key RGB backlight, custom dye-sub PBT neo-brutalist keycaps with ISO hazard symbols.",
    price: 149,
    originalPrice: 189,
    category: "Tech & Gadgets",
    tags: ["HOT-SWAP", "GASKET MOUNT", "PBT CAPS"],
    badge: "SELLING FAST",
    badgeColor: "orange",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 14,
    isFeatured: true,
    isNewDrop: false,
    sizes: ["Gateron Yellow Pro", "Tactile Panda 67g", "Clicky Jade"],
    colors: [
      { name: "Industrial Yellow", hex: "#FFDE59" },
      { name: "Cyber White", hex: "#FAFAFA" },
      { name: "Dark Concrete", hex: "#2E2E2E" }
    ],
    specs: [
      { label: "Layout", value: "75% Compact (82 Keys + Rotary Knob)" },
      { label: "Case", value: "CNC Milled Polycarbonate" },
      { label: "Mounting", value: "Poron Foam Gasket Isolation" },
      { label: "Connectivity", value: "USB-C, Bluetooth 5.2, 2.4Ghz Wireless" }
    ],
    rating: 4.9,
    numReviews: 48,
    reviews: [
      {
        user: "Kenji R.",
        rating: 5,
        comment: "The deepest, thockiest sound profile right out of the box. Keycap fonts are pure art.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-05")
      }
    ]
  },
  {
    name: "Ballistic Hazard Tote 30L",
    slug: "ballistic-hazard-tote-30l",
    tagline: "1000D Cordura with seatbelt webbing harness and fidlock magnetic clasp",
    description: "Indestructible utility carry. Features massive high-capacity main chamber, padded 16\" laptop sleeve with shock absorber base, exterior MOLLE attachment loops, and dual handles with industrial cross-box stitching.",
    price: 68,
    originalPrice: 85,
    category: "Accessories",
    tags: ["1000D CORDURA", "WATERPROOF", "LAPTOP SLEEVE"],
    badge: "DURABLE",
    badgeColor: "yellow",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 20,
    isFeatured: false,
    isNewDrop: false,
    sizes: ["Standard 30L"],
    colors: [
      { name: "Safety Orange", hex: "#FF5722" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Olive Hazard", hex: "#4E5D4E" }
    ],
    specs: [
      { label: "Capacity", value: "30 Liters" },
      { label: "Shell", value: "1000D Waterproof Cordura" },
      { label: "Laptop Pocket", value: "Fits up to 16\" MacBook Pro" },
      { label: "Clasp", value: "Quick-Release Magnetic Buckle" }
    ],
    rating: 4.8,
    numReviews: 29,
    reviews: [
      {
        user: "Sasha P.",
        rating: 5,
        comment: "Takes grocery runs, rainstorms, and flights with zero wear. Pure utilitarian joy.",
        verifiedPurchase: true,
        createdAt: new Date("2026-08-30")
      }
    ]
  },
  {
    name: "Voxel Distortion Risograph Print",
    slug: "voxel-distortion-risograph-print",
    tagline: "Edition of 75 signed prints on 300 GSM Hahnemühle textured rag",
    description: "Original neo-brutalist artwork screen-printed using fluorescent soy-based inks. Features microscopic halftones, brutal geometric layouts, and hand-stamped edition numbers. Ships in an industrial cardboard tube with stamped wax seal.",
    price: 52,
    originalPrice: 65,
    category: "Art & Prints",
    tags: ["LIMITED 75", "RISOGRAPH", "SIGNED"],
    badge: "ONLY 6 LEFT",
    badgeColor: "pink",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 6,
    isFeatured: true,
    isNewDrop: true,
    sizes: ["A2 (420 x 594 mm)", "A1 (594 x 841 mm)"],
    colors: [
      { name: "Fluo Pink & Black", hex: "#FF007F" },
      { name: "Acid Yellow & Cyan", hex: "#FFE600" }
    ],
    specs: [
      { label: "Paper", value: "300 GSM Hahnemühle FineArt" },
      { label: "Print Process", value: "4-Color Risograph" },
      { label: "Run Limit", value: "75 Copies Hand-Numbered" }
    ],
    rating: 5.0,
    numReviews: 11,
    reviews: [
      {
        user: "Zane L.",
        rating: 5,
        comment: "Framed it in raw aluminum. Looks like museum-grade archival punk art.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-22")
      }
    ]
  },
  {
    name: "Hex-Cut Monolithic Titanium Carabiner",
    slug: "hex-cut-monolithic-titanium-carabiner",
    tagline: "Grade-5 titanium wire-cut EDC clip with built-in bottle opener",
    description: "Sculpted from a solid billet of aerospace Grade-5 Titanium using wire electrical discharge machining. Ultra lightweight at 28 grams, non-magnetic, corrosion-proof, featuring laser engraved precision grid markers.",
    price: 36,
    originalPrice: 45,
    category: "Accessories",
    tags: ["TITANIUM", "EDC", "28 GRAMS"],
    badge: "EDC ESSENTIAL",
    badgeColor: "cyan",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 35,
    isFeatured: false,
    isNewDrop: false,
    sizes: ["One Size"],
    colors: [
      { name: "Raw Matte Titanium", hex: "#9E9E9E" },
      { name: "Anodized Rainbow Burn", hex: "#4A90E2" },
      { name: "PVD Stealth Black", hex: "#1F1F1F" }
    ],
    specs: [
      { label: "Material", value: "Ti-6Al-4V Grade 5 Titanium" },
      { label: "Weight", value: "28 Grams" },
      { label: "Load Rating", value: "Non-climbing EDC rated (50kg static)" }
    ],
    rating: 4.8,
    numReviews: 41,
    reviews: [
      {
        user: "Noah B.",
        rating: 5,
        comment: "Satisfying snap spring action. Feels like high-end mechanical jewelry.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-14")
      }
    ]
  },
  {
    name: "Anodized Cyber Cassette Player",
    slug: "anodized-cyber-cassette-player",
    tagline: "Retro-analog portable tape player with Bluetooth 5.3 transmitter",
    description: "Analog soul meets digital future. Transparent casing reveals the physical gear mechanisms while high-fidelity heads deliver warm magnetic tape saturation. Connects to modern wireless headphones or uses 3.5mm headphone jack with retro metal toggle buttons.",
    price: 135,
    originalPrice: 160,
    category: "Tech & Gadgets",
    tags: ["BLUETOOTH 5.3", "ANALOG TAPE", "RECHARGEABLE"],
    badge: "RETRO PUNK",
    badgeColor: "lime",
    images: [
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 9,
    isFeatured: true,
    isNewDrop: true,
    sizes: ["Standard"],
    colors: [
      { name: "Cyber Clear / Yellow", hex: "#FFDE59" },
      { name: "Smoke Tint", hex: "#3A3A3A" }
    ],
    specs: [
      { label: "Audio Output", value: "3.5mm Stereo Jack + BT 5.3 Transmit" },
      { label: "Battery", value: "1800mAh USB-C Rechargeable (14h Playtime)" },
      { label: "Mechanism", value: "Brass Flywheel Belt-Drive" }
    ],
    rating: 4.9,
    numReviews: 27,
    reviews: [
      {
        user: "Liam P.",
        rating: 5,
        comment: "Listening to synthwave on this with Bluetooth cans is an absolute spiritual experience.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-20")
      }
    ]
  },
  {
    name: "Hyper-Chunky Acrylic Keyring",
    slug: "hyper-chunky-acrylic-keyring",
    tagline: "8mm layered laser-cut fluorescent acrylic charm with ball chain",
    description: "Vibrant neon slab that glows in ultraviolet light. Laser engraved with bold neo-brutalist typography and warning symbols. Heavy, tactile, and impossible to misplace in your bag or pocket.",
    price: 16,
    originalPrice: 22,
    category: "Accessories",
    tags: ["UV GLOW", "8MM ACRYLIC", "LASER ETCHED"],
    badge: "UNDER $20",
    badgeColor: "yellow",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 50,
    isFeatured: false,
    isNewDrop: false,
    sizes: ["One Size"],
    colors: [
      { name: "Hazard Green", hex: "#00FF66" },
      { name: "Electric Orange", hex: "#FF6200" },
      { name: "Shock Pink", hex: "#FF1493" }
    ],
    specs: [
      { label: "Thickness", value: "8mm Dual-Bonded Acrylic" },
      { label: "Dimensions", value: "85mm x 32mm" },
      { label: "Ring", value: "Black Oxide Heavy Split Ring" }
    ],
    rating: 4.6,
    numReviews: 53,
    reviews: [
      {
        user: "Chloe D.",
        rating: 5,
        comment: "Super chunky and fun. Dropped my keys 50 times and not a scratch.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-08")
      }
    ]
  },
  {
    name: "Architectural Concrete Desktop Planter",
    slug: "architectural-concrete-desktop-planter",
    tagline: "Hand-cast ultra-dense architectural concrete with drainage cavity",
    description: "Channel brutalist architecture onto your desk. Cast by hand with bespoke pigment swirls and sharp 45-degree chamfered facets. Sealed with food-safe non-toxic matte sealer to resist moisture marks.",
    price: 38,
    originalPrice: 48,
    category: "Collectibles",
    tags: ["HANDMADE", "CONCRETE", "ARCHITECTURAL"],
    badge: "MINIMAL PUNK",
    badgeColor: "orange",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 16,
    isFeatured: false,
    isNewDrop: true,
    sizes: ["Medium (12cm)", "Large (18cm)"],
    colors: [
      { name: "Raw Brutalist Grey", hex: "#8E8E93" },
      { name: "Charcoal Black", hex: "#222222" },
      { name: "Terracotta Splatter", hex: "#D96B43" }
    ],
    specs: [
      { label: "Material", value: "High-Performance Fiber Concrete" },
      { label: "Weight", value: "1.2 kg (Weighted Stability)" },
      { label: "Base", value: "Soft Cork Scratch-Protection Pad" }
    ],
    rating: 4.9,
    numReviews: 18,
    reviews: [
      {
        user: "Felix M.",
        rating: 5,
        comment: "Substantial, heavy, and looks like an actual miniature brutalist building.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-17")
      }
    ]
  },
  {
    name: "Brutal Cyber Block Runner",
    slug: "brutal-cyber-block-runner",
    tagline: "Deconstructed mesh and suede trainers with sculptural EVA midsole",
    description: "Engineered for maximum silhouette impact. Multi-layered open air mesh with hairy suede overlays, oversized rope laces, reflective 3M heel piping, and aggressive decoupled outsole architecture.",
    price: 155,
    originalPrice: 195,
    category: "Footwear",
    tags: ["DECONSTRUCTED", "3M REFLECTIVE", "EVA MIDSOLE"],
    badge: "STAFF PICK",
    badgeColor: "yellow",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80"
    ],
    stock: 11,
    isFeatured: true,
    isNewDrop: false,
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "Chalk & Fluo Lime", hex: "#E8E7E0" },
      { name: "Triple Stealth Black", hex: "#141414" }
    ],
    specs: [
      { label: "Midsole", value: "High-Rebound Sculpted EVA" },
      { label: "Lacing", value: "6mm Double Bungee Drawcord" },
      { label: "Weight", value: "390g per shoe" }
    ],
    rating: 4.9,
    numReviews: 31,
    reviews: [
      {
        user: "Tariq A.",
        rating: 5,
        comment: "Cushioning is like walking on high-density trampoline foam. Visuals 10/10.",
        verifiedPurchase: true,
        createdAt: new Date("2026-09-24")
      }
    ]
  }
];

export const initialCoupons = [
  {
    code: "BRUTAL20",
    discountType: "PERCENTAGE",
    discountValue: 20,
    minOrderValue: 40,
    description: "20% off on all orders above $40",
    isActive: true
  },
  {
    code: "FREESHIP",
    discountType: "FIXED",
    discountValue: 15,
    minOrderValue: 50,
    description: "Free shipping bonus ($15 discount)",
    isActive: true
  },
  {
    code: "CHAOS10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minOrderValue: 0,
    description: "10% off storewide no minimum",
    isActive: true
  }
];
