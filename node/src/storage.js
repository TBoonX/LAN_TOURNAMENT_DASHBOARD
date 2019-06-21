// constants
const TYPES_TO_KEY = {
    tournament: 'LAN_Tournaments',
    game: 'LAN_Games',
    participant: 'LAN_Participants',
    point: 'LAN_Points',
};


export default {
    getList: (type) => {
        let data = window.localStorage.getItem(TYPES_TO_KEY[type]);
        let json;
        try {
            json = JSON.parse(data);
        } catch (e) {
            return [];
        }
        return json || [];
    },
    add: (type, item) => {
        let data = window.localStorage.getItem(TYPES_TO_KEY[type]);
        let json;
        try {
            json = JSON.parse(data);
            if (!json)
                json = [];
        } catch (e) {
            json = [];
        }
        json.push(item);
        data = JSON.stringify(json);
        window.localStorage.setItem(TYPES_TO_KEY[type], data);
    },
    getNewId: (type) => {
        let newId = 1;
        let data = window.localStorage.getItem(TYPES_TO_KEY[type]);
        let json;
        try {
            json = JSON.parse(data);
            if (!json)
                json = [];
        } catch (e) {
            json = [];
        }
        json.forEach(item => {
            if (item.id >= newId)
                newId = item.id + 1;
        });
        return newId;
    },
    getName: (type, id) => {
        let data = window.localStorage.getItem(TYPES_TO_KEY[type]);
        let json;
        try {
            json = JSON.parse(data);
            if (!json)
                json = [];
        } catch (e) {
            json = [];
        }
        let match = json.find(j => (j.id === id));
        if (match && match.name)
            return match.name;
        return 'Not Found';
    },
    getId: (type, name) => {
        let data = window.localStorage.getItem(TYPES_TO_KEY[type]);
        let json;
        try {
            json = JSON.parse(data);
            if (!json)
                json = [];
        } catch (e) {
            json = [];
        }
        let match = json.find(j => (j.name === name));
        if (match && match.id)
            return match.id;
        return 0;
    },
}
