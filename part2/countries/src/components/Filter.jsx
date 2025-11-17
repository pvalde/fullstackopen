const Filter = ({ query, onChange }) => {
  return (
    <div>
      find countries {""}
      <input value={query} onChange={onChange} />
    </div>
  );
};

export default Filter;
