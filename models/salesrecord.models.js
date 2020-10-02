
module.exports = (sequelize,Sequelize) => {
    const SalesRecord = sequelize.define('salesrecord', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        region: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        itemtype: {
            type: Sequelize.STRING
        },
        saleschannel: {
            type: Sequelize.STRING
        },
        orderpriority: {
            type: Sequelize.STRING
        },
        orderdate: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('orderdate')).format('DD/MM/YYYY');
            }
        },
        oderid: {
            type: Sequelize.INTEGER
        },
        shipdate: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('shipdate')).format('DD/MM/YYYY');
            }
        },
        unitssold: {
            type: Sequelize.INTEGER
        },
        unitprice: {
            type: Sequelize.DOUBLE
        },
        unitcost: {
            type: Sequelize.DOUBLE
        },
        totalrevenue: {
            type: Sequelize.DOUBLE
        },
        totalcost: {
            type: Sequelize.DOUBLE
        },
        totalprofit: {
            type: Sequelize.DOUBLE
        }
    });
    return SalesRecord;
}