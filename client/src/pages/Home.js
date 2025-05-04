// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadAndProcessRecipes } from '../utils/recipePreprocessing';
import './Home.css';

// 获取当天日期标识（格式：YYYYMMDD）
const getDayIdentifier = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10).replace(/-/g, '');
};

// 带种子的随机排序（确保同一天排序结果相同）
const seededShuffle = (array, seed) => {
  const shuffled = [...array];
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentDay = getDayIdentifier();
        const cachedData = localStorage.getItem('dailyRecipes');
        let recipesData;

        // 检查缓存是否有效
        if (cachedData) {
          const { day, recipes } = JSON.parse(cachedData);
          if (day === currentDay) {
            recipesData = recipes;
            console.log('Using cached recipes');
          }
        }

        // 需要重新生成数据的情况
        if (!recipesData) {
          const data = await loadAndProcessRecipes();
          const seed = parseInt(currentDay, 10); // 使用日期作为随机种子
          recipesData = seededShuffle(data, seed).slice(0, 20);
          
          // 存储到本地
          localStorage.setItem('dailyRecipes', JSON.stringify({
            day: currentDay,
            recipes: recipesData
          }));
          console.log('Generated new daily recipes');
        }

        setRecipes(recipesData);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 添加日期变更监听（可选）
  useEffect(() => {
    const checkDateChange = () => {
      const currentDay = getDayIdentifier();
      const cachedDay = localStorage.getItem('dailyRecipes')?.day;
      if (cachedDay && cachedDay !== currentDay) {
        localStorage.removeItem('dailyRecipes');
        window.location.reload(); // 可选：自动刷新页面
      }
    };

    // 每分钟检查一次日期变更
    const interval = setInterval(checkDateChange, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 加载状态和渲染逻辑保持不变...
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <main className="main-content">
        <h1>Today Recommendations</h1>
        <div className="recipe-grid">
          {recipes.slice(0, 20).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.imageUrl}
                alt={recipe.Title}
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
                }}
              />
              <h3>{recipe.Title}</h3>
              <div className="ingredients">
                {recipe.Cleaned_Ingredients.slice(0, 3).map((ing, index) => (
                  <span key={index} className="ingredient-tag">{ing}</span>
                ))}
                {recipe.Cleaned_Ingredients.length > 3 && (
                  <span className="ingredient-more">
                    +{recipe.Cleaned_Ingredients.length - 3} more
                  </span>
                )}
              </div>
              <div className="view-recipe-btn">
                <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


export default Home;