import { Link } from 'react-router'
import { AnimalIcon } from './AnimalIcon'

export function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/" aria-label="Виртуальный питомец — на главную">
        <span className="brand-mark"><AnimalIcon kind="fox" /></span>
        <span>Виртуальный питомец</span>
      </Link>
    </header>
  )
}
