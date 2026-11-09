import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'
import { getPet, performAction, type PetAction } from '../api/pets'
import { AnimalIcon } from './AnimalIcon'
import { Header } from './Header'
import { PageDecorations } from './PageDecorations'

const actions: Array<{ type: PetAction; label: string; icon: string }> = [
  { type: 'feed', label: 'Кормить', icon: '🍎' },
  { type: 'pet', label: 'Гладить питомца', icon: '♡' },
  { type: 'treat', label: 'Угощать питомца', icon: '🍪' },
  { type: 'walk', label: 'Гулять с питомцем', icon: '☀' },
  { type: 'ignore', label: 'Игнорировать питомца', icon: '…' },
]

export function PetDetailsPage() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const petQuery = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => getPet(petId ?? ''),
    enabled: Boolean(petId),
  })
  const actionMutation = useMutation({
    mutationFn: (type: PetAction) => performAction(petId ?? '', type),
    onSuccess: (pet) => {
      queryClient.setQueryData(['pet', petId], pet)
      queryClient.invalidateQueries({ queryKey: ['pets'] })
      if (pet.life <= 0 || pet.happiness <= 0) {
        window.alert(`${pet.name} покинул вас. Позаботьтесь о новом питомце!`)
        navigate('/', { replace: true })
      }
    },
  })

  if (petQuery.isPending) {
    return <main className="page-shell"><PageDecorations /><Header /><p className="state-message">Загружаем профиль...</p></main>
  }

  if (petQuery.isError || !petQuery.data) {
    return (
      <main className="page-shell">
        <PageDecorations /><Header />
        <div className="state-message state-message--error" role="alert">
          Не удалось открыть питомца. <Link to="/pets">Вернуться к списку</Link>
        </div>
      </main>
    )
  }

  const pet = petQuery.data
  const extraStats = Object.entries(pet).filter(([key, value]) => (
    !['id', 'name', 'life', 'happiness'].includes(key) && typeof value === 'number'
  ))

  return (
    <main className="page-shell">
      <PageDecorations />
      <Header />
      <section className="pet-layout">
        <div className="pet-profile">
          <Link className="back-link" to="/pets">← Все питомцы</Link>
          <div className="pet-profile__mascot"><AnimalIcon kind="bunny" /></div>
          <h1>{pet.name}</h1>
          <p className="pet-id">ID: {pet.id}</p>
          <div className="stats-panel">
            <Stat label="Жизни" value={pet.life} />
            <Stat label="Счастье" value={pet.happiness} />
            {extraStats.map(([key, value]) => (
              <Stat key={key} label={key === 'hunger' ? 'Голод' : key} value={value as number} />
            ))}
          </div>
        </div>
        <div className="control-panel action-card">
          <div className="card-copy">
            <h2>Панель заботы</h2>
            <p>Выбери действие — сервер сразу обновит статистику питомца.</p>
          </div>
          <div className="actions-list">
            {actions.map((action) => (
              <button
                className="action-button"
                disabled={actionMutation.isPending}
                key={action.type}
                onClick={() => actionMutation.mutate(action.type)}
                type="button"
              >
                <span className="action-button__icon" aria-hidden="true">{action.icon}</span>
                <span>{action.label}</span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          {actionMutation.isError && <p className="validation-message" role="alert">Не удалось выполнить действие. Попробуйте ещё раз.</p>}
          {actionMutation.isPending && <p className="form-message" role="status">Обновляем статистику...</p>}
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  const percentage = Math.max(0, Math.min(100, value))
  return (
    <div className="stat">
      <div className="stat__label"><span>{label}</span><strong>{value}</strong></div>
      <div className="stat__track"><span style={{ width: `${percentage}%` }} /></div>
    </div>
  )
}
