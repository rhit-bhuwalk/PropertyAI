// zoningPrompts.ts

export function getZoningPrompts(zoningCode: string) {
    return {
      byRightEntitlements: `For zoning code ${zoningCode}, what are the by‑right entitlements and how many primary uses are permitted without discretionary approval?`,
      conditionalUseThresholds: `For zoning code ${zoningCode}, which sections define conditional use thresholds, including the special permits required and the buffer distances (e.g., 300–500 feet) from residential zones?`,
      overlayDistrictImplications: `For zoning code ${zoningCode}, what are the overlay district implications, particularly regarding design review requirements for historic areas and transit‑oriented development districts?`,
      environmentalOverlayStandards: `For zoning code ${zoningCode}, what environmental overlay standards are imposed, including any floodway development prohibitions and tree canopy retention requirements (e.g., a minimum of 25% coverage)?`,
      permittedUseMatrix: `For zoning code ${zoningCode}, which sections provide the permitted use matrix and how do these sections address the need to cross-reference overlay district regulations?`
    };
  }