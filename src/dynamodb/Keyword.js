import * as DynamoDBServices from '../services/dynamodb';

export const TABLE_NAME = "hatdieubactam-dev-Keywords";

export async function findBySlug(slug) {
    let keyword = await DynamoDBServices.find(TABLE_NAME, {slug: slug});
    return keyword.Item;
}

export async function create(data) {
    // TODO: data validation
    return await DynamoDBServices.create(TABLE_NAME, data);
}

export async function update(slug, data) {
    // TODO: data validation
    return await DynamoDBServices.update(TABLE_NAME, {slug: slug}, data);
}

export async function all() {
    return await DynamoDBServices.scans(TABLE_NAME, [], 1000, {}, []);
}

export async function batchWriteItem(items) {
    return await DynamoDBServices.batchWriteItem(TABLE_NAME, 'Put', items);
}
