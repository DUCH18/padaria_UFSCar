import { CiSearch } from "react-icons/ci"

type SearchInputProps = {
  handleSearch: (search: string) => void
}

export const SearchInput = ({ handleSearch }: SearchInputProps) => {
  return (
    <span className='mx-4 flex gap-2 border border-black rounded-md px-4 py-3 bg-white mb-6 h-[6%]'>
      <input
        type="text"
        placeholder='Pesquisar por nome'
        className='w-full outline-none'
        onChange={(e) => handleSearch(e.target.value)}
      />
      <CiSearch className='text-2xl' />
    </span>
  )
}
