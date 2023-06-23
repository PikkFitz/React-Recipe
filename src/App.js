import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';

const App = () => {

  const [mealsData, setMealsData] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputSearch)
      .then((res) => setMealsData(res.data.meals))
      .catch((error) => console.error("Erreur lors de l'appel à l'API :", error));
  }, [inputSearch])  // /!\ NE PAS OUBLIER LES [] POUR QUE LE USEEFFECT NE SOIT APPELE QU'UNE FOIS (A L'APPEL DU COMPOSANT) /!\
  // Sinon, dans notre cas, cela génère des requetes à l'api à l'infini et finit par déclancher une erreur !
  // Ou l'utiliser comme callback (comme ici), pour rappelé inputSearch à chaque fois qu'il y a un changement dans la barre de recherche (dans inputSearch)

  return (
    <div className="app-container">
      <h1>React-Recipe</h1>
      <input
        type="text"
        placeholder="Tapez le nom d'un aliment (en anglais)"
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <div className="meals-container">
        {mealsData &&  // Si mealsData === true (si il existe et contient quelque chose), alors on lance le slice et le map
          mealsData
            .slice(0, 24)  // Limite les résultats de recherche (min : 0 et max : 24)
            .map((meal) => (
              <Card key={meal.idMeal} meal={meal} />  // On donne un nom (meal) pour la props et pouvoir la récupérer dans le composant Card.js 
            ))}
      </div>
    </div>
  );
};

export default App;