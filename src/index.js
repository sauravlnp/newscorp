import store from './store';
const LANDING_API_URL = "/api/pages.json";
const NEWS_API_URL = "/api/collection/";

class Main {
    page = "";

    constructor() {

    }

    async start() {
        const fetchPages = await store.doGet(LANDING_API_URL);
        if(!fetchPages.isAPIError) {
            const collectionToFetch = store.searchArray(fetchPages.data, 'collectionType', this.page);
            const collections= await store.doGet(NEWS_API_URL+collectionToFetch.collectionId+'.json');
            this.render(collections);
        }
        
    }

    

    render(collections) {
        const articleElement = document.getElementById("articles");

        if(!collections.isAPIError) {
            const articlesHTML = collections.data.reduce((acc, item, key) => {
                
                let publishedTime = store.utilFuncConvertDate(item.published);
                let articleIntro = item.intro? `<p>
                <span class="article-intro">
                    ${item.intro}
                </span>
                </p>`: "";
                return acc + `
                    <div class="article">
                        <div>
                            <img src="${item.imageUrl}" />
                            <h2 class="title">
                                ${item.title}
                            </h2>
                        </div>
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

}

const main = new Main();
main.page = "landing";
main.start();

