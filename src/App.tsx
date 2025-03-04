import { Search } from "lucide-react"
import { Header } from "./components/header"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { api } from "./services/api"
import { useEffect } from "react"

export function App() {
  async function fetchEmployees() {
    const response = await api.get('/employees')
    console.log(response.data)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

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
              className="outline-none text-gray-700 placeholder-gray-400 bg-transparent w-full"
            />

            <Search className="w-5 h-5 text-gray-400 mr-2" />
          </div>

        </section>

        <section className="mt-8">
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

            <TableBody></TableBody>
          </Table>
        </section>
      </main>
    </>
  )
}