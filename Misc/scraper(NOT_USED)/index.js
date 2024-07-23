import puppeteer from "puppeteer";
import fs from 'fs';

// NOTES
// Testing on Apple on news.google.com: https://news.google.com/search?q=apple&hl=en-ID&gl=ID&ceid=ID%3Aen

// Puppeteer is a promise-based API.

// Difference between const and function is that function can be declared anywhere and used anywhere while const has to be in chronological
// order (must be declared before being called).

// NEW CODE - MAKES IT MORE DYNAMIC/SOFT CODING
// OLD CODE - MIGHT NEED TO CHANGE



// MAIN method that retrieves titles and writes the JSON data into a file using fs (node module)
const getTitles = async (config) => {

    // Create a query string (NEW CODE)
    const queryString = config.queryVars ? makeQueryString(config.queryVars) : '';
    console.log('queryString:' + queryString)

    // Create a URL string (NEW CODE)
    const url = `https://news.google.com/search?${queryString}&q=${config.searchTerm}`
    console.log(`URL: ${url}`)


    // https://pptr.dev/ -> Look into arguments to make it more dynamic
    // Creating puppeteer browser and page instance (NEW CODE)
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            '--disable-extensions-except=/path/to/manifest/folder/',
            '--load-extension=/path/to/manifest/folder/'
        ]
    });
    
    // Configurations for page including viewport dimensions, UA string (for website to identify browser), setting cookies,
    // and setting request interceptions so that on navigation requests, headers will be set.
    // The request interception portion is largely sourced from Lewis Donovan's work.
    // Setting the cookie to consent minimizes activity that doesn't involve the user's consent: https://support.google.com/analytics/answer/9976101?hl=en
    const page = await browser.newPage();
    page.setViewport({ width: 1366, height: 784});
    page.setUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0");
    page.setRequestInterception(true);
    page.on("request", interceptedRequest => {
        if (!interceptedRequest.isNavigationRequest()) {
            interceptedRequest.continue()
            return
        }
        const headers = interceptedRequest.headers()
        headers["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
        headers["Accept-Enconding"] = "gzip"
        headers["Accept-Language"] = "en-US,en;q=0.9,es;q=0.8"
        headers["Upgrade-Insecure-Requests"] = 1
        headers["Referer"] = "https://www.google.com"
        interceptedRequest.continue({headers})
    });
    await page.setCookie({
        name: "CONSENT",
        value: `YES+cb.${new Date().toISOString().split('T')[0].replace(/-/g,'')}-04-p0.en-GB+FX+667`,
        domain: ".google.com"
    });
    await page.goto(url, {
        waitUntil: "networkidle2",
    });


    // Scrapes the data from the website
    const data = await loadLatestTitles(page);


    // Outputs data into console
    console.log(data);
    // console.log(data.entries())


    // Writes JSON data into test.txt as string (CSV)
    fs.writeFile("test1.txt", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    })
    
    await browser.close();
};


// TESTING MAIN FUNCTION (NEW CODE)
const testQueryConfig = {
    searchTerm: "Apple",
    queryVars: {
        hl:"en-US",
        gl:"US",
        ceid:"US:en"
    }
}

export const data = JSON.stringify(await getTitles(testQueryConfig));



// HELPER FUNCTIONS

// Create a query string (NEW CODE)
function makeQueryString(query) {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
}

// Load titles of page (OLD CODE)
async function loadLatestTitles(page) {
    // Initialize/reset previous titles
    let titles = [];
    const result = [];

    // This part scrapes the headline group that has 3 headlines that fall under a category.
    let headlines = await page.$$(".NiLAwe.mi8Lec.jzZQmc.Oc0wGc.R7GTQ.keNKEd.j7vNaf");
    for (let i of headlines){
        titles.push(await i.$$(".DY5T1d.RZIKme"));
    }
    for (let j=0; j < titles.length; j++) {
        for (let k of titles[j]){
            result.push(await k.evaluate(x => x.textContent));
            }
    }

    // This part scrapes the individual headlines.
    titles = [];
    headlines = await page.$$(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc");
    for (let i of headlines){
        titles.push(await i.$(".ipQwMb.ekueJc.RD0gLb"));
    }
    for (let j of titles){
        result.push(await j.evaluate(x => x.textContent));
    }

    return result;
};

