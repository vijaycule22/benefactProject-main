import { CommonModule } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, IterableDiffers, NgModule, OnDestroy, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomHandler } from '../domhandler';
import { MessageService } from '../MessageService';

@Component({
  selector: 'app-growl',
  //templateUrl: './growl.component.html',
  template:`<div #container [ngClass]="'ui-growl ui-widget'" [ngStyle]="style" [class]="styleClass">
    <div #msgel *ngFor="let msg of value;let i = index" class="ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow" aria-live="polite"
        [ngClass]="{'ui-growl-message-info':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn',
            'ui-growl-message-error':msg.severity == 'error','ui-growl-message-success':msg.severity == 'success'}"
            (click)="onMessageClick(i)" (mouseenter)="onMessageHover(i)">
        <div class="ui-growl-item">
             <div class="ui-growl-icon-close fa fa-close" (click)="remove(i,msgel)"></div>
             <span class="ui-growl-image fa fa-2x"
                [ngClass]="{'fa-info-circle':msg.severity == 'info','fa-exclamation-triangle':msg.severity == 'warn',
                        'fa-times-circle':msg.severity == 'error','fa-check':msg.severity == 'success'}"></span>
             <div class="ui-growl-message">
                <span class="ui-growl-title">{{msg.summary}}</span>
                <p [innerHTML]="msg.detail"></p>
             </div>
             <div style="clear: both;"></div>
        </div>
    </div>
</div>`,
})
export class GrowlComponent implements AfterViewInit,DoCheck,OnDestroy {

  @Input() sticky: boolean=false;

  @Input() life: number = 3000;
      
  @Input() style: any;
      
  @Input() styleClass: string;
  
  @Input() immutable: boolean = true;
  
  @Input() autoZIndex: boolean = true;
  
  @Input() baseZIndex: number = 0;
  
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  
  @Output() onHover: EventEmitter<any> = new EventEmitter();
  
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  
  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  
  @ViewChild('container',{static:false}) containerViewChild: ElementRef;
  
  _value: Message[];
                      
  timeout: any;
  
  preventRerender: boolean;
  
  differ: any;
  
  subscription: Subscription;
  
  closeIconClick: boolean;

  public static GrowlTitle_Warn: string = 'Warning';
  public static GrowlTitle_Error: string = 'Error';
  public static GrowlTitle_Info: string = 'Info';
  public static GrowlTitle_Success: string = 'Success';
      
  constructor(public el: ElementRef, public domHandler: DomHandler, public differs: IterableDiffers, @Optional() public messageService: MessageService) {
      this.differ = differs.find([]).create(null);
      
      if(messageService) {
          this.subscription = messageService.messageObserver.subscribe(messages => {
              if(messages) {
                  // if(messages instanceof Array)
                  //     this.value = this.value ? [...this.value, ...messages] : [...messages];
                  // else
                  //     this.value = this.value ? [...this.value, ...[messages]]: [messages];
              }
              else {
                  this.value = null;
              }
          });
      }
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngAfterViewInit() {
      if(!this.sticky) {
          this.initTimeout();
      }
  }
  
  @Input() get value(): Message[] {
      return this._value;
  }

  set value(val:Message[]) {
      this._value = val;
      if(this.containerViewChild && this.containerViewChild.nativeElement && this.immutable) {
          this.handleValueChange();
      }
  }
  
  ngDoCheck() {
      if(!this.immutable && this.containerViewChild && this.containerViewChild.nativeElement) {
          let changes = this.differ.diff(this.value);
          if(changes) {
              this.handleValueChange();
          }
      }
  }
  
  handleValueChange() {
      if(this.preventRerender) {
          this.preventRerender = false;
          return;
      }
      
      if(this.autoZIndex) {
          this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
      }
      this.domHandler.fadeIn(this.containerViewChild.nativeElement, 250);
      
      if(!this.sticky) {
          this.initTimeout();
      }
  }
  
  initTimeout() {
      if(this.timeout) {
          clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
          this.removeAll();
      }, this.life);
  }
      
  remove(index: number, msgel: any) {      
      this.closeIconClick = true;  
      this.domHandler.fadeOut(msgel, 250);
      
      setTimeout(() => {
          this.preventRerender = true;
          this.onClose.emit({message:this.value[index]});
          
          if(this.immutable) {
              this._value = this.value.filter((val,i) => i!=index);
              this.valueChange.emit(this._value);
          }
          else {
              this._value.splice(index, 1);
          }
      }, 250);
      var div = document.getElementById('maskRemove');
            while (div) {
                div.parentNode.removeChild(div);
                div = document.getElementById('maskRemove');
            }        
  }
  
  removeAll() {
      if(this.value && this.value.length) {            
          this.domHandler.fadeOut(this.containerViewChild.nativeElement, 250);
          
          setTimeout(() => {                
              this.value.forEach((msg,index) => this.onClose.emit({message:this.value[index]}));
              if(this.immutable) {
                  this.value = [];
                  this.valueChange.emit(this.value);
              }
              else {
                  this.value.splice(0, this.value.length);
              }
          }, 250);
      }
  }
  
  onMessageClick(i: number) {
      if(this.closeIconClick)
          this.closeIconClick = false;
      else
          this.onClick.emit({message: this.value[i]});
  }
  
  onMessageHover(i: number) {
      this.onHover.emit({message: this.value[i]});
  }
  
  ngOnDestroy() {
      if(!this.sticky) {
          clearTimeout(this.timeout);
      }
      
      if(this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [GrowlComponent],
  declarations: [GrowlComponent]
})
export class GrowlModule { }
