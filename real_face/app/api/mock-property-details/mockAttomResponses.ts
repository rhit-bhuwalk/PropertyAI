// mockAttomResponses.ts

const BASE_PROPERTY = {
  identifier: {
    Id: 147349155,
    fips: "17031",
    apn: "17-04-445-017-1152",
    attomId: 147349155
  },
  lot: {
    lotsize1: 1.54,
    lotsize2: 67082,
    pooltype: "NO POOL",
    zoningType: "Residential"
  },
  area: {
    loctype: "VIEW - NONE",
    countrysecsubd: "Cook",
    countyuse1: "2-99 ",
    muncode: "CO",
    munname: "COOK",
    srvyRange: "14E",
    srvySection: "04",
    srvyTownship: "39N",
    subdname: "PARC CHESTNUT CONDO",
    taxcodearea: "74002",
    censusTractIdent: "81800",
    censusBlockGroup: "1"
  },
  address: {
    country: "US",
    countrySubd: "IL",
    line1: "849 N FRANKLIN ST UNIT 1009",
    line2: "CHICAGO, IL 60610",
    locality: "CHICAGO",
    matchCode: "ExaStr",
    oneLine: "849 N FRANKLIN ST UNIT 1009, CHICAGO, IL 60610",
    postal1: "60610",
    postal2: "3489",
    stateFips: "17",
    situsHouseNumber: "849",
    situsDirection: "N",
    situsStreetName: "FRANKLIN",
    situsAddressSuffix: "ST",
    situsUnitPrefix: "UNIT",
    situsUnitValue: "1009"
  }
};

// Mock response for property/detail endpoint
export const MOCK_DETAIL_RESPONSE = {
  status: {
    version: "1.0.0",
    code: 0,
    msg: "SuccessWithResult",
    total: 1,
    page: 1,
    pagesize: 0,
    transactionID: "5df39931da5befb3609377b7c00a09c9"
  },
  property: [{
    ...BASE_PROPERTY,
    summary: {
      absenteeInd: "OWNER OCCUPIED",
      propclass: "Condominium (residential)",
      propsubtype: "Residential",
      proptype: "CONDOMINIUM",
      propertyType: "CONDOMINIUM",
      yearbuilt: 2005,
      propLandUse: "CONDOMINIUM",
      propIndicator: "11",
      legal1: "DIST:74 CITY/MUNI/TWP:NORTH CHICAGO",
      quitClaimFlag: "False",
      REOflag: "False"
    }
  }]
};

export const MOCK_BASICPROFILE_RESPONSE = {
  status: {
    code: 0,
    msg: "Success",
  },
  property: [{
    summary: {
      absenteeInd: "OWNER OCCUPIED",
      propclass: "Condominium (residential)",
      proptype: "CONDOMINIUM",
      yearbuilt: 2005
    }
  }]
};

export const MOCK_EXPANDEDPROFILE_RESPONSE = {
  status: {
    code: 0,
    msg: "Success",
  },
  property: [{
    assessment: {
      assessed: {
        assdImprValue: 33505,
        assdLandValue: 2752,
        assdTtlValue: 36257,
        assdlandpersizeunit: 0.04
      },
      market: {
        mktImprValue: 335050,
        mktLandValue: 27520,
        mktTtlValue: 362570
      }
    }
  }]
};

export const MOCK_DETAILOWNER_RESPONSE = {
  status: {
    code: 0,
    msg: "Success",
  },
  property: [{
    owner: {
      corporateindicator: "N",
      owner1: {
        fullname: "ALEXANDER SHEBAR",
        lastname: "SHEBAR",
        firstnameandmi: "ALEXANDER"
      },
      ownerrelationshiptype: "MM",
      absenteeownerstatus: "O",
      mailingaddressoneline: "849 N FRANKLIN ST UNIT 1009, CHICAGO, IL 60610-3489"
    }
  }]
};

export const MOCK_TRANSPORTATIONNOISE_RESPONSE = {
  status: {
    code: 0,
    msg: "Success"
  },
  transportationNoise: {
    attomId: 147349155,
    lat: 41.8979,
    lon: -87.63537,
    road_noise: {
      level: 2,
      level_description: "Busy traffic nearby",
      noise_sources: [
        {
          source_type: "road",
          source_sub_type: "motorway",
          source_description: "North Jean Baptiste Point DuSable Lake Shore Drive"
        }
      ]
    },
    aviation_noise: {
      level: 0,
      level_description: "No nearby airports"
    },
    overall_summary: "Traffic noise is medium. Also, there may be frequent ambulance traffic nearby."
  }
};

export const MOCK_DETAILWITHSCHOOLS_RESPONSE = {
  status: {
    code: 0,
    msg: "Success"
  },
  schoolDistrict: {
    geoIdV4: "d2babda30e614ff058235ca544fd18ec",
    districttype: "Regular",
    districtname: "Chicago Public School District 299",
    districtlatitude: "41.882233",
    districtlongitude: "-87.628809"
  },
  school: [
    {
      geoIdV4: "cc0ff1e687e0002b12243e617e835567",
      InstitutionName: "Wells Community Academy High School",
      GSTestRating: 0,
      schoolRating: "F ",
      gradelevel1lotext: "9",
      gradelevel1hitext: "12",
      distance: 1.69
    },
    {
      geoIdV4: "e9d2d2a774aa93b128959f44002b8f85",
      InstitutionName: "Ogden Elementary School",
      GSTestRating: 0,
      schoolRating: "C+",
      gradelevel1lotext: "KG",
      gradelevel1hitext: "8",
      distance: 0.37
    }
  ]
};

export const MOCK_PREFORECLOSUREDETAILS_RESPONSE = {
  status: {
    code: 0,
    msg: "Success"
  },
  property: []  // Empty array for no foreclosure data
};

export const MOCK_ALLEVENTS_RESPONSE = {
  status: {
    code: 0,
    msg: "Success"
  },
  property: [{
    sale: {
      saleSearchDate: "2017-05-09",
      saleTransDate: "2017-04-27",
      transactionIdent: "750958807",
      saleAmountData: {
        saleAmt: 392000,
        saleRecDate: "2017-05-09",
        saleDisclosureType: 0,
        saleDocType: "DEED",
        saleDocNum: "1712929014",
        saleTransType: "Resale"
      }
    }
  }]
};

export const ERROR_RESPONSE = {
  status: {
    code: 1,
    msg: "Error processing request"
  }
};

export const MOCK_ENDPOINT_RESPONSES = {
  "propertyapi/v1.0.0/property/detail": MOCK_DETAIL_RESPONSE,
  "propertyapi/v1.0.0/property/basicprofile": MOCK_BASICPROFILE_RESPONSE,
  "propertyapi/v1.0.0/property/buildingpermits": { status: { code: 0 }, property: [] },
  "propertyapi/v1.0.0/property/detailowner": MOCK_DETAILOWNER_RESPONSE,
  "propertyapi/v1.0.0/property/expandedprofile": MOCK_EXPANDEDPROFILE_RESPONSE,
  "transportationnoise": MOCK_TRANSPORTATIONNOISE_RESPONSE,
  "propertyapi/v4/property/detailwithschools": MOCK_DETAILWITHSCHOOLS_RESPONSE,
  "property/v3/preforeclosuredetails": MOCK_PREFORECLOSUREDETAILS_RESPONSE,
  "propertyapi/v1.0.0/allevents/detail": MOCK_ALLEVENTS_RESPONSE
};