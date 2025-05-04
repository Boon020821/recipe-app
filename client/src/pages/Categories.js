// src/pages/Categories.js
import React, { useState, useEffect, useMemo, useCallback  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadAndProcessRecipes } from '../utils/recipePreprocessing';
import Pagination from '../components/Pagination';
import './Categories.css';

const CATEGORIES = [
  {
    name: "Meat",
    subcategories: ["Pork", "Beef", "Chicken", "Lamb", "Fish", "Processed Meat"]
  },
  {
    name: "Vegetables",
    subcategories: ["Bok Choy", "Carrot", "Potato", "Cucumber", "Pumpkin", "Tomato", "Shiitake", "Enoki", "Egg"]
  },
  {
    name: "Staples",
    subcategories: ["Rice", "Noodles", "Bread"]
  },
  {
    name: "Seafood",
    subcategories: ["Shrimp", "Crab", "Shellfish", "Squid"]
  },
  {
    name: "Others",
    subcategories: ["Juice", "Dessert"]
  }
];

const INGREDIENT_ALIASES = {
  "Noodles": ["noodles", "spaghetti", "pasta", "ramen"],
  "Pork": ["pork", "pork belly", "ham"],
  "Tomato": ["tomato", "cherry tomato", "tomatoes"]
};


const filterRecipes = (recipes, selectedSubcategories, searchKeyword) => {
  return recipes.filter(recipe => {
    // 类别匹配逻辑
    const categoryMatch = selectedSubcategories.length === 0 || 
      selectedSubcategories.every(sub => {
        const keywords = [sub, ...(INGREDIENT_ALIASES[sub] || [])];
        return recipe.Cleaned_Ingredients.some(ingredient =>
          keywords.some(kw => 
            ingredient.toLowerCase().includes(kw.toLowerCase())
          )
        );
      });

    // 关键词匹配逻辑
    const keywordMatch = !searchKeyword ||
      recipe.Title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      recipe.Cleaned_Ingredients.join(' ').toLowerCase().includes(searchKeyword.toLowerCase());

    return categoryMatch && keywordMatch;
  });
};

const Categories = () => {
  const location = useLocation();
    // 从 localStorage 初始化状态
  const [selectedSubcategories, setSelectedSubcategories] = useState(() => {
    const saved = localStorage.getItem('categoriesState');
    return saved ? JSON.parse(saved).selectedSubcategories : [];
  });

  const [searchKeyword, setSearchKeyword] = useState(() => {
    const saved = localStorage.getItem('categoriesState');
    return saved ? JSON.parse(saved).searchKeyword : '';
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('categoriesState');
    return saved ? JSON.parse(saved).currentPage : 1;
  });

  const [showResults, setShowResults] = useState(() => {
    const saved = localStorage.getItem('categoriesState');
    // 只在有有效筛选条件时才初始化为true
    return saved && (JSON.parse(saved).selectedSubcategories.length > 0 || JSON.parse(saved).searchKeyword)
      ? true
      : false;
  });

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const RECIPES_PER_PAGE = 40;

  // 加载食谱数据
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await loadAndProcessRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Failure to load recipes:', error);
        alert('Failed to load recipes data');
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  // 计算匹配数量
  const matchCount = useMemo(() => {
    const hasFilters = selectedSubcategories.length > 0 || searchKeyword.trim();
    return hasFilters 
      ? filterRecipes(recipes, selectedSubcategories, searchKeyword).length
      : 0;
  }, [selectedSubcategories, searchKeyword, recipes]);

  // 应用筛选条件
  const applyFilters = useCallback(() => {
    if (!recipes.length) return;
  
    // 检查有效筛选条件
    const hasValidFilters = selectedSubcategories.length > 0 || searchKeyword.trim().length > 2;
    
    if (!hasValidFilters) {
      setShowResults(false);
      alert('Please select at least 1 category or enter at least 3 characters for search');
      return;
    }
  
    // 执行筛选逻辑
    const filtered = filterRecipes(recipes, selectedSubcategories, searchKeyword);
    setFilteredRecipes(filtered);
    setCurrentPage(1);
    setShowResults(true);
  
    // 保存完整状态
    localStorage.setItem('categoriesState', JSON.stringify({
      selectedSubcategories,
      searchKeyword,
      currentPage: 1,
      showResults: true,
      filteredCount: filtered.length // 新增过滤结果数量存储
    }));
  }, [recipes, selectedSubcategories, searchKeyword]);
  

  // 修改重置功能清除本地存储
  const resetFilters = () => {
    setSelectedSubcategories([]);
    setSearchKeyword('');
    setFilteredRecipes([]);
    setShowResults(false);
    setCurrentPage(1);
    localStorage.removeItem('categoriesState');
  };

  // 监听路由变化时重新验证数据
  useEffect(() => {
    if (showResults && filteredRecipes.length === 0) {
      applyFilters();
    }
  }, [location.key, showResults, filteredRecipes, applyFilters]);

  useEffect(() => {
    const savedState = localStorage.getItem('categoriesState');
    if (savedState) {
      const { filteredCount } = JSON.parse(savedState);
      if (filteredCount === 0) {
        setShowResults(false);
      }
    }
  }, []);
  
  // 增强的筛选验证
  useEffect(() => {
    if (showResults && filteredRecipes.length === 0) {
      setShowResults(false);
      localStorage.removeItem('categoriesState');
    }
  }, [filteredRecipes, showResults]);

  useEffect(() => {
    if (showResults && recipes.length) {
      const filtered = filterRecipes(recipes, selectedSubcategories, searchKeyword);
      setFilteredRecipes(filtered);
    }
  }, [recipes, showResults, selectedSubcategories, searchKeyword]);
  
  useEffect(() => {
    const stateToSave = {
      selectedSubcategories,
      searchKeyword,
      currentPage,
      showResults
    };
    localStorage.setItem('categoriesState', JSON.stringify(stateToSave));
  }, [selectedSubcategories, searchKeyword, currentPage, showResults]);


  // 分页计算
  const indexOfLast = currentPage * RECIPES_PER_PAGE;
  const indexOfFirst = indexOfLast - RECIPES_PER_PAGE;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading ... </p>
      </div>
    );
  }

  return (
    <div className="categories-container">
      {!showResults ? (
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search recipe..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="category-table-container">
            <table className="category-table">
              <tbody>
                {CATEGORIES.map((category) => (
                  <tr key={category.name}>
                    <td className="category-header">{category.name}</td>
                    {category.subcategories.map((sub) => (
                      <td key={sub}>
                        <button
                          className={`subcategory-btn ${
                            selectedSubcategories.includes(sub) ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedSubcategories(prev =>
                            prev.includes(sub)
                              ? prev.filter(item => item !== sub)
                              : [...prev, sub]
                          )}
                        >
                          {sub}
                        </button>
                      </td>
                    ))}
                    {Array.from({ length: 8 - category.subcategories.length }).map((_, i) => (
                      <td key={`empty-${i}`}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="action-buttons">
            <button
              className="filter-btn"
              onClick={applyFilters}
              disabled={!matchCount}
            >
              Filter ({matchCount})
            </button>
            <button
              className="reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              Found {filteredRecipes.length} recipes
              {filteredRecipes.length === 0 && <span> 🥺 Please try another conditions</span>}
            </h2>
            <button
              className="modify-btn"
              onClick={() => setShowResults(false)}
            >
              Modify filters
            </button>
          </div>

          <div className="recipe-grid-4x10">
            {currentRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.Title}
                  className="recipe-image"
                  onError={(e) => {
                    e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
                  }}
                />
                <div className="recipe-info">
                  <h3>{recipe.Title}</h3>
                  <div className="ingredients">
                    {recipe.Cleaned_Ingredients.slice(0, 3).map((ing, j) => (
                      <span key={j} className="ingredient-tag">{ing}</span>
                    ))}
                    {recipe.Cleaned_Ingredients.length > 3 && (
                      <span className="ingredient-more">
                        +{recipe.Cleaned_Ingredients.length - 3} More
                      </span>
                    )}
                  </div>
                  <div className="view-recipe-btn">
                    <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                      View Recipe Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;