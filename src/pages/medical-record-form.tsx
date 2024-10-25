import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const recordTypes = [
  "Consultation",
  "Treatment",
  "Follow-up Treatment"
]

export default function MedicalRecordForm() {
  const { patientId = '' } = useParams()
  const navigate = useNavigate()
  const [treatmentPoints, setTreatmentPoints] = useState<Array<{
    id: number
    area: string
    units: number
    coordinates: { x: number; y: number }
  }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    navigate(`/patients/${patientId}`)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/patients/${patientId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">New Medical Record</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Record Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {recordTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Input
                    id="provider"
                    value="Dr. T.C.F. Bodewes"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clinical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="complaint">Chief Complaint</Label>
                <Textarea
                  id="complaint"
                  placeholder="Patient's main concern"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Clinical diagnosis"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="notes">Clinical Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Detailed clinical notes"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment Provided</Label>
                <Textarea
                  id="treatment"
                  placeholder="Treatment details"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 block">Medications Used</Label>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="e.g., BOTOX® (Allergan)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genericName">Generic Name</Label>
                        <Input
                          id="genericName"
                          placeholder="e.g., Botulinum Toxin Type A"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          placeholder="e.g., 35 units total"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch Number</Label>
                        <Input
                          id="batch"
                          placeholder="e.g., BTX-2023-456"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aftercare">Aftercare Instructions</Label>
                <Textarea
                  id="aftercare"
                  placeholder="Post-treatment care instructions"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followUp">Follow-up Date</Label>
                <Input
                  id="followUp"
                  type="date"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-[300px] h-[400px] bg-background rounded-lg border flex-shrink-0">
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

                  {treatmentPoints.map((point) => (
                    <div
                      key={point.id}
                      className="absolute w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${point.coordinates.x}%`,
                        top: `${point.coordinates.y}%`
                      }}
                    />
                  ))}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Treatment Area</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Area name (e.g., Forehead)" />
                      <Input type="number" placeholder="Units" min="0" />
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full whitespace-nowrap">
                    Add Treatment Point
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Before Treatment</Label>
                  <Input type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label>After Treatment</Label>
                  <Input type="file" accept="image/*" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/patients/${patientId}`)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Record</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}