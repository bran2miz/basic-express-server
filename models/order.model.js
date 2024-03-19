'use strict';

const order = (sequalizeInstance, DataTypes) => 
    sequalizeInstance.define('orders',  {
        description: {
            type:DataTypes.STRING,
            allowNull:false
        },
        customerId: {
            type:DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'customers',
                key: 'id'
            }
        }
    })


module.exports = order;