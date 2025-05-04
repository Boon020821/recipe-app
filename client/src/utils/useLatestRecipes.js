// src/utils/useLatestRecipes.js
import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { preprocessRecipes } from './recipePreprocessing';

const getDailyKey = () => {
  const today = new Date();
  return `recipes_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
};

const useLatestRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState(null);

  const loadRecipes = useCallback(async (forceUpdate = false) => {
    const storageKey = getDailyKey();
    
    try {
      setIsLoading(true);
      setError(null);

      // 检查有效缓存
      if (!forceUpdate) {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
          const { recipes, timestamp } = JSON.parse(storedData);
          if (recipes?.length > 0) {
            setRecipes(recipes);
            setLastUpdated(new Date(timestamp).toLocaleString());
            return { recipes, isCached: true };
          }
        }
      }

      // 加载新数据
      const result = await new Promise((resolve, reject) => {
        Papa.parse(`${process.env.PUBLIC_URL}/dataset/recipes.csv`, {
          download: true,
          header: true,
          complete: resolve,
          error: reject
        });
      });

      const processed = preprocessRecipes(result.data);
      const shuffled = [...processed].sort(() => 0.5 - Math.random());
      const timestamp = Date.now();

      localStorage.setItem(storageKey, JSON.stringify({
        recipes: shuffled,
        timestamp
      }));

      setRecipes(shuffled);
      setLastUpdated(new Date(timestamp).toLocaleString());
      return { recipes: shuffled, isCached: false };

    } catch (err) {
      console.error('Recipe loading error:', err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    recipes,
    isLoading,
    lastUpdated,
    error,
    refreshRecipes: () => loadRecipes(true)
  };
};

export default useLatestRecipes;