"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyDataTableProps {
  data: Record<string, any>
}

export function PropertyDataTable({ data }: PropertyDataTableProps) {
  return (
    <div className="space-y-6">
      {/* General Property Information Section */}
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg font-semibold text-orange-950">General Property Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/3">Street Address</TableCell>
                <TableCell>{data.streetAddress}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">City</TableCell>
                <TableCell>{data.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">State</TableCell>
                <TableCell>{data.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Zip Code</TableCell>
                <TableCell>{data.zipcode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Parcel Number</TableCell>
                <TableCell>{data.parcelNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Property Type</TableCell>
                <TableCell>{data.propertyType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">For Sale Status</TableCell>
                <TableCell>
                  <Badge variant={data.isForSale ? "green" : "destructive"}>
                    {data.isForSale ? "For Sale" : "Not For Sale"}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coming Soon</TableCell>
                <TableCell>
                  <Badge variant={data.isComingSoon ? "green" : "destructive"}>
                    {data.isComingSoon ? "Yes" : "No"}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Listing Price</TableCell>
                <TableCell>
                  {data.listingPrice
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.listingPrice)
                    : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Selling Agent</TableCell>
                <TableCell>{data.sellingAgent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Selling Agent Phone</TableCell>
                <TableCell>{data.sellingAgentPhone || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Selling Brokerage</TableCell>
                <TableCell>{data.sellingBrokerage || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HOA Status</TableCell>
                <TableCell>
                  <Badge variant={data.isPartOfHOA ? "green" : "destructive"}>
                    {data.isPartOfHOA ? "Part of HOA" : "No HOA"}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Municipality</TableCell>
                <TableCell>{data.municipalityJurisdiction || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Current Zoning</TableCell>
                <TableCell>{data.currentZoning || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Market Information Section */}
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg font-semibold text-orange-950">Market Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/3">MSA</TableCell>
                <TableCell>{data.msa || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MSA Population</TableCell>
                <TableCell>{data.msaPopulation || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5-Year Population Trend</TableCell>
                <TableCell>{data.fiveYearPopulationTrend || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Median Household Income</TableCell>
                <TableCell>{data.medianHouseholdIncome || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Top Employment Sectors</TableCell>
                <TableCell>{data.topEmploymentSectors || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Schools Information Section */}
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg font-semibold text-orange-950">Schools Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">School Level</TableHead>
                <TableHead>School Name</TableHead>
                <TableHead className="w-32">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Elementary</TableCell>
                <TableCell>{data.elementarySchool || "N/A"}</TableCell>
                <TableCell>
                  {data.elementarySchoolRating ? (
                    <Badge variant="green">{data.elementarySchoolRating}/10</Badge>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Intermediate</TableCell>
                <TableCell>{data.intermediateSchool || "N/A"}</TableCell>
                <TableCell>
                  {data.intermediateSchoolRating ? (
                    <Badge variant="green">{data.intermediateSchoolRating}/10</Badge>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">High School</TableCell>
                <TableCell>{data.highSchool || "N/A"}</TableCell>
                <TableCell>
                  {data.highSchoolRating ? <Badge variant="green">{data.highSchoolRating}/10</Badge> : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Additional Information Section */}
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg font-semibold text-orange-950">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/3">Crime Rating</TableCell>
                <TableCell>{data.crimeRating || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Percent Renting</TableCell>
                <TableCell>{data.percentRenting ? `${data.percentRenting}%` : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Percent Owning</TableCell>
                <TableCell>{data.percentOwning ? `${data.percentOwning}%` : "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

