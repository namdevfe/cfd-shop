import React from "react";

const BlogCategories = ({ categories, onCateFilterChange }) => {
  const _onCateChange = (e, cateId) => {
    e?.preventDefault();
    onCateFilterChange?.(cateId);
  };
  return (
    <div className="widget widget-cats">
      <h3 className="widget-title">Categories</h3>
      <ul>
        {categories?.length > 0 &&
          categories.map((category, index) => {
            return (
              <li key={category.id || index}>
                <a href="#" onClick={(e) => _onCateChange(e, category.id)}>
                  {category.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogCategories;
