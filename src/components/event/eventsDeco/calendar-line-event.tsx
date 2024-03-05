import { CalendarIcon } from '@radix-ui/react-icons'
import { ALIGN } from '../../../constants/enums'
import '../event.css'

interface CalendarLineEventProps{
    align: ALIGN,
    oneColumn: boolean
}

export function CalendarLineEvent ({ props }:{props : CalendarLineEventProps}) {
  return (
    <>
      <div className={`line
      ${props.oneColumn
      ? 'one-column-line'
      : 'two-column-line'} 
      ${props.align === ALIGN.LEFT
      ? 'line-left'
      : 'line-right'}`}></div>

      <CalendarIcon
        style={{ color: 'black' }}
        className={`calendar-icon 
      ${props.align === ALIGN.LEFT
      ? 'calendar-icon-left'
      : 'calendar-icon-right'}`}
      />
    </>
  )
}
