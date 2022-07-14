const store = {
    doGet: async(API_URL) => {
            let dataObj = {
                data: [],
                isAPIError: false
            };
            try {
                const fetchData = await fetch(API_URL, {
                    method: "GET"
                });
                dataObj.data = await fetchData.json();
            }
            catch {
                dataObj.isAPIError = true;
            }
            return dataObj;
    },
    searchArray: (dataArray, objectkey, searchString) => {
        let searchedObject = "";
        searchedObject = dataArray.find(item => {
            return item[objectkey] === searchString;
        });
        return searchedObject;
    },
    utilFuncConvertDate: (date) => {
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
};

export default store;