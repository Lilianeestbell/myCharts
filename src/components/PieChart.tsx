import React, { FC, useMemo, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import { calcPercentage, COMMON_SERIES, IOverviewChartProps, OverviewFunction } from './config';

const Wrapper = styled.div`
  width: 186px;
  height: 186px;
`;

const PieWrapper = styled.div`
  width: 286px;
  height: 286px;
  background-color: pink;
`;

export const OverviewPieChart: FC<IOverviewChartProps> = ({
    total,
}) => {
    const pieChartRef = useRef<ReactEcharts>(null);
    const option = useMemo(() => OverviewFunction({ total }), [total]);
    return (
        <Wrapper>
            <ReactEcharts
                style={{ height: '186px' }}
                ref={pieChartRef}
                option={option}
                notMerge
                lazyUpdate
            />
        </Wrapper>
    );
};

export type IProportionChartProps = {
    total: number;
    oneItem: number;
    color: string;
};

export const proportionFunction = ({ total, oneItem, color }: IProportionChartProps) => ({
    title: {
        show: true,
        text: calcPercentage(oneItem, total),
        x: 'center',
        y: 'center',
        top: '28',
        textStyle: {
            fontSize: 21,
            fontWeight: 700,
            lineHeight: 34,
            color: '#263238',
        },
    },
    series: [
        {
            ...COMMON_SERIES,
            name: 'total',
            type: 'pie',
            radius: ['80%', '100%'],
            emphasis: {
                label: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        color: '#333',
                        fontWeight: 'bold',
                    },
                },
            },
            data: [
                {
                    value: total,
                    name: 'Impression',
                    itemStyle: {
                        color: '#54A0FF',
                        emphasis: {
                            color: '#54A0FF',
                        },
                    },
                }, {
                    value: oneItem,
                    name: 'Comment',
                    itemStyle: {
                        color,
                        emphasis: {
                            color,
                        },
                    },
                },
            ],
        },
    ],
});

export const ProportionPieChart: FC<IProportionChartProps> = ({
    total,
    oneItem,
    color,
}) => {
    const pieChartRef = useRef<ReactEcharts>(null);
    const option = useMemo(() => proportionFunction({ total, oneItem, color }), [color, oneItem, total]);
    return (
        <PieWrapper>
            <ReactEcharts
                style={{ height: '100px'}}
                ref={pieChartRef}
                option={option}
                notMerge
                lazyUpdate
            />
        </PieWrapper>
    );
};
