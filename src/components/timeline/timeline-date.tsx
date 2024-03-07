import { Text } from '@radix-ui/themes'
import './timeline-date.css'

export interface TimelineDateProps {
  date: Date
}

export function TimelineDate({ date }: TimelineDateProps) {
  function getMonth(month: number): string {
    switch (month) {
      case 0:
        return 'Enero'
      case 1:
        return 'Febrero'
      case 2:
        return 'Marzo'
      case 3:
        return 'Abril'
      case 4:
        return 'Mayo'
      case 5:
        return 'Junio'
      case 6:
        return 'Julio'
      case 7:
        return 'Agosto'
      case 8:
        return 'Septiembre'
      case 9:
        return 'Octubre'
      case 10:
        return 'Noviembre'
      case 11:
        return 'Diciembre'
      default:
        return ''
    }
  }

  function getYear(year: number): string {
    if ((new Date()).getFullYear() === year) return ''

    return year.toString() + ' - '
  }

  return (
    <div className="timeline-date">
      <Text
        as="p"
        size="2"
        weight="medium"
        style={{ color: 'white', marginLeft: '-5px' }} >
        {getYear(new Date(date).getFullYear())}{getMonth(new Date(date).getMonth())}
      </Text>
      <div className="line"></div>
    </div>
  )
}
