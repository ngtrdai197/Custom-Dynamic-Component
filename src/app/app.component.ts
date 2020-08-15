import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { MyCommunityComponent } from './my-community/my-community.component';
import { MyOptionsComponent } from './my-options/my-options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'App component ...'
  @ViewChild('container', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef
  private ngDestroyed$ = new Subject<void>()
  private myCommunityRef: ComponentRef<MyCommunityComponent>
  private myOptionsRef: ComponentRef<MyOptionsComponent>
  constructor(private readonly cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.onActivateMyCommunity()
    this.handleMyCommunity()
    this.handleMyOptions()
  }

  public async onActivateMyCommunity() {
    this.clearContainerRef()
    const { MyCommunityComponent } = await import('./my-community/my-community.component')
    const injector = this.containerRef.injector
    const componentFactory = this.cfr.resolveComponentFactory(MyCommunityComponent)
    const componentRef = this.containerRef.createComponent(componentFactory, this.containerRef.length, injector);
    this.myCommunityRef = componentRef
    componentRef.instance.name = 'My Community'
    const cb = componentRef.instance.nameChange
    this.handleMyCommunity(cb)
  }

  public async onActivateMyOptions() {
    this.clearContainerRef()
    const { MyOptionsComponent } = await import('./my-options/my-options.component')
    const injector = this.containerRef.injector
    const componentFactory = this.cfr.resolveComponentFactory(MyOptionsComponent)
    const componentRef = this.containerRef.createComponent(componentFactory, this.containerRef.length, injector);
    this.myOptionsRef = componentRef
    const cb = componentRef.instance.nameChange
    this.handleMyOptions(cb)
  }


  private handleMyCommunity(cb?: EventEmitter<string>) {
    if (!cb) return
    this.myCommunityChangeName(cb)
  }

  private myCommunityChangeName(cb?: EventEmitter<string>) {
    cb.pipe(
      takeUntil(this.ngDestroyed$)
    ).subscribe((newName: string) => {
      this.myCommunityRef.instance.name = newName
      this.title = newName
    })
  }

  private handleMyOptions(cb?: EventEmitter<string>) {
    if (!cb) return
    this.myOptionsChangeName(cb)
  }

  private myOptionsChangeName(cb?: EventEmitter<string>) {
    cb.pipe(
      takeUntil(this.ngDestroyed$)
    ).subscribe((newName: string) => {
      this.myOptionsRef.instance.name = newName
      this.title = newName
    })
  }

  private clearContainerRef() {
    this.containerRef.clear()
  }
}
