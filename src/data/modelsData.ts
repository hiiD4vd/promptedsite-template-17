export interface ModelConfig {
  key: string;
  label: string;
  line: string;
  spec: string;
  url: string;
  shellMaterial?: string;
  openClip?: string;
  openRange?: [number, number];
  finishes?: number[];
  finishGroups?: Record<string, number[]>;
  openPose?: { x: number; y: number };
  pose?: { x: number; y: number; z?: number };
  poseTall?: { x?: number; y?: number; z?: number };
  frame?: number;
  frameTall?: number;
  fitDepth?: boolean;
  dims?: { w: number; h: number; d: number; unit: string; source?: string };
  hideMaterials?: string[];
  arDemo?: boolean;
  parts?: {
    axes: Record<string, string[]>;
    steps: Array<Record<string, string>>;
  };
  shellTune?: { metalness: number; roughness: number };
  engraving?: {
    text: string;
    at: number;
    arc: number;
    zoom: number;
    rotDeg: number;
  };
  gemMaterial?: string;
  detailZoom?: { zoom: number; offset: [number, number] };
  studioEnv?: boolean;
  unassignedMetal?: number;
  nodeMaterials?: Record<string, { color?: number; roughness?: number; metalness?: number }>;
  materials?: Record<string, any>;
}

export const PRODUCT_MODELS: ModelConfig[] = [
  {
    "key": "luggage",
    "label": "Luggage",
    "line": "Shell, finish and hardware, checked before the case is ever opened in a shop.",
    "spec": "2.5 MB \u00b7 adds 0.3 s to page load",
    "url": "/models/luggage.glb",
    "shellMaterial": "07 - Default",
    "openClip": "open",
    "openRange": [
      0,
      4
    ],
    "nodeMaterials": {
      "frame": {
        "color": 7633277,
        "roughness": 0.34,
        "metalness": 1
      },
      "corners": {
        "color": 7106933,
        "roughness": 0.32,
        "metalness": 1
      },
      "hinges": {
        "color": 7106933,
        "roughness": 0.3,
        "metalness": 1
      },
      "wheel_housing": {
        "color": 7106933,
        "roughness": 0.34,
        "metalness": 1
      },
      "telescopic_handle": {
        "color": 9080723,
        "roughness": 0.3,
        "metalness": 1
      },
      "telescopic_handle_metal": {
        "color": 10133668,
        "roughness": 0.22,
        "metalness": 1
      },
      "locks": {
        "color": 12830925,
        "roughness": 0.16,
        "metalness": 1
      },
      "number_wheels": {
        "color": 11844287,
        "roughness": 0.18,
        "metalness": 1
      },
      "lock_holes": {
        "color": 10133927,
        "roughness": 0.38,
        "metalness": 0.55
      },
      "Inside_Back001": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back002": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back004": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back006": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back_Rolling001": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back_Rolling003": {
        "color": 2762789,
        "roughness": 0.9,
        "metalness": 0
      },
      "Inside_Back_Rolling002": {
        "color": 11975874,
        "roughness": 0.22,
        "metalness": 1
      },
      "Inside_Back_Rolling004": {
        "color": 12765390,
        "roughness": 0.16,
        "metalness": 1
      },
      "Inside_Back_Rolling006": {
        "color": 12765390,
        "roughness": 0.18,
        "metalness": 1
      },
      "Zip_04": {
        "color": 12765390,
        "roughness": 0.18,
        "metalness": 1
      },
      "Inside_Back": {
        "color": 2762789,
        "roughness": 0.82,
        "metalness": 0
      },
      "Lining_Back": {
        "color": 2762789,
        "roughness": 0.82,
        "metalness": 0
      },
      "interior bottom": {
        "color": 2762789,
        "roughness": 0.84,
        "metalness": 0
      },
      "Interior_fabric_front": {
        "color": 2762789,
        "roughness": 0.84,
        "metalness": 0
      },
      "case_back_inside_patch": {
        "color": 2762789,
        "roughness": 0.8,
        "metalness": 0
      },
      "int_pocket": {
        "color": 3025961,
        "roughness": 0.84,
        "metalness": 0
      },
      "int_strap": {
        "color": 2368031,
        "roughness": 0.7,
        "metalness": 0
      },
      "logo2": {
        "color": 15262940,
        "roughness": 0.45,
        "metalness": 0
      },
      "wheel_rubber": {
        "color": 3817026,
        "roughness": 0.68,
        "metalness": 0
      },
      "rubber_parts": {
        "color": 3817026,
        "roughness": 0.66,
        "metalness": 0
      },
      "wheel_plastic": {
        "color": 4146248,
        "roughness": 0.4,
        "metalness": 0.15
      }
    },
    "materials": {
      "07 - Default": {
        "roughness": 0.28,
        "metalness": 1,
        "envMapIntensity": 1.4
      },
      "07 - Default.001": {
        "roughness": 0.28,
        "metalness": 1,
        "envMapIntensity": 1.4
      },
      "interior": {
        "color": 2762789,
        "roughness": 0.84,
        "specularIntensity": 1,
        "specularColor": 16777215
      },
      "interior_text": {
        "color": 15262940,
        "roughness": 0.4
      },
      "straps": {
        "specularIntensity": 1,
        "specularColor": 16777215
      },
      "zipper": {
        "metalness": 0,
        "roughness": 0.85,
        "specularIntensity": 1,
        "specularColor": 16777215
      },
      "zipper_fabric": {
        "specularIntensity": 1,
        "specularColor": 16777215
      }
    }
  },
  {
    "key": "leather",
    "label": "Leather goods",
    "line": "Every leather and every clasp, without a new photo shoot per combination.",
    "spec": "1.7 MB \u00b7 adds 0.3 s to page load",
    "url": "/models/leather.glb",
    "frameTall": 0.76,
    "shellMaterial": "leather",
    "openClip": "open",
    "finishes": [
      1381394,
      9277589,
      14270618
    ],
    "finishGroups": {
      "stitch": [
        1381394,
        9277589,
        14270618
      ],
      "stitch_velvet": [
        1381394,
        9277589,
        14270618
      ],
      "leather_edge": [
        1381394,
        9277589,
        14270618
      ],
      "decal_front": [
        1381394,
        9277589,
        14270618
      ],
      "decal_back": [
        1381394,
        9277589,
        14270618
      ]
    },
    "openPose": {
      "x": 0.4,
      "y": -0.42
    },
    "openRange": [
      0.4,
      2
    ]
  },
  {
    "key": "furniture",
    "label": "Furniture",
    "line": "Fabric, dimension and layout decided on the product page, not in a showroom.",
    "spec": "6.0 MB \u00b7 adds 1.0 s to page load \u00b7 AR",
    "url": "/models/furniture.glb",
    "frameTall": 0.73,
    "poseTall": {
      "x": 0.16
    },
    "shellMaterial": "leather",
    "dims": {
      "w": 138,
      "h": 74,
      "d": 68,
      "unit": "cm",
      "source": "knowledge/delivery/artist-spec-lulu-EN.md \u2014 Lulu SN207, 1.38 \u00d7 0.68 \u00d7 0.74 m"
    },
    "hideMaterials": [
      "ground"
    ],
    "arDemo": true
  },
  {
    "key": "chairs",
    "label": "Configurable chairs",
    "line": "One chair, six choices: size, arms, armpads, back support, casters and tilt. 432 combinations, priced as the customer builds it.",
    "spec": "7.1 MB \u00b7 adds 1.3 s to page load",
    "url": "/models/chairs.glb",
    "shellMaterial": "fabric",
    "hideMaterials": [
      "ground_1",
      "ground_2",
      "ground_3",
      "ground_4"
    ],
    "parts": {
      "axes": {
        "size": [
          "size_a",
          "size_b",
          "size_c"
        ],
        "arms": [
          "fully_adjustable_arms",
          "fixed_arms"
        ],
        "armpads": [
          "upholstered_armpads",
          "leather_armpads"
        ],
        "back": [
          "adjustable_posturefit_sl",
          "adjustable_lumbar_support",
          "posture_fit"
        ],
        "casters": [
          "braking_caster_grp",
          "hard_caster_grp",
          "caster_grp",
          "glide_grp"
        ],
        "tilt": [
          "tilt_limiter_and_seat_angle_grp",
          "tilt_limiter_grp",
          "standart_tilt_grp"
        ]
      },
      "steps": [
        {
          "size": "size_b",
          "arms": "fixed_arms",
          "armpads": "upholstered_armpads",
          "back": "posture_fit",
          "casters": "caster_grp",
          "tilt": "standart_tilt_grp"
        },
        {
          "size": "size_b",
          "arms": "fully_adjustable_arms",
          "armpads": "upholstered_armpads",
          "back": "posture_fit",
          "casters": "caster_grp",
          "tilt": "standart_tilt_grp"
        },
        {
          "size": "size_b",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "posture_fit",
          "casters": "caster_grp",
          "tilt": "standart_tilt_grp"
        },
        {
          "size": "size_b",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "adjustable_lumbar_support",
          "casters": "caster_grp",
          "tilt": "standart_tilt_grp"
        },
        {
          "size": "size_b",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "adjustable_posturefit_sl",
          "casters": "caster_grp",
          "tilt": "tilt_limiter_grp"
        },
        {
          "size": "size_b",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "adjustable_posturefit_sl",
          "casters": "glide_grp",
          "tilt": "tilt_limiter_and_seat_angle_grp"
        },
        {
          "size": "size_a",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "adjustable_posturefit_sl",
          "casters": "glide_grp",
          "tilt": "tilt_limiter_and_seat_angle_grp"
        },
        {
          "size": "size_c",
          "arms": "fully_adjustable_arms",
          "armpads": "leather_armpads",
          "back": "adjustable_posturefit_sl",
          "casters": "glide_grp",
          "tilt": "tilt_limiter_and_seat_angle_grp"
        }
      ]
    }
  },
  {
    "key": "footwear",
    "label": "Footwear",
    "line": "Last, leather and sole, seen from the angles a photograph never shows.",
    "spec": "1.4 MB",
    "url": "/models/footwear-v2.glb",
    "hideMaterials": [
      "ground"
    ],
    "pose": {
      "x": 0.18,
      "y": 1.12
    },
    "fitDepth": true,
    "frame": 0.5,
    "frameTall": 0.83
  },
  {
    "key": "bottles",
    "label": "Bottles and tumblers",
    "line": "Colour, lid and engraving chosen live, on the brand's own store.",
    "spec": "0.2 MB \u00b7 adds 0.1 s to page load \u00b7 AR",
    "url": "/models/bottles.glb",
    "shellMaterial": "Material.004",
    "hideMaterials": [
      "overlay",
      "pattern",
      "logo",
      "bottom_text"
    ],
    "finishes": [
      15789543,
      1381394,
      13279324
    ],
    "shellTune": {
      "metalness": 0.32,
      "roughness": 0.33
    },
    "engraving": {
      "text": "Engrave\nanything",
      "at": 0.42,
      "arc": 0.58,
      "zoom": 2.8,
      "rotDeg": 0.7
    }
  },
  {
    "key": "jewellery",
    "label": "Jewellery",
    "line": "Small objects where the detail is the entire product.",
    "spec": "2.5 MB \u00b7 adds 0.4 s to page load",
    "url": "/models/jewellery.glb",
    "gemMaterial": "diamond",
    "detailZoom": {
      "zoom": 1.75,
      "offset": [
        0.85,
        0.3
      ]
    },
    "pose": {
      "x": 0.55,
      "y": -0.3
    },
    "studioEnv": true,
    "unassignedMetal": 14461279,
    "hideMaterials": [
      "Material"
    ]
  }
];
