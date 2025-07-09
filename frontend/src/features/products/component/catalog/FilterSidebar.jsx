import { useState } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ onFilterChange }) {
  const equipos = [
    'Lakers', 'Warriors', 'Bulls', 'Celtics', 'Heat', 'Spurs', 'Nets', 
    '76ers', 'Suns', 'Bucks', 'Mavericks', 'Clippers', 'Nuggets', 'Raptors', 
    'Kings', 'Knicks', 'Pistons', 'Hornets', 'Thunder', 'Hawks', 'Timberwolves',
    'Magic', 'Pacers', 'Pelicans', 'Trail Blazers', 'Jazz', 'Grizzlies', 'Rockets', 
    'Wizards'
  ];

  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleCheckboxChange = (equipo) => {
    const updatedTeams = selectedTeams.includes(equipo)
      ? selectedTeams.filter((team) => team !== equipo) // Si está seleccionado, lo quitamos
      : [...selectedTeams, equipo]; // Si no está seleccionado, lo agregamos

    setSelectedTeams(updatedTeams);
  };

  const handleApplyFilter = () => {
    if (selectedTeams.length === 0) {
      onFilterChange('Todos'); // Si no hay selección, mostrar todos
    } else {
      onFilterChange(selectedTeams);
    }
  };

  const handleResetFilter = () => {
    setSelectedTeams([]); // Limpiar los filtros seleccionados
    onFilterChange('Todos'); // Volver a mostrar todos los productos
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>

      <h4>Equipos:</h4>

      <div className="checkbox-group">
        {equipos.map((equipo) => (
          <div key={equipo} className="checkbox-item">
            <input
              type="checkbox"
              id={equipo}
              value={equipo}
              checked={selectedTeams.includes(equipo)}
              onChange={() => handleCheckboxChange(equipo)}
            />
            <label htmlFor={equipo}>{equipo}</label>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="apply-filter-button" onClick={handleApplyFilter}>
          Aplicar filtro
        </button>
        <button className="reset-filter-button" onClick={handleResetFilter}>
          Restablecer filtro
        </button>
      </div>
    </aside>
  );
}
