document.addEventListener('DOMContentLoaded', () => {

    // DEV: REMOVER ESSE TRECHO QUANDO ADICIONAR DADOS REAIS

    function gerarDadosFake(inicio, dias, valorInicial) {
        const dados = [];
        let valor = valorInicial;
        const data = new Date(inicio);
    
        for (let i = 0; i < dias; i++) {
            const timestamp = data.toISOString().split('T')[0] + ' 10:00';
            dados.push([timestamp, Math.round(valor)]);
            valor += (Math.random() - 0.5) * 2;
            data.setDate(data.getDate() + 1);
        }
    
        return dados;
    }
    
    const chartData = {
        abcd123: gerarDadosFake('2020-01-01', 5 * 365, 100),
        abcd3: gerarDadosFake('2020-01-01', 5 * 365, 90),
        ibov: gerarDadosFake('2020-01-01', 5 * 365, 80)
    };

    // DEV: ESSE É O FORMATO CORRETO

    // const chartData = {
    //     abcd123: [
    //          ['2020-01-01 10:00', 10],
    //          ['2020-01-02 10:00', 15],
    //          ['2020-01-03 10:00', 12],
    //     ],
    //     abcd3: [
    //          ['2020-01-01 10:00', 15],
    //          ['2020-01-02 10:00', 22],
    //          ['2020-01-03 10:00', 18],
    //     ],
    //     ibov: [
    //          ['2020-01-01 10:00', 30],
    //          ['2020-01-02 10:00', 40],
    //          ['2020-01-03 10:00', 46],
    //     ]
    // };

    (function stock_chart() {
        const id = 'stockchart';
        generate_chart(id, [], {
            chart: {
                height: 400,
                backgroundColor: '#fff',
                style: { fontFamily: 'sans-serif' },
                events: {
                    load() {
                        const chart = this;
                        const max = chart.xAxis[0].getExtremes().max;
                        const min = max - (1000 * 60 * 60 * 24 * 30);
                        chart.xAxis[0].setExtremes(min, max);
                        document.querySelectorAll('.highcharts-range-selector input').forEach(i => {
                            Object.assign(i.style, {
                                fontSize: '13px',
                                padding: '6px 10px',
                                border: '1px solid #DADEDF',
                                borderRadius: '4px',
                                color: '#000',
                                background: '#fff',
                                boxShadow: 'none',
                                width: '140px',
                                position: 'relative',
                                zIndex: '1'
                            });
                        });
                    }
                }
            },
            rangeSelector: {
                enabled: true,
                selected: 5,
                inputEnabled: true,
                inputBoxBorderColor: '#DADEDF',
                inputBoxWidth: 140,
                inputBoxHeight: 18,
                inputBoxStyle: {
                    color: '#000',
                    fontSize: '13px',
                    fontWeight: 'normal'
                },
                inputDateFormat: '%b %e, %Y',
                inputPosition: { x: 0, y: 0, align: 'right' },
                buttonPosition: { align: 'left' },
                buttons: [
                    { type: 'month', count: 1, text: '1m' },
                    { type: 'month', count: 3, text: '3m' },
                    { type: 'month', count: 6, text: '6m' },
                    { type: 'ytd', text: 'YTD' },
                    { type: 'year', count: 1, text: '1y' },
                    { type: 'all', text: 'All' }
                ],
                labelStyle: {
                    color: '#000',
                    fontWeight: 'normal'
                }
            },
            navigator: {
                enabled: true,
                series: {
                    color: 'rgba(57,85,222,0.8)',
                    lineWidth: 1
                },
                maskFill: 'rgba(57,85,222,0.2)'
            },
            scrollbar: {
                enabled: true,
                barBackgroundColor: '#ccc',
                barBorderRadius: 4,
                trackBackgroundColor: '#eee',
                trackBorderRadius: 4
            },
            yAxis: {
                gridLineColor: '#eee',
                labels: {
                    style: {
                        color: '#999',
                        fontSize: '11px'
                    }
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#999',
                        fontSize: '11px'
                    }
                }
            },
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                itemStyle: {
                    fontSize: '12px',
                    color: '#000'
                }
            },
            series: [
                {
                    name: 'ABCD123',
                    data: chartData.abcd123.map(([t, v]) => [Date.parse(t), v]),
                    color: '#F07E4A',
                    lineWidth: 2,
                    type: 'line'
                },
                {
                    name: 'ABCD3',
                    data: chartData.abcd3.map(([t, v]) => [Date.parse(t), v]),
                    color: '#3955DE',
                    lineWidth: 1,
                    type: 'line'
                },
                {
                    name: 'IBOV',
                    data: chartData.ibov.map(([t, v]) => [Date.parse(t), v]),
                    color: '#444',
                    lineWidth: 1,
                    type: 'line'
                }
            ]
        });

        const getChart = () => Highcharts.charts.find(c => c?.renderTo?.id === 'stockchart');

        document.querySelectorAll(`.js-chart-change-range[data-chart='${id}']`).forEach(btn => {
            btn.addEventListener('click', () => {
                const chart = getChart();
                if (!chart) return;
                const months = +btn.dataset.range;
                const max = chart.xAxis[0].getExtremes().max;
                const min = max - (1000 * 60 * 60 * 24 * 30 * months);
                chart.xAxis[0].setExtremes(min, max);
                btn.parentElement.querySelectorAll(`.js-chart-change-range[data-chart='${id}']`).forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });

        document.querySelectorAll(`.js-chart-change-type[data-chart='${id}']`).forEach(btn => {
            btn.addEventListener('click', () => {
                const chart = getChart();
                if (!chart) return;
                const type = btn.dataset.type;
                chart.series.forEach(s => s.update({ type }));
                btn.parentElement.querySelectorAll(`.js-chart-change-type[data-chart='${id}']`).forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });
    })();

    (function stock_chart_moviment() {
        const id = 'stockchart-movement';
        const container = document.getElementById(id);
        if (!container) return;
    
        const firstKey = Object.keys(chartData)[0];
        const originalData = chartData[firstKey].map(([t, v]) => [new Date(t), v]);
    
        const render = (months) => {
            const now = originalData[originalData.length - 1][0];
            const cutoff = new Date(now);
            cutoff.setMonth(cutoff.getMonth() - months);
    
            const filtered = originalData.filter(([date]) => date >= cutoff);
            if (filtered.length < 2) return;
    
            const totalBars = Math.min(20, filtered.length);
            const itemsPerGroup = Math.max(1, Math.floor(filtered.length / totalBars));
            const groupedData = [];
    
            for (let i = 0; i < totalBars; i++) {
                const start = i * itemsPerGroup;
                const end = start + itemsPerGroup;
                const group = filtered.slice(start, end);
                if (group.length === 0) continue;
                const avg = group.reduce((sum, [, v]) => sum + v, 0) / group.length;
                groupedData.push(avg);
            }
    
            const max = Math.max(...groupedData);
            container.innerHTML = `
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            `;
    
            groupedData.forEach((value, i) => {
                const prev = i > 0 ? groupedData[i - 1] : value;
                const bar = document.createElement('div');
                bar.className = `bar ${value >= prev ? 'up' : 'down'}`;
                bar.style.height = (value / max * 100) + '%';
                bar.dataset.value = value.toFixed(2);
                container.appendChild(bar);
            });
        };
    
        render(1);
    
        document.querySelectorAll(`[data-chart='${id}'].js-chart-change-range`).forEach(btn => {
            btn.addEventListener('click', () => {
                const months = +btn.dataset.range;
                render(months);
                btn.parentElement.querySelectorAll('.js-chart-change-range').forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });
    })();





});
