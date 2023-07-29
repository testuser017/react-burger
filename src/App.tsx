import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className="appMain pl-5 pr-5">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
