import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='inner_container'>
      <Sidebar />
        <div id="content">
        <Header />
        <Dashboard />
          {/* <Main /> */}
          <Footer />
        </div>
    </div>
  );
}

export default App;
