const apiUrl = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency';
let currencyList = document.querySelectorAll(".currency-list");
let listItems = document.querySelectorAll(".currency-list li");
const fromCurrencySelect = document.getElementById('from');
const toCurrencySelect = document.getElementById('to');
const fromAmountInput = document.getElementById('amountFrom');
const toAmountInput = document.getElementById('result');
const fromCurrencyList = document.querySelectorAll("#from li");
const toCurrencyList = document.querySelectorAll("#to li");
const exchangeRateElement = document.querySelector('.exchange-rate');
const exchangeRateElement2 = document.querySelector('.result-exchange');

let amountToConvert = parseFloat(fromAmountInput.value);
let fromCurrencyCode = "RUB";
let toCurrencyCode = "USD";
let convertedAmount;


const startConversion = async (from, to, amount) => {
    try {
        // for  Fetch exchange rates from the API
        const response = await fetch(`${apiUrl}?have=${from}&want=${to}&amount=${amount}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com',
                'X-RapidAPI-Key': '071fd6d9b8msh7637b4e02235d23p19aed8jsn3c51a83a62db',
            },
        });

        const data = await response.json();
        return convertedAmount = data.new_amount;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// For change exchange rate 

async function convertExchangeRate() {
    const response = await startConversion(fromCurrencyCode, toCurrencyCode, 1)
    const response2 = await startConversion(toCurrencyCode, fromCurrencyCode, 1)
    exchangeRateElement.innerText = `1 ${fromCurrencyCode} = ${response} ${toCurrencyCode}`;
    exchangeRateElement2.innerText = `1 ${toCurrencyCode} = ${response2} ${fromCurrencyCode}`;
}
convertExchangeRate()



fromAmountInput.addEventListener("input", async (e) => {
    amountToConvert = Number(e.target.value)
    const response = await startConversion(fromCurrencyCode, toCurrencyCode, amountToConvert)
    toAmountInput.value = response
    toAmountInput.innerText = response
    convertExchangeRate()
})



// For choose currency in both ul and change color
let selectedFromCurrencyItem
let selectedToCurrencyItem

fromCurrencyList.forEach((item, index) => {
    item.addEventListener('click', () => {
        fromCurrencyList.forEach(item => {
            item.style.backgroundColor = 'white';
            item.style.color = '#C6C6C6';
        });
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
        selectedFromCurrencyItem = item;
    });

    if (index === 0) {
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
    }
});


toCurrencyList.forEach((item, index) => {
    item.addEventListener('click', () => {
        toCurrencyList.forEach(item => {
            item.style.backgroundColor = 'white';
            item.style.color = '#C6C6C6';
        });
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
        selectedToCurrencyItem = item;
    });

    if (index === 1) {
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
    }
});



fromCurrencyList.forEach((item, index) => {
    item.addEventListener("click", async () => {
        fromCurrencyCode = item.innerText
        const response = await startConversion(fromCurrencyCode, toCurrencyCode, amountToConvert)
        toAmountInput.value = response
        toAmountInput.innerText = response
        convertExchangeRate()
    })
})


toCurrencyList.forEach((item, index) => {
    item.addEventListener("click", async () => {
        toCurrencyCode = item.innerText
        const response = await startConversion(fromCurrencyCode, toCurrencyCode, amountToConvert)
        toAmountInput.value = response
        toAmountInput.innerText = response
        convertExchangeRate()
    })
})























