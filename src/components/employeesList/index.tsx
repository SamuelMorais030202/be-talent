import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IEmployee } from "@/types/employee";

interface EmployeesListProps {
  employees: IEmployee[];
}

export function EmployeesList({ employees }: EmployeesListProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-[#0500FF] hidden md:table-header-group">
          <TableRow className="px-2 hover:bg-[#0500FF]">
            <TableHead className="pl-4 first:rounded-tl-lg">FOTO</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>CARGO</TableHead>
            <TableHead>DATA DE ADMISSÃO</TableHead>
            <TableHead className="last:rounded-tr-lg">TELEFONE</TableHead>
          </TableRow>
        </TableHeader>

        <TableHeader className="bg-[#0500FF] md:hidden">
          <TableRow className="hover:bg-[#0500FF]">
            <TableHead className="pl-4 first:rounded-tl-lg">FOTO</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead className="flex items-center justify-end last:rounded-tr-lg">
              <div className="size-2 bg-white rounded-full mr-2" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <>
                <TableRow key={employee.id} className="bg-white md:table-row">
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

                  <TableCell className="hidden md:table-cell font-normal text-base text-[#1C1C1C]">
                    {employee.job}
                  </TableCell>

                  <TableCell className="hidden md:table-cell font-normal text-base text-[#1C1C1C]">
                    {new Intl.DateTimeFormat("pt-BR").format(new Date(employee.admission_date))}
                  </TableCell>

                  <TableCell className="hidden md:table-cell font-normal text-base text-[#1C1C1C]">
                    {formatPhoneNumber(employee.phone)}
                  </TableCell>
                  
                  <TableCell className="md:hidden text-right">
                    <button onClick={() => toggleRow(employee.id)} className="mr-1">
                      {expandedRows.includes(employee.id) ? <ChevronUp size={18} className="text-blue-500" /> : <ChevronDown size={18} className="text-blue-500" />}
                    </button>
                  </TableCell>
                </TableRow>

                {expandedRows.includes(employee.id) && (
                  <TableRow className="md:hidden bg-white hover:bg-white">
                    <TableCell colSpan={3} className="p-4">
                      <p className="text-sm text-gray-700"><strong>Cargo:</strong> {employee.job}</p>
                      <p className="text-sm text-gray-700"><strong>Data de Admissão:</strong> {new Intl.DateTimeFormat("pt-BR").format(new Date(employee.admission_date))}</p>
                      <p className="text-sm text-gray-700"><strong>Telefone:</strong> {formatPhoneNumber(employee.phone)}</p>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
    </div>
  );
}
