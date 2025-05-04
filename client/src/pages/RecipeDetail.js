// src/pages/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams }           from 'react-router-dom';
import Papa                    from 'papaparse';
import { preprocessRecipes }   from '../utils/recipePreprocessing.js';  
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [likes, setLikes]   = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

// 处理图片路径
const getImagePath = (imageName) => {
  const basePath = `${process.env.PUBLIC_URL}/food-images/`;
  const extensions = ['.jpg', '.png', '.jpeg'];
  for (let ext of extensions) {
    if (imageName.toLowerCase().endsWith(ext)) return basePath + imageName;
  }
  return basePath + imageName + '.jpg';
};

  useEffect(() => {
    Papa.parse(`${process.env.PUBLIC_URL}/dataset/recipes.csv`, {
      download: true,
      header: true,
      complete: ({ data }) => {
        // 先统一预处理
        const processed = preprocessRecipes(data);
        // 根据 id（字符串）查找
        const found = processed.find(r => r.id === recipeId);
        if (found) {
          setRecipe(found);
          setLikes(found.likes);
        } else {
          setError('Recipe not found');
        }
        setLoading(false);
      },
      error: () => {
        setError('Failed to load recipes');
        setLoading(false);
      }
    });
  }, [recipeId]);

  if (loading) return <div className="recipe-detail-container">Loading...</div>;
  if (error)   return <div className="recipe-detail-container">{error}</div>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-card">
      <img
          src={getImagePath(recipe.Image_Name)}
          alt={recipe.Title}
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
        }}
      />
        <h1 className="detail-title">{recipe.Title}</h1>

        <div className="detail-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.Cleaned_Ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.Formatted_Instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="like-section">
          <button
            onClick={() => {
              if (!hasLiked) {
                setLikes(l => l + 1);
                setHasLiked(true);
              }
            }}
            className={`like-btn ${hasLiked ? 'liked' : ''}`}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
