import { z } from "zod";

// ---------------- Status ----------------
const StatusSchema = z.object({
  version: z.string().optional().nullable().default(null),
  code: z.number().optional().nullable().default(null),
  msg: z.string().optional().nullable().default(null),
  total: z.number().optional().nullable().default(null),
  page: z.number().optional().nullable().default(null),
  pagesize: z.number().optional().nullable().default(null),
  responseDateTime: z.string().optional().nullable().default(null),
  transactionID: z.string().optional().nullable().default(null),
  attomId: z.number().optional().nullable().default(null),
});


// ---------------- Identifier ----------------
const IdentifierSchema = z.object({
  Id: z.number().optional().nullable().default(null),
  fips: z.string().optional().nullable().default(null),
  apn: z.string().optional().nullable().default(null),
  multiApn: z.any().optional().nullable().default(null),
  attomId: z.number().optional().nullable().default(null),
});

// ---------------- Lot ----------------
const LotSchema = z.object({
  depth: z.any().optional().nullable().default(null),
  frontage: z.any().optional().nullable().default(null),
  lotNum: z.string().optional().nullable().default(null),
  lotSize1: z.number().optional().nullable().default(null),
  lotSize2: z.number().optional().nullable().default(null),
  zoningType: z.string().optional().nullable().default(null),
  siteZoningIdent: z.string().optional().nullable().default(null),
});

// ---------------- Area ----------------
const AreaSchema = z.object({
  blockNum: z.any().optional().nullable().default(null),
  locType: z.string().optional().nullable().default(null),
  countrySecSubd: z.string().optional().nullable().default(null),
  countyUse1: z.string().optional().nullable().default(null),
  munCode: z.string().optional().nullable().default(null),
  munName: z.string().optional().nullable().default(null),
  srvyRange: z.any().optional().nullable().default(null),
  srvySection: z.any().optional().nullable().default(null),
  srvyTownship: z.any().optional().nullable().default(null),
  subdName: z.string().optional().nullable().default(null),
  subdTractNum: z.any().optional().nullable().default(null),
  taxCodeArea: z.string().optional().nullable().default(null),
  censusTractIdent: z.string().optional().nullable().default(null),
  censusBlockGroup: z.string().optional().nullable().default(null),
});

// ---------------- Address ----------------
const AddressSchema = z.object({
  bldgName: z.any().optional().nullable().default(null),
  country: z.string().optional().nullable().default(null),
  countrySubd: z.string().optional().nullable().default(null),
  line1: z.string().optional().nullable().default(null),
  line2: z.string().optional().nullable().default(null),
  locality: z.string().optional().nullable().default(null),
  matchCode: z.string().optional().nullable().default(null),
  oneLine: z.string().optional().nullable().default(null),
  postal1: z.string().optional().nullable().default(null),
  postal2: z.string().optional().nullable().default(null),
  postal3: z.string().optional().nullable().default(null),
  stateFips: z.string().optional().nullable().default(null),
  unitNumberIdent: z.any().optional().nullable().default(null),
  situsHouseNumber: z.string().optional().nullable().default(null),
  situsDirection: z.any().optional().nullable().default(null),
  situsStreetName: z.string().optional().nullable().default(null),
  situsAddressSuffix: z.string().optional().nullable().default(null),
  situsPostDirection: z.any().optional().nullable().default(null),
  situsUnitPrefix: z.any().optional().nullable().default(null),
  situsUnitValue: z.any().optional().nullable().default(null),
});

// ---------------- Sale ----------------
const SaleAmountSchema = z.object({
  saleAmt: z.number().optional().nullable().default(null),
  saleCode: z.any().optional().nullable().default(null),
  saleRecDate: z.string().optional().nullable().default(null),
  saleDisclosureType: z.number().optional().nullable().default(null),
  saleDocType: z.any().optional().nullable().default(null),
  saleDocNum: z.string().optional().nullable().default(null),
  saleTransType: z.string().optional().nullable().default(null),
});


const SaleSchema = z.object({
  sequenceSaleHistory: z.number().optional().nullable().default(null),
  sellerName: z.string().optional().nullable().default(null),
  saleSearchDate: z.string().optional().nullable().default(null),
  saleTransDate: z.string().optional().nullable().default(null),
  transactionIdent: z.string().optional().nullable().default(null),
  amount: SaleAmountSchema.optional().nullable().default(null),
});

// ---------------- Building ----------------
const BuildingSizeSchema = z.object({
  bldgSize: z.number().optional().nullable().default(null),
  grossSize: z.number().optional().nullable().default(null),
  grossSizeAdjusted: z.number().optional().nullable().default(null),
  groundFloorSize: z.any().optional().nullable().default(null),
  livingSize: z.number().optional().nullable().default(null),
  sizeInd: z.string().optional().nullable().default(null),
  universalSize: z.number().optional().nullable().default(null),
  atticSize: z.any().optional().nullable().default(null),
});

const BuildingRoomsSchema = z.object({
  bathFixtures: z.any().optional().nullable().default(null),
  baths1qtr: z.any().optional().nullable().default(null),
  baths3qtr: z.any().optional().nullable().default(null),
  bathsCalc: z.any().optional().nullable().default(null),
  bathsFull: z.number().optional().nullable().default(null),
  bathsHalf: z.any().optional().nullable().default(null),
  bathsPartial: z.number().optional().nullable().default(null),
  bathsTotal: z.number().optional().nullable().default(null),
  beds: z.number().optional().nullable().default(null),
  roomsTotal: z.any().optional().nullable().default(null),
});

const BuildingInteriorSchema = z.object({
  bsmtSize: z.any().optional().nullable().default(null),
  bsmtType: z.any().optional().nullable().default(null),
  bsmtFinishedPercent: z.any().optional().nullable().default(null),
  floors: z.any().optional().nullable().default(null),
  fplcCount: z.number().optional().nullable().default(null),
  fplcInd: z.string().optional().nullable().default(null),
  fplcType: z.string().optional().nullable().default(null),
});

const BuildingConstructionSchema = z.object({
  condition: z.string().optional().nullable().default(null),
  constructionType: z.any().optional().nullable().default(null),
  foundationType: z.string().optional().nullable().default(null),
  frameType: z.any().optional().nullable().default(null),
  roofCover: z.any().optional().nullable().default(null),
  roofShape: z.any().optional().nullable().default(null),
  wallType: z.string().optional().nullable().default(null),
  propertyStructureMajorImprovementsYear: z.any().optional().nullable().default(null),
  buildingShapeType: z.any().optional().nullable().default(null),
  buildingShapeDescription: z.any().optional().nullable().default(null),
});

const BuildingParkingSchema = z.object({
  garageType: z.any().optional().nullable().default(null),
  prkgSize: z.any().optional().nullable().default(null),
  prkgSpaces: z.any().optional().nullable().default(null),
  prkgType: z.any().optional().nullable().default(null),
});

const BuildingSummarySchema = z.object({
  levels: z.number().optional().nullable().default(null),
  storyDesc: z.string().optional().nullable().default(null),
  unitsCount: z.any().optional().nullable().default(null),
  view: z.string().optional().nullable().default(null),
});

const BuildingSchema = z.object({
  size: BuildingSizeSchema.optional().nullable().default(null),
  rooms: BuildingRoomsSchema.optional().nullable().default(null),
  interior: BuildingInteriorSchema.optional().nullable().default(null),
  construction: BuildingConstructionSchema.optional().nullable().default(null),
  parking: BuildingParkingSchema.optional().nullable().default(null),
  summary: BuildingSummarySchema.optional().nullable().default(null),
});

// ---------------- Assessment ----------------
const AppraisedSchema = z.object({
  apprImprValue: z.any().optional().nullable().default(null),
  apprLandValue: z.any().optional().nullable().default(null),
  apprTtlValue: z.any().optional().nullable().default(null),
});

const AssessedSchema = z.object({
  assdImprValue: z.number().optional().nullable().default(null),
  assdLandValue: z.number().optional().nullable().default(null),
  assdTtlValue: z.number().optional().nullable().default(null),
});

const MarketSchema = z.object({
  mktImprValue: z.number().optional().nullable().default(null),
  mktLandValue: z.number().optional().nullable().default(null),
  mktTtlValue: z.number().optional().nullable().default(null),
});

const TaxExemptionSchema = z.object({
  ExemptionAmount1: z.any().optional().nullable().default(null),
  ExemptionAmount2: z.any().optional().nullable().default(null),
  ExemptionAmount3: z.any().optional().nullable().default(null),
  ExemptionAmount4: z.any().optional().nullable().default(null),
  ExemptionAmount5: z.any().optional().nullable().default(null),
});

const TaxSchema = z.object({
  taxAmt: z.any().optional().nullable().default(null),
  taxPerSizeUnit: z.any().optional().nullable().default(null),
  taxYear: z.number().optional().nullable().default(null),
  exemption: TaxExemptionSchema.optional().nullable().default(null),
});

const MortgageFirstConcurrentSchema = z.object({
  trustDeedDocumentNumber: z.string().optional().nullable().default(null),
  ident: z.string().optional().nullable().default(null),
  amount: z.number().optional().nullable().default(null),
  lenderLastName: z.string().optional().nullable().default(null),
  companyCode: z.string().optional().nullable().default(null),
  date: z.string().optional().nullable().default(null),
  loanTypeCode: z.string().optional().nullable().default(null),
  deedType: z.string().optional().nullable().default(null),
  interestRateType: z.string().optional().nullable().default(null),
  equityFlag: z.string().optional().nullable().default(null),
});

const MortgageSecondConcurrentSchema = z.object({
  trustDeedDocumentNumber: z.string().optional().nullable().default(null),
  ident: z.string().optional().nullable().default(null),
  amount: z.number().optional().nullable().default(null),
  lenderLastName: z.string().optional().nullable().default(null),
  companyCode: z.string().optional().nullable().default(null),
  date: z.string().optional().nullable().default(null),
  loanTypeCode: z.string().optional().nullable().default(null),
  term: z.string().optional().nullable().default(null),
  dueDate: z.string().optional().nullable().default(null),
});

const MortgageSchema = z.object({
  FirstConcurrent: MortgageFirstConcurrentSchema.optional().nullable().default(null),
  SecondConcurrent: MortgageSecondConcurrentSchema.optional().nullable().default(null),
});

const AssessmentSchema = z.object({
  appraised: AppraisedSchema.optional().nullable().default(null),
  assessed: AssessedSchema.optional().nullable().default(null),
  market: MarketSchema.optional().nullable().default(null),
  tax: TaxSchema.optional().nullable().default(null),
  improvementPercent: z.number().optional().nullable().default(null),
  mortgage: MortgageSchema.optional().nullable().default(null),
});

// ---------------- Property ----------------
const PropertySchema = z.object({
  identifier: IdentifierSchema.optional().nullable().default(null),
  lot: LotSchema.optional().nullable().default(null),
  area: AreaSchema.optional().nullable().default(null),
  address: AddressSchema.optional().nullable().default(null),
  sale: SaleSchema.optional().nullable().default(null),
  building: BuildingSchema.optional().nullable().default(null),
  assessment: AssessmentSchema.optional().nullable().default(null),
});

// ---------------- Expanded Profile ----------------
export const ExpandedProfileSchema = z.object({
  status: StatusSchema.optional().nullable().default(null),
  property: z.array(PropertySchema).optional().nullable().default([]),
});

export type PropertyExpandedProfile = z.infer<typeof ExpandedProfileSchema>;

