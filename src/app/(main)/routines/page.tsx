import { WeekProvider } from './context'
import RoutinesTable from './components/RoutinesTable'
import WeekSelectCalendar from './components/WeekSelectCalendar'
import RoutineManager from './components/RoutineManager'
import { getRoutines } from './actions'

const RoutinesPage = async () => {
  const routinesData = await getRoutines()

  return (
    <WeekProvider>
      <div className="grid grid-cols-[2fr_1fr] gap-md">
        <section>
          <WeekSelectCalendar />
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
