const Checkbox = ({ id, label, ...restProps }) => {
  return (
    <div className="filter-item">
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          {...restProps}
        />
        {label && (
          <label className="custom-control-label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
