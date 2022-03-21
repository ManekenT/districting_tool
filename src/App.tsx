import './App.css';
import { Header } from './components/Header';
import { Step } from './components/Step';

function App() {
  return <>
    <Header />
    <Step state="finished" />
    <Step state="finished" />
    <Step state="error" />
    <Step state="todo" />
  </>
}

export default App;
