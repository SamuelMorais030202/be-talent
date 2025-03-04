import { Search } from "lucide-react"
import { Header } from "./components/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { api } from "./services/api"
import { useEffect, useState } from "react"
import { formatPhoneNumber } from "./utils/formatPhoneNumber"

interface IEmployeesResponse {
  id: 1
  name: string
  job: string
  admission_date: string
  phone: string
  image: string
}

export function App() {
  const [employees, setEmploees] = useState<IEmployeesResponse[] | null>(null)
  const [search, setSearch] = useState("");

  async function fetchEmployees() {
    const response = await api.get('/employees')
    setEmploees(response.data)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
    || employee.job.toLowerCase().includes(search.toLowerCase())
    || employee.phone.includes(search)
  );

  return (
    <>
      <Header />

      <main className="w-11/12 mx-auto mt-8">
        <section className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-[#1C1C1C]">Funcionários</h1>

          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="outline-none text-gray-700 placeholder-gray-400 bg-transparent w-full"
            />

            <Search className="w-5 h-5 text-gray-400 mr-2" />
          </div>

        </section>

        <section className="mt-8 mb-6">
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
              {filteredEmployees && filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
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
        </section>
      </main>
    </>
  )
}