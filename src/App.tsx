import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import { getKey, setKey } from './hooks/useApiKey';
import { useState } from 'react';

function SettingsPage() {
  const [apiKey, setApiKey] = useState(getKey() || '');
  const save = () => {
    setKey(apiKey);
    alert('Saved');
  };
  return (
    <div>
      <h2>Settings</h2>
      <input value={apiKey} onChange={e => setApiKey(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
