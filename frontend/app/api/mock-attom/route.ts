import { NextResponse } from "next/server";

const mockAttomData = {
  "status": {
    "version": "1.0.0",
    "code": 0,
    "msg": "SuccessWithResult",
    "total": 1,
    "page": 1,
    "pagesize": 10,
    "responseDateTime": "2025-02-26T09:55:49.784Z",
    "transactionID": "831c96c7f7427a6f5dda8b92ed8d8bd2",
    "attomId": 178213033
  },
  "property": [
    {
      "identifier": {
        "Id": 178213033,
        "fips": "42101",
        "apn": "88-3-3200-00",
        "multiApn": null,
        "attomId": 178213033
      },
      "lot": {
        "depth": 286,
        "frontage": 376,
        "lotNum": "107",
        "lotSize1": 2.461,
        "lotSize2": 107221,
        "zoningType": "Commercial",
        "siteZoningIdent": "CMX5"
      },
      "area": {
        "blockNum": null,
        "locType": "AVERAGE",
        "countrySecSubd": "Philadelphia",
        "countyUse1": "DA0  ",
        "munCode": "PH",
        "munName": "PHILADELPHIA",
        "srvyRange": null,
        "srvySection": null,
        "srvyTownship": null,
        "subdName": "CENTRE SQUARE BLDG",
        "subdTractNum": null,
        "taxCodeArea": "8",
        "censusTractIdent": "403",
        "censusBlockGroup": "1"
      },
      "address": {
        "bldgName": null,
        "country": "US",
        "countrySubd": "PA",
        "line1": "1500 MARKET ST # 42",
        "line2": "PHILADELPHIA, PA 19102",
        "locality": "PHILADELPHIA",
        "matchCode": "ExaStr",
        "oneLine": "1500 MARKET ST # 42, PHILADELPHIA, PA 19102",
        "postal1": "19102",
        "postal2": "2100",
        "postal3": "C021",
        "stateFips": "42",
        "unitNumberIdent": null,
        "situsHouseNumber": "1500",
        "situsDirection": null,
        "situsStreetName": "MARKET",
        "situsAddressSuffix": "ST",
        "situsPostDirection": null,
        "situsUnitPrefix": "#",
        "situsUnitValue": "42"
      },
      "sale": {
        "sequenceSaleHistory": 1,
        "sellerName": "EQC OPERATING TRUST",
        "saleSearchDate": "2017-07-18",
        "saleTransDate": "2017-07-14",
        "transactionIdent": "762873864",
        "amount": {
          "saleAmt": 328000000,
          "saleCode": "SALE PRICE (FULL) Full sales price as per documents",
          "saleRecDate": "2017-07-18",
          "saleDisclosureType": 0,
          "saleDocType": null,
          "saleDocNum": "0053239762",
          "saleTransType": "Resale"
        }
      },
      "building": {
        "size": {
          "bldgSize": 2215704,
          "grossSize": 2215704,
          "grossSizeAdjusted": 2215704,
          "groundFloorSize": null,
          "livingSize": 2215704,
          "sizeInd": "BUILDING SQFT",
          "universalSize": 2215704,
          "atticSize": null
        },
        "rooms": {
          "bathFixtures": null,
          "baths1qtr": null,
          "baths3qtr": null,
          "bathsCalc": null,
          "bathsFull": null,
          "bathsHalf": null,
          "bathsPartial": null,
          "bathsTotal": null,
          "beds": null,
          "roomsTotal": null
        },
        "interior": {
          "bsmtSize": null,
          "bsmtType": null,
          "bsmtFinishedPercent": null,
          "floors": null,
          "fplcCount": null,
          "fplcInd": null,
          "fplcType": null
        },
        "construction": {
          "condition": "AVERAGE",
          "constructionType": "MASONRY",
          "foundationType": null,
          "frameType": "MASONRY",
          "roofCover": null,
          "roofShape": null,
          "wallType": "BRICK",
          "propertyStructureMajorImprovementsYear": null,
          "buildingShapeType": null,
          "buildingShapeDescription": null
        },
        "parking": {
          "garageType": null,
          "prkgSize": null,
          "prkgSpaces": "40",
          "prkgType": null
        },
        "summary": {
          "levels": 4,
          "storyDesc": null,
          "unitsCount": null,
          "view": "AVERAGE"
        }
      },
      "assessment": {
        "appraised": {
          "apprImprValue": null,
          "apprLandValue": null,
          "apprTtlValue": null
        },
        "assessed": {
          "assdImprValue": 200000000,
          "assdLandValue": 50659200,
          "assdTtlValue": 250659200
        },
        "market": {
          "mktImprValue": 200000000,
          "mktLandValue": 50659200,
          "mktTtlValue": 250659200
        },
        "tax": {
          "taxAmt": 3508727.48,
          "taxPerSizeUnit": 1.58,
          "taxYear": 2024,
          "exemption": {
            "ExemptionAmount1": null,
            "ExemptionAmount2": null,
            "ExemptionAmount3": null,
            "ExemptionAmount4": null,
            "ExemptionAmount5": null
          }
        },
        "improvementPercent": 79,
        "mortgage": {
          "FirstConcurrent": {
            "trustDeedDocumentNumber": "0053239763",
            "ident": "53239763",
            "amount": 240000000,
            "lenderLastName": "CITI REAL ESTATE FUNDING INC",
            "companyCode": "130702",
            "date": "2017-07-18",
            "loanTypeCode": "COM",
            "deedType": "SW",
            "interestRateType": null,
            "equityFlag": null
          },
          "SecondConcurrent": {
            "trustDeedDocumentNumber": null,
            "ident": null,
            "amount": 0,
            "lenderLastName": null,
            "companyCode": "-1",
            "date": null,
            "loanTypeCode": null,
            "term": null,
            "dueDate": null
          }
        }
      }
    }
  ]
};

export async function POST() {
  return NextResponse.json(mockAttomData);
}