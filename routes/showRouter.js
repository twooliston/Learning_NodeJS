const express = require('express');
const fs = require('fs');
const showRouter = express.Router();

showRouter.get('/show.html', (req, res) => {
    res.render("show.html");
});

// data held at the /show endpoint
showRouter.get('/show', (req, res) => {
    const jsonData = fs.readFileSync('./orders.json')
    let ordersData = JSON.parse(jsonData);

    itemList = [];
    ordersData.forEach(order => {
        order.items.forEach(item => {

            date = formatDate(new Date(order.shippingDate), order.shippingTime); 

            itemList.push({
                productId: item.item,
                quantity: item.quantity,
                buyer: order.buyer,
                shippingTarget: date,
            });
        });
    });
    res.send(itemList);
});

// add time to date string
function formatDate(date, time) {
    partsOfTime = time.split(':');
    date.setHours(parseInt(partsOfTime[0]));
    date.setMinutes(parseInt(partsOfTime[1]));
    return date.toString();
}

module.exports = showRouter;