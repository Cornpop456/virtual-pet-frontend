import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { CreatePetPage } from './components/CreatePetPage'
import { HomePage } from './components/HomePage'
import { PetDetailsPage } from './components/PetDetailsPage'
import { PetsPage } from './components/PetsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePetPage />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/pets/:petId" element={<PetDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
