// transformSourceToReport.ts
import { get, set } from "lodash";
import { mappingConfigSource } from "./mappingConfigSource";
import { PropertyExpandedProfile } from "@/app/schemas/endpoints/s_prop-expanded-profile"; // Your validated Attom type
import { GeneralPropertyInfo } from "@/app/schemas/views/s_general-property-info"; // Your report type


export function transformSourceToReport(sourceData: PropertyExpandedProfile): GeneralPropertyInfo {
  // Assume we're using the first property record from the Attom data.
  const property = sourceData.property?.[0] || {};
  const report: Partial<GeneralPropertyInfo> = {}; // Use Partial to allow gradual building

  // Iterate over the mapping config keyed by source paths.
  for (const sourcePath in mappingConfigSource) {
    const mappingEntry = mappingConfigSource[sourcePath as keyof typeof mappingConfigSource];
    const value = get(property, sourcePath, null);
    // Only map if value exists (not null or empty string).
    if (value !== null && value !== "") {
      const dataPoint = {
        alias: mappingEntry.alias,
        value,
        source: mappingEntry.source,
      };
      // Ensure the report is structured correctly
      set(report, mappingEntry.reportPath, dataPoint);
    }
  }

  return report as GeneralPropertyInfo; // Ensure the final structure matches
}