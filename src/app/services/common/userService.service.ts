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
		this.proxyService.get("getUsers").then((res)=> {console.log(res.getUsers());res.getUsers().forEach(x => users.push(new User(x.id, x.name)))});
		return users;
	}

}