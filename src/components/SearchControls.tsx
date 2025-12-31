type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
};

export default function SearchControls({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
}: Props) {
  return (
    <div className="search-controls-container">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar misión por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      {/* Selector de ordenación */}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="desc">Más recientes primero</option>
        <option value="asc">Más antiguos primero</option>
      </select>
    </div>
  );
}