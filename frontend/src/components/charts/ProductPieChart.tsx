import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ProductChartProps } from '../../types/types';

const COLORS = ['#F89226', '#F9AB57', '#FBC489', '#FDDCBA'];

export const ProductPieChart = ({ productChartData }: ProductChartProps) => {
  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          data={productChartData}
          innerRadius={60}
          outerRadius={110}
          paddingAngle={0}
          dataKey="qtd_vendida"
        >
          {productChartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div>
        {productChartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 mb-2">
            <div
              className="w-[25px] h-[25px] border border-black"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <p className='w-full text-start'>
              {item.name}{' '}
              <span className="font-bold">- {item.qtd_vendida}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
