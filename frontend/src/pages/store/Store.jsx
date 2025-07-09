import { useState } from 'react';
import NavBar from "../../shared/component/layouts/NavBar";
import FilterSidebar from '../../features/products/component/catalog/FilterSidebar';
import ProductList from '../../features/products/component/catalog/ProductList';
import './Store.css';

export default function Store() {
  const [selectedTeam, setSelectedTeam] = useState('Todos');

  return (
    <>
      <div className="body-content">      
        <div className="store-page">
          <FilterSidebar onFilterChange={setSelectedTeam} />
          <ProductList selectedTeam={selectedTeam} />
        </div>
      </div>
      
    </>
  );
}
