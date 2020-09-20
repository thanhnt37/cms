import * as DynamoDBServices from '../services/dynamodb';
const _ = require('lodash');

export const TABLE_NAME = process.env.REACT_APP_DB_PREFIX + "-Articles";
export const INDEX_BY_IS_ENABLED_SORT_BY_PUBLISHED_AT = "INDEX_BY_IS_ENABLED_SORT_BY_PUBLISHED_AT";

export async function findBySlug(slug) {
    let article = await DynamoDBServices.find(TABLE_NAME, {slug: slug});
    return article.Item;
}

export async function create(data) {
    // TODO: data validation
    return await DynamoDBServices.create(TABLE_NAME, data);
}

export async function update(slug, data) {
    // TODO: data validation
    return await DynamoDBServices.update(TABLE_NAME, {slug: slug}, data);
}

export async function publish(data) {
    // TODO: data validation
    data.is_published = 'true';
    await DynamoDBServices.create(TABLE_NAME.replace("dev", "prod"), data);
    await DynamoDBServices.update(TABLE_NAME, data);
    return true;
}

export async function get(lastEvaluatedKey = {}) {
    let articles = await DynamoDBServices.scans(
        TABLE_NAME,
        [{attrKey: "is_published", attrValue: "true", expression: "#is_published <> :is_published"}],
        100,
        lastEvaluatedKey,
        ['id', 'slug', 'title', 'is_enabled', 'updated_at']
    );

    return {
        Count: articles.Count,
        ScannedCount: articles.ScannedCount,
        Items: _.orderBy(articles.Items, ['is_enabled', 'updated_at'], ['asc', 'desc']),
        LastEvaluatedKey: articles.LastEvaluatedKey
    }
}

export async function allSlug() {
    return await DynamoDBServices.scans(TABLE_NAME, [], 1000, {}, ['title', 'slug']);
}
