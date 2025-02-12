import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { TiThSmallOutline } from 'react-icons/ti';
import { MdOutlineBakeryDining } from 'react-icons/md';

export const CATEGORIES = [
  {
    name: 'Todos',
    icon: <TiThSmallOutline />,
  },
  {
    name: 'Pães',
    icon: <PiBreadFill />,
  },
  {
    name: 'Doces',
    icon: <RiCake3Line />,
  },
  {
    name: 'Salgados',
    icon: <MdOutlineBakeryDining />,
  },
]