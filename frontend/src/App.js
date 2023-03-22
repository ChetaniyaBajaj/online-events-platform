import './App.css';
import Lobby from './components/Lobby';
import ConferenceHall from './components/ConferenceHall';
import ExhibitionHall from './components/ExhibitionHall';
import AdminControls from './components/AdminControls';
import LobbyForm from './components/LobbyForm';
import ConferenceForm from './components/ConferenceForm';
import ExhibitionForm from './components/ExhibitionForm';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductGalleryRouting from './components/ProductGalleryRouting';
import ZoomMeetsRouting from './components/ZoomMeetsRouting';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import LoginOTP from './components/LoginOTP';
import Wrapper from './components/Wrapper';
import DisplayState from './contexts/DisplayState';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <>
      <DisplayState >
        <Router>
          <Wrapper>
            <Routes>
              <Route path='/' element={<Lobby />} />
              <Route path='conference' element={<ConferenceHall />} />
              <Route path='exhibition' element={<ExhibitionHall />} />
              <Route path='contactus' element={<ContactUs />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgetpassword' element={<ForgetPassword />} />
              <Route path='resetpassword' element={<ResetPassword />} />
              <Route path='loginotp' element={<LoginOTP />} />

              <Route path='admincontrols' element={<AdminControls />} />
              <Route path='admincontrols/lobbyform' element={<LobbyForm />} />
              <Route path='admincontrols/conferenceform' element={<ConferenceForm />} />
              <Route path='admincontrols/exhibitionform' element={<ExhibitionForm />} />

              <Route path="exhibition/:product" element={<ProductGalleryRouting />} />
              <Route path='conference/:room' element={<ZoomMeetsRouting />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </Wrapper>
        </Router>
      </DisplayState>
    </>
  );
}

export default App;
