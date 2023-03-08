import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "./message";


@Injectable()
export class MessageService {

    private messageSource = new Subject<Message | Message[]>();
    messageObserver = this.messageSource.asObservable();

    sendGrowlMsgs(messages: Message[]) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
        else
        {
            this.messageSource.next(null);
        }
       
    }

}