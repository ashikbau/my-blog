
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import { router } from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <Header></Header>
     <ToastContainer></ToastContainer>
     <Toaster />
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
