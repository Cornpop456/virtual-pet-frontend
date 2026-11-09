import { Link } from 'react-router'
import { AnimalIcon } from './AnimalIcon'
import { Header } from './Header'
import { PageDecorations } from './PageDecorations'

export function HomePage() {
  return (
    <main className="page-shell">
      <PageDecorations />
      <Header />
      <section className="hero">
        <div className="moon" aria-hidden="true">
          <span className="moon-crater moon-crater--one" />
          <span className="moon-crater moon-crater--two" />
          <span className="moon-crater moon-crater--three" />
        </div>
        <h1>Время найти<br /><em>своего питомца</em></h1>
        <p className="hero-description">
          Создай верного друга или позови того, кто уже ждёт тебя.
        </p>
      </section>

      <section className="action-grid" aria-label="Действия с питомцем">
        <article className="action-card action-card--create">
          <div className="card-icon card-icon--sparkle"><AnimalIcon kind="cat" /></div>
          <div className="card-copy">
            <h2>Создать питомца</h2>
            <p>Придумай нового друга и начни вашу общую историю.</p>
          </div>
          <Link className="primary-button" to="/create">
            <span>Создать нового</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </Link>
        </article>

        <article className="action-card action-card--summon">
          <div className="card-icon card-icon--paw"><AnimalIcon kind="bunny" /></div>
          <div className="card-copy">
            <h2>Мои питомцы</h2>
            <p>Открой список друзей, посмотри их характеристики и выбери, с кем провести время.</p>
          </div>
          <Link className="primary-button primary-button--lavender" to="/pets">
            <span>Открыть список</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>
    </main>
  )
}
