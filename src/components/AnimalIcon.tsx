type AnimalIconProps = {
  kind: 'fox' | 'cat' | 'bunny'
}

export function AnimalIcon({ kind }: AnimalIconProps) {
  if (kind === 'fox') {
    return (
      <svg className="animal-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M13 25 17 9l13 9a19 19 0 0 1 4 0l13-9 4 16v14c0 10-8 17-18 17S13 49 13 39V25Z" fill="currentColor" />
        <path d="m17 11 3 13 9-6M47 11l-3 13-9-6" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d="M23 34c2-4 5-6 9-6s7 2 9 6v7c-3 4-6 6-9 6s-6-2-9-6v-7Z" fill="#fff1c7" />
        <circle cx="26" cy="31" r="2.5" fill="#51364f" />
        <circle cx="38" cy="31" r="2.5" fill="#51364f" />
        <path d="m30 38 2 2 2-2M32 40v3" stroke="#51364f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'cat') {
    return (
      <svg className="animal-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 27 16 10l14 10a19 19 0 0 1 4 0L48 10l2 17v10c0 10-8 17-18 17S14 47 14 37V27Z" fill="currentColor" />
        <path d="m17 13 2 12 10-6M47 13l-2 12-10-6" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 35c2-3 5-5 8-5s6 2 8 5v5c-2 4-5 6-8 6s-6-2-8-6v-5Z" fill="#fff4cf" />
        <circle cx="26" cy="32" r="2.5" fill="#51364f" />
        <circle cx="38" cy="32" r="2.5" fill="#51364f" />
        <path d="m30 39 2 2 2-2M32 41v2M22 38l-6-2M42 38l6-2" stroke="#51364f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg className="animal-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M22 24c-7-10-5-19 0-19s8 8 9 17c1-9 4-17 9-17s7 9 1 19c7 4 9 10 9 16 0 11-8 18-18 18S14 51 14 40c0-6 2-12 8-16Z" fill="currentColor" />
      <path d="M22 8c2 4 3 8 3 13M42 8c-2 4-3 8-3 13" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="25" cy="34" r="2.5" fill="#51364f" />
      <circle cx="39" cy="34" r="2.5" fill="#51364f" />
      <path d="M29 41c2-2 4-2 6 0M32 41v3" stroke="#51364f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
