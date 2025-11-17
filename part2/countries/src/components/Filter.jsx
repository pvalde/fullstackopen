const Filter = ({ query, onChange }) => {
  return (
    <div id="filter">
      find countries {""}
      <input value={query} onChange={onChange} />
    </div>
  );
};

export default Filter;
