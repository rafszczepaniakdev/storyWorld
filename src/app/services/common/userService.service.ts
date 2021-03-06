import { Injectable } from '@angular/core';

import { ProxyService } from '../proxy.service';

import { Request } from '../../classes/request.class';
import { User } from '../../classes/user/user.class';

@Injectable()
export class UserService {
	constructor(private proxyService:ProxyService) { 
	}

	getUsers(){
		let users:Array<User> = new Array<User>();
		this.proxyService.get("getUsers")
		.then((res)=> {
			res.getUsers().forEach(x => users.push(new User(x.id, x.name)))
		});
		return users;
	}


	getUser(user:User, token:String){
		let request = new Request();
		request.setUser(user);
		request.setToken(token);

		return this.proxyService.post("user/getUser",request);
	}

	get(id:number){
		return this.proxyService.get("user/"+id);
	}

	logOut(token:String){
		let request = new Request();
		request.setToken(token);

		return this.proxyService.post("user/logout",request);
	}
}