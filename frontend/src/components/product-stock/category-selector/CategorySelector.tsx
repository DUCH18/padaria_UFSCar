import { IconButton } from "../../buttons/IconButton";
import { Category } from "../../../types/types";

type CategorySelectorProps = {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategorySelector = ({
  categories,
  selectedCategory,
  setSelectedCategory
}: CategorySelectorProps) => {
  return (
    <div className='flex flex-col gap-3 items-center'>
      <h3 className='font-pacifico text-orange self-start text-center w-full'>
        Categoria: {selectedCategory}
      </h3>
      <div className='flex items-center gap-4 sm:gap-10 justify-center w-full'>
        {categories.map((category) => (
          <IconButton
            key={category.name}
            type="button"
            onClick={() => setSelectedCategory(category.name)}
            highlighted={selectedCategory === category.name}
          >
            {category.icon}
          </IconButton>
        ))}
      </div>
    </div>
  )
}