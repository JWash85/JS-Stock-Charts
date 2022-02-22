async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //const response = await fetch('https://api.twelvedata.com/time_series?symbol=AA,STM,AAL,TSLA&interval=1min&apikey=cbcc60ef17c44df49978806716f2f149');
    //const result = await response.json();
    //console.log(result)

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    //const { AA, STM, AAL, TSLA } = mockData;
    //const stocks = [AA, STM, AAL, TSLA];
    //console.log(mockData);
    //console.log(stocks[0].values)   
    
    //**reversed the order of the chart, orginally in descending order now in ascending order */

    stocks.forEach(stock => stock.values.reverse())

    //**.map used to turn an array of stock objects, provided by the API into an array of dattaset objects that can be understood by CanvasJS */
    //**meta is a tag used in the mockData.js file */
    //**parseFloat converts from string to number*/

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });


    /*new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  _,
                borderColor: _,
            }))
        }
    });*/
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    /*new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            
            labels: stocks[0].values.map(value => value.datetime),
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor:  'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'
            }]
        }
    });*/

    //**Original chart with hard coded values for the data object */
    /*new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor:  'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                
            }],
            
        }
    });*/

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                //data: getPrice(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    //Math.max(...stocks.values.high)
    //let highPrice = 
    //parseFloat(stock.values.map(value => value.high))

   /* function highPrice(value){
        for(let i=0; i<value.lenght; i++){
            if(value === "values")
            return 'high'
        }
    }*/

    function getPrice(stock){
        if(stock === "GME"){
            return stock.values.map(value => parseFloat(value.high))
        }
        if(stock === "MSFT"){
            return stock.values.map(value => parseFloat(value.high))
        }
        if(stock === "DIS"){
            return stock.values.map(value => parseFloat(value.high))
        }
        if(stock === "BNTX"){
            return stock.values.map(value => parseFloat(value.high))
        }
    }


}

main()