// Math.floor((Date.now() - 1657728488738) / 3600000)

class Main {

    landingPageData = null;
    newsPageData = null;
    apiFetchError = false;

    constructor() {

    }

    async start() {
        const landingAPIResult = await this.getLandingData();
        console.log(landingAPIResult);
        if(landingAPIResult) {
            await this.getCollectionData(landingAPIResult[1].collectionId)
        }
        this.renderArticles();
    }

    async getLandingData() {
        if(!this.landingPageData) {
            const LANDING_API_URL = "/api/landing.json";
            
            try{
                const landingAPIFetch = await fetch(LANDING_API_URL, {
                method: "GET"
                });
                this.landingPageData = await landingAPIFetch.json();
            }catch{
                this.apiFetchError = true;
            }
            
        }
        
        return this.landingPageData;
    }

    async getCollectionData(collection) {
        if(!this.newsPageData) {
            const NEWS_API_URL = `/api/collection/${collection}.json`;
            
            try{
                const newsAPIFetch = await fetch(NEWS_API_URL, {
                    method: "GET"
                });
                this.newsPageData = await newsAPIFetch.json();
            }catch{
                this.apiFetchError = true;
            }
            
        }
        
        return this.newsPageData;
    }

    renderArticles() {
        const articleElement = document.getElementById("articles");

        if(!this.apiFetchError) {
            const articlesHTML = this.newsPageData.reduce((acc, item, key) => {
                
                let publishedTime = this.formatTime(item.published);
                let articleIntro = item.intro? `<p>
                <span class="article-intro">
                    ${item.intro}
                </span>
                </p>`: "";
                return acc + `
                    <div class="article">
                        <img src="${item.imageUrl}" />
                        <h2 class="title">
                            ${item.title}
                        </h2>
                        ${articleIntro}
                        <span class="article-date">
                            ${publishedTime}
                        </span>
                    </div>`;
            }, "");
            articleElement.innerHTML = articlesHTML;
        }
        else{
            articleElement.innerHTML = "Some Internal Error!";
        }
        
    }

    formatTime(date) {
        var seconds = Math.floor((new Date() - date) / 1000);  
        var interval = seconds / 31536000;

        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + "d";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + "h";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + "min";
        }
    }

}

const main = new Main();
main.start();

