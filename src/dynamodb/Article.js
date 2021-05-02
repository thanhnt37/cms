import * as DynamoDBServices from '../services/dynamodb';
const _ = require('lodash');
const slugify = require('slugify');
slugify.extend({'đ': 'd', 'Đ': 'd', });

export const TABLE_NAME = process.env.REACT_APP_DB_PREFIX + "-Articles";
export const INDEX_BY_IS_ENABLED_SORT_BY_PUBLISHED_AT = "INDEX_BY_IS_ENABLED_SORT_BY_PUBLISHED_AT";

export async function findBySlug(slug) {
    let article = await DynamoDBServices.find(TABLE_NAME, {slug: slug});
    return article.Item;
}

export async function create(data) {
    // TODO: data validation
    let slug = slugify(data.title.toLowerCase(), {remove: /[!@#$%^&*();:'"~`?.<>]/g});
    let check = await findBySlug(slug);
    if(_.isEmpty(check)) {
        return await DynamoDBServices.create(TABLE_NAME, data);
    }

    return false;
}

export async function update(slug, data) {
    // TODO: data validation
    return await DynamoDBServices.update(TABLE_NAME, {slug: slug}, data);
}

export async function publish(slug) {
    // TODO: data validation
    let article = await findBySlug(slug);
    article.is_published = 'true';
    await DynamoDBServices.create(TABLE_NAME.replace("dev", "prod"), article);
    await DynamoDBServices.update(TABLE_NAME, {slug: slug}, {is_published: "true"});

    return true;
}

export async function get(lastEvaluatedKey = {}, author = null) {
    let articles = {
        Count: 0,
        ScannedCount: 0,
        Items: []
    };

    while(true) {
        let items =  await DynamoDBServices.scans(
            TABLE_NAME,
            [
                {attrKey: "is_published", attrValue: "true", expression: "#is_published <> :is_published"},
                // {attrKey: "author", attrValue: "2ynhunguyen@gmail.com", expression: "#author = :author"},
                // {attrKey: "is_locked_keywords", attrValue: "true", expression: "#is_locked_keywords = :is_locked_keywords"},
                // {attrKey: "is_frozen", attrValue: "true", expression: "#is_frozen = :is_frozen"},
                // {attrKey: "is_frozen", expression: "attribute_not_exists(#is_frozen)"},
                // {attrKey: "redirected_to", expression: "attribute_exists(#redirected_to)"}
            ],
            100,
            lastEvaluatedKey,
            ['id', 'slug', 'title', 'is_enabled', 'words_count', 'updated_at', 'author', 'links_out', 'tags']
        );
        articles = {
            Count: articles.Count + items.Count,
            ScannedCount: articles.ScannedCount + items.ScannedCount,
            Items: [...articles.Items, ...items.Items]
        };

        lastEvaluatedKey = items.LastEvaluatedKey;
        if(_.isEmpty(lastEvaluatedKey)) {
            break;
        }
    }
    let items = _.orderBy(articles.Items, ['is_enabled', 'updated_at'], ['asc', 'desc']);

    if(author) {
        let first = [];
        let second = [];
        _.forEach(items, function(article) {
            if(article.author === author) {
                first.push(article);
            } else {
                second.push(article);
            }
        });
        items = [...first, ...second];
    }

    return {
        Count: articles.Count,
        ScannedCount: articles.ScannedCount,
        Items: items,
        LastEvaluatedKey: articles.LastEvaluatedKey
    }
}

export async function allEnabledArticles() {
    let enabledArticles = {
        Count: 0,
        ScannedCount: 0,
        Items: []
    };

    let lastEvaluatedKey = {};
    while(true) {
        let items = await DynamoDBServices.get(
            TABLE_NAME,
            INDEX_BY_IS_ENABLED_SORT_BY_PUBLISHED_AT,
            { hashKey: {name: 'is_enabled', value: 'true'} },
            { limit: 10, lastEvaluatedKey: lastEvaluatedKey, projections: '' }
        );
        enabledArticles = {
            Count: enabledArticles.Count + items.Count,
            ScannedCount: enabledArticles.ScannedCount + items.ScannedCount,
            Items: [...enabledArticles.Items, ...items.Items]
        };

        lastEvaluatedKey = items.LastEvaluatedKey;
        if(_.isEmpty(lastEvaluatedKey)) {
            break;
        }
    }

    return enabledArticles;
}

export async function all() {
    let articles = {
        Count: 0,
        ScannedCount: 0,
        Items: []
    };

    let lastEvaluatedKey = {};
    while(true) {
        let items = await DynamoDBServices.scans(
            TABLE_NAME, [], 10, lastEvaluatedKey,
            ['slug', 'title', 'is_enabled', 'words_count', 'updated_at', 'links_out', 'tags', 'is_published', 'redirected_to', 'is_featured', 'content']
        );
        articles = {
            Count: articles.Count + items.Count,
            ScannedCount: articles.ScannedCount + items.ScannedCount,
            Items: [...articles.Items, ...items.Items]
        };

        lastEvaluatedKey = items.LastEvaluatedKey;
        if(_.isEmpty(lastEvaluatedKey)) {
            break;
        }
    }

    return articles;
}

export async function allSlug() {
    return await DynamoDBServices.scans(TABLE_NAME, [], 1000, {}, ['title', 'slug', 'redirected_to']);
}
