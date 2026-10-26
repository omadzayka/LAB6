// Controlled input: value and onChange are owned by the parent (App).
function FilterForm({ filter, onFilterChange }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="title-filter">Filter by title: </label>
      <input
        id="title-filter"
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Type to filter..."
      />
    </form>
  );
}

export default FilterForm;
