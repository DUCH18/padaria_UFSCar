import { SearchInput } from '../inputs/SearchInput';
import { CategorySelector } from './category-selector/CategorySelector';
import { ProductList } from './product-list/ProductList';
import useProductStock from '../../hooks/useProductStock';

export const ProductStock = () =>  {
  const {
    loading,
    filteredProducts,
    handleSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useProductStock();

  return (
    <div className='pb-4 h-screen'>
      <h2 className='font-pacifico text-orange text-center py-4 h-[13%]'>
        Estoque
      </h2>
      <div className="max-w-[600px] mx-auto mb-6">
        <SearchInput handleSearch={handleSearch} />
      </div>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className='flex flex-col items-center gap-2 mt-4'>
        <p><i>Toque no produto para ver mais detalhes</i></p>
        <hr className='w-[95%] border-2 border-orange mb-3' />
      </div>
      <ProductList
        loading={loading}
        products={filteredProducts}
        categories={categories}
      />
    </div>
  );
}
