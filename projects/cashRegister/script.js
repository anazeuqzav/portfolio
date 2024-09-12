const price = 19.50;
const cid = [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0]
];

document.addEventListener('DOMContentLoaded', () => {
    const cashInput = document.getElementById('cash');
    const changeDisplay = document.getElementById('change-due');
    const purchaseButton = document.getElementById('purchase-btn');
    const drawerContents = document.getElementById('drawer-contents');
    const itemPriceDisplay = document.getElementById('item-price');

    itemPriceDisplay.textContent = price.toFixed(2);

    purchaseButton.addEventListener('click', () => {
        let cash = parseFloat(cashInput.value);
        let changeDue = cash - price;

        if (cash < price) {
            alert('Customer does not have enough money to purchase the item');
            return;
        } else if (cash === price) {
            changeDisplay.innerText = 'No change due - customer paid with exact cash';
            return;
        }

        let result = calculateChange(changeDue);
        changeDisplay.innerText = result;
    });

    function calculateChange(change) {
        let currencyUnits = {
            'PENNY': 0.01,
            'NICKEL': 0.05,
            'DIME': 0.1,
            'QUARTER': 0.25,
            'ONE': 1,
            'FIVE': 5,
            'TEN': 10,
            'TWENTY': 20,
            'ONE HUNDRED': 100
        };

        let totalCid = cid.reduce((sum, unit) => sum + unit[1], 0);
        totalCid = parseFloat(totalCid.toFixed(2)); // Mantener precisión decimal

        if (totalCid === change) {
            updateDrawerDisplay(cid);
            return `Status: CLOSED ${formatChange(cid)}`;
        }

        if (totalCid < change) {
            return "Status: INSUFFICIENT_FUNDS";
        }

        let changeArray = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            let unitName = cid[i][0];
            let unitValue = currencyUnits[unitName];
            let unitTotal = cid[i][1];
            let unitUsed = 0;

            while (change >= unitValue && unitTotal > 0) {
                change -= unitValue;
                unitTotal -= unitValue;
                change = parseFloat(change.toFixed(2)); // Mantener precisión decimal
                unitUsed += unitValue;
            }

            if (unitUsed > 0) {
                changeArray.push([unitName, unitUsed]);
            }
        }

        if (change > 0) {
            return "Status: INSUFFICIENT_FUNDS";
        }

        updateDrawerDisplay(cid);
        return `Status: OPEN ${formatChange(changeArray)}`;
    }

    function formatChange(changeArray) {
        return changeArray
            .filter(item => item[1] > 0)
            .sort((a, b) => b[1] - a[1])
            .map(item => `${item[0]}: $${item[1].toFixed(2)}`)
            .join(" ");
    }

    function updateDrawerDisplay(drawerCid) {
        drawerContents.innerHTML = '';
        drawerCid.forEach(([denomination, amount]) => {
            if (amount > 0) {
                const listItem = document.createElement('li');
                listItem.textContent = `${denomination}: $${amount.toFixed(2)}`;
                drawerContents.appendChild(listItem);
            }
        });
    }
});
