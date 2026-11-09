import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { createPet } from '../api/pets'
import { AnimalIcon } from './AnimalIcon'
import { Header } from './Header'
import { PageDecorations } from './PageDecorations'

export function CreatePetPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [life, setLife] = useState('')
  const [formError, setFormError] = useState('')
  const [message, setMessage] = useState('')
  const createPetMutation = useMutation({ mutationFn: createPet })

  const handleCreate = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const lifeValue = Number(life)

    if (!trimmedName) {
      setFormError('Имя питомца не может быть пустым')
      setMessage('')
      return
    }

    if (!life || !Number.isFinite(lifeValue) || lifeValue <= 0) {
      setFormError('Здоровье должно быть больше 0')
      setMessage('')
      return
    }

    setFormError('')
    setMessage('Отправляем данные...')
    createPetMutation.mutate(
      { name: trimmedName, life: lifeValue },
      {
        onSuccess: (pet) => navigate(`/pets/${pet.id}`),
        onError: (error) => setMessage(error instanceof Error ? error.message : 'Не удалось создать питомца.'),
      },
    )
  }

  return (
    <main className="page-shell page-shell--create">
      <PageDecorations />
      <Header />
      <section className="create-layout">
        <div className="create-intro">
          <button className="back-link" type="button" onClick={() => navigate('/')}>
            <span aria-hidden="true">←</span> Назад
          </button>
          <div className="create-mascot"><AnimalIcon kind="cat" /></div>
          <h1>Давай познакомимся<br /><em>с твоим питомцем</em></h1>
          <p className="hero-description">
            Дай ему имя и немного сил для первого приключения.
          </p>
        </div>

        <form className="create-form action-card" onSubmit={handleCreate} noValidate>
          <div className="card-copy">
            <h2>Кто появится в твоей истории?</h2>
          </div>
          <div className="field-group">
            <label htmlFor="pet-name">Имя питомца</label>
            <input
              id="pet-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Например, Пушинка"
              aria-invalid={Boolean(formError && !name.trim())}
            />
          </div>
          <div className="field-group">
            <label htmlFor="pet-life">Начальное здоровье</label>
            <input
              id="pet-life"
              type="number"
              min="1"
              step="1"
              value={life}
              onChange={(event) => setLife(event.target.value)}
              placeholder="Например, 100"
              aria-invalid={Boolean(formError && (!life || Number(life) <= 0))}
            />
          </div>
          {formError && <p className="validation-message" role="alert">{formError}</p>}
          {message && <p className="form-message create-message" role="status">{message}</p>}
          <button className="primary-button" type="submit" disabled={createPetMutation.isPending}>
            <span>{createPetMutation.isPending ? 'Отправляем...' : 'Познакомить нас'}</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
    </main>
  )
}
