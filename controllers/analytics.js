const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')]
        // Количество заказов вчера
        const yesterdayOrdersNumber = yesterdayOrders.length
        // Количество заказов
        const totalOrdersNumber = allOrders.length
        // Количество дней
        const daysNumber = Object.keys(ordersMap).length
        // Заказов в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        // Процент для количества заказов ((Заказов вчера / Заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
        // Общая выручка
        const totalGain = calculatePrice(allOrders)
        // Выручка в день
        const gainPerDay = totalGain / daysNumber
        // Выручка за вчера
        const yesterdayGain = calculatePrice(yesterdayOrders)
        // Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
        // Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        // Сравнение количества заказов
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent), // Процент выручки
                compare: Math.abs(+compareGain), // Сравнение
                yesterday: +yesterdayGain, // Выручка вчера
                isHigher: gainPercent > 0 // Выручка вчера выше чем средняя?
            },
            orders: {
                percent: Math.abs(+ordersPercent), // Процент выручки
                compare: Math.abs(+compareNumber), // Сравнение
                yesterday: +yesterdayOrdersNumber, // Выручка вчера
                isHigher: +ordersPercent > 0 // Выручка вчера выше чем средняя?
            }
        })
    } catch(e) {
        errorHandler(res, e)
    }

}

module.exports.analytics = async function(req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)

        // Средний чек 
        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

        
        const chart = Object.keys(ordersMap).map(label => {
            // Данные о графиках
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            return {
                label, order, gain
            }
        })
        res.status(200).json({
            average, chart
        })
    } catch(e) {
        errorHandler(res, e) 
    }
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')
        if (date === moment().format('DD.MM.YYYY')) {
            return
        }
        if (!daysOrders[date]) {
            daysOrders[date] = []
        }
        daysOrders[date].push(order)
    })
    return daysOrders
}

function calculatePrice(orders  = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderPrice
    }, 0)
}