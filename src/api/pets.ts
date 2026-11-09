const API_URL = 'http://localhost:8008/api/v1'

export type Pet = {
  id: string
  name: string
  life: number
  happiness: number
  [key: string]: string | number | null | undefined
}

export type NewPet = {
  name: string
  life: number
}

export type PetAction = 'feed' | 'pet' | 'treat' | 'walk' | 'ignore'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })

  if (!response.ok) {
    let detail = ''
    try {
      detail = await response.text()
    } catch {
      // The status text still gives a useful error when the body is unavailable.
    }
    throw new Error(detail || `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

function normalizePet(value: Record<string, unknown>): Pet {
  const id = String(value.id ?? value._id ?? '')
  return {
    ...value as Pet,
    id,
    name: String(value.name ?? 'Без имени'),
    life: Number(value.life ?? value.health ?? 0),
    happiness: Number(value.happiness ?? 0),
  }
}

function normalizePets(value: unknown): Pet[] {
  const items = Array.isArray(value)
    ? value
    : value && typeof value === 'object' && Array.isArray((value as { pets?: unknown }).pets)
      ? (value as { pets: unknown[] }).pets
      : []

  return items.filter((item): item is Record<string, unknown> => (
    Boolean(item) && typeof item === 'object'
  )).map(normalizePet)
}

export async function listPets() {
  return normalizePets(await request<unknown>('/pets'))
}

export async function getPet(id: string) {
  return normalizePet(await request<Record<string, unknown>>(`/pets/${encodeURIComponent(id)}`))
}

export async function createPet(pet: NewPet) {
  return normalizePet(await request<Record<string, unknown>>('/pets', {
    method: 'POST',
    body: JSON.stringify(pet),
  }))
}

export async function performAction(id: string, type: PetAction) {
  return normalizePet(await request<Record<string, unknown>>(`/pets/${encodeURIComponent(id)}/actions`, {
    method: 'POST',
    body: JSON.stringify({ type }),
  }))
}
