const bgBarColor = 'lightgray';
// Geotarget uses this constant as segment in all_historic_data for selected segment
const SEGMENT_CPA = 'Segment CPA';
const defaultSegmentColor = 'gray';
const formatLabel = (label, shouldAbbreviateLabels) => {
    if (!shouldAbbreviateLabels) {
        return label;
    }
    return (label.length > 7
        ? `${label.substring(0, 6)}...`
        : label
    );
};
const getBgBarSize = (data) => {
    const maxValue = Math.max(...data);
    const magnitude = Math.floor(Math.log10(maxValue));
    const powerOfTen = 10 ** magnitude;
    return powerOfTen * Math.ceil(maxValue / powerOfTen);
};
const getOptionsForComparativeChart = (dataSet, dataSet2) => {
    const data = dataSet.map(item => item.receita);
    const data2 = dataSet2.map(item => item.receita);
    const shouldAbbreviateLabels = dataSet.length > 5;
    const xLabels = dataSet.map(item => formatLabel(item.nome, shouldAbbreviateLabels));
    // const isSegmentSelected = segment => (
    //     segment === formatLabel(customData.segment, shouldAbbreviateLabels) || segment === SEGMENT_CPA);
    // const getColorByBidAdjustment = () => (customData.bid_adjustment > 0
    //     ? selectedSegmentColor.INCREASE
    //     : selectedSegmentColor.DECREASE);
    const getLabelColor = label => defaultSegmentColor
    const getBarColor = ({ name }) => {
        return defaultSegmentColor;
    };
    const bgBarSize = getBgBarSize(data);
    const bgBarWidth = 60 - ((7 - dataSet.length) * 7);
    return {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            top: '10%',
            right: '3%',
            bottom: '5%',
            containLabel: true,
        },
        xAxis: [{
            name: 'segments',
            type: 'category',
            axisTick: {
                show: true,
            },
            axisLine: {
                lineStyle: {
                    color: 'gray',
                },
            },
            axisLabel: {
                textStyle: {
                    color: getLabelColor,
                    fontSize: 12,
                },
            },
            data: xLabels,
        }, {
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitArea: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            data: [],
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'gray',
                },
            },
            axisLabel: {
                show: false,
            },
        },
        series: [{
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: {
                color: bgBarColor,
                // barBorderRadius: 50,
                borderWidth: 0,
            },
            emphasis: {
                itemStyle: {
                    color: bgBarColor,
                    barBorderRadius: 50,
                    borderWidth: 0,
                },
            },
            z: 1,
            barWidth: '5%',
            data: Array(data.length).fill(bgBarSize),
        }, {
            showTooltips: false,
            type: 'bar',
            itemStyle: {
                show: true,
                color: getBarColor,
                borderWidth: 0,
            },
            z: 2,
            label: {
                show: true,
            },
            barWidth: `${bgBarWidth}%`,
            data,
        }],
    };
};
export { getOptionsForComparativeChart };