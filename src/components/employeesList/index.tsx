import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface IEmployeesResponse {
  id: number
  name: string
  job: string
  admission_date: string
  phone: string
  image: string
}

interface EmployeesListProps {
  employees: IEmployeesResponse[]
}

export function EmployeesList({ employees }: EmployeesListProps) {
  return (
    <Table>
      <TableHeader className="bg-[#0500FF]">
        <TableRow className="px-2 hover:bg-[#0500FF]">
          <TableHead className="pl-4 first:rounded-tl-lg">FOTO</TableHead>
          <TableHead>NOME</TableHead>
          <TableHead>CARGO</TableHead>
          <TableHead>DATA DE ADMISSÃO</TableHead>
          <TableHead className="last:rounded-tr-lg">TELEFONE</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <TableRow key={employee.id} className="bg-white">
              <TableCell>
                <img
                  src={employee.image}
                  alt={`Funcionário(a) ${employee.name}`}
                  className="size-8 rounded-full ml-2"
                />
              </TableCell>

              <TableCell className="font-normal text-base text-[#1C1C1C]">
                {employee.name}
              </TableCell>

              <TableCell className="font-normal text-base text-[#1C1C1C]">
                {employee.job}
              </TableCell>

              <TableCell className="font-normal text-base text-[#1C1C1C]">
                {new Intl.DateTimeFormat("pt-BR").format(new Date(employee.admission_date))}
              </TableCell>

              <TableCell className="font-normal text-base text-[#1C1C1C]">
                {formatPhoneNumber(employee.phone)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-gray-500">
              Nenhum funcionário encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
