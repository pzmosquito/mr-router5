import {observable, action} from "mobx";
import {routerStore} from "../../../package/dist";


export default class UserStore {
    data = [
        {"id": 1, "name": "Shaq O'Neal", "description": "Shaquille Rashaun Shaq O'Neal (born March 6, 1972), is a retired professional American basketball player who is a sports analyst on the television program Inside the NBA on TNT."},
        {"id": 2, "name": "Miachel Jordan", "description": "Michael Jeffrey Jordan (born February 17, 1963), also known by his initials, MJ, is an American former professional basketball player who is the principal owner and chairman of the Charlotte Hornets of the National Basketball Association (NBA)."},
        {"id": 3, "name": "Kobe Bryant", "description": "Kobe Bean Bryant (born August 23, 1978), often referred to mononymously as Kobe, is an American former professional basketball player. He played his entire 20-year career with the Los Angeles Lakers of the National Basketball Association (NBA)."},
        {"id": 4, "name": "Yao Ming", "description": "Yao Ming (born September 12, 1980) is a Chinese basketball executive and retired professional basketball player who played for the Shanghai Sharks of the Chinese Basketball Association (CBA) and the Houston Rockets of the National Basketball Association (NBA)."}
    ];

    @observable.shallow
    users = [];

    @observable.ref
    currentUser = {};

    @action.bound
    getUsers({done}) {
        Promise.resolve(this.data).then((data) => {
            this.users.replace(data);
            done();
        });
    }

    @action.bound
    getUser({toState, done}) {
        Promise.resolve(this.data.find(user => user.id === parseInt(toState.params.id))).then((data) => {
            this.currentUser = data || {};
            done();
        });
    }

    @action.bound
    getRandomUser() {
        const rndIndex = Math.floor(Math.random() * this.data.length);
        routerStore.router.navigate("users.view", {id: this.data[rndIndex].id});
    }
}
