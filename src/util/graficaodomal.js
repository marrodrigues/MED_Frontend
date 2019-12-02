const bgBarColor = 'lightgray';
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
const getBgBarSize = (data, data2) => {
    const maxValue = Math.max(...data, ...data2);
    const magnitude = Math.floor(Math.log10(maxValue));
    const powerOfTen = 10 ** magnitude;
    return powerOfTen * Math.ceil(maxValue / powerOfTen);
};
const getOptionsForComparativeChart = (dataSet, dataSet2 = []) => {
    let source = []
    if (dataSet.length) {
        source.push(['product', 'Período 1'])
        dataSet.forEach(product => source.push([product.nome, product.receita]))
    }
    if (dataSet2.length) {
        source[0].push('Período 2')
        for (let i = 0; i < dataSet2.length; i++) {
            source[i + 1].push(dataSet2[i].receita)
        }
    }
    const series = Array(dataSet.length ? dataSet2.length ? 2 : 1 : 0).fill({type: 'bar', label: {show: true }})
    // const data = dataSet.map(item => item.receita);
    // const data2 = dataSet2.map(item => item.receita);
    // const shouldAbbreviateLabels = dataSet.length > 5;
    // const xLabels = dataSet.map(item => formatLabel(item.nome, shouldAbbreviateLabels));
    // const isSegmentSelected = segment => (
    //     segment === formatLabel(customData.segment, shouldAbbreviateLabels) || segment === SEGMENT_CPA);
    // const getColorByBidAdjustment = () => (customData.bid_adjustment > 0
    //     ? selectedSegmentColor.INCREASE
    //     : selectedSegmentColor.DECREASE);
    // const getLabelColor = label => defaultSegmentColor
    // const getBarColor = ({ name }) => {
    //     return defaultSegmentColor;
    // };
    // const bgBarSize = getBgBarSize(data, data2);
    // const bgBarWidth = 60 - ((7 - dataSet.length) * 7);
    console.log(series, source)
    return {
        grid: {
            left: '3%',
            top: '10%',
            right: '3%',
            bottom: '5%',
            containLabel: true,
        },
        legend: {},
        tooltip: {},
        dataset: {
            source
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series,
    };
    // return {
    //     backgroundColor: 'transparent',
    //     grid: {
    //         left: '3%',
    //         top: '10%',
    //         right: '3%',
    //         bottom: '5%',
    //         containLabel: true,
    //     },
    //     xAxis: [{
    //         name: 'segments',
    //         type: 'category',
    //         axisTick: {
    //             show: true,
    //         },
    //         axisLine: {
    //             lineStyle: {
    //                 color: 'gray',
    //             },
    //         },
    //         axisLabel: {
    //             textStyle: {
    //                 color: getLabelColor,
    //                 fontSize: 12,
    //             },
    //         },
    //         data: xLabels,
    //     }, {
    //         name: 'v1',
    //         type: 'category',
    //         axisLine: {
    //             show: false,
    //         },
    //         axisTick: {
    //             show: false,
    //         },
    //         axisLabel: {
    //             show: false,
    //         },
    //         splitArea: {
    //             show: false,
    //         },
    //         splitLine: {
    //             show: false,
    //         },
    //         data: [],
    //     }, {
    //         name: 'v2',
    //         type: 'category',
    //         axisLine: {
    //             show: false,
    //         },
    //         axisTick: {
    //             show: false,
    //         },
    //         axisLabel: {
    //             show: false,
    //         },
    //         splitArea: {
    //             show: false,
    //         },
    //         splitLine: {
    //             show: false,
    //         },
    //         data: [],
    //     }],
    //     yAxis: {
    //         type: 'value',
    //         axisTick: {
    //             show: false,
    //         },
    //         axisLine: {
    //             show: false,
    //         },
    //         splitLine: {
    //             lineStyle: {
    //                 color: 'gray',
    //             },
    //         },
    //         axisLabel: {
    //             show: false,
    //         },
    //     },
    //     series: [{
    //         type: 'bar',
    //         xAxisIndex: 1,
    //         itemStyle: {
    //             color: 'transparent',
    //             // barBorderRadius: 50,
    //             borderWidth: 0,
    //         },
    //         emphasis: {
    //             itemStyle: {
    //                 color: bgBarColor,
    //                 barBorderRadius: 50,
    //                 borderWidth: 0,
    //             },
    //         },
    //         z: 1,
    //         barWidth: '5%',
    //         data: Array(data.length).fill(bgBarSize),
    //     }, {
    //         showTooltips: false,
    //         type: 'bar',
    //         itemStyle: {
    //             show: true,
    //             color: 'yellow',
    //             borderWidth: 0,
    //         },
    //         z: 2,
    //         label: {
    //             show: true,
    //         },
    //         barWidth: `${bgBarWidth}%`,
    //         data,
    //     }, {
    //         showTooltips: false,
    //         type: 'bar',
    //         itemStyle: {
    //             show: true,
    //             color: 'red',
    //             borderWidth: 0,
    //         },
    //         emphasis: {
    //             itemStyle: {
    //                 color: 'rgba(0,0, 255, 0.7)',
    //                 barBorderRadius: 50,
    //                 borderWidth: 0,
    //             },
    //         },
    //         z: 3,
    //         label: {
    //             show: true,
    //         },
    //         barWidth: `${bgBarWidth*2}%`,
    //         data2,
    //     }],
    // };
};
export { getOptionsForComparativeChart };