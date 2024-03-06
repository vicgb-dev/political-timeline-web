import { Group } from '../../models/group.interface'

export const FakeGroups: Group[] = [
  { id: 1, name: 'PSOE', color: 'red' },
  { id: 2, name: 'PP', color: 'blue' },
  { id: 3, name: 'VOX', color: 'green' },
  { id: 4, name: 'PODEMOS', color: 'purple' },
  { id: 5, name: 'SUMAR', color: 'pink' },
  { id: 5, name: 'JUNTS', color: 'cyan' },
  { id: 5, name: 'ERC', color: 'amber' }
]

export function getColor (name: string): 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'brown' | 'orange' | 'sky' | 'mint' | 'lime' | 'yellow' | 'amber' | 'gold' | 'bronze' | 'gray' {
  if (name === 'tomato') return 'tomato'
  if (name === 'red') return 'red'
  if (name === 'ruby') return 'ruby'
  if (name === 'crimson') return 'crimson'
  if (name === 'pink') return 'pink'
  if (name === 'plum') return 'plum'
  if (name === 'purple') return 'purple'
  if (name === 'violet') return 'violet'
  if (name === 'iris') return 'iris'
  if (name === 'indigo') return 'indigo'
  if (name === 'blue') return 'blue'
  if (name === 'cyan') return 'cyan'
  if (name === 'teal') return 'teal'
  if (name === 'jade') return 'jade'
  if (name === 'green') return 'green'
  if (name === 'grass') return 'grass'
  if (name === 'brown') return 'brown'
  if (name === 'orange') return 'orange'
  if (name === 'sky') return 'sky'
  if (name === 'mint') return 'mint'
  if (name === 'lime') return 'lime'
  if (name === 'yellow') return 'yellow'
  if (name === 'amber') return 'amber'
  if (name === 'gold') return 'gold'
  if (name === 'bronze') return 'bronze'
  if (name === 'gray') return 'gray'
  return 'gray'
}
