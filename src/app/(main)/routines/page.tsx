import { WeekProvider } from './context'
import RoutinesTable from './components/RoutinesTable'
import WeekSelectCalendar from './components/WeekSelectCalendar'
import RoutineManager from './components/RoutineManager'

const RoutinesPage = () => {
  return (
    <WeekProvider>
      <div className="grid grid-cols-[2fr_1fr] gap-md">
        <section>
          <WeekSelectCalendar />
          <RoutinesTable />
        </section>
        <aside>
          <RoutineManager />
        </aside>
      </div>
    </WeekProvider>
  )
}

export default RoutinesPage
