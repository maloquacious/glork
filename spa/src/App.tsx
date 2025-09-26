import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Overview from '@/pages/Overview'
import Outline from '@/pages/Outline'
import Characters from '@/pages/Characters'
import Scenes from '@/pages/Scenes'
import Snowflake from '@/pages/Snowflake'
import Projects from '@/pages/Projects'
import Wireframe from '@/pages/Wireframe'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/wireframe" replace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/overview" element={<Overview />} />
        <Route path="/projects/:id/outline" element={<Outline />} />
        <Route path="/projects/:id/characters" element={<Characters />} />
        <Route path="/projects/:id/scenes" element={<Scenes />} />
        <Route path="/projects/:id/snowflake" element={<Snowflake />} />
        <Route path="*" element={<div className="p-6">Not Found</div>} />
        <Route path="/wireframe" element={<Wireframe />} />
      </Routes>
    </Layout>
  )
}
