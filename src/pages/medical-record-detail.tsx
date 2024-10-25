import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, Printer } from 'lucide-react'
import { format } from 'date-fns'

// Mock data - replace with actual data fetching
const getMedicalRecord = (patientId: string, recordId: string) => ({
  id: recordId,
  patientId,
  date: "2023-10-15",
  type: "Initial Consultation",
  complaint: "Facial lines and wrinkles",
  diagnosis: "Dynamic wrinkles in forehead and glabella",
  treatment: "Botox injection - 20 units forehead, 15 units glabella",
  notes: "Patient tolerated procedure well. No immediate complications observed. Patient was advised about potential side effects and post-treatment care instructions were provided.",
  provider: "Dr. Sarah Johnson",
  followUpDate: "2023-11-15",
  medications: [
    {
      productName: "BOTOX® (Allergan)",
      genericName: "Botulinum Toxin Type A",
      dosage: "35 units total",
      batch: "BTX-2023-456",
      expiry: "2024-06-15"
    }
  ],
  aftercare: [
    "Avoid touching or massaging treated areas for 24 hours",
    "Stay upright for 4 hours post-treatment",
    "Avoid strenuous exercise for 24 hours",
    "Apply cold compresses if needed"
  ],
  images: [
    { id: 1, type: "Before", url: "/before-1.jpg" },
    { id: 2, type: "After", url: "/after-1.jpg" }
  ],
  treatmentMap: {
    points: [
      { id: 1, area: "Forehead", units: 20, coordinates: { x: 50, y: 30 } },
      { id: 2, area: "Glabella", units: 15, coordinates: { x: 50, y: 40 } }
    ]
  }
})

export default function MedicalRecordDetail() {
  const { patientId = '', recordId = '' } = useParams()
  const navigate = useNavigate()
  const record = getMedicalRecord(patientId, recordId)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/patients/${patientId}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Medical Record</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">
                    {format(new Date(record.date), "dd MMM yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{record.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="text-sm font-medium">{record.provider}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clinical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Complaint</p>
                <p className="text-sm">{record.complaint}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diagnosis</p>
                <p className="text-sm">{record.diagnosis}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Clinical Notes</p>
                <p className="text-sm">{record.notes}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Treatment Provided</p>
                <p className="text-sm">{record.treatment}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Medications Used</p>
                <div className="space-y-4">
                  {record.medications.map((medication, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Product Name</p>
                        <p className="text-sm">{medication.productName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Generic Name</p>
                        <p className="text-sm">{medication.genericName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dosage</p>
                        <p className="text-sm">{medication.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Batch Number</p>
                        <p className="text-sm">{medication.batch}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Aftercare Instructions</p>
                <ul className="list-disc pl-4 space-y-1">
                  {record.aftercare.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Follow-up Date</p>
                <p className="text-sm">
                  {format(new Date(record.followUpDate), "dd MMM yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8 items-start">
                <div className="relative w-[300px] h-[400px] bg-background rounded-lg border">
                  {/* Face outline SVG */}
                  <svg
                    viewBox="0 0 100 133"
                    className="absolute inset-0 w-full h-full p-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  >
                    {/* Head outline */}
                    <path d="M50 8 C25 8 20 30 20 45 C20 65 35 90 50 95 C65 90 80 65 80 45 C80 30 75 8 50 8" />
                    {/* Jaw line */}
                    <path d="M30 75 C40 95 60 95 70 75" />
                    {/* Nose */}
                    <path d="M47 45 L47 60 C47 63 53 63 53 60 L53 45" />
                    {/* Eyes */}
                    <path d="M35 40 C35 37 40 37 40 40 C40 43 35 43 35 40" />
                    <path d="M60 40 C60 37 65 37 65 40 C65 43 60 43 60 40" />
                    {/* Eyebrows */}
                    <path d="M32 35 C35 33 40 33 43 35" />
                    <path d="M57 35 C60 33 65 33 68 35" />
                    {/* Mouth */}
                    <path d="M45 70 C50 73 55 70 55 70" />
                  </svg>

                  {/* Treatment points */}
                  {record.treatmentMap.points.map((point) => (
                    <div
                      key={point.id}
                      className="absolute w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${point.coordinates.x}%`,
                        top: `${point.coordinates.y}%`
                      }}
                    >
                      <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 -top-8 bg-popover text-popover-foreground text-xs rounded px-2 py-1 whitespace-nowrap shadow-md z-50">
                        {point.area}: {point.units} units
                      </div>
                    </div>
                  ))}
                </div>

                {/* Treatment points legend */}
                <div className="flex-1 p-4 bg-muted/10 rounded-lg">
                  <p className="text-sm font-medium mb-4">Treatment Areas</p>
                  <div className="space-y-3">
                    {record.treatmentMap.points.map((point) => (
                      <div key={point.id} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">
                          {point.area}: {point.units} units
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {record.images.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Treatment Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {record.images.map((image) => (
                    <div key={image.id} className="space-y-2">
                      <p className="text-sm font-medium">{image.type}</p>
                      <div className="aspect-video bg-muted rounded-lg" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}