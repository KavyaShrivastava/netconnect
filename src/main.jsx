import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div className="text-white overflow-scroll bg-black bg-cover bg-no-repeat focus:outline-none" style={{ backgroundImage: "url('/.jpg')"}}>
    <App />
    </div>
);

