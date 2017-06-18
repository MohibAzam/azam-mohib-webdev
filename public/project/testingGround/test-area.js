/**
 * Created by mohib on 6/15/2017.
 */
const igdb = require('igdb-api-node').default
const client = igdb('9e9507643b4dd0c98dfff3a7661b55d4');

function getGames() {
    client
        .games({
        filters: {
            'release_dates.date-gt': '2010-12-31',
            'release_dates.date-lt': '2012-01-01'
        },
        limit: 5,
        offset: 0,
        order: 'release_dates.date:desc',
        search: 'zelda'
        },
            [
        'name',
        'release_dates.date',
        'rating',
        'hypes',
        'cover'
            ])
        .then(function (response) {
            console.log(response.url, JSON.stringify(response.body));
        });
}
