import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user/user.class';
import { TokenService } from '../../services/user/token.service';
import { ProxyResponse } from '../../classes/response.class';
import { Token } from '../../classes/user/token.enum';
import { UserDataProvider } from '../../services/userDataProvider.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
	selector: 'token',
	templateUrl: `../app/views/user/token.html`,
	styleUrls: [`../app/styles/styles.css`],
	providers: [TokenService]
})

export class TokenComponent {
	tokenType: Token;
	user: User;
	token: String;
	constructor(private userDataProvider: UserDataProvider, private activatedRouter: ActivatedRoute, private router: Router, private tokenService:TokenService) {
		this.tokenType = this.activatedRouter.snapshot.params['type'];
		this.token = this.activatedRouter.snapshot.params['token'];
		this.user = new User;
		this.user.id = this.activatedRouter.snapshot.params['userId'];
		switch(this.tokenType)
		{
			case <any>'REGISTER':
				this.tokenService.confirmRegister(this.user, this.tokenType, this.token).then(res => this.handleConfirmRegister(res));
			break;
		}
	}

	confirmPass(){
		this.tokenService.confirmPass(this.user, this.tokenType, this.token).then(res => this.handleConfirmPass(res));
	}

	private handleConfirmRegister(res:ProxyResponse){
		if(res){
			this.router.navigateByUrl("/login");
		}
	}

	private handleConfirmPass(res:ProxyResponse){
		if(res){
			this.user = new User();
			this.tokenType = null;
			this.token = null;
		}
	}
}