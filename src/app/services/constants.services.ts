import { Log } from 'ng2-logger'
export class ConstantsService {
    logger: any = Log.create('constants-service');
    public readonly TAB_HEADERS = [{ "label": "Location", "routerLink": "location" }, { "label": "Settings", "routerLink": "settings" }, { "label": "General", "routerLink": "general" }];
    public readonly SOCKET_URL = '';
    public readonly INSTAGRAM_SCRAPER_URL = `/instagram/causecode`
    public readonly MESSAGES = {
        "SUCCESS":{

        },
        "ERROR":{
            "INVALID_SEARCH_STRING_CAPTION":"Invalid Search Value",
            "INVALID_SEARCH_STRING_MSG":"Please verify your search string, it needs to have valid characters.",
            "NETWORK_ERROR_CAPTION":"Network Error",
            "NETWORK_ERROR_MSG":"Failed to communicate with the webservice, please contact avneesh.srivastava@gmail.com"
        }
    }
    constructor() {
        this.logger.i("Initializing constants service.");
    }
}