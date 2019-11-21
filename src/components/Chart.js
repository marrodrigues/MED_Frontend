import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import styled from 'styled-components';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/component/legend';
/*
See: Import ECharts.js modules manually to reduce bundle size
https://github.com/hustcc/echarts-for-react
*/
const Charts = ({
    styles,
    ...props
}) => (
    <StyledReactEcharts
        styles={styles}
        echarts={echarts}
        {...props}
    />
);
const StyledReactEcharts = styled(ReactEchartsCore)`
 ${({ styles }) => styles && { ...styles }};
`;
export default Charts;