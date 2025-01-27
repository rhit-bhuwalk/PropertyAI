// utils/parseZillowData.ts

interface School {
    level?: string
    name?: string
    rating?: number
    // ...
  }
  
  interface PropertyInfo {
    [key: string]: any
  }
  
  /**
   * Returns an object with the fields you requested.
   */
  export function parseZillowData(data: PropertyInfo[]): Record<string, any> {
    if (!data?.length) {
      return {}
    }
  
    const property = data[0]
  
    // Extract "elementary", "intermediate (middle)", "high" schools, for example:
    const elementarySchool = property.schools?.find((s: School) => s.level === "Elementary")
    const intermediateSchool = property.schools?.find((s: School) => s.level === "Middle")
    const highSchool = property.schools?.find((s: School) => s.level === "High")
  
    const isForSale = 
      property.homeStatus === "FOR_SALE" || 
      property.is_FSBO === true || 
      property.is_FSBA === true
  
    const isPartOfHOA =
      Array.isArray(property.associations) && property.associations.length > 0
  
    return {
      // ---- General Property Information ----
      streetAddress: property.streetAddress ?? "",
      city: property.city ?? "",
      state: property.state ?? "",
      zipcode: property.zipcode ?? "",
      parcelNumber: property.parcelNumber ?? "",
      propertyType: property.propertySubType?.join(", ") ?? "",
  
      // If any of these indicates "For Sale," consider it "Yes."
      isForSale: isForSale, 
      isComingSoon: !!property.is_comingSoon,
      listingPrice: property.price ?? "",
      sellingAgent: property.agentName ?? "",
      sellingAgentPhone: property.agentPhoneNumber ?? "",
      sellingBrokerage: property.brokerName ?? "",
      sellingBrokeragePhone: property.brokerPhoneNumber ?? "",
      isPartOfHOA: isPartOfHOA,
      municipalityJurisdiction: property.cityRegion ?? "",
      currentZoning: property.zoning ?? "",
  
      // ---- Market Info (placeholders or separate data source) ----
      msa: null,                     // 16. MSA - (example placeholder)
      msaPopulation: null,           // 17. Current MSA Population
      fiveYearPopulationTrend: null, // 18. 5-Year Population Trend
      medianHouseholdIncome: null,   // 19
      topEmploymentSectors: null,    // 20
  
      // ---- Schools + Ratings ----
      elementarySchool: elementarySchool?.name ?? "",
      elementarySchoolRating: elementarySchool?.rating ?? null,
  
      // The question says "Districted Intermediate"—some places call it "middle".
      intermediateSchool: intermediateSchool?.name ?? "",
      intermediateSchoolRating: intermediateSchool?.rating ?? null,
  
      highSchool: highSchool?.name ?? "",
      highSchoolRating: highSchool?.rating ?? null,
  
      // Additional placeholders for the rest:
      crimeRating: null,    // 27
      percentRenting: null, // 28
      percentOwning: null,  // 29
    }
  }