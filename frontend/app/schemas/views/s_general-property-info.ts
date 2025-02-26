// generalPropertyInfoSchema.ts
import { z } from "zod";

const DataPointSchema = z.object({
  alias: z.string(),
  value: z.union([z.string(), z.number(), z.null()]),
  source: z.union([z.string(), z.null()]),
});

export const generalPropertyInfoSchema = z.object({
  "Property Identification & Legal Framework": z.object({
    "Geospatial Information": z.object({
      latitude: DataPointSchema,
      longitude: DataPointSchema,
      munName: DataPointSchema,
      lotSize1: DataPointSchema,
      lotSize2: DataPointSchema,
      lotNum: DataPointSchema,
      country: DataPointSchema,
      countrySubd: DataPointSchema,
      oneline: DataPointSchema,
      locality: DataPointSchema,
      subdName: DataPointSchema,
    }),
    "Legal Description": z.object({
      legal1: DataPointSchema,
    }),
    "Regulatory Status": z.object({
      "Zoning Classification": z.object({
        siteZoningIdent: DataPointSchema,
        zoningType: DataPointSchema,
      }),
      "Overlay Districts": z.object({
        overlayDistricts: DataPointSchema,
      }),
    }),
    "Tax Status": z.object({
      taxCodeArea: DataPointSchema,
      taxAmt: DataPointSchema,
      taxYear: DataPointSchema,
    }),
    "Tax Deliquincy": z.object({
      taxDeliquincy: DataPointSchema,
    }),
  }),
  "Physical Site Characteristics": z.object({
    "Lot Configuration": z.object({
      "Dimensional Analysis": z.object({
        depth: DataPointSchema,
        frontage: DataPointSchema,
      }),
      "Topographical Profile": z.object({
        elevationDelta: DataPointSchema,
        slope: DataPointSchema,
      }),
    }),
    "Easements & Encumbrances": z.object({
      "Recorded Easements": z.object({
        recordedEasements: DataPointSchema,
      }),
      "Deed Restrictions": z.object({
        deedRestrictions: DataPointSchema,
      }),
    }),
    "Structural Inventory": z.object({
      "Existing Improvements": z.object({
        existingImprovements: DataPointSchema,
        yearBuilt: DataPointSchema,
      }),
      "Building Metrics": z.object({
        bldgSize: DataPointSchema,
        horizontalFootprint: DataPointSchema,
        totalStructureCount: DataPointSchema,
      }),
    }),
  }),
  "Zoning & Entitlements": z.object({
    "Entitlement Status": z.object({
      entitlementStatus: DataPointSchema,
    }),
    "Current Approvals": z.object({
      currentApprovals: DataPointSchema,
    }),
    "Required Permits": z.object({
      requiredPermits: DataPointSchema,
    }),
  }),
  "Construction & Systems Profile": z.object({
    "Structural Components": z.object({
      foundationType: DataPointSchema,
      frameType: DataPointSchema,
    }),
    Utilities: z.object({
      powerProvider: DataPointSchema,
      gasProvider: DataPointSchema,
      tcommProvider: DataPointSchema,
      waterProvider: DataPointSchema,
    }),
  }),
  "Environmental & Geotechnical": z.object({
    "Environmental Assessment": z.object({
      environmentalAssessment: DataPointSchema,
    }),
    "Phase I ESA Findings (2024)": z.object({
      phaseIESA: DataPointSchema,
    }),
    "Soil Contamination": z.object({
      soilContamination: DataPointSchema,
    }),
    "Flood Risk Assessment": z.object({
      floodRiskAssessment: DataPointSchema,
    }),
    "FEMA Designation": z.object({
      femaDesignation: DataPointSchema,
    }),
    "Mitigation Requirements": z.object({
      mitigationRequirements: DataPointSchema,
    }),
  }),
  "Development Economics": z.object({
    "Current Use Analysis": z.object({
      officeRents: DataPointSchema,
      NOI: DataPointSchema,
      capRate: DataPointSchema,
      value: DataPointSchema,
    }),
    "Tax History & Projections": z.object({
      taxHistory: DataPointSchema,
    }),
    "Reuse Potential": z.object({
      reusePotential: DataPointSchema,
    }),
  }),
  "Insurance & Risk Assessment": z.object({
    "Insurance Profile": z.object({
      currentCoverage: DataPointSchema,
      lossHistory: DataPointSchema,
    }),
    "Risk Assessment Matrix": z.object({
      riskAssessmentMatrix: DataPointSchema,
    }),
  }),
});

export type GeneralPropertyInfo = z.infer<typeof generalPropertyInfoSchema>;
export type DataPoint = z.infer<typeof DataPointSchema>;
