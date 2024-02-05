import React from "react";

const Tag = ({ tags }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Browse Tags</h3>
      <div className="tagcloud">
        {tags?.map((tag, index) => (
          <a key={tag.id || index} href="#">
            {tag.name || ""}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tag;
