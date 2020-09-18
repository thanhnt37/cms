import { v1 as uuidv1 } from 'uuid';
import AWS from '../configs/aws';

const _ = require('lodash');
const moment = require('moment');

const DocumentClient = new AWS.DynamoDB.DocumentClient();

export function find(tableName, key = {}) {
    if(_.isEmpty(tableName) || _.isEmpty(key)) {
        return false;
    }

    let params = {
        TableName: tableName,
        Key: key
    };

    return new Promise((resolve, reject) => {
        DocumentClient.get(params, function(err, data) {
            if(err) {
                console.log("------------ Error: get() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: get(): parameters ------------");
                console.log(params);
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
}

/**
 * Get list Items
 *
 * @params
 *      tableName           String
 *      indexName           String
 *      keyConditions       Object  { hashKey: {name: 'userId', value: 'abcdef'}, sortKey: {name: 'shootingDate', value:'1990', expression: '>='} }
 *      control             Object  {limit: 100, lastEvaluatedKey: {}, projections: 'id, name, phone', asc: false}
 *      filterExpression    Array   [{attrKey: "published_at", attrValue: "2019-10-10 10:10:10", expression: "#published_at >= :published_at"}, ...]
 **/
export async function get(tableName, indexName, keyConditions = { hashKey: {name: '', value: ''}, sortKey: {name: '', value:'', expression: ''} }, control = { limit: undefined, lastEvaluatedKey: {}, asc: false, projections: '' }, filterExpression = []) {
    let params = {
        TableName: tableName,
        IndexName: indexName,
        KeyConditionExpression: `(#${keyConditions.hashKey.name} = :${keyConditions.hashKey.name})`,
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        ScanIndexForward: control.asc || false
    };
    params['ExpressionAttributeNames'][`#${keyConditions.hashKey.name}`] = keyConditions.hashKey.name;
    params['ExpressionAttributeValues'][`:${keyConditions.hashKey.name}`] = keyConditions.hashKey.value;

    if(_.has(keyConditions, 'sortKey.expression') && !_.isEmpty(keyConditions.sortKey.expression)) {
        params.KeyConditionExpression += ` AND (#${keyConditions.sortKey.name} ${keyConditions.sortKey.expression} :${keyConditions.sortKey.name})`;
        params['ExpressionAttributeNames'][`#${keyConditions.sortKey.name}`] = keyConditions.sortKey.name;
        params['ExpressionAttributeValues'][`:${keyConditions.sortKey.name}`] = keyConditions.sortKey.value;
    }

    if(_.isNumber(control.limit)) {
        params['Limit'] = control.limit;
    }

    if(!_.isEmpty(control.lastEvaluatedKey)) {
        params['ExclusiveStartKey'] = control.lastEvaluatedKey;
    }

    if (!_.isEmpty(control.projections)) {
        let attributes = control.projections;
        let projectionExpression = '';
        attributes = attributes.split(',');
        for (let attr of attributes) {
            attr = attr.trim();
            params['ExpressionAttributeNames'][`#${attr}`] = attr;
            projectionExpression += attr === attributes[attributes.length - 1].trim() ? `#${attr}` : `#${attr}, `;
        }
        params['ProjectionExpression'] = projectionExpression;
    }

    if(_.isArray(filterExpression) && !_.isEmpty(filterExpression)) {
        filterExpression.forEach(function (item, index) {
            if( _.isEmpty(params['FilterExpression']) ) {
                params['FilterExpression'] = item.expression;
            } else {
                params['FilterExpression'] += ` AND ${item.expression}`;
            }

            params['ExpressionAttributeNames'][`#${item.attrKey}`] = item.attrKey;
            params['ExpressionAttributeValues'][`:${item.attrKey}`] = item.attrValue;
        });

    }

    return await query(params);
}

/**
 *  DynamoDB scan all items
 *
 *  @params
 *      tableName           String
 *      filterExpression    Array   [{attrKey: "published_at", attrValue: "2019-10-10 10:10:10", expression: "#published_at >= :published_at"}, ...]
 *      limit               Int
 *      lastEvaluatedKey    Object
 *      attributes          Array   ["id", "name"]
 * */
export async function scans(tableName, filterExpression = [], limit = undefined, lastEvaluatedKey = {}, attributes = []) {
    let params = {
        TableName: tableName,
    };

    if(_.isArray(filterExpression) && !_.isEmpty(filterExpression)) {
        params['FilterExpression'] = '';
        params['ExpressionAttributeNames'] = {};
        params['ExpressionAttributeValues'] = {};

        filterExpression.forEach(function (item, index) {
            if(params['FilterExpression'] === '') {
                params['FilterExpression'] += item.expression;
            } else {
                params['FilterExpression'] += ` AND ${item.expression}`;
            }

            params['ExpressionAttributeNames'][`#${item.attrKey}`] = item.attrKey;
            params['ExpressionAttributeValues'][`:${item.attrKey}`] = item.attrValue;
        });

    }

    if (!_.isEmpty(attributes)) {
        params['ProjectionExpression'] = attributes.join(', ');
    }

    if(_.isNumber(limit)) {
        params['Limit'] = limit;
    }

    if(!_.isEmpty(lastEvaluatedKey)) {
        params['ExclusiveStartKey'] = lastEvaluatedKey;
    }

    return new Promise((resolve, reject) => {
        DocumentClient.scan(params, function(err, data) {
            if(err) {
                console.log("------------ Error: scan() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: scan(): parameters ------------");
                console.log(params);
                reject(err);
            } else {
                // console.log(data);
                resolve(data);
            }
        });
    });
}

/**
 *  Create new record
 *
 *  @params
 *      tableName   String
 *      data        Object   {id: "1", name: "Lucas"}
 *      uuid        Boolean
 * */
export function create(tableName, data, uuid = true) {
    if(uuid) {
        data['id'] = uuidv1();
    }
    data['created_at'] = moment().format('YYYY-MM-DD h:mm:ss');
    data['updated_at'] = moment().format('YYYY-MM-DD h:mm:ss');

    let params = {
        TableName: tableName,
        Item: data
    };

    return new Promise((resolve, reject) => {
        DocumentClient.put(params, function(err, res) {
            if(err) {
                console.log("------------ Error: put() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: put(): parameters ------------");
                console.log(params);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 *  Update a record
 *
 *  @params
 *      tableName   String
 *      key         Object
 *      data        Object  new data attributes only
 * */
export async function update(tableName, key, data = {}) {
    data['updated_at'] = moment().format('YYYY-MM-DD h:mm:ss');

    let params = {
        TableName: tableName,
        Key: key,
        ReturnValues: "ALL_NEW"
    };

    let attributeNames = {};
    let attributeValues = {};
    let updateExpression = [];
    for(let attribute in data) {
        if(attribute === 'id' || attribute === 'userId') {
            continue;
        }

        attributeNames['#' + attribute] = attribute;
        attributeValues[':' + attribute] = data[attribute];
        updateExpression.push('#' + attribute + ' = ' + ':' + attribute);
    }

    params['ExpressionAttributeNames'] = attributeNames;
    params['ExpressionAttributeValues'] = attributeValues;
    params['UpdateExpression'] = "SET " + updateExpression.join(', ');

    return new Promise((resolve, reject) => {
        DocumentClient.update(params, function(err, data) {
            if(err) {
                console.log("------------ Error: update() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: update(): parameters ------------");
                console.log(params);
                reject(err);
            } else {
                // console.log(data);
                resolve(data);
            }
        });
    });
}

/**
 *  Delete a record
 *
 *  @params
 *      tableName   String
 *      key         Object
 *      softDelete  Boolean
 * */
export function deleteItem(tableName, key, softDelete = false) {
    if(softDelete) {
        return update(tableName, key, {deletedAt: moment().format('YYYY-MM-DD h:mm:ss')});
    } else {
        let params = {
            TableName: tableName,
            Key: key,
            ReturnValues: 'NONE'
        };

        DocumentClient.delete(params, function(err, data) {
            if(err) {
                console.log("------------ Error: delete() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: delete(): parameters ------------");
                console.log(params);
            }
        });

        return true;
    }
}

/**
 * batchWriteItem
 *
 * @Limitation: A single call to BatchWriteItem can write up to 16 MB of data,
 * which can comprise as many as 25 put or delete requests.
 * Individual items to be written can be as large as 400 KB.
 * */
export function batchWriteItem(tableName, method, items = []) {
    method = _.capitalize(method) + 'Request';
    if(!_.includes(["PutRequest", "DeleteRequest"], method)) {
        return false;
    }

    let params = { RequestItems: {} };
    params['RequestItems'][tableName] = [];
    let keyName = (method === 'DeleteRequest') ? 'Key' : 'Item';

    items = items.slice(0, 25);
    _.forEach(items, function (item) {
        let tmp = {};
        tmp[method] = {};
        tmp[method][keyName] = item;

        params['RequestItems'][tableName].push(tmp);
    });

    return new Promise((resolve, reject) => {
        DocumentClient.batchWrite(params, function (err, data) {
            if(err) {
                console.log("------------ Error: batchWriteItem() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: batchWriteItem(): parameters ------------");
                console.log(items);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// ----------------- PRIVATE FUNCTION -----------------

function query(params) {
    return new Promise((resolve, reject) => {
        DocumentClient.query(params, function(err, data) {
            if(err) {
                console.log("------------ Error: query() ------------");
                console.log(err, err.stack);
                console.log("------------ Error: query(): parameters ------------");
                console.log(params);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
