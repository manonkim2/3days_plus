import { WeekProvider } from './context'
import { getRoutines } from './actions'
import RoutinesTable from './components/RoutinesTable'
import WeekSelectCalendar from './components/WeekSelectCalendar'
import RoutineManager from './components/RoutineManager'
import Chart from './components/Chart'

const RoutinesPage = async () => {
  const routinesData = await getRoutines()

  return (
    <WeekProvider>
      <div className="grid grid-cols-[2fr_1fr] gap-md">
        <section className="flex flex-col gap-md">
          <div className="flex gap-sm">
            <WeekSelectCalendar />
            <Chart />
          </div>
          <RoutinesTable routinesData={routinesData} />
        </section>
        <aside>
          <RoutineManager routinesData={routinesData} />
        </aside>
      </div>
    </WeekProvider>
  )
}

export default RoutinesPage
