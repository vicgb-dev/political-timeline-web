import { Group } from '../../models/group.interface'

export const FakeGroups: Group[] = [
  {
    id: 1,
    name: '',
    acronym: 'PSOE',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'red',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 2,
    name: '',
    acronym: 'PP',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'blue',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 3,
    name: '',
    acronym: 'VOX',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'green',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 4,
    name: '',
    acronym: 'PODEMOS',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'purple',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 5,
    name: '',
    acronym: 'SUMAR',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'pink',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 5,
    name: '',
    acronym: 'JUNTS',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'cyan',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 5,
    name: '',
    acronym: 'ERC',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'amber',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 6,
    name: '',
    acronym: 'PACMA',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'grass',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  },
  {
    id: 7,
    name: '',
    acronym: 'BNG',
    current_boss: 1,
    creation_date: new Date(),
    founder: 1,
    url: '',
    logo: '',
    color: 'sky',
    id_political_party: 1,
    id_group_type: 1,
    article: ''
  }
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
