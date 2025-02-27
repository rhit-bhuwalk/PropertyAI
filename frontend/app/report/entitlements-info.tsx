// "use client"

// import { FileText, Scale, FileCheck, Hammer } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { PropertyReportHandler } from "@/lib/report-handler"

// interface EntitlementsInfoTabProps {
//   reportHandler: PropertyReportHandler | null;
// }

// export default function EntitlementsInfoTab({ reportHandler }: EntitlementsInfoTabProps) {
//   return (
//     <div className="min-h-screen">
//       <div className="container mx-auto max-w-7xl">
//         <div className="space-y-16">
//           <Accordion type="multiple" className="space-y-6">
//             {/* Initial Planning Review */}
//             <AccordionItem value="planning">
//               <AccordionTrigger className="hover:no-underline accordion-trigger">
//                 <div className="flex items-center gap-3">
//                   <FileText className="h-6 w-6 text-[#E86C24]" />
//                   <h2 className="text-2xl font-semibold text-left">Initial Planning Review</h2>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="accordion-content">
//                 <Card className="border-none shadow-none">
//                   <CardContent className="pt-3 pl-3">
//                     <div className="space-y-4">
//                       <p className="text-muted-foreground">Municipal review process including:</p>
//                       <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
//                         <li>Review timeline and associated fees</li>
//                         <li>Required documentation for submission</li>
//                         <li>Development plan requirements</li>
//                         <li>Municipal code compliance checklist</li>
//                       </ul>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Zoning Variance */}
//             <AccordionItem value="variance">
//               <AccordionTrigger className="hover:no-underline accordion-trigger">
//                 <div className="flex items-center gap-3">
//                   <Scale className="h-6 w-6 text-[#E86C24]" />
//                   <h2 className="text-2xl font-semibold text-left">Zoning Variance Process</h2>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="accordion-content">
//                 <Card className="border-none shadow-none">
//                   <CardContent className="pt-3 pl-3">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Variance Requirements</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>Documentation of non-compliant elements</li>
//                           <li>Justification for variance request</li>
//                           <li>Impact studies and mitigation plans</li>
//                         </ul>
//                       </div>
//                       <Separator />
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Process Timeline</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>Application submission requirements</li>
//                           <li>Public hearing schedules</li>
//                           <li>Review and approval timeline</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Rezoning Process */}
//             <AccordionItem value="rezoning">
//               <AccordionTrigger className="hover:no-underline accordion-trigger">
//                 <div className="flex items-center gap-3">
//                   <FileCheck className="h-6 w-6 text-[#E86C24]" />
//                   <h2 className="text-2xl font-semibold text-left">Rezoning Process</h2>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="accordion-content">
//                 <Card className="border-none shadow-none">
//                   <CardContent className="pt-3 pl-3">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Application Requirements</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>Comprehensive plan consistency analysis</li>
//                           <li>Environmental impact studies</li>
//                           <li>Traffic and infrastructure assessments</li>
//                         </ul>
//                       </div>
//                       <Separator />
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Review Process</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>Planning commission review</li>
//                           <li>Public hearing requirements</li>
//                           <li>City council approval process</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </AccordionContent>
//             </AccordionItem>

//             {/* Permit Process */}
//             <AccordionItem value="permits">
//               <AccordionTrigger className="hover:no-underline accordion-trigger">
//                 <div className="flex items-center gap-3">
//                   <Hammer className="h-6 w-6 text-[#E86C24]" />
//                   <h2 className="text-2xl font-semibold text-left">Permit Process</h2>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="accordion-content">
//                 <Card className="border-none shadow-none">
//                   <CardContent className="pt-3 pl-3">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Required Permits</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>General construction permit</li>
//                           <li>Specialty permits (electrical, plumbing, mechanical)</li>
//                           <li>Site-specific permits (grading, landscaping)</li>
//                           <li>Infrastructure permits (roadways, utilities)</li>
//                         </ul>
//                       </div>
//                       <Separator />
//                       <div>
//                         <h3 className="font-semibold mb-3 text-lg">Documentation Requirements</h3>
//                         <ul className="space-y-2 text-muted-foreground">
//                           <li>Construction documents and specifications</li>
//                           <li>Engineering calculations and studies</li>
//                           <li>Contractor licensing and insurance</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </div>
//     </div>
//   )
// }

