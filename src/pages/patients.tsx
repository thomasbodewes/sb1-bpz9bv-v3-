import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpDown, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { differenceInYears, differenceInDays, format } from "date-fns"

const initialPatients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    initials: "J.R.",
    dob: "1995-05-15",
    gender: "Male",
    lastVisit: "2023-10-15",
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Johnson",
    initials: "E.M.",
    dob: "1988-12-03",
    gender: "Female",
    lastVisit: "2023-10-20",
  },
]

export default function Patients() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [deletePatientId, setDeletePatientId] = useState<number | null>(null)
  const [patients, setPatients] = useState(initialPatients)
  const navigate = useNavigate()

  const calculateAge = (dob: string) => {
    return differenceInYears(new Date(), new Date(dob))
  }

  const calculateDaysSinceVisit = (lastVisit: string) => {
    return differenceInDays(new Date(), new Date(lastVisit))
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "dd-MMM-yyyy")
  }

  const sortedPatients = [...patients].sort((a, b) => {
    const compareResult = a.lastName.localeCompare(b.lastName)
    return sortDirection === 'asc' ? compareResult : -compareResult
  })

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const handleDeletePatient = () => {
    if (deletePatientId) {
      setPatients(patients.filter(patient => patient.id !== deletePatientId))
      setDeletePatientId(null)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Patients</h1>
          <Input 
            placeholder="Search patients..." 
            className="max-w-xs"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-2">
                  Patient Name
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={toggleSort}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow
                key={patient.id}
                className="group"
              >
                <TableCell
                  className="cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  {patient.lastName}, {patient.initials} ({patient.firstName})
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div className="space-y-1">
                    <div>{formatDate(patient.dob)}</div>
                    <div className="text-sm text-muted-foreground">
                      {calculateAge(patient.dob)} years
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  {patient.gender}
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  #{String(patient.id).padStart(6, '0')}
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div className="space-y-1">
                    <div>{formatDate(patient.lastVisit)}</div>
                    <div className="text-sm text-muted-foreground">
                      {calculateDaysSinceVisit(patient.lastVisit)} days ago
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                    onClick={() => setDeletePatientId(patient.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0">
            <DialogHeader className="sticky top-0 z-50 bg-background px-6 py-4 border-b mb-4">
              <DialogTitle className="text-xl font-semibold">Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="px-6 pb-6 space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Enter last name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Initials</label>
                  <Input placeholder="E.g., J.R." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input placeholder="Enter full address" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" placeholder="Enter phone number" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deletePatientId !== null} onOpenChange={() => setDeletePatientId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the patient and all associated records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletePatientId(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePatient}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  )
}