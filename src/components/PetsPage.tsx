import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { listPets } from '../api/pets'
import { AnimalIcon } from './AnimalIcon'
import { Header } from './Header'
import { PageDecorations } from './PageDecorations'

export function PetsPage() {
  const petsQuery = useQuery({ queryKey: ['pets'], queryFn: listPets })

  return (
    <main className="page-shell">
      <PageDecorations />
      <Header />
      <section className="content-layout">
        <div className="section-heading">
          <Link className="back-link" to="/">← На главную</Link>
          <h1>Твои <em>питомцы</em></h1>
          <p className="hero-description">Выбери друга, чтобы открыть его профиль и позаботиться о нём.</p>
        </div>

        {petsQuery.isPending && <p className="state-message">Загружаем питомцев...</p>}
        {petsQuery.isError && (
          <p className="state-message state-message--error" role="alert">
            Не удалось загрузить список. Проверь, что сервер запущен на localhost:8008.
          </p>
        )}
        {petsQuery.isSuccess && petsQuery.data.length === 0 && (
          <div className="empty-state action-card">
            <div className="card-icon card-icon--sparkle"><AnimalIcon kind="cat" /></div>
            <h2>Питомцев пока нет</h2>
            <p>Создай первого друга, чтобы начать вашу историю.</p>
            <Link className="primary-button" to="/create">Создать питомца <span className="button-arrow">↗</span></Link>
          </div>
        )}
        {petsQuery.isSuccess && petsQuery.data.length > 0 && (
          <div className="pets-grid">
            {petsQuery.data.map((pet) => (
              <Link className="pet-card" to={`/pets/${pet.id}`} key={pet.id}>
                <div className="pet-card__icon"><AnimalIcon kind="bunny" /></div>
                <div className="pet-card__body">
                  <h2>{pet.name}</h2>
                  <p>ID: {pet.id}</p>
                  <div className="pet-stats">
                    <span>Жизни <strong>{pet.life}</strong></span>
                    <span>Счастье <strong>{pet.happiness}</strong></span>
                    <span>Голод <strong>{pet.hunger ?? 0}</strong></span>
                  </div>
                </div>
                <span className="pet-card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
