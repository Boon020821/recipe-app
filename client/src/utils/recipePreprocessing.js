// src/utils/recipePreprocessing.js
import Papa from 'papaparse';

// 图片路径处理
export const getImagePath = (imageName) => {
  const basePath = `${process.env.PUBLIC_URL}/food-images/`;
  const extensions = ['.jpg', '.png', '.jpeg'];
  
  // 处理空值情况
  if (!imageName) return `${basePath}placeholder.jpg`;
  
  // 检查已有扩展名
  const hasExtension = extensions.some(ext => 
    imageName.toLowerCase().endsWith(ext)
  );
  
  return hasExtension 
    ? `${basePath}${imageName}`
    : `${basePath}${imageName}.jpg`;
};

// 主数据加载函数
export const loadAndProcessRecipes = async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      Papa.parse(`${process.env.PUBLIC_URL}/dataset/recipes.csv`, {
        download: true,
        header: true,
        complete: resolve,
        error: reject
      });
    });

    return preprocessRecipes(response.data);
  } catch (error) {
    console.error('Error loading recipes:', error);
    throw error;
  }
};

// 数据预处理核心逻辑
export const preprocessRecipes = (rawRecipes) => {
  return rawRecipes
    .filter(r => validateRecipe(r))
    .map(r => createRecipeObject(r));
};

// 验证食谱有效性
const validateRecipe = (recipe) => {
  return [
    'recipeId',
    'Title',
    'Ingredients',
    'Instructions',
    'Image_Name'
  ].every(field => recipe[field]?.trim());
};

// 创建标准食谱对象
const createRecipeObject = (recipe) => ({
  id: recipe.recipeId.toString(),
  Title: recipe.Title.trim(),
  Image_Name: recipe.Image_Name.trim(),
  imageUrl: getImagePath(recipe.Image_Name), // 预生成图片URL
  Cleaned_Ingredients: processIngredients(recipe.Ingredients),
  Formatted_Instructions: processInstructions(recipe.Instructions),
  likes: parseInt(recipe.Likes, 10) || 0
});

// 食材处理
const processIngredients = (str) => 
  str
    .replace(/[[\]'"]/g, '') // 合并正则表达式
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

// 步骤处理
const processInstructions = (str = '') => {
  return String(str)
    // 智能分割步骤（处理有编号和无编号两种情况）
    .split(/(?<=\.)\s+(?=[A-Z])/g) // 匹配句号后接大写字母的情况
    .map((stepBlock, index) => {
      // 清理步骤内容
      let cleanedStep = stepBlock
        .replace(/^\d+\.\s*/, '')   // 清理残留编号（如果有）
        .trim();

      // 确保句号结尾
      if (!cleanedStep.endsWith('.') && cleanedStep.length > 0) {
        cleanedStep += '.';
      }
      return cleanedStep;
    })
    .filter(step => step.length > 0);
};
