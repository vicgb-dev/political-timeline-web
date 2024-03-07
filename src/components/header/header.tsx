import { Link, useRouterState } from '@tanstack/react-router'
import { SearchBar } from '../search/search-bar'
import { SearchBarInfoButton } from '../search/searchbar-info-button'
import { SearchBarUserButton } from '../search/searchbar-user-button'
import { CreateEventButton } from '../buttons/create-event-button'
import './header.css'
import { SearchBarThemeButton } from '../search/searchbar-theme-button'

export function Header () {
  const routerState = useRouterState()
  return (
    <div className='fixed w-full top-0 left-1/2 -translate-x-1/2 flex justify-center p-4 z-10 bg-[color:var(--gray-2)]'>
      <div className='max-w-4xl w-full flex items-center p-3 h-5 gap-5'>
        <Link to='/' className='logo w-20  '>
          <svg width="398" height="160" viewBox="0 0 398 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className='vertical' x="76" width="15" height="146" rx="5"/>
            <rect className='left-event' x="65" width="19" height="65" rx="5" transform="rotate(90 65 0)"/>
            <path className='mobile:hidden' d="M119.359 97.7344V140H112.094V97.7344H119.359ZM111.547 86.5234C111.547 85.3516 111.898 84.362 112.602 83.5547C113.331 82.7474 114.398 82.3438 115.805 82.3438C117.185 82.3438 118.24 82.7474 118.969 83.5547C119.724 84.362 120.102 85.3516 120.102 86.5234C120.102 87.6432 119.724 88.6068 118.969 89.4141C118.24 90.1953 117.185 90.5859 115.805 90.5859C114.398 90.5859 113.331 90.1953 112.602 89.4141C111.898 88.6068 111.547 87.6432 111.547 86.5234ZM143.748 106.133V140H136.483V97.7344H143.358L143.748 106.133ZM142.264 117.266L138.905 117.148C138.931 114.258 139.308 111.589 140.038 109.141C140.767 106.667 141.847 104.518 143.28 102.695C144.712 100.872 146.496 99.4661 148.631 98.4766C150.767 97.4609 153.241 96.9531 156.053 96.9531C158.032 96.9531 159.855 97.2396 161.522 97.8125C163.189 98.3594 164.634 99.2318 165.858 100.43C167.082 101.628 168.032 103.164 168.709 105.039C169.386 106.914 169.725 109.18 169.725 111.836V140H162.498V112.188C162.498 109.974 162.121 108.203 161.366 106.875C160.636 105.547 159.595 104.583 158.241 103.984C156.886 103.359 155.298 103.047 153.475 103.047C151.34 103.047 149.556 103.424 148.123 104.18C146.691 104.935 145.545 105.977 144.686 107.305C143.827 108.633 143.202 110.156 142.811 111.875C142.446 113.568 142.264 115.365 142.264 117.266ZM169.647 113.281L164.803 114.766C164.829 112.448 165.207 110.221 165.936 108.086C166.691 105.951 167.772 104.049 169.178 102.383C170.61 100.716 172.368 99.401 174.452 98.4375C176.535 97.4479 178.918 96.9531 181.6 96.9531C183.866 96.9531 185.871 97.2526 187.616 97.8516C189.386 98.4505 190.871 99.375 192.069 100.625C193.293 101.849 194.217 103.424 194.842 105.352C195.467 107.279 195.78 109.57 195.78 112.227V140H188.514V112.148C188.514 109.779 188.136 107.943 187.381 106.641C186.652 105.312 185.61 104.388 184.256 103.867C182.928 103.32 181.34 103.047 179.491 103.047C177.902 103.047 176.496 103.32 175.272 103.867C174.048 104.414 173.019 105.169 172.186 106.133C171.353 107.07 170.715 108.151 170.272 109.375C169.855 110.599 169.647 111.901 169.647 113.281ZM229.856 140.781C226.914 140.781 224.244 140.286 221.848 139.297C219.479 138.281 217.434 136.862 215.716 135.039C214.023 133.216 212.721 131.055 211.809 128.555C210.898 126.055 210.442 123.32 210.442 120.352V118.711C210.442 115.273 210.95 112.214 211.966 109.531C212.981 106.823 214.361 104.531 216.106 102.656C217.851 100.781 219.83 99.362 222.044 98.3984C224.257 97.4349 226.549 96.9531 228.919 96.9531C231.94 96.9531 234.544 97.474 236.731 98.5156C238.945 99.5573 240.755 101.016 242.161 102.891C243.567 104.74 244.609 106.927 245.286 109.453C245.963 111.953 246.302 114.688 246.302 117.656V120.898H214.739V115H239.075V114.453C238.971 112.578 238.58 110.755 237.903 108.984C237.252 107.214 236.21 105.755 234.778 104.609C233.346 103.464 231.393 102.891 228.919 102.891C227.278 102.891 225.768 103.242 224.387 103.945C223.007 104.622 221.822 105.638 220.833 106.992C219.843 108.346 219.075 110 218.528 111.953C217.981 113.906 217.708 116.159 217.708 118.711V120.352C217.708 122.357 217.981 124.245 218.528 126.016C219.101 127.76 219.921 129.297 220.989 130.625C222.083 131.953 223.398 132.995 224.934 133.75C226.497 134.505 228.268 134.883 230.247 134.883C232.799 134.883 234.96 134.362 236.731 133.32C238.502 132.279 240.052 130.885 241.38 129.141L245.755 132.617C244.843 133.997 243.684 135.312 242.278 136.562C240.872 137.812 239.14 138.828 237.083 139.609C235.052 140.391 232.643 140.781 229.856 140.781ZM268.191 80V140H260.925V80H268.191ZM293.244 97.7344V140H285.978V97.7344H293.244ZM285.431 86.5234C285.431 85.3516 285.783 84.362 286.486 83.5547C287.215 82.7474 288.283 82.3438 289.689 82.3438C291.069 82.3438 292.124 82.7474 292.853 83.5547C293.608 84.362 293.986 85.3516 293.986 86.5234C293.986 87.6432 293.608 88.6068 292.853 89.4141C292.124 90.1953 291.069 90.5859 289.689 90.5859C288.283 90.5859 287.215 90.1953 286.486 89.4141C285.783 88.6068 285.431 87.6432 285.431 86.5234ZM317.672 106.758V140H310.445V97.7344H317.281L317.672 106.758ZM315.953 117.266L312.945 117.148C312.971 114.258 313.401 111.589 314.234 109.141C315.068 106.667 316.24 104.518 317.75 102.695C319.26 100.872 321.057 99.4661 323.141 98.4766C325.25 97.4609 327.581 96.9531 330.133 96.9531C332.216 96.9531 334.091 97.2396 335.758 97.8125C337.424 98.3594 338.844 99.2448 340.016 100.469C341.214 101.693 342.125 103.281 342.75 105.234C343.375 107.161 343.688 109.518 343.688 112.305V140H336.422V112.227C336.422 110.013 336.096 108.242 335.445 106.914C334.794 105.56 333.844 104.583 332.594 103.984C331.344 103.359 329.807 103.047 327.984 103.047C326.188 103.047 324.547 103.424 323.062 104.18C321.604 104.935 320.341 105.977 319.273 107.305C318.232 108.633 317.411 110.156 316.812 111.875C316.24 113.568 315.953 115.365 315.953 117.266ZM377.803 140.781C374.86 140.781 372.191 140.286 369.795 139.297C367.426 138.281 365.381 136.862 363.663 135.039C361.97 133.216 360.668 131.055 359.756 128.555C358.845 126.055 358.389 123.32 358.389 120.352V118.711C358.389 115.273 358.897 112.214 359.913 109.531C360.928 106.823 362.308 104.531 364.053 102.656C365.798 100.781 367.777 99.362 369.991 98.3984C372.204 97.4349 374.496 96.9531 376.866 96.9531C379.886 96.9531 382.491 97.474 384.678 98.5156C386.892 99.5573 388.702 101.016 390.108 102.891C391.514 104.74 392.556 106.927 393.233 109.453C393.91 111.953 394.248 114.688 394.248 117.656V120.898H362.686V115H387.022V114.453C386.918 112.578 386.527 110.755 385.85 108.984C385.199 107.214 384.157 105.755 382.725 104.609C381.293 103.464 379.34 102.891 376.866 102.891C375.225 102.891 373.715 103.242 372.334 103.945C370.954 104.622 369.769 105.638 368.78 106.992C367.79 108.346 367.022 110 366.475 111.953C365.928 113.906 365.655 116.159 365.655 118.711V120.352C365.655 122.357 365.928 124.245 366.475 126.016C367.048 127.76 367.868 129.297 368.936 130.625C370.03 131.953 371.345 132.995 372.881 133.75C374.444 134.505 376.215 134.883 378.194 134.883C380.746 134.883 382.907 134.362 384.678 133.32C386.449 132.279 387.998 130.885 389.327 129.141L393.702 132.617C392.79 133.997 391.631 135.312 390.225 136.562C388.819 137.812 387.087 138.828 385.03 139.609C382.998 140.391 380.59 140.781 377.803 140.781Z"/>
            <rect className='right-event' x="167" y="19" width="19" height="65" rx="5" transform="rotate(90 167 19)"/>
          </svg>
        </Link>
        <SearchBarInfoButton />
        <SearchBar />
        <SearchBarUserButton />
        <SearchBarThemeButton />
        {routerState.location.pathname !== '/my-events' && <CreateEventButton />}
      </div>
    </div>
  )
}
