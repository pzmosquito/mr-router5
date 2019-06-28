import {observable, action} from "mobx";
import {routerStore} from "../../../package/dist";


export default class UserStore {
    data = [
        {"id": 1, "name": "Stephen Curry", "description": "Wardell Stephen 'Steph' Curry II is an American professional basketball player for the Golden State Warriors of the National Basketball Association. A six-time NBA All-Star, he has been named the NBA Most Valuable Player twice and won three NBA championships with the Warriors."},
        {"id": 2, "name": "Miachel Jordan", "description": "Michael Jeffrey Jordan (born February 17, 1963), also known by his initials, MJ, is an American former professional basketball player who is the principal owner and chairman of the Charlotte Hornets of the National Basketball Association (NBA)."},
        {"id": 3, "name": "LeBron James", "description": "LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association. He is often considered the best basketball player in the world and regarded by some as the greatest player of all time."},
        {"id": 4, "name": "Tim Duncan", "description": "Timothy Theodore Duncan is an American former professional basketball player. He spent his entire 19-year career with the San Antonio Spurs of the National Basketball Association."},
        {"id": 5, "name": "Shaq O'Neal", "description": "Shaquille Rashaun Shaq O'Neal (born March 6, 1972), is a retired professional American basketball player who is a sports analyst on the television program Inside the NBA on TNT."},
        {"id": 6, "name": "Magic Johnson", "description": "Earvin 'Magic' Johnson Jr. is an American retired professional basketball player and former president of basketball operations of the Los Angeles Lakers of the National Basketball Association. He played point guard for the Lakers for 13 seasons."},
        {"id": 7, "name": "Kobe Bryant", "description": "Kobe Bean Bryant (born August 23, 1978), often referred to mononymously as Kobe, is an American former professional basketball player. He played his entire 20-year career with the Los Angeles Lakers of the National Basketball Association (NBA)."},
        {"id": 8, "name": "Larry Bird", "description": "Larry Joe Bird is an American former professional basketball player, former coach, and former executive who most recently served as President of Basketball Operations for the Indiana Pacers in the National Basketball Association."},
        {"id": 9, "name": "Kevin Garnett", "description": "Kevin Maurice Garnett is an American former professional basketball player who played for 21 seasons in the National Basketball Association. Known for his intensity, defensive ability, and versatility, Garnett is considered one of the greatest power forwards of all time."},
        {"id": 10, "name": "Wilton Chamberlain", "description": "Wilton Norman Chamberlain was an American basketball player who played as a center and is considered one of the greatest players in history. He played for the Philadelphia/San Francisco Warriors, the Philadelphia 76ers, and the Los Angeles Lakers of the National Basketball Association."},
    ];

    @observable.shallow
    users = [];

    @observable.ref
    currentUser = null;

    @action.bound
    getUsers() {
        return Promise.resolve(this.data).then((data) => {
            this.users.replace(data);
        });
    }

    @action.bound
    getUser({toState}) {
        this.currentUser = null;

        const simulateFetchUser = new Promise((resolve) => {
            setTimeout(() => {
                const userId = parseInt(toState.params.id);
                resolve(this.data.find(user => user.id === userId) || {});
            }, 1000)
        });

        return Promise.resolve(simulateFetchUser).then((data) => {
            if (data) {
                this.currentUser = data;
            }
            else {
                throw new Error("Player Not Found");
            }
        }).catch((error) => {
            if (error === "Player Not Found") {
                this.currentUser = {};
            }
        });
    }

    @action.bound
    getRandomUser() {
        const rndIndex = Math.floor(Math.random() * this.data.length);
        routerStore.router.navigate("users.view", {id: this.data[rndIndex].id});
    }
}
