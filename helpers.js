var hbs = require('express-hbs');

module.exports = function() {
    hbs.registerHelper('facebook_url', facebook_url);
};

// ### Facebook URL Helper
//
// *Usage example:*
// Usage: `{{facebook_url}}`, `{{facebook_url absolute="true"}}`
//
// Returns the old WP URL (if there is one) so we can keep the old 
// Facebook comments.

var config = require('./core/server/config'),
    schema = require('./core/server/data/schema').checks,
    facebook_url,
    get_url_slug,
    old_urls;

facebook_url = function(options) {
    var absolute = options && options.hash.absolute,
        ghost_url;

    if (schema.isPost(this)) {
        ghost_url = config.urlFor('post', {
            post: this
        }, absolute);
    }else if (schema.isTag(this)) {
        ghost_url = config.urlFor('tag', {
            tag: this
        }, absolute);
    }else if (schema.isUser(this)) {
        ghost_url = config.urlFor('author', {
            author: this
        }, absolute);
    }else if (schema.isNav(this)) {
        ghost_url = config.urlFor('nav', {
            nav: this
        }, absolute);
    }else{
        ghost_url = config.urlFor(this, absolute);        
    }

    return get_url_slug(ghost_url, old_urls);
};

/**
 * Loop through old_urls array and compare ghost_url to
 * everything after / in substring
 */
get_url_slug = function(ghost_url, old_urls) {    
    var found = false;
    for (var i = 0; i < old_urls.length; i++) {
        // Get substring        
        var slug = old_urls[i].substring(old_urls[i].lastIndexOf("/"));
        // Compare ghost_url to substring
        if(ghost_url.slice(0,-1) === slug) {
            found = true;
            return old_urls[i] + "/";
        }
    }
    if(found === false) return ghost_url;
};

old_urls = [
    "/2015/07/13/831/im-so-tired-of-the-dan-marino-super-bowl-debate",
    "/2015/07/09/829/miami-dolphins-have-the-worst-fans-in-the-nfl-according-to-study",
    "/2015/07/07/827/miami-dolphins-to-sell-limited-amount-of-stadium-seats",
    "/2014/11/07/824/bill-lazors-offensive-gameplan-play-calling-key-beating-detroit-lions",
    "/2013/09/19/817/steve-ross-follow-st-louis-cardinals-dynamic-pricing-model-get-fans-seats",
    "/2013/09/18/815/ryan-tannehill-gets-national-attention-respect",
    "/2013/09/16/813/analyzing-miami-dolphins-next-5-games",
    "/2013/08/05/806/dolphins-sign-reshad-jones-to-4-year-30-million-extension",
    "/2013/08/05/800/dont-let-go-of-the-excitement-yet-dolphins-fans",
    "/miami-dolphins-schedule-2013",
    "/2013/07/29/781/tannehill-tosses-3-tds-dion-jordan-gets-sack-in-scrimmage-at-sun-life-stadium",
    "/2013/07/27/777/dolphins-winning-excitement",
    "/2013/03/21/775/vote-for-dan-marino-to-advance-in-espns-madden-cover-bracket",
    "/2013/03/18/764/sun-life-stadium-will-have-high-density-wi-fi-this-season",
    "/2012/10/28/759/a-win-is-always-sweet-but-a-blowout-of-the-jets-in-new-jersey-is-sweeter",
    "/2012/09/23/755/jets-at-dolphins-the-best-sunday-in-sports",
    "/2012/09/12/749/miami-dolphins-giving-away-1972-still-perfect-hat-to-every-fan-at-oakland-raider-game-sunday",
    "/2012/09/11/743/wtf-tuesday-evening-miami-dolphins-hangover",
    "/2012/09/09/740/dolphins-not-getting-a-lotta-love",
    "/2012/08/31/727/dolphins-cut-day-thoughts-rumors-and-needs",
    "/2012/08/29/721/what-joe-philbin-jeff-ireland-and-the-dolphins-are-doing-will-lead-to-winning",
    "/2012/08/28/716/reggie-bush-for-mike-wallace-straight-up",
    "/2012/08/27/710/make-or-break-week-offensive-players-on-the-bubble-in-miami",
    "/2012/08/27/703/miami-dolphins-making-bold-moves-while-jets-steal-national-embarrassment-spotlight",
    "/2012/08/25/696/miami-dolphins-release-9-players-including-les-brown",
    "/2012/08/22/689/og-eric-steinbach-retires-opens-door-for-john-jerry",
    "/2012/08/21/678/storylines-id-like-to-see-tonight-on-hbos-hard-knocks-with-the-miami-dolphins",
    "/2012/08/20/671/tannehill-named-dolphins-starter-is-matt-moore-on-the-way-out",
    "/2012/08/20/664/miami-dolphins-preseason-difficult-to-judge-so-far",
    "/miami-dolphins-schedule-2012",
    "/2012/08/17/653/ryan-tannehill-will-start-tonight-against-the-carolina-panthers",
    "/2012/08/12/649/for-those-that-missed-the-dolphins-preseason-opener-heres-a-synopsis",
    "/2011/12/24/634/with-jts-career-coming-to-an-end-its-time-to-show-support",
    "/2011/12/03/625/hope-for-tony-sparano-andor-jeff-ireland",
    "/2011/11/23/621/dolfans-still-infected-through-thanksgiving",
    "/2011/11/23/613/dont-buy-into-this-playing-spoiler-media-hype",
    "/2011/11/20/602/ciaran-gowan-win-streak-reaches-3",
    "/2011/11/20/601/miami-dolphins-have-dolfans-believing-again-bludgeon-buffalo-bills",
    "/2011/11/20/600/miami-dolphins-defense-hasnt-allowed-a-td-in-10-straight-quarters",
    "/2011/11/20/595/who-to-root-against-today-while-you-root-for-the-dolphins",
    "/2011/11/19/590/scouting-the-enemy-what-the-bills-are-saying-about-the-dolphins",
    "/2011/11/19/587/injury-report-buffalo-and-miami-kicked-in-the-butt",
    "/2011/11/14/582/food-for-thought-dont-fire-tony-sparano",
    "/2011/11/14/576/miami-dolphins-are-rolling-dolfans-should-be-giddy",
    "/2011/11/12/567/the-rise-of-jimmy-wilson",
    "/2011/11/12/562/redskins-at-miami-dolphins-injuries-only-three-dolphins-hamstrung",
    "/2011/11/12/557/scouting-the-enemy-what-the-redskins-are-saying-about-the-dolphins",
    "/2011/11/11/552/will-suck-for-luckers-hop-back-on-miami-dolphins-bandwagon",
    "/2011/11/10/549/john-beck-should-feel-enormous-pressure-to-win-in-miami",
    "/2011/11/09/529/stats-prove-that-reggie-bush-can-be-an-every-down-back",
    "/2011/11/09/519/dissecting-the-secret-to-matt-moores-success-sunday",
    "/2011/11/08/515/what-took-the-dolphins-defensive-line-so-long",
    "/2011/11/07/504/re-analyzing-the-rest-of-the-miami-dolphins-season-9-wins",
    "/2011/11/06/497/dolphins-embarass-hot-chiefs-vontae-davis-seems-upset",
    "/2011/11/04/491/injury-report-10-dolphins-listed-eat-a-friggin-banana",
    "/2011/11/04/488/boy-was-i-wrong-about-peyton-mannings-injury",
    "/2011/11/04/482/the-foreign-assessment-of-the-miami-dolphins-chances-at-kansas-city",
    "/2011/11/03/477/analyzing-the-miami-dolphins-remaining-nine-games-win-or-lose",
    "/2011/10/30/469/the-tony-sparano-era-how-it-all-went-wrong",
    "/jobs",
    "/2011/10/06/460/henne-out-rosenfels-in",
    "/2011/10/04/452/upset-frustrated-and-angry",
    "/2011/10/01/446/i-smell-upset",
    "/2011/10/01/441/injuries-to-key-players-at-the-wrong-time-for-miami-dolphins",
    "/2011/09/28/435/miami-dolphins-coaches-need-to-take-control-and-instill-confidence",
    "/2011/09/26/430/miami-dolphins-face-a-dilemma-improve-now-and-stay-ordinary-or-lose-and-get-lucky",
    "/2011/09/25/427/another-badly-coached-outing-by-miami-dolphins",
    "/2011/09/25/421/the-injury-report-is-growing-for-miami-dolphins-at-cleveland-browns-today",
    "/2011/09/25/414/dolphins-at-browns-%e2%80%93-game-preview",
    "/2011/09/23/409/time-for-a-change-the-hot-seat-is-quickly-heating-up",
    "/2011/09/22/405/miami-dolphins-must-start-limiting-mistakes",
    "/2011/09/19/400/miami-dolphins-answer-a-lot-of-questions-in-loss",
    "/2011/09/18/396/ten-things-to-watch-today-when-the-dolphins-take-on-the-texans",
    "/2011/09/17/392/houston-texans-at-miami-dolphins-injury-report",
    "/2011/09/16/387/scouting-the-houston-texans-and-the-miami-dolphins-anemic-home-record",
    "/2011/09/14/382/how-badly-did-the-lockout-hurt-the-miami-dolphins",
    "/2011/09/14/358/benny-sapp-zapped-out-of-miami",
    "/2011/09/13/353/how-do-miami-dolphins-fix-tight-end-coverage-problems",
    "/2011/09/12/350/tom-brady-torches-dolphins-in-record-setting-night",
    "/2011/09/12/342/ten-things-to-watch-for-tonight-when-the-dolphins-take-on-the-patriots",
    "/2011/09/11/336/week-1-injury-report-new-england-patriots-at-miami-dolphins",
    "/writers",
    "/2011/09/11/330/ten-years-later-time-for-miami-dolphins-to-return",
    "/2011/09/10/328/who-is-the-real-deep-threat-for-miami",
    "/2011/09/10/325/chad-henne-named-team-captain-for-2011",
    "/2011/09/09/318/how-peyton-mannings-injury-helps-the-miami-dolphins",
    "/2011/09/09/316/change-is-good-for-chad-henne",
    "/2011/09/08/311/are-you-ready-for-air-henne",
    "/community",
    "/bahamas-business",
    "/bahamas-travel-information",
    "/bahamas-entertainment",
    "/bahamas-sports",
    "/bahamas-headlines",
    "/2011/09/07/273/its-about-winning-mr-ross",
    "/2011/09/07/267/season-opener-patriots-at-dolphins",
    "/2011/09/06/229/belichick-picks-up-a-j-edds",
    "/bahamas-history",
    "/mdbw-articles-archives",
    "/miami-dolphins-depth-chart",
    "/miami-dolphins-schedule-2011",
    "/miami-dolphins-roster",
    "/about",
    "/contact",
    "/2008/07/25/641/miami-dolphins-7-0-a-new-hope",
    "/2003/11/26/225/miami-at-dallas-breakdown",
    "/2003/11/25/222/jay-fiedler-a-game-and-possible-season-saving-performance",
    "/2003/10/06/219/a-giant-disapointment",
    "/2003/09/22/217/rickys-hot-tub-will-be-busy-all-day",
    "/2003/09/20/214/these-are-your-miami-dolphins",
    "/2003/09/15/212/paul-doesnt-hack-it",
    "/2003/09/12/209/miami-dolphins-at-new-york-jets-preview",
    "/2003/09/07/201/fiedler-throws-the-game-away",
    "/2003/09/04/198/dolphins-v-texans-preview",
    "/2003/08/31/196/dolphins-waive-13-players-to-bring-roster-down-to-53",
    "/2003/08/08/154/tampa-bay-buccaneers-at-miami-dolphins",
    "/2003/07/25/192/fasten-your-seat-belts",
    "/2003/07/10/189/the-silly-season",
    "/2003/06/30/186/fantasy-football-prospects-for-the-miami-dolphins-based-on-a-14-team-league",
    "/2003/06/26/184/english-soccer-star-works-out-with-phins",
    "/2003/06/25/181/two-out-of-three-aint-bad-or-is-it",
    "/2003/06/23/170/sorry-its-too-tempting-2",
    "/2003/06/20/160/tripplex-has-resigned",
    "/2003/06/18/158/this-is-the-year-miami-will-doh",
    "/2003/06/17/156/there-is-no-controversey",
    "/2003/06/16/150/spielmans-patience-yields-offseason-success",
];