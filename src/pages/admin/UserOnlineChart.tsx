import ReactApexChart from 'react-apexcharts';

const UserOnlineChart = () => {
    const series = [44, 55];
    const options = {
        chart: {
            type: 'donut',
            height: 550, 
        },
        labels: ['offline', 'online'], 
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}

export default UserOnlineChart;