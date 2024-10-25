import { useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Calendar, FileText, Trash2 } from 'lucide-react'
import { format, differenceInYears } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data - replace with actual data fetching
const patientData = {
  id: 1,
  firstName: "John",
  lastName: "Smith",
  initials: "J.R.",
  dob: "1995-05-15",
  gender: "Male",
  email: "john.smith@email.com",
  phone: "+1 234 567 890",
  address: "123 Main St, City, Country",
  medicalRecords: [
    {
      id: 1,
      date: "2023-10-15",
      type: "Initial Consultation",
      provider: "Dr. T.C.F. Bodewes",
      complaint: "Facial lines and wrinkles",
      diagnosis: "Dynamic wrinkles in forehead and glabella",
      treatment: "Botox injection - 20 units forehead, 15 units glabella",
      notes: "Patient tolerated procedure well"
    },
    {
      id: 2,
      date: "2023-07-15",
      type: "Follow-up",
      provider: "Dr. T.C.F. Bodewes",
      complaint: "Maintenance treatment",
      diagnosis: "Mild recurrence of dynamic wrinkles",
      treatment: "Botox touch-up - 15 units total",
      notes: "Good response to previous treatment"
    }
  ],
  appointments: [
    {
      date: "2023-11-15",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Scheduled"
    },
    {
      date: "2023-10-15",
      time: "2:00 PM",
      type: "Treatment",
      status: "Completed"
    }
  ],
  consentForm: {
    signed: false,
    signedDate: null
  }
}

export default function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null)
  const [records, setRecords] = useState(patientData.medicalRecords)

  const calculateAge = (dob: string) => {
    return differenceInYears(new Date(), new Date(dob))
  }

  const handleDeleteRecord = () => {
    if (deleteRecordId) {
      setRecords(records.filter(record => record.id !== deleteRecordId))
      setDeleteRecordId(null)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/patients')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {patientData.lastName}, {patientData.initials} ({patientData.firstName})
          </h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consent" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Consent Form
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Details</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                >
                  {isEditingPersonal ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {isEditingPersonal ? (
                    <>
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                          defaultValue={`${patientData.lastName}, ${patientData.initials} (${patientData.firstName})`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input 
                          type="date" 
                          defaultValue={patientData.dob}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Input 
                          defaultValue={patientData.gender}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input 
                          defaultValue={patientData.phone}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          type="email"
                          defaultValue={patientData.email}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input 
                          defaultValue={patientData.address}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="text-sm font-medium">
                          {patientData.lastName}, {patientData.initials} ({patientData.firstName})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="text-sm font-medium">
                          {format(new Date(patientData.dob), "dd MMM yyyy")} ({calculateAge(patientData.dob)} years)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="text-sm font-medium">{patientData.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{patientData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{patientData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="text-sm font-medium">{patientData.address}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Medical Records</h2>
              <Button onClick={() => navigate(`/patients/${id}/records/new`)}>Add Record</Button>
            </div>

            <div className="space-y-4">
              {records.map((record) => (
                <Card 
                  key={record.id}
                  className="group relative"
                >
                  <div 
                    className="absolute right-4 top-14 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteRecordId(record.id)
                    }}
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => navigate(`/patients/${patientData.id}/records/${record.id}`)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {record.type}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(record.date), "dd MMM yyyy")}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Provider</p>
                          <p className="text-sm">{record.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Treatment</p>
                          <p className="text-sm">{record.treatment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Consent Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Botulinum Toxin Treatment Agreement</h3>
                  
                  <p className="mb-4">
                    Botulinum toxin is a preparation that can reduce muscle activity through injection. 
                    Dynamic wrinkles can be caused by voluntary or involuntary contraction of certain muscles. 
                    The cosmetic goal of botulinum toxin treatment is cosmetic improvement through muscle 
                    relaxation, reducing dynamic wrinkles and improving facial features. Treatment takes place 
                    in one or two sessions, with results visible within a few days to 2 weeks and usually lasting 
                    3 to 4 months. After this period, the effect is completely broken down by the body and the 
                    muscle has recovered from the temporary relaxation.
                  </p>

                  <h4 className="font-semibold mt-6 mb-2">Normal Side Effects:</h4>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Minimal bleeding at injection site</li>
                    <li>Local redness of the skin</li>
                    <li>Local swelling of the skin</li>
                    <li>Bruising at injection site</li>
                  </ul>

                  <p className="mb-4">
                    These symptoms usually disappear within one to several days (bruising may last longer). 
                    Temporary headache or grip-like symptoms may occasionally occur. In exceptional cases, 
                    an adjacent muscle may be weakened by the injected botulinum toxin.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="consent" className="h-4 w-4" />
                      <Label htmlFor="consent" className="text-sm">
                        I hereby give consent for botulinum toxin treatment and agree to the associated costs.
                      </Label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter location" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signature">Digital Signature</Label>
                      <div className="border rounded-md h-32 bg-muted/20"></div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Sign and Submit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Appointments</h2>
              <Button>Schedule Appointment</Button>
            </div>
            {patientData.appointments.map((appointment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{appointment.type}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="text-sm">
                        {format(new Date(appointment.date), "dd MMM yyyy")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-sm">{appointment.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteRecordId !== null} onOpenChange={() => setDeleteRecordId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the medical record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteRecordId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRecord}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  )
}