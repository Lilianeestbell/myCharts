import React, { FC, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import { IPostLineOption, postLineOption } from './config';

const ChartWrapper = styled.div<{width: number; height: number; top: number}>`
  width: ${(props:any) => props.width || 186}px;
  height: ${(props:any) => props.height || 186}px;
  margin-top: ${(props:any) => props.top}px;
`;

interface IPostChartProps extends IPostLineOption {
  width?: number,
  height?: number,
  top?: number,
  getData?: (data: any, type: string) => void;
}

const PostLineChart: FC<IPostChartProps> = ({
  width = 612,
  height = 288,
  top = 40,
  color,
  chartData,
  // getData, 导出可能会用到
}) => {
  const optionRef = useMemo(() => postLineOption({ chartData, color }), [chartData, color]);
  console.log('optionRef: ', optionRef);
  return (
    <ChartWrapper width={width} height={height} top={top}>
      <ReactEcharts
        option={optionRef}
        style={{ height }}
      />
    </ChartWrapper>
  );
};
export default PostLineChart;
