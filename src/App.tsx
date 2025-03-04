import { Search } from "lucide-react"
import { Header } from "./components/header"
import { api } from "./services/api"
import { useEffect, useState } from "react"
import { EmployeesList } from "./components/employeesList"
import { IEmployee } from "./types/employee"

export function App() {
  const [employees, setEmploees] = useState<IEmployee[] | null>(null)
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
        <section className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-xl font-medium text-[#1C1C1C]">Funcionários</h1>

          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm h-12 w-full md:w-72">
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
          <EmployeesList employees={filteredEmployees ?? []} />
        </section>
      </main>
    </>
  )
}