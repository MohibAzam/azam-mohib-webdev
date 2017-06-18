/**
 * Created by mohib on 6/15/2017.
 */
const app = require('../../../express');

app.get('somethin', function(req, res) {
    res.send('hiya');
});