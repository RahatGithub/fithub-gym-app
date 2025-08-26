// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Plans from './pages/Plans';
import Goals from './pages/Goals';
import Addons from './pages/Addons';
import Summary from './pages/Summary';
import Quotation from './pages/Quotation';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="plans" element={<Plans />} />
              <Route path="goals" element={<Goals />} />
              <Route path="addons" element={<Addons />} />
              <Route path="summary" element={<Summary />} />
              <Route path="quotation" element={<Quotation />} />
              <Route path="register" element={<Register />} />
              <Route path="payment" element={<Payment />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;