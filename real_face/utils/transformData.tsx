// File: transformData.ts

/**
 * A flat hashmap of all key aliases.
 * When transforming data, if a key exists in this alias map,
 * its value will be replaced with the corresponding alias.
 */
export const aliasMap: Record<string, string> = {
    // Summary & General
    absenteeInd: "Occupancy",
    propclass: "Property Class",
    propsubtype: "Property Sub Type",
    proptype: "Property Type",
    propertyType: "Property Type",
    yearbuilt: "Year Built",
    propLandUse: "Land Use",
    propIndicator: "Property Indicator",
    legal1: "Legal Description",
    quitClaimFlag: "Quit Claim",
    REOflag: "REO Flag",
    archStyle: "Architectural Style",
  
    // Lot
    lotsize1: "Lot Size (Acres)",
    lotsize2: "Lot Size (Sq Ft)",
    pooltype: "Pool Type",
    zoningType: "Zoning Type",
  
    // Address
    oneLine: "Address",
    line1: "Address Line 1",
    line2: "Address Line 2",
    country: "Country",
    countrySubd: "State",
    locality: "City",
    postal1: "Postal Code",
    postal2: "Postal Code 2",
    postal3: "Postal Code 3",
    stateFips: "State FIPS",
    matchCode: "Match Code",
    situsHouseNumber: "House Number",
    situsStreetName: "Street Name",
    situsAddressSuffix: "Address Suffix",
    situsPostDirection: "Post Direction",
    situsUnitPrefix: "Unit Prefix",
    situsUnitValue: "Unit Value",
  
    // Area
    loctype: "Location Type",
    countrysecsubd: "County/Section Subdivision",
    countyuse1: "County Use",
    muncode: "Municipality Code",
    munname: "Municipality Name",
    srvyRange: "Survey Range",
    srvySection: "Survey Section",
    srvyTownship: "Survey Township",
    subdname: "Subdivision Name",
    taxcodearea: "Tax Code Area",
    censusTractIdent: "Census Tract",
    censusBlockGroup: "Census Block Group",
  
    // Location
    accuracy: "Accuracy",
    latitude: "Latitude",
    longitude: "Longitude",
    // distance: "Distance",
    geoid: "Geo ID",
    geoIdV4: "Geo ID V4",
  
    // Utilities
    coolingtype: "Cooling Type",
    heatingfuel: "Heating Fuel",
    heatingtype: "Heating Type",
    wallType: "Wall Type",
  
    // Building Size
    bldgsize: "Building Size",
    grosssize: "Gross Size",
    grosssizeadjusted: "Adjusted Gross Size",
    livingsize: "Living Size",
    sizeInd: "Size Indicator",
    universalsize: "Universal Size",
  
    // Building Rooms
    bathsfull: "Full Baths",
    bathstotal: "Total Baths",
    beds: "Bedrooms",
  
    // Building Interior
    fplccount: "Fireplace Count",
    fplcind: "Has Fireplace",
    fplctype: "Fireplace Type",
  
    // Building Construction
    condition: "Condition",
    foundationtype: "Foundation Type",
    roofcover: "Roof Cover",
    roofShape: "Roof Shape",
  
    // Building Parking
    garagetype: "Garage Type",
    prkgSize: "Parking Size",
    prkgSpaces: "Parking Spaces",
    prkgType: "Parking Type",
  
    // Building Summary
    bldgsNum: "Number of Buildings",
    levels: "Levels",
    quality: "Quality",
    view: "View",
    viewCode: "View Code",
  
    // Vintage
    lastModified: "Last Modified",
    pubDate: "Publication Date",
  
    // Sale (top level)
    saleSearchDate: "Sale Search Date",
    saleTransDate: "Sale Transaction Date",
    transactionIdent: "Transaction Identifier",
    saleAmountData: "Sale Amount Data",
    sequenceSaleHistory: "Sale Sequence History",
    sellerName: "Seller Name",
    amount: "Sale Amount",
    saleAmt: "Sale Amount",
    saleRecDate: "Sale Record Date",
    saleDisclosureType: "Sale Disclosure Type",
    saleDocNum: "Sale Document Number",
    saleTransType: "Sale Transaction Type",
    calculation: "Sale Calculation",
    interfamily: "Interfamily",
    resaleornewconstruction: "Resale or New Construction",
    cashormortgagepurchase: "Cash or Mortgage Purchase",
  
    // Sale Calculation (nested)
    pricePerBed: "Price Per Bedroom",
    pricePerSizeUnit: "Price Per Size Unit",
  
    // Assessment (assessed)
    assdImprValue: "Assessed Improvement Value",
    assdLandValue: "Assessed Land Value",
    assdTtlValue: "Assessed Total Value",
    assdimprpersizeunit: "Assessed Improvement Value per Size Unit",
    assdlandpersizeunit: "Assessed Land Value per Size Unit",
    assdttlpersizeunit: "Assessed Total Value per Size Unit",
  
    // Assessment (market)
    mktImprValue: "Market Improvement Value",
    mktLandValue: "Market Land Value",
    mktTtlValue: "Market Total Value",
  
    // Assessment (tax)
    taxAmt: "Tax Amount",
    taxPerSizeUnit: "Tax per Size Unit",
    taxYear: "Tax Year",
  
    // Assessment (calculations)
    calcimprind: "Calculated Improvement Indicator",
    calcimprpersizeunit: "Calculated Improvement Value per Size Unit",
    calcimprvalue: "Calculated Improvement Value",
    calclandind: "Calculated Land Indicator",
    calclandpersizeunit: "Calculated Land Value per Size Unit",
    calclandvalue: "Calculated Land Value",
    calcttlind: "Calculated Total Indicator",
    calcttlvalue: "Calculated Total Value",
    calcvaluepersizeunit: "Calculated Total Value per Size Unit",
  
    // Owner
    corporateindicator: "Corporate Indicator",
    owner1: "Primary Owner",
    owner2: "Owner 2",
    owner3: "Owner 3",
    owner4: "Owner 4",
    ownerrelationshiptype: "Owner Relationship Type",
    ownerrelationshiprightscode: "Owner Relationship Type Code",
    absenteeownerstatus: "Absentee Owner Status",
    mailingaddressoneline: "Mailing Address",
  
    // Owner No
    fullname: "Full Name",
    lastname: "Last Name",
    firstnameandmi: "First Name and Middle Initial",
  
    // Transportation & Noise
    attomId: "Attom ID",
    lat: "Latitude",
    lon: "Longitude",
    road_noise: "Road Noise",
    aviation_noise: "Aviation Noise",
    emg_vehicle_noise: "Emergency Vehicle Noise",
    rail_whistle_noise: "Rail Whistle Noise",
    rail_noise: "Rail Noise",
    overall_summary: "Overall Noise Summary",
    disclaimer_text: "Disclaimer",
  
    // Noise Level (nested details)
    level: "Noise Level",
    level_description: "Noise Level Description",
    noise_sources: "Noise Sources",
  
    // School
    InstitutionName: "Institution Name",
    GSTestRating: "GS Test Rating",
    schoolRating: "School Rating",
    gradelevel1lotext: "Grade Level (Low)",
    gradelevel1hitext: "Grade Level (High)",
    lowAssignedGrade: "Low Assigned Grade",
    highAssignedGrade: "High Assigned Grade",
    Filetypetext: "File Type",
    geocodinglatitude: "Latitude",
    geocodinglongitude: "Longitude",
    // Overwrite distance if coming from school data  
    // School District
    districttype: "District Type",
    districtname: "District Name",
    districtlatitude: "District Latitude",
    districtlongitude: "District Longitude",
  
    // AVM (amount)
    scr: "Score",
    value: "Estimated Value",
    high: "High Estimate",
    low: "Low Estimate",
    valueRange: "Value Range",
  
    // AVM (change)
    avmlastmonthvalue: "Last Month Value",
    avmamountchange: "Amount Change",
    avmpercentchange: "Percent Change",
  
    // AVM (calculations)
    perSizeUnit: "Value Per Size Unit",
    ratioTaxAmt: "Tax Amount Ratio",
    ratioTaxValue: "Tax Value Ratio",
    rangePctOfValue: "Range Percentage of Value",
  
    // AVM (condition)
    avmpoorlow: "Poor Estimate Low",
    avmpoorhigh: "Poor Estimate High",
    avmgoodlow: "Good Estimate Low",
    avmgoodhigh: "Good Estimate High",
    avmexcellentlow: "Excellent Estimate Low",
    avmexcellenthigh: "Excellent Estimate High",
  
    // Status
    version: "Version",
    code: "Status Code",
    msg: "Message",
    total: "Total Results",
    page: "Page",
    pagesize: "Page Size",
    transactionID: "Transaction ID"
  };
  
  /**
   * Recursively transforms an input data structure by replacing keys
   * according to the aliasMap.
   *
   * @param data - The input data (object, array, or primitive) to transform.
   * @returns The transformed data with keys replaced.
   */
  export function transformData(data: any): any {
    if (Array.isArray(data)) {
      return data.map(transformData);
    } else if (data && typeof data === "object") {
      const result: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        // Look up alias in the flat aliasMap; fallback to the original key if none exists.
        const newKey = aliasMap[key] || key;
        result[newKey] = transformData(value);
      }
      return result;
    }
    return data;
  }