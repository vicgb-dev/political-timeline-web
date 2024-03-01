import { SearchBar } from '../search/search-bar'
import { SearchBarInfoButton } from '../search/searchbar-info-button'
import { SearchBarUserButton } from '../search/searchbar-user-button'
import './header.css'

export function Header () {
  return (
    <div className='header'>
      <div className='search-bar'>
        <SearchBarInfoButton />
        <SearchBar />
        <SearchBarUserButton />
      </div>
    </div>
  )
}
