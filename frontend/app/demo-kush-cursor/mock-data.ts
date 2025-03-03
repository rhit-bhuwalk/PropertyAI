import { GeneralPropertyInfo } from "@/schemas/views/general-property-info-schema"

// Define 5 demo properties with coordinates
export const DEMO_PROPERTIES = [
  {
    address: "1500 Market St. Philadelphia, PA",
    lat: 39.9526,
    lng: -75.1652
  },
  {
    address: "123 Market St. Philadelphia, PA",
    lat: 39.9494,
    lng: -75.1430
  },
  {
    address: "456 Market St. Philadelphia, PA",
    lat: 39.9501,
    lng: -75.1475
  },
  {
    address: "789 Market St. Philadelphia, PA",
    lat: 39.9512,
    lng: -75.1518
  },
  {
    address: "1010 Market St. Philadelphia, PA",
    lat: 39.9533,
    lng: -75.1592
  }
]

// Create a general info data point helper
const dataPoint = (value: string | number | null, source: string | null = "Demo Data", alias?: string) => ({
  value,
  source,
  alias: alias || "Property Data"
})

// Mock property data for each address
export const mockPropertyData: Record<string, GeneralPropertyInfo> = {
  "1500 Market St. Philadelphia, PA": {
    "Property Identification & Legal Framework": {
      "Geospatial Information": {
        latitude: dataPoint(39.9526, "Demo Data", "Latitude"),
        longitude: dataPoint(-75.1652, "Demo Data", "Longitude"),
        munName: dataPoint("Philadelphia", "Demo Data", "Municipality Name"),
        lotSize1: dataPoint("2.11 acres", "Demo Data", "Lot Size 1"),
        lotSize2: dataPoint("91,911 sq ft", "Demo Data", "Lot Size 2"),
        lotNum: dataPoint("A-1234", "Demo Data", "Lot Number"),
        country: dataPoint("United States", "Demo Data", "Country"),
        countrySubd: dataPoint("Pennsylvania", "Demo Data", "Country Subdivision"),
        oneline: dataPoint("1500 Market St. Philadelphia, PA 19102", "Demo Data", "One Line Address"),
        locality: dataPoint("Center City", "Demo Data", "Locality"),
        subdName: dataPoint("Market West", "Demo Data", "Subdivision Name"),
      },
      "Legal Description": {
        legal1: dataPoint("Lot 1, Block A, Market West Subdivision, City of Philadelphia, PA", "Demo Data", "Legal Description"),
      },
      "Regulatory Status": {
        "Zoning Classification": {
          siteZoningIdent: dataPoint("CMX-5", "Demo Data", "Site Zoning Identifier"),
          zoningType: dataPoint("Central Business District", "Demo Data", "Zoning Type"),
        },
        "Overlay Districts": {
          overlayDistricts: dataPoint("Center City Commercial Area", "Demo Data", "Overlay Districts"),
        },
      },
      "Tax Status": {
        taxCodeArea: dataPoint("15-0023", "Demo Data", "Tax Code Area"),
        taxAmt: dataPoint(145000, "Demo Data", "Tax Amount"),
        taxYear: dataPoint(2023, "Demo Data", "Tax Year"),
      },
      "Tax Deliquincy": {
        taxDeliquincy: dataPoint("None", "Demo Data", "Tax Deliquincy"),
      },
    },
    "Physical Site Characteristics": {
      "Lot Configuration": {
        "Dimensional Analysis": {
          depth: dataPoint("250 ft", "Demo Data", "Depth"),
          frontage: dataPoint("180 ft", "Demo Data", "Frontage"),
        },
        "Topographical Profile": {
          elevationDelta: dataPoint("5 ft", "Demo Data", "Elevation Delta"),
          slope: dataPoint("2%", "Demo Data", "Slope"),
        },
      },
      "Easements & Encumbrances": {
        "Recorded Easements": {
          recordedEasements: dataPoint("Utility easement on north property line, 15 ft width", "Demo Data", "Recorded Easements"),
        },
        "Deed Restrictions": {
          deedRestrictions: dataPoint("None", "Demo Data", "Deed Restrictions"),
        },
      },
      "Structural Inventory": {
        "Existing Improvements": {
          existingImprovements: dataPoint("35-story office tower", "Demo Data", "Existing Improvements"),
          yearBuilt: dataPoint(1985, "Demo Data", "Year Built"),
        },
        "Building Metrics": {
          bldgSize: dataPoint("850,000 sq ft", "Demo Data", "Building Size"),
          horizontalFootprint: dataPoint("65,000 sq ft", "Demo Data", "Horizontal Footprint"),
          totalStructureCount: dataPoint(1, "Demo Data", "Total Structure Count"),
        },
      },
    },
    "Zoning & Entitlements": {
      "Entitlement Status": {
        entitlementStatus: dataPoint("Fully entitled", "Demo Data", "Entitlement Status"),
      },
      "Current Approvals": {
        currentApprovals: dataPoint("All zoning approvals in place", "Demo Data", "Current Approvals"),
      },
      "Required Permits": {
        requiredPermits: dataPoint("Building permits required for renovations", "Demo Data", "Required Permits"),
      },
    },
    "Construction & Systems Profile": {
      "Structural Components": {
        foundationType: dataPoint("Concrete pilings", "Demo Data", "Foundation Type"),
        frameType: dataPoint("Steel frame", "Demo Data", "Frame Type"),
      },
      "Utilities": {
        powerProvider: dataPoint("PECO", "Demo Data", "Power Provider"),
        gasProvider: dataPoint("Philadelphia Gas Works", "Demo Data", "Gas Provider"),
        tcommProvider: dataPoint("Comcast", "Demo Data", "Telecommunications Provider"),
        waterProvider: dataPoint("Philadelphia Water Department", "Demo Data", "Water Provider"),
      },
    },
    "Environmental & Geotechnical": {
      "Environmental Assessment": {
        environmentalAssessment: dataPoint("Phase I complete, no issues identified", "Demo Data", "Environmental Assessment"),
      },
      "Phase I ESA Findings (2024)": {
        phaseIESA: dataPoint("No RECs identified", "Demo Data", "Phase I ESA"),
      },
      "Soil Contamination": {
        soilContamination: dataPoint("None detected", "Demo Data", "Soil Contamination"),
      },
      "Flood Risk Assessment": {
        floodRiskAssessment: dataPoint("Low risk", "Demo Data", "Flood Risk Assessment"),
      },
      "FEMA Designation": {
        femaDesignation: dataPoint("Zone X", "Demo Data", "FEMA Designation"),
      },
      "Mitigation Requirements": {
        mitigationRequirements: dataPoint("None required", "Demo Data", "Mitigation Requirements"),
      },
    },
    "Development Economics": {
      "Current Use Analysis": {
        value: dataPoint("Class A office building with retail", "Demo Data", "Current Use Analysis"),
        officeRents: dataPoint("$35-45 psf", "Demo Data", "Office Rents"),
        NOI: dataPoint("$3.2M annually", "Demo Data", "NOI"),
        capRate: dataPoint("6.5%", "Demo Data", "Cap Rate"),
      },
      "Reuse Potential": {
        reusePotential: dataPoint("High potential for mixed-use redevelopment", "Demo Data", "Development Feasibility"),
      },
      "Tax History & Projections": {
        taxHistory: dataPoint("Property taxes have increased 3% annually over the past 5 years", "Demo Data", "Tax History"),
      },
    },
    "Insurance & Risk Assessment": {
      "Insurance Profile": {
        currentCoverage: dataPoint("Standard commercial property insurance", "Demo Data", "Current Coverage"),
        lossHistory: dataPoint("No significant claims in past 5 years", "Demo Data", "Loss History"),
      },
      "Risk Assessment Matrix": {
        riskAssessmentMatrix: dataPoint("Low overall risk profile", "Demo Data", "Risk Factors"),
      },
    },
  },
  
  "123 Market St. Philadelphia, PA": {
    "Property Identification & Legal Framework": {
      "Geospatial Information": {
        latitude: dataPoint(39.9494, "Demo Data", "Latitude"),
        longitude: dataPoint(-75.1430, "Demo Data", "Longitude"),
        munName: dataPoint("Philadelphia", "Demo Data", "Municipality Name"),
        lotSize1: dataPoint("0.5 acres", "Demo Data", "Lot Size 1"),
        lotSize2: dataPoint("21,780 sq ft", "Demo Data", "Lot Size 2"),
        lotNum: dataPoint("B-5678", "Demo Data", "Lot Number"),
        country: dataPoint("United States", "Demo Data", "Country"),
        countrySubd: dataPoint("Pennsylvania", "Demo Data", "Country Subdivision"),
        oneline: dataPoint("123 Market St. Philadelphia, PA 19106", "Demo Data", "One Line Address"),
        locality: dataPoint("Old City", "Demo Data", "Locality"),
        subdName: dataPoint("Market East", "Demo Data", "Subdivision Name"),
      },
      "Legal Description": {
        legal1: dataPoint("Lot 12, Block B, Market East Subdivision, City of Philadelphia, PA", "Demo Data", "Legal Description"),
      },
      "Regulatory Status": {
        "Zoning Classification": {
          siteZoningIdent: dataPoint("CMX-3", "Demo Data", "Site Zoning Identifier"),
          zoningType: dataPoint("Community Commercial Mixed-Use", "Demo Data", "Zoning Type"),
        },
        "Overlay Districts": {
          overlayDistricts: dataPoint("Old City Historic District", "Demo Data", "Overlay Districts"),
        },
      },
      "Tax Status": {
        taxCodeArea: dataPoint("16-0045", "Demo Data", "Tax Code Area"),
        taxAmt: dataPoint(42500, "Demo Data", "Tax Amount"),
        taxYear: dataPoint(2023, "Demo Data", "Tax Year"),
      },
      "Tax Deliquincy": {
        taxDeliquincy: dataPoint("None", "Demo Data", "Tax Deliquincy"),
      },
    },
    "Physical Site Characteristics": {
      "Lot Configuration": {
        "Dimensional Analysis": {
          depth: dataPoint("110 ft", "Demo Data", "Depth"),
          frontage: dataPoint("50 ft", "Demo Data", "Frontage"),
        },
        "Topographical Profile": {
          elevationDelta: dataPoint("2 ft", "Demo Data", "Elevation Delta"),
          slope: dataPoint("1%", "Demo Data", "Slope"),
        },
      },
      "Easements & Encumbrances": {
        "Recorded Easements": {
          recordedEasements: dataPoint("None", "Demo Data", "Recorded Easements"),
        },
        "Deed Restrictions": {
          deedRestrictions: dataPoint("Historic preservation requirements", "Demo Data", "Deed Restrictions"),
        },
      },
      "Structural Inventory": {
        "Existing Improvements": {
          existingImprovements: dataPoint("4-story mixed-use building", "Demo Data", "Existing Improvements"),
          yearBuilt: dataPoint(1910, "Demo Data", "Year Built"),
        },
        "Building Metrics": {
          bldgSize: dataPoint("18,000 sq ft", "Demo Data", "Building Size"),
          horizontalFootprint: dataPoint("4,500 sq ft", "Demo Data", "Horizontal Footprint"),
          totalStructureCount: dataPoint(1, "Demo Data", "Total Structure Count"),
        },
      },
    },
    "Zoning & Entitlements": {
      "Entitlement Status": {
        entitlementStatus: dataPoint("Entitled with conditions", "Demo Data", "Entitlement Status"),
      },
      "Current Approvals": {
        currentApprovals: dataPoint("Historic review approval required for changes", "Demo Data", "Current Approvals"),
      },
      "Required Permits": {
        requiredPermits: dataPoint("Building permits, historic commission approval", "Demo Data", "Required Permits"),
      },
    },
    "Construction & Systems Profile": {
      "Structural Components": {
        foundationType: dataPoint("Stone foundation", "Demo Data", "Foundation Type"),
        frameType: dataPoint("Load-bearing masonry", "Demo Data", "Frame Type"),
      },
      "Utilities": {
        powerProvider: dataPoint("PECO", "Demo Data", "Power Provider"),
        gasProvider: dataPoint("Philadelphia Gas Works", "Demo Data", "Gas Provider"),
        tcommProvider: dataPoint("Verizon", "Demo Data", "Telecommunications Provider"),
        waterProvider: dataPoint("Philadelphia Water Department", "Demo Data", "Water Provider"),
      },
    },
    "Environmental & Geotechnical": {
      "Environmental Assessment": {
        environmentalAssessment: dataPoint("Phase I complete, no significant issues", "Demo Data", "Environmental Assessment"),
      },
      "Phase I ESA Findings (2024)": {
        phaseIESA: dataPoint("Minor historical RECs noted", "Demo Data", "Phase I ESA"),
      },
      "Soil Contamination": {
        soilContamination: dataPoint("Minor levels detected, below action threshold", "Demo Data", "Soil Contamination"),
      },
      "Flood Risk Assessment": {
        floodRiskAssessment: dataPoint("Moderate risk", "Demo Data", "Flood Risk Assessment"),
      },
      "FEMA Designation": {
        femaDesignation: dataPoint("Zone AE", "Demo Data", "FEMA Designation"),
      },
      "Mitigation Requirements": {
        mitigationRequirements: dataPoint("Flood insurance required", "Demo Data", "Mitigation Requirements"),
      },
    },
    "Development Economics": {
      "Current Use Analysis": {
        value: dataPoint("Retail ground floor, residential upper floors", "Demo Data", "Current Use Analysis"),
        officeRents: dataPoint("N/A", "Demo Data", "Office Rents"),
        NOI: dataPoint("$120K annually", "Demo Data", "NOI"),
        capRate: dataPoint("5.8%", "Demo Data", "Cap Rate"),
      },
      "Reuse Potential": {
        reusePotential: dataPoint("Good potential for renovation with historic tax credits", "Demo Data", "Development Feasibility"),
      },
      "Tax History & Projections": {
        taxHistory: dataPoint("Tax abatement program in place until 2026", "Demo Data", "Tax History"),
      },
    },
    "Insurance & Risk Assessment": {
      "Insurance Profile": {
        currentCoverage: dataPoint("Commercial property insurance with flood coverage", "Demo Data", "Current Coverage"),
        lossHistory: dataPoint("Minor water damage claim in 2021", "Demo Data", "Loss History"),
      },
      "Risk Assessment Matrix": {
        riskAssessmentMatrix: dataPoint("Moderate risk due to age of building and flood zone", "Demo Data", "Risk Factors"),
      },
    },
  },
  
  "456 Market St. Philadelphia, PA": {
    "Property Identification & Legal Framework": {
      "Geospatial Information": {
        latitude: dataPoint(39.9501, "Demo Data", "Latitude"),
        longitude: dataPoint(-75.1475, "Demo Data", "Longitude"),
        munName: dataPoint("Philadelphia", "Demo Data", "Municipality Name"),
        lotSize1: dataPoint("0.25 acres", "Demo Data", "Lot Size 1"),
        lotSize2: dataPoint("10,890 sq ft", "Demo Data", "Lot Size 2"),
        lotNum: dataPoint("C-9012", "Demo Data", "Lot Number"),
        country: dataPoint("United States", "Demo Data", "Country"),
        countrySubd: dataPoint("Pennsylvania", "Demo Data", "Country Subdivision"),
        oneline: dataPoint("456 Market St. Philadelphia, PA 19106", "Demo Data", "One Line Address"),
        locality: dataPoint("Society Hill", "Demo Data", "Locality"),
        subdName: dataPoint("Market East", "Demo Data", "Subdivision Name"),
      },
      "Legal Description": {
        legal1: dataPoint("Lot 5, Block C, Market East Subdivision, City of Philadelphia, PA", "Demo Data", "Legal Description"),
      },
      "Regulatory Status": {
        "Zoning Classification": {
          siteZoningIdent: dataPoint("CMX-2", "Demo Data", "Site Zoning Identifier"),
          zoningType: dataPoint("Neighborhood Commercial Mixed-Use", "Demo Data", "Zoning Type"),
        },
        "Overlay Districts": {
          overlayDistricts: dataPoint("Society Hill Historic District", "Demo Data", "Overlay Districts"),
        },
      },
      "Tax Status": {
        taxCodeArea: dataPoint("16-0078", "Demo Data", "Tax Code Area"),
        taxAmt: dataPoint(28750, "Demo Data", "Tax Amount"),
        taxYear: dataPoint(2023, "Demo Data", "Tax Year"),
      },
      "Tax Deliquincy": {
        taxDeliquincy: dataPoint("None", "Demo Data", "Tax Deliquincy"),
      },
    },
    "Physical Site Characteristics": {
      "Lot Configuration": {
        "Dimensional Analysis": {
          depth: dataPoint("90 ft", "Demo Data", "Depth"),
          frontage: dataPoint("30 ft", "Demo Data", "Frontage"),
        },
        "Topographical Profile": {
          elevationDelta: dataPoint("1 ft", "Demo Data", "Elevation Delta"),
          slope: dataPoint("<1%", "Demo Data", "Slope"),
        },
      },
      "Easements & Encumbrances": {
        "Recorded Easements": {
          recordedEasements: dataPoint("Shared access easement on rear of property", "Demo Data", "Recorded Easements"),
        },
        "Deed Restrictions": {
          deedRestrictions: dataPoint("Historic preservation requirements", "Demo Data", "Deed Restrictions"),
        },
      },
      "Structural Inventory": {
        "Existing Improvements": {
          existingImprovements: dataPoint("3-story townhouse with commercial ground floor", "Demo Data", "Existing Improvements"),
          yearBuilt: dataPoint(1840, "Demo Data", "Year Built"),
        },
        "Building Metrics": {
          bldgSize: dataPoint("7,200 sq ft", "Demo Data", "Building Size"),
          horizontalFootprint: dataPoint("2,400 sq ft", "Demo Data", "Horizontal Footprint"),
          totalStructureCount: dataPoint(1, "Demo Data", "Total Structure Count"),
        },
      },
    },
    "Zoning & Entitlements": {
      "Entitlement Status": {
        entitlementStatus: dataPoint("Entitled with historic conditions", "Demo Data", "Entitlement Status"),
      },
      "Current Approvals": {
        currentApprovals: dataPoint("All renovations require historic commission approval", "Demo Data", "Current Approvals"),
      },
      "Required Permits": {
        requiredPermits: dataPoint("Building permits, historic commission approval", "Demo Data", "Required Permits"),
      },
    },
    "Construction & Systems Profile": {
      "Structural Components": {
        foundationType: dataPoint("Brick foundation", "Demo Data", "Foundation Type"),
        frameType: dataPoint("Brick load-bearing walls", "Demo Data", "Frame Type"),
      },
      "Utilities": {
        powerProvider: dataPoint("PECO", "Demo Data", "Power Provider"),
        gasProvider: dataPoint("Philadelphia Gas Works", "Demo Data", "Gas Provider"),
        tcommProvider: dataPoint("Comcast", "Demo Data", "Telecommunications Provider"),
        waterProvider: dataPoint("Philadelphia Water Department", "Demo Data", "Water Provider"),
      },
    },
    "Environmental & Geotechnical": {
      "Environmental Assessment": {
        environmentalAssessment: dataPoint("Phase I complete, minor concerns", "Demo Data", "Environmental Assessment"),
      },
      "Phase I ESA Findings (2024)": {
        phaseIESA: dataPoint("Historical land use concerns", "Demo Data", "Phase I ESA"),
      },
      "Soil Contamination": {
        soilContamination: dataPoint("Low levels of lead detected", "Demo Data", "Soil Contamination"),
      },
      "Flood Risk Assessment": {
        floodRiskAssessment: dataPoint("Low risk", "Demo Data", "Flood Risk Assessment"),
      },
      "FEMA Designation": {
        femaDesignation: dataPoint("Zone X", "Demo Data", "FEMA Designation"),
      },
      "Mitigation Requirements": {
        mitigationRequirements: dataPoint("None required", "Demo Data", "Mitigation Requirements"),
      },
    },
    "Development Economics": {
      "Current Use Analysis": {
        value: dataPoint("Mixed-use historic building", "Demo Data", "Current Use Analysis"),
        officeRents: dataPoint("$28-35 psf", "Demo Data", "Office Rents"),
        NOI: dataPoint("$85K annually", "Demo Data", "NOI"),
        capRate: dataPoint("5.2%", "Demo Data", "Cap Rate"),
      },
      "Reuse Potential": {
        reusePotential: dataPoint("Limited development potential due to historic status", "Demo Data", "Development Feasibility"),
      },
      "Tax History & Projections": {
        taxHistory: dataPoint("Historic status provides 15% reduction in assessed value", "Demo Data", "Tax History"),
      },
    },
    "Insurance & Risk Assessment": {
      "Insurance Profile": {
        currentCoverage: dataPoint("Historic property insurance with replacement cost coverage", "Demo Data", "Current Coverage"),
        lossHistory: dataPoint("No claims in past 10 years", "Demo Data", "Loss History"),
      },
      "Risk Assessment Matrix": {
        riskAssessmentMatrix: dataPoint("High replacement cost risk due to historic features", "Demo Data", "Risk Factors"),
      },
    },
  },
  
  "789 Market St. Philadelphia, PA": {
    "Property Identification & Legal Framework": {
      "Geospatial Information": {
        latitude: dataPoint(39.9512, "Demo Data", "Latitude"),
        longitude: dataPoint(-75.1518, "Demo Data", "Longitude"),
        munName: dataPoint("Philadelphia", "Demo Data", "Municipality Name"),
        lotSize1: dataPoint("0.75 acres", "Demo Data", "Lot Size 1"),
        lotSize2: dataPoint("32,670 sq ft", "Demo Data", "Lot Size 2"),
        lotNum: dataPoint("D-3456", "Demo Data", "Lot Number"),
        country: dataPoint("United States", "Demo Data", "Country"),
        countrySubd: dataPoint("Pennsylvania", "Demo Data", "Country Subdivision"),
        oneline: dataPoint("789 Market St. Philadelphia, PA 19107", "Demo Data", "One Line Address"),
        locality: dataPoint("Washington Square", "Demo Data", "Locality"),
        subdName: dataPoint("Market East", "Demo Data", "Subdivision Name"),
      },
      "Legal Description": {
        legal1: dataPoint("Lot 8, Block D, Market East Subdivision, City of Philadelphia, PA", "Demo Data", "Legal Description"),
      },
      "Regulatory Status": {
        "Zoning Classification": {
          siteZoningIdent: dataPoint("CMX-4", "Demo Data", "Site Zoning Identifier"),
          zoningType: dataPoint("Center City Commercial Mixed-Use", "Demo Data", "Zoning Type"),
        },
        "Overlay Districts": {
          overlayDistricts: dataPoint("Washington Square Historic District", "Demo Data", "Overlay Districts"),
        },
      },
      "Tax Status": {
        taxCodeArea: dataPoint("17-0034", "Demo Data", "Tax Code Area"),
        taxAmt: dataPoint(78900, "Demo Data", "Tax Amount"),
        taxYear: dataPoint(2023, "Demo Data", "Tax Year"),
      },
      "Tax Deliquincy": {
        taxDeliquincy: dataPoint("None", "Demo Data", "Tax Deliquincy"),
      },
    },
    "Physical Site Characteristics": {
      "Lot Configuration": {
        "Dimensional Analysis": {
          depth: dataPoint("150 ft", "Demo Data", "Depth"),
          frontage: dataPoint("75 ft", "Demo Data", "Frontage"),
        },
        "Topographical Profile": {
          elevationDelta: dataPoint("3 ft", "Demo Data", "Elevation Delta"),
          slope: dataPoint("2%", "Demo Data", "Slope"),
        },
      },
      "Easements & Encumbrances": {
        "Recorded Easements": {
          recordedEasements: dataPoint("Public access easement on west side of property", "Demo Data", "Recorded Easements"),
        },
        "Deed Restrictions": {
          deedRestrictions: dataPoint("Height restrictions", "Demo Data", "Deed Restrictions"),
        },
      },
      "Structural Inventory": {
        "Existing Improvements": {
          existingImprovements: dataPoint("6-story mixed-use building", "Demo Data", "Existing Improvements"),
          yearBuilt: dataPoint(1920, "Demo Data", "Year Built"),
        },
        "Building Metrics": {
          bldgSize: dataPoint("120,000 sq ft", "Demo Data", "Building Size"),
          horizontalFootprint: dataPoint("20,000 sq ft", "Demo Data", "Horizontal Footprint"),
          totalStructureCount: dataPoint(1, "Demo Data", "Total Structure Count"),
        },
      },
    },
    "Zoning & Entitlements": {
      "Entitlement Status": {
        entitlementStatus: dataPoint("Fully entitled", "Demo Data", "Entitlement Status"),
      },
      "Current Approvals": {
        currentApprovals: dataPoint("Approved for current use, changes require review", "Demo Data", "Current Approvals"),
      },
      "Required Permits": {
        requiredPermits: dataPoint("Building permits for any modifications", "Demo Data", "Required Permits"),
      },
    },
    "Construction & Systems Profile": {
      "Structural Components": {
        foundationType: dataPoint("Concrete foundation", "Demo Data", "Foundation Type"),
        frameType: dataPoint("Steel and concrete frame", "Demo Data", "Frame Type"),
      },
      "Utilities": {
        powerProvider: dataPoint("PECO", "Demo Data", "Power Provider"),
        gasProvider: dataPoint("Philadelphia Gas Works", "Demo Data", "Gas Provider"),
        tcommProvider: dataPoint("Comcast Business", "Demo Data", "Telecommunications Provider"),
        waterProvider: dataPoint("Philadelphia Water Department", "Demo Data", "Water Provider"),
      },
    },
    "Environmental & Geotechnical": {
      "Environmental Assessment": {
        environmentalAssessment: dataPoint("Phase I and Phase II complete", "Demo Data", "Environmental Assessment"),
      },
      "Phase I ESA Findings (2024)": {
        phaseIESA: dataPoint("RECs identified requiring remediation", "Demo Data", "Phase I ESA"),
      },
      "Soil Contamination": {
        soilContamination: dataPoint("Moderate contamination from historical industrial use", "Demo Data", "Soil Contamination"),
      },
      "Flood Risk Assessment": {
        floodRiskAssessment: dataPoint("Low risk", "Demo Data", "Flood Risk Assessment"),
      },
      "FEMA Designation": {
        femaDesignation: dataPoint("Zone X", "Demo Data", "FEMA Designation"),
      },
      "Mitigation Requirements": {
        mitigationRequirements: dataPoint("Soil remediation plan approved", "Demo Data", "Mitigation Requirements"),
      },
    },
    "Development Economics": {
      "Current Use Analysis": {
        value: dataPoint("Warehouse with office component", "Demo Data", "Current Use Analysis"),
        officeRents: dataPoint("$22-28 psf", "Demo Data", "Office Rents"),
        NOI: dataPoint("$950K annually", "Demo Data", "NOI"),
        capRate: dataPoint("5.9%", "Demo Data", "Cap Rate"),
      },
      "Reuse Potential": {
        reusePotential: dataPoint("Good potential for residential conversion", "Demo Data", "Development Feasibility"),
      },
      "Tax History & Projections": {
        taxHistory: dataPoint("Recent reassessment increased tax burden by 22%", "Demo Data", "Tax History"),
      },
    },
    "Insurance & Risk Assessment": {
      "Insurance Profile": {
        currentCoverage: dataPoint("Commercial property and environmental liability insurance", "Demo Data", "Current Coverage"),
        lossHistory: dataPoint("Environmental claim in 2019, resolved", "Demo Data", "Loss History"),
      },
      "Risk Assessment Matrix": {
        riskAssessmentMatrix: dataPoint("Environmental remediation costs", "Demo Data", "Risk Factors"),
      },
    },
  },
  
  "1010 Market St. Philadelphia, PA": {
    "Property Identification & Legal Framework": {
      "Geospatial Information": {
        latitude: dataPoint(39.9533, "Demo Data", "Latitude"),
        longitude: dataPoint(-75.1592, "Demo Data", "Longitude"),
        munName: dataPoint("Philadelphia", "Demo Data", "Municipality Name"),
        lotSize1: dataPoint("1.2 acres", "Demo Data", "Lot Size 1"),
        lotSize2: dataPoint("52,272 sq ft", "Demo Data", "Lot Size 2"),
        lotNum: dataPoint("E-7890", "Demo Data", "Lot Number"),
        country: dataPoint("United States", "Demo Data", "Country"),
        countrySubd: dataPoint("Pennsylvania", "Demo Data", "Country Subdivision"),
        oneline: dataPoint("1010 Market St. Philadelphia, PA 19107", "Demo Data", "One Line Address"),
        locality: dataPoint("Chinatown", "Demo Data", "Locality"),
        subdName: dataPoint("Market East", "Demo Data", "Subdivision Name"),
      },
      "Legal Description": {
        legal1: dataPoint("Lot 10, Block E, Market East Subdivision, City of Philadelphia, PA", "Demo Data", "Legal Description"),
      },
      "Regulatory Status": {
        "Zoning Classification": {
          siteZoningIdent: dataPoint("CMX-4", "Demo Data", "Site Zoning Identifier"),
          zoningType: dataPoint("Center City Commercial Mixed-Use", "Demo Data", "Zoning Type"),
        },
        "Overlay Districts": {
          overlayDistricts: dataPoint("Chinatown Special District", "Demo Data", "Overlay Districts"),
        },
      },
      "Tax Status": {
        taxCodeArea: dataPoint("17-0112", "Demo Data", "Tax Code Area"),
        taxAmt: dataPoint(95600, "Demo Data", "Tax Amount"),
        taxYear: dataPoint(2023, "Demo Data", "Tax Year"),
      },
      "Tax Deliquincy": {
        taxDeliquincy: dataPoint("None", "Demo Data", "Tax Deliquincy"),
      },
    },
    "Physical Site Characteristics": {
      "Lot Configuration": {
        "Dimensional Analysis": {
          depth: dataPoint("200 ft", "Demo Data", "Depth"),
          frontage: dataPoint("100 ft", "Demo Data", "Frontage"),
        },
        "Topographical Profile": {
          elevationDelta: dataPoint("4 ft", "Demo Data", "Elevation Delta"),
          slope: dataPoint("2%", "Demo Data", "Slope"),
        },
      },
      "Easements & Encumbrances": {
        "Recorded Easements": {
          recordedEasements: dataPoint("Utility easement on east property line", "Demo Data", "Recorded Easements"),
        },
        "Deed Restrictions": {
          deedRestrictions: dataPoint("Cultural preservation requirements", "Demo Data", "Deed Restrictions"),
        },
      },
      "Structural Inventory": {
        "Existing Improvements": {
          existingImprovements: dataPoint("8-story mixed-use building with underground parking", "Demo Data", "Existing Improvements"),
          yearBuilt: dataPoint(2005, "Demo Data", "Year Built"),
        },
        "Building Metrics": {
          bldgSize: dataPoint("180,000 sq ft", "Demo Data", "Building Size"),
          horizontalFootprint: dataPoint("25,000 sq ft", "Demo Data", "Horizontal Footprint"),
          totalStructureCount: dataPoint(1, "Demo Data", "Total Structure Count"),
        },
      },
    },
    "Zoning & Entitlements": {
      "Entitlement Status": {
        entitlementStatus: dataPoint("Fully entitled", "Demo Data", "Entitlement Status"),
      },
      "Current Approvals": {
        currentApprovals: dataPoint("All zoning approvals in place", "Demo Data", "Current Approvals"),
      },
      "Required Permits": {
        requiredPermits: dataPoint("Building permits for renovations, special district review", "Demo Data", "Required Permits"),
      },
    },
    "Construction & Systems Profile": {
      "Structural Components": {
        foundationType: dataPoint("Reinforced concrete foundation", "Demo Data", "Foundation Type"),
        frameType: dataPoint("Steel and concrete frame", "Demo Data", "Frame Type"),
      },
      "Utilities": {
        powerProvider: dataPoint("PECO", "Demo Data", "Power Provider"),
        gasProvider: dataPoint("Philadelphia Gas Works", "Demo Data", "Gas Provider"),
        tcommProvider: dataPoint("Verizon FiOS", "Demo Data", "Telecommunications Provider"),
        waterProvider: dataPoint("Philadelphia Water Department", "Demo Data", "Water Provider"),
      },
    },
    "Environmental & Geotechnical": {
      "Environmental Assessment": {
        environmentalAssessment: dataPoint("Phase I complete, no issues", "Demo Data", "Environmental Assessment"),
      },
      "Phase I ESA Findings (2024)": {
        phaseIESA: dataPoint("No RECs identified", "Demo Data", "Phase I ESA"),
      },
      "Soil Contamination": {
        soilContamination: dataPoint("None detected", "Demo Data", "Soil Contamination"),
      },
      "Flood Risk Assessment": {
        floodRiskAssessment: dataPoint("Very low risk", "Demo Data", "Flood Risk Assessment"),
      },
      "FEMA Designation": {
        femaDesignation: dataPoint("Zone X", "Demo Data", "FEMA Designation"),
      },
      "Mitigation Requirements": {
        mitigationRequirements: dataPoint("None required", "Demo Data", "Mitigation Requirements"),
      },
    },
    "Development Economics": {
      "Current Use Analysis": {
        value: dataPoint("Mid-rise office building", "Demo Data", "Current Use Analysis"),
        officeRents: dataPoint("$30-40 psf", "Demo Data", "Office Rents"),
        NOI: dataPoint("$2.4M annually", "Demo Data", "NOI"),
        capRate: dataPoint("6.1%", "Demo Data", "Cap Rate"),
      },
      "Reuse Potential": {
        reusePotential: dataPoint("Potential for vertical expansion", "Demo Data", "Development Feasibility"),
      },
      "Tax History & Projections": {
        taxHistory: dataPoint("Consistent tax rates for past decade with minimal increases", "Demo Data", "Tax History"),
      },
    },
    "Insurance & Risk Assessment": {
      "Insurance Profile": {
        currentCoverage: dataPoint("Commercial property insurance with business interruption", "Demo Data", "Current Coverage"),
        lossHistory: dataPoint("No claims in past 5 years", "Demo Data", "Loss History"),
      },
      "Risk Assessment Matrix": {
        riskAssessmentMatrix: dataPoint("Low overall risk profile", "Demo Data", "Risk Factors"),
      },
    },
  }
} 