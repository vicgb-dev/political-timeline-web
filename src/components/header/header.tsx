import { Search } from '../search/search'
import { SearchBarInfoButton } from '../search/searchbar-info-button'
import { SearchBarUserButton } from '../search/searchbar-user-button'
import './header.css'

export function Header () {
  return (
    <div className='header'>
      <div className='search-bar'>
        <SearchBarInfoButton />
        <Search />
        <SearchBarUserButton />
      </div>
    </div>
  )
}
