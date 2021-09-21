export const calcPercentage = (molecule: number, denominator: number) => {
    if (molecule === 0 || denominator === 0) return '0.00%';
    return `${((molecule / denominator) * 100).toFixed(2)}%`;
};

export const labelStyleConfig = {
    color: '#979797',
    fontFamily: 'GT-Walsheim',
    fontSize: 12,
    lineHeight: 14,
};

export type IPostLineProps = {
    name: string;
    total: number;
    id: string;
};

export interface IPostLineOption {
    chartData: IPostLineProps[];
    color?: string;
}

export const postLineOption = ({
    chartData,
    color,
}: IPostLineOption) => {
    const xLine = chartData.map(item => ({ xAxis: item.name })) || [];
    const xData = chartData.map(item => item.name) || [];
    const yData = chartData.map(item => item.total) || [];
    return {
        color: [color || '#FFA800'],
        tooltip: {
            trigger: 'axis',
            formatter: '{b0}: {c0}',
            backgroundColor: '#4F4F4F',
            padding: 6,
            extraCssText: 'box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);',
            textStyle: {
                fontFamily: 'GT-Walsheim',
                color: '#fff',
                fontSize: 12,
            },
            axisPointer: {
                type: 'shadow', // hover到某个柱子的时候需要阴影 ？shadow  ： line
                z: -1,
                shadowStyle: {
                    color: 'rgba(247, 247, 249, 1)',
                },
            },
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                nameTextStyle: {
                    ellipsis: '...',
                },
                axisTick: {
                    alignWithLabel: true,
                    show: false,
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    showMaxLabel: true,
                    textStyle: labelStyleConfig,
                },
                axisLine: {
                    lineStyle: {
                        color: '#CFD8DC',
                    },
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: labelStyleConfig,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dotted',
                        color: '#CFD8DC',
                        width: 1,
                    },
                },
            },
        ],
        series: [
            {
                zlevel: 1,
                name: '直接访问',
                type: 'bar',
                barWidth: '40px',
                data: yData || [],
                itemStyle: {
                    emphasis: {
                        color,
                    },
                },
                markLine: { // 每个柱子的中轴线
                    symbol: 'none',
                    label: { show: false },
                    silent: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#CFD8DC',
                    },
                    data: xLine,
                },
            },
        ],
    };
};

export const COMMON_SERIES = {
    scale: false,
    legendHoverLink: false,
    hoverAnimation: false, // 鼠标移动的时候(hover)是否有 放大 效果
    avoidLabelOverlap: false, // 需要强制所有标签放在中心位置，可以将该值设为 false
    label: {
        show: false,
        formatter: () => '',
    }, // 鼠标移动的时候会是否出现标签
    labelLine: {
        show: false,
    },  // 鼠标移动的时候会是否出现标签的那根线
};

export type IOverviewChartProps = {
    total: number;
};
export const OverviewFunction = ({ total }: IOverviewChartProps) => ({
    title: {
        show: true,
        text: total,
        x: 'center',
        y: 'center',
        top: '50',
        textStyle: {
            fontSize: 34,
            fontWeight: 'bold',
            lineHeight: 50,
            color: '#263238',
        },
        subtext: 'IMPRESSION',
        subtextStyle: {
            fontSize: '12',
            color: '#263238',
            fontWeight: 'bold',
        },
    },
    series: [
        {
            ...COMMON_SERIES,
            name: 'total',
            type: 'pie',
            radius: ['84%', '100%'],
            emphasis: {
                label: {
                    show: true,
                    textStyle: {
                        fontSize: '40',
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
                },
            ],
        },
    ],
});
