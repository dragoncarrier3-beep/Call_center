import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { AgentWorkspace } from './pages/AgentWorkspace';
import { SupervisorWallboard } from './pages/SupervisorWallboard';
import { AdminConsole } from './pages/AdminConsole';
import { CallHistoryPage } from './pages/CallHistory';
import { AnalyticsPage } from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/agent" element={<AgentWorkspace />} />
          <Route path="/supervisor" element={<SupervisorWallboard />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/calls" element={<CallHistoryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
