import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AccountService {
    constructor(
        private cookieService: CookieService
    ) { }
    async cookieHandler() {
        console.log('cookiehandle function starting');
        let cookie: any = this.cookieService.get('chat_uid');
        console.log('get cookie by cookie service', cookie);
        let option;
        if (cookie) {
            console.log('cookie exists', cookie);
            //   let resp = await this.chatService.getMessages(cookie);
            let resp = 1;
            if (resp) {
                console.log('created');
            }
            else {
                console.log("old cookie:", cookie)
                console.log('deleting previous cookie');
                if (window.location.host.indexOf('localhost') != -1) {
                    option = { expires: new Date(cookie.expires) };
                }
                else {
                    option = {
                        secure: true,
                        sameSite: 'None'
                    };
                }
                this.cookieService.delete('chat_uid', option);
                console.log('creating cookie again');
                this.cookieHandler();
            }
        }
        else {
            console.log('cookie doesnt exist');
            cookie = this.getCookie(1);  // for 8 hours
            console.log('created : ', cookie);
            if (window.location.host.indexOf('localhost') != -1) {
                option = { expires: new Date(cookie.expires) };
            }
            else {
                option = {
                    secure: true,
                    expires: new Date(cookie.expires),
                    sameSite: 'None'
                };
            }
            this.cookieService.set(
                "chat_uid",
                cookie.uid,
                option
            );
        }
    }

    getCookie(hour) {
        let cookie = {
            uid: uuid(),
            expires: Date.now() + hour * 60 * 60 * 1000,
        };
        return cookie;
    }
}